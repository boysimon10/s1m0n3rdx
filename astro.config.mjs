// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import fs from "node:fs";
import path from "node:path";
import { loadEnv } from "vite";

const { SITE_URL, UNDER_CONSTRUCTION } = loadEnv(process.env.NODE_ENV ?? "development", process.cwd(), "");

/** @returns {import('astro').AstroIntegration} */
function translationValidator() {
  /** @param {import('astro').AstroIntegrationLogger} logger @param {boolean} isError */
  function validate(logger, isError = false) {
    const enDir = path.resolve("./src/content/articles/en");
    const frDir = path.resolve("./src/content/articles/fr");

    /** @param {string} dir */
    function getTranslationKeys(dir) {
      if (!fs.existsSync(dir)) return new Map();
      const keys = new Map();
      for (const file of fs.readdirSync(dir).filter(f => /\.(md|mdx)$/.test(f))) {
        const content = fs.readFileSync(path.join(dir, file), "utf-8");
        const match = content.match(/translationKey:\s*["']?([^"'\n]+)["']?/);
        if (match) keys.set(match[1].trim(), file);
      }
      return keys;
    }

    const enKeys = getTranslationKeys(enDir);
    const frKeys = getTranslationKeys(frDir);
    const orphans = [];

    for (const [key, file] of enKeys) {
      if (!frKeys.has(key)) orphans.push(`"${file}" (translationKey: "${key}") → no FR counterpart`);
    }
    for (const [key, file] of frKeys) {
      if (!enKeys.has(key)) orphans.push(`"${file}" (translationKey: "${key}") → no EN counterpart`);
    }

    if (orphans.length === 0) return;

    for (const msg of orphans) {
      isError ? logger.error(`[i18n] ${msg}`) : logger.warn(`[i18n] ${msg}`);
    }

    if (isError) throw new Error(`[i18n] Build failed: ${orphans.length} orphaned translationKey(s).`);
  }

  return {
    name: "translation-validator",
    hooks: {
      "astro:server:setup": ({ logger }) => validate(logger, false),
      "astro:build:start": ({ logger }) => validate(logger, true),
    },
  };
}

/**
 * Astro only treats the root 404 page specially, so /fr/404 is emitted as fr/404/index.html.
 * Cloudflare serves the nearest 404.html, so move it to fr/404.html.
 * @returns {import('astro').AstroIntegration}
 */
function localized404() {
  return {
    name: "localized-404",
    hooks: {
      "astro:build:done": ({ dir }) => {
        const root = new URL(".", dir).pathname;
        const from = path.join(root, "fr/404/index.html");
        if (!fs.existsSync(from)) return;
        fs.renameSync(from, path.join(root, "fr/404.html"));
        fs.rmdirSync(path.join(root, "fr/404"));
      },
    },
  };
}

export default defineConfig({
  site: SITE_URL,
  // one URL per page: /about, never /about/ (Cloudflare serves about.html at /about)
  trailingSlash: "never",
  build: { format: "file" },

  i18n: {
    defaultLocale: "en",
    locales: ["en", "fr"],
    routing: { prefixDefaultLocale: false },
  },

  integrations: [
    mdx(),
    ...(UNDER_CONSTRUCTION === "true"
      ? []
      : [
          sitemap({
            // only the manga version (root URLs) is indexed; the other themes point their canonical to it
            filter: (page) => !/^\/(fr\/)?(classic|modern)(\/|$)/.test(new URL(page).pathname),
            i18n: {
              defaultLocale: "en",
              locales: { en: "en-US", fr: "fr-FR" },
            },
          }),
        ]),
    translationValidator(),
    localized404(),
  ],

  markdown: {
    shikiConfig: {
      themes: { light: "vitesse-light", dark: "vitesse-dark" },
    },
  },
});
