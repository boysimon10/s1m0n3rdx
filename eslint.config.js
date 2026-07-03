import tseslint from "typescript-eslint";
import astro from "eslint-plugin-astro";

export default [
  ...astro.configs.recommended,
  ...tseslint.configs.strictTypeChecked.map((config) => ({
    ...config,
    files: ["**/*.{ts,tsx}"],
  })),
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
  },
  {
    ignores: ["dist/", "styled-system/", ".astro/"],
  },
];
