import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  preflight: true,

  include: ["./src/**/*.{js,jsx,ts,tsx,astro}"],

  exclude: [],

  globalCss: {
    body: {
      fontFamily: "body",
      fontSize: "18px",
      bg: "bg",
      color: "text",
      WebkitFontSmoothing: "antialiased",
    },
    "::selection": {
      bg: "accent",
      color: "text",
    },
  },

  theme: {
    extend: {
      tokens: {
        colors: {
          brand:     { value: "#EC9B5A" },
          brandDeep: { value: "#C9762F" },

          ink:   { value: "#0B0B10" },
          paper: { value: "#EDEDE9" },
          card:  { value: "#FFFFFF" },
          line:  { value: "#DCDCD6" },
          muted: { value: "#6A6A73" },
        },

        fonts: {
          display: { value: "'Archivo Black', sans-serif" },
          heading: { value: "'IBM Plex Mono', monospace" },
          body:    { value: "'IBM Plex Mono', monospace" },
          mono:    { value: "'IBM Plex Mono', monospace" },
        },

        radii: {
          sm:   { value: "12px" },
          md:   { value: "20px" },
          pill: { value: "999px" },
        },

        sizes: {
          container: { value: "820px" },
        },
      },

      semanticTokens: {
        colors: {
          bg:         { value: "{colors.paper}" },
          surface:    { value: "{colors.card}" },
          text:       { value: "{colors.ink}" },
          textMuted:  { value: "{colors.muted}" },
          border:     { value: "{colors.line}" },
          accent:   { value: "{colors.brand}" },
          accentFg: { value: "#FFFFFF" },
        },
      },

      textStyles: {
        giant: {
          value: {
            fontFamily: "display",
            fontSize: "clamp(3.2rem, 11vw, 8.6rem)",
            lineHeight: "0.82",
            letterSpacing: "-0.02em",
            textTransform: "uppercase",
            fontWeight: "700",
          },
        },
        heading: {
          value: {
            fontFamily: "heading",
            fontWeight: "600",
            fontSize: "1.75rem",
            letterSpacing: "-0.02em",
          },
        },
        body: {
          value: { fontFamily: "body", fontWeight: "400", fontSize: "1.1rem", lineHeight: "1.55" },
        },
        label: {
          value: {
            fontFamily: "mono",
            fontSize: "0.85rem",
            fontWeight: "500",
            letterSpacing: "0.02em",
          },
        },
        eyebrow: {
          value: {
            fontFamily: "mono",
            fontSize: "0.82rem",
            fontWeight: "400",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
          },
        },
      },

      keyframes: {
        blink: { "50%": { opacity: "0" } },
      },
    },
  },

  outdir: "styled-system",
});
