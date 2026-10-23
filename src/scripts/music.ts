import type { Music, MusicArtist, MusicTrack, TopRange } from "../../worker/index";

const REFRESH_MS = 30_000;
const TIMEOUT_MS = 8_000;

const root = document.querySelector<HTMLElement>("[data-music]");

function setField(node: ParentNode, name: string, value: string | null) {
  const el = node.querySelector(`[data-f="${name}"]`);
  if (!el) return;
  if (el instanceof HTMLImageElement) {
    el.hidden = !value;
    if (value && el.src !== value) el.src = value;
  } else {
    el.textContent = value ?? "";
  }
}

function setLink(node: ParentNode, url: string) {
  const link = node.querySelector<HTMLAnchorElement>("a");
  if (link) link.href = url;
}

function renderList<T>(name: string, items: T[], fill: (node: DocumentFragment, item: T, index: number) => void) {
  const container = root?.querySelector(`[data-list="${name}"]`);
  const tpl = root?.querySelector<HTMLTemplateElement>(`template[data-tpl="${name}"]`);
  if (!container || !tpl) return;
  container.replaceChildren(
    ...items.map((item, i) => {
      const node = tpl.content.cloneNode(true) as DocumentFragment;
      fill(node, item, i);
      return node;
    }),
  );
}

function formatTime(ms: number) {
  const s = Math.floor(ms / 1000);
  return `${String(Math.floor(s / 60))}:${String(s % 60).padStart(2, "0")}`;
}

function timeAgo(iso: string, lang: string) {
  const rtf = new Intl.RelativeTimeFormat(lang, { numeric: "auto", style: "short" });
  const minutes = Math.round((new Date(iso).getTime() - Date.now()) / 60_000);
  if (Math.abs(minutes) < 60) return rtf.format(minutes, "minute");
  const hours = Math.round(minutes / 60);
  if (Math.abs(hours) < 24) return rtf.format(hours, "hour");
  return rtf.format(Math.round(hours / 24), "day");
}

if (root) {
  const lang = root.dataset.lang ?? "en";
  let data: Music | null = null;
  let range: TopRange = "short_term";
  // progress of the current track, advanced locally between two API calls
  let clock: { progressMs: number; durationMs: number; at: number; playing: boolean } | null = null;

  const fillTrack = (node: DocumentFragment, track: MusicTrack) => {
    setLink(node, track.url);
    setField(node, "cover", track.image);
    setField(node, "title", track.title);
    setField(node, "artist", track.artist);
  };

  const renderTop = () => {
    if (!data) return;
    for (const btn of root.querySelectorAll<HTMLButtonElement>("[data-range]")) {
      btn.setAttribute("aria-pressed", String(btn.dataset.range === range));
    }
    renderList<MusicArtist>("artists", data.top[range].artists, (node, artist) => {
      setLink(node, artist.url);
      setField(node, "cover", artist.image);
      setField(node, "name", artist.name);
    });
    renderList<MusicTrack>("tracks", data.top[range].tracks, (node, track, i) => {
      fillTrack(node, track);
      setField(node, "rank", String(i + 1).padStart(2, "0"));
    });
  };

  const tick = () => {
    const progress = root.querySelector<HTMLElement>("[data-now-progress]");
    if (!progress) return;
    progress.hidden = !clock;
    if (!clock) return;
    const elapsed = Math.min(clock.durationMs, clock.progressMs + (clock.playing ? Date.now() - clock.at : 0));
    setField(progress, "elapsed", formatTime(elapsed));
    setField(progress, "duration", formatTime(clock.durationMs));
    const bar = progress.querySelector<HTMLElement>("[data-f=bar]");
    if (bar) bar.style.transform = `scaleX(${String(elapsed / clock.durationMs)})`;
  };

  const renderNow = () => {
    if (!data) return;
    const now = root.querySelector<HTMLElement>("[data-now]");
    if (!now) return;
    // nothing playing: show the last played track, without a progress bar
    const track = data.now ?? data.recent.at(0);
    if (!track) return;
    for (const link of now.querySelectorAll("a")) link.href = track.url;
    setField(now, "cover", track.image);
    setField(now, "title", track.title);
    setField(now, "artist", track.artist);
    const label = data.now ? (data.now.playing ? root.dataset.labelNow : root.dataset.labelPaused) : root.dataset.labelLast;
    setField(now, "label", label ?? "");
    now.dataset.playing = String(Boolean(data.now?.playing));
    clock = data.now ? { progressMs: data.now.progressMs, durationMs: data.now.durationMs, at: Date.now(), playing: data.now.playing } : null;
    tick();
  };

  const render = () => {
    if (!data) return;
    renderNow();
    renderList<Music["recent"][number]>("recent", data.recent, (node, track) => {
      fillTrack(node, track);
      setField(node, "ago", timeAgo(track.playedAt, lang));
    });
    renderTop();
    root.dataset.state = "ready";
  };

  let loading = false;
  const refresh = async () => {
    if (loading) return;
    loading = true;
    try {
      const res = await fetch("/api/music", { cache: "no-store", signal: AbortSignal.timeout(TIMEOUT_MS) });
      if (!res.ok) throw new Error(String(res.status));
      data = (await res.json()) as Music;
      render();
    } catch {
      // keep the last good data on screen; only the first failure shows the error
      if (!data) root.dataset.state = "error";
    } finally {
      loading = false;
    }
  };

  for (const btn of root.querySelectorAll<HTMLButtonElement>("[data-range]")) {
    btn.addEventListener("click", () => {
      range = btn.dataset.range as TopRange;
      renderTop();
    });
  }

  for (const btn of root.querySelectorAll<HTMLButtonElement>("[data-retry]")) {
    btn.addEventListener("click", () => {
      root.dataset.state = "loading";
      void refresh();
    });
  }

  void refresh();
  setInterval(() => {
    if (document.visibilityState !== "visible") return;
    tick();
    // the track just ended: fetch the next one instead of waiting for the next refresh
    if (clock?.playing && clock.progressMs + Date.now() - clock.at >= clock.durationMs + 2000) {
      clock = null;
      void refresh();
    }
  }, 1000);
  setInterval(() => {
    if (document.visibilityState === "visible") void refresh();
  }, REFRESH_MS);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") void refresh();
  });
}
