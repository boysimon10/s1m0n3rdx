import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  preflight: true,

  include: ["./src/**/*.{js,jsx,ts,tsx,astro}"],

  exclude: [],

  conditions: {
    extend: {
      classic: "[data-theme=classic] &",
    },
  },

  globalCss: {
    body: {
      fontFamily: "body",
      bg: "bg",
      color: "text",
      WebkitFontSmoothing: "antialiased",
    },
    "[data-theme=classic] body": {
      fontSize: "18px",
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
          brandSoft: { value: "#F7E1CB" },
          brandInk:  { value: "#A0541A" },
          brandDeep: { value: "#C9762F" },

          paper: { value: "#EEEADB" },
          cream: { value: "#FAF8F1" },
          sand:  { value: "#E3DCC8" },
          ink:   { value: "#141310" },
          muted: { value: "#5C584C" },
          faint: { value: "#A39D8B" },
          line:  { value: "#CBC3AC" },

          code: {
            bg:      { value: "#1B1A16" },
            border:  { value: "#3A382F" },
            text:    { value: "#EEEADB" },
            muted:   { value: "#CFC9B6" },
            keyword: { value: "#EC9B5A" },
            fn:      { value: "#A8D5C2" },
            type:    { value: "#FF8E66" },
            comment: { value: "#8E897B" },
          },

          classic: {
            paper: { value: "#EDEDE9" },
            card:  { value: "#FFFFFF" },
            ink:   { value: "#0B0B10" },
            line:  { value: "#DCDCD6" },
            muted: { value: "#6A6A73" },
          },
        },

        radii: {
          xs:   { value: "6px" },
          sm:   { value: "10px" },
          md:   { value: "18px" },
          lg:   { value: "22px" },
          pill: { value: "999px" },
        },

        borderWidths: {
          thin: { value: "1px" },
          base: { value: "1.5px" },
        },

        sizes: {
          container: { value: "1180px" },
          prose:     { value: "720px" },
          classic:   { value: "820px" },
        },
      },

      semanticTokens: {
        colors: {
          bg:         { value: { base: "{colors.paper}", _classic: "{colors.classic.paper}" } },
          surface:    { value: { base: "{colors.cream}", _classic: "{colors.classic.card}" } },
          surfaceAlt: { value: { base: "{colors.sand}", _classic: "{colors.classic.card}" } },
          text:       { value: { base: "{colors.ink}", _classic: "{colors.classic.ink}" } },
          textMuted:  { value: { base: "{colors.muted}", _classic: "{colors.classic.muted}" } },
          textFaint:  { value: { base: "{colors.faint}", _classic: "{colors.classic.muted}" } },
          inverse:    { value: { base: "{colors.paper}", _classic: "{colors.classic.paper}" } },
          border:     { value: { base: "{colors.ink}", _classic: "{colors.classic.line}" } },
          hairline:   { value: { base: "{colors.line}", _classic: "{colors.classic.line}" } },
          accent:     { value: "{colors.brand}" },
          accentSoft: { value: "{colors.brandSoft}" },
          accentText: { value: { base: "{colors.brandInk}", _classic: "{colors.brand}" } },
          accentFg:   { value: { base: "{colors.ink}", _classic: "#FFFFFF" } },
        },

        fonts: {
          display: { value: { base: "'Schibsted Grotesk', sans-serif", _classic: "'Archivo Black', sans-serif" } },
          heading: { value: { base: "'Schibsted Grotesk', sans-serif", _classic: "'IBM Plex Mono', monospace" } },
          body:    { value: { base: "'Schibsted Grotesk', sans-serif", _classic: "'IBM Plex Mono', monospace" } },
          mono:    { value: { base: "'Geist Mono', ui-monospace, monospace", _classic: "'IBM Plex Mono', monospace" } },
        },
      },

      textStyles: {
        giant: {
          value: { fontFamily: "display", fontWeight: "800", fontSize: "clamp(4.4rem, 19vw, 9.75rem)", lineHeight: "0.84", letterSpacing: "-0.05em" },
        },
        h1: {
          value: { fontFamily: "display", fontWeight: "800", fontSize: "clamp(2.5rem, 6.6vw, 4.6rem)", lineHeight: "0.98", letterSpacing: "-0.04em" },
        },
        h2: {
          value: { fontFamily: "heading", fontWeight: "700", fontSize: "1.75rem", lineHeight: "1.15", letterSpacing: "-0.025em" },
        },
        h3: {
          value: { fontFamily: "heading", fontWeight: "700", fontSize: "1.375rem", lineHeight: "1.15", letterSpacing: "-0.02em" },
        },
        lead: {
          value: { fontFamily: "body", fontWeight: "500", fontSize: "clamp(1.3rem, 2.6vw, 1.875rem)", lineHeight: "1.25", letterSpacing: "-0.02em" },
        },
        body: {
          value: { fontFamily: "body", fontWeight: "400", fontSize: "1.0625rem", lineHeight: "1.7" },
        },
        small: {
          value: { fontFamily: "body", fontWeight: "400", fontSize: "0.97rem", lineHeight: "1.45" },
        },
        nav: {
          value: { fontFamily: "heading", fontWeight: "600", fontSize: "0.9375rem", lineHeight: "1" },
        },
        label: {
          value: { fontFamily: "mono", fontWeight: "500", fontSize: "0.78rem", lineHeight: "1" },
        },
        eyebrow: {
          value: { fontFamily: "mono", fontWeight: "500", fontSize: "0.75rem", lineHeight: "1", letterSpacing: "0.08em", textTransform: "uppercase" },
        },
        code: {
          value: { fontFamily: "mono", fontWeight: "400", fontSize: "0.84rem", lineHeight: "1.7" },
        },

        classic: {
          body: {
            value: { fontFamily: "body", fontWeight: "400", fontSize: "1.1rem", lineHeight: "1.55" },
          },
          label: {
            value: { fontFamily: "mono", fontSize: "0.85rem", fontWeight: "500", letterSpacing: "0.02em" },
          },
          eyebrow: {
            value: { fontFamily: "mono", fontSize: "0.82rem", fontWeight: "400", letterSpacing: "0.14em", textTransform: "uppercase" },
          },
        },
      },
    },
  },

  outdir: "styled-system",
});
