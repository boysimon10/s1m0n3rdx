import type { Theme } from "../i18n";

// manga is always built at the root; add "modern" and/or "classic" to build them under /modern and /classic
export const enabledThemes: Theme[] = ["manga"];

export const isThemeEnabled = (theme: Theme) => enabledThemes.includes(theme);
