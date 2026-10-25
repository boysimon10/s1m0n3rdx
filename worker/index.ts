// Cloudflare Worker: serves /api/now-playing and /api/music from the Spotify Web API, everything else from the static build.

interface Env {
  SPOTIFY_CLIENT_ID: string;
  SPOTIFY_CLIENT_SECRET: string;
  SPOTIFY_REFRESH_TOKEN: string;
  ASSETS: { fetch(request: Request): Promise<Response> };
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
}

type SpotifyImage = { url: string; width: number };

type SpotifyTrack = {
  name: string;
  duration_ms: number;
  artists: { name: string }[];
  album: { images: SpotifyImage[] };
  external_urls: { spotify: string };
};

type SpotifyArtist = {
  name: string;
  images: SpotifyImage[];
  external_urls: { spotify: string };
};

export type NowPlaying = {
  playing: boolean;
  title: string;
  artist: string;
  url: string;
  image: string | null;
} | null;

export type MusicTrack = {
  title: string;
  artist: string;
  url: string;
  image: string | null;
};

export type MusicArtist = {
  name: string;
  url: string;
  image: string | null;
};

export type TopRange = "short_term" | "medium_term" | "long_term";

export type Music = {
  now: (MusicTrack & { playing: boolean; progressMs: number; durationMs: number }) | null;
  recent: (MusicTrack & { playedAt: string })[];
  top: Record<TopRange, { artists: MusicArtist[]; tracks: MusicTrack[] }>;
};

// shared edge cache only: browsers must not keep their own copy, or two tabs can show different tracks
const EDGE_CACHE_SECONDS = 15;
// tops move slowly: 7 Spotify calls, refreshed at most once an hour
const TOP_CACHE_SECONDS = 3600;
// the big card on /music is 200 px wide: 400 px for sharp retina screens (Spotify serves 64, 300 and 640)
const BIG_COVER = 400;
const TOP_RANGES: TopRange[] = ["short_term", "medium_term", "long_term"];

async function getAccessToken(env: Env): Promise<string> {
  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${btoa(`${env.SPOTIFY_CLIENT_ID}:${env.SPOTIFY_CLIENT_SECRET}`)}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ grant_type: "refresh_token", refresh_token: env.SPOTIFY_REFRESH_TOKEN }),
  });
  if (!res.ok) throw new Error(`token: ${String(res.status)}`);
  const data = (await res.json()) as { access_token: string };
  return data.access_token;
}

function toNowPlaying(track: SpotifyTrack, playing: boolean): NowPlaying {
  const images = [...track.album.images].sort((a, b) => a.width - b.width);
  const image = images.find((i) => i.width >= 64) ?? images.at(0);
  return {
    playing,
    title: track.name,
    artist: track.artists.map((a) => a.name).join(", "),
    url: track.external_urls.spotify,
    image: image?.url ?? null,
  };
}

async function getNowPlaying(env: Env): Promise<NowPlaying> {
  const headers = { Authorization: `Bearer ${await getAccessToken(env)}` };

  // 204 = nothing playing; podcasts and ads have no track item
  const current = await fetch("https://api.spotify.com/v1/me/player/currently-playing", { headers });
  if (current.status === 200) {
    const data = (await current.json()) as { is_playing: boolean; currently_playing_type: string; item: SpotifyTrack | null };
    if (data.item && data.currently_playing_type === "track") return toNowPlaying(data.item, data.is_playing);
  }

  const recent = await fetch("https://api.spotify.com/v1/me/player/recently-played?limit=1", { headers });
  if (!recent.ok) throw new Error(`recently-played: ${String(recent.status)}`);
  const data = (await recent.json()) as { items: { track: SpotifyTrack }[] };
  return data.items[0] ? toNowPlaying(data.items[0].track, false) : null;
}

// smallest image at least `min` px wide, so the browser doesn't download a 640 px cover for a 40 px thumbnail
function pickImage(images: SpotifyImage[], min: number): string | null {
  const sorted = [...images].sort((a, b) => a.width - b.width);
  return (sorted.find((i) => i.width >= min) ?? sorted.at(-1))?.url ?? null;
}

