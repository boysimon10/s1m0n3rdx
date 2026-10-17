// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import fs from "node:fs";
import path from "node:path";

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

export default defineConfig({
  site: process.env.SITE_URL,

  i18n: {
    defaultLocale: "en",
    locales: ["en", "fr"],
    routing: { prefixDefaultLocale: false },
  },

  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !/^\/(fr\/)?classic(\/|$)/.test(new URL(page).pathname),
      i18n: {
        defaultLocale: "en",
        locales: { en: "en-US", fr: "fr-FR" },
      },
    }),
    translationValidator(),
  ],

  markdown: {
    shikiConfig: {
      themes: { light: "vitesse-light", dark: "vitesse-dark" },
    },
  },
});
