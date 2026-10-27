// The markup ships the static fallback (lastPlayed); it is replaced as soon as the API answers.
import type { NowPlaying } from "../../worker/index";

const REFRESH_MS = 30_000;
const TIMEOUT_MS = 5_000;

const root = document.querySelector<HTMLElement>("[data-now-playing]");

async function refresh(el: HTMLElement) {
  try {
    const res = await fetch("/api/now-playing", { cache: "no-store", signal: AbortSignal.timeout(TIMEOUT_MS) });
    if (!res.ok) return;
    const track = (await res.json()) as NowPlaying;
    if (!track) return;
    const set = (name: string, text: string) => {
      const node = el.querySelector(`[data-sp-${name}]`);
      if (node) node.textContent = text;
    };
    set("title", track.title);
    set("artist", track.artist);
    set("label", (track.playing ? el.dataset.now : el.dataset.last) ?? "");
    el.dataset.playing = String(track.playing);
  } catch {
  }
}

if (root) {
  void refresh(root);
  setInterval(() => {
    if (document.visibilityState === "visible") void refresh(root);
  }, REFRESH_MS);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") void refresh(root);
  });
}