function toTrack(track: SpotifyTrack, min = 64): MusicTrack {
  return {
    title: track.name,
    artist: track.artists.map((a) => a.name).join(", "),
    url: track.external_urls.spotify,
    image: pickImage(track.album.images, min),
  };
}

async function spotify<T>(path: string, headers: HeadersInit): Promise<T> {
  const res = await fetch(`https://api.spotify.com/v1${path}`, { headers });
  if (!res.ok) throw new Error(`${path}: ${String(res.status)}`);
  return (await res.json()) as T;
}

async function getTop(headers: HeadersInit): Promise<Music["top"]> {
  const entries = await Promise.all(
    TOP_RANGES.map(async (range) => {
      const [artists, tracks] = await Promise.all([
        spotify<{ items: SpotifyArtist[] }>(`/me/top/artists?limit=5&time_range=${range}`, headers),
        spotify<{ items: SpotifyTrack[] }>(`/me/top/tracks?limit=5&time_range=${range}`, headers),
      ]);
      return [
        range,
        {
          artists: artists.items.map((a) => ({ name: a.name, url: a.external_urls.spotify, image: pickImage(a.images, 160) })),
          tracks: tracks.items.map((t) => toTrack(t)),
        },
      ] as const;
    }),
  );
  return Object.fromEntries(entries) as Music["top"];
}

async function getMusic(env: Env, cache: Cache, origin: string, ctx: ExecutionContext): Promise<Music> {
  const headers = { Authorization: `Bearer ${await getAccessToken(env)}` };

  const topKey = new Request(`${origin}/api/_music-top`);
  const cachedTop = await cache.match(topKey);
  const topPromise = cachedTop ? (cachedTop.json() as Promise<Music["top"]>) : getTop(headers);

  const [current, recent, top] = await Promise.all([
    fetch("https://api.spotify.com/v1/me/player/currently-playing", { headers }),
    spotify<{ items: { track: SpotifyTrack; played_at: string }[] }>("/me/player/recently-played?limit=10", headers),
    topPromise,
  ]);

  if (!cachedTop) {
    ctx.waitUntil(cache.put(topKey, Response.json(top, { headers: { "Cache-Control": `public, s-maxage=${String(TOP_CACHE_SECONDS)}` } })));
  }

  let now: Music["now"] = null;
  // 204 = nothing playing; podcasts and ads have no track item
  if (current.status === 200) {
    const data = (await current.json()) as { is_playing: boolean; progress_ms: number | null; currently_playing_type: string; item: SpotifyTrack | null };
    if (data.item && data.currently_playing_type === "track") {
      now = { ...toTrack(data.item, BIG_COVER), playing: data.is_playing, progressMs: data.progress_ms ?? 0, durationMs: data.item.duration_ms };
    }
  }

  return {
    now,
    // the first one doubles as the big card when nothing is playing
    recent: recent.items.map(({ track, played_at }, i) => ({ ...toTrack(track, i === 0 ? BIG_COVER : 64), playedAt: played_at })),
    top,
  };
}

const ROUTES = ["/api/now-playing", "/api/music"];

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    if (!ROUTES.includes(url.pathname)) return env.ASSETS.fetch(request);

    const cache = (caches as unknown as { default: Cache }).default;
    const cacheKey = new Request(`${url.origin}${url.pathname}`);
    const cached = await cache.match(cacheKey);
    if (cached) return cached;

    try {
      const data = url.pathname === "/api/music" ? await getMusic(env, cache, url.origin, ctx) : await getNowPlaying(env);
      const response = Response.json(data, {
        headers: { "Cache-Control": `public, max-age=0, s-maxage=${String(EDGE_CACHE_SECONDS)}` },
      });
      ctx.waitUntil(cache.put(cacheKey, response.clone()));
      return response;
    } catch (error) {
      console.error(error);
      return Response.json({ error: "spotify unavailable" }, { status: 502, headers: { "Cache-Control": "no-store" } });
    }
  },
};
