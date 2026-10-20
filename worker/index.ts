// Cloudflare Worker: serves /api/now-playing from the Spotify Web API, everything else from the static build.

interface Env {
  SPOTIFY_CLIENT_ID: string;
  SPOTIFY_CLIENT_SECRET: string;
  SPOTIFY_REFRESH_TOKEN: string;
  ASSETS: { fetch(request: Request): Promise<Response> };
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
}

type SpotifyTrack = {
  name: string;
  artists: { name: string }[];
  album: { images: { url: string; width: number }[] };
  external_urls: { spotify: string };
};

export type NowPlaying = {
  playing: boolean;
  title: string;
  artist: string;
  url: string;
  image: string | null;
} | null;

// shared edge cache only: browsers must not keep their own copy, or two tabs can show different tracks
const EDGE_CACHE_SECONDS = 15;

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

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname !== "/api/now-playing") return env.ASSETS.fetch(request);

    const cache = (caches as unknown as { default: Cache }).default;
    const cacheKey = new Request(`${url.origin}/api/now-playing`);
    const cached = await cache.match(cacheKey);
    if (cached) return cached;

    try {
      const response = Response.json(await getNowPlaying(env), {
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
