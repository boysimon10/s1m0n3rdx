# Design System - s1m0n3rdx

Brutalist/editorial style. Signature orange on off-white background, all IBM Plex Mono except display moments (Archivo Black).

---

## Icons

Three sources depending on the icon type. All resolved via `getIconSvg()` in `src/utils/icons.ts`.

### General UI - Iconoir
npm package `iconoir` - stroke 1.5, consistent linear style. Imported via `?raw`.

```astro
import IconRss from "iconoir/icons/regular/rss-feed.svg?raw";
<span set:html={IconRss} />
```

Iconoir SVGs use `currentColor` natively - color follows the CSS parent.

### Tech logos - developer-icons
Colored stack logos (React, Go, TypeScript, etc.)

```ts
getIconSvg("TypeScript", "dev", 16)
```

### Brand logos - simple-icons
Brand icons (GitHub, Twitch, Gmail, etc.) SI icons use the official brand hex color by default.

```ts
getIconSvg("siGithub", "si", 16)
```

### Article tag icons
Resolved via `resolveTagIcon(tag, tagIcons?)` - checks article frontmatter first, then the global `tagIconMap` in `src/utils/tagIcons.ts`.

Per-article override via MDX frontmatter:
```yaml
tagIcons:
  CLI: { icon: "siGnubash", iconSource: "si" }
```

---

## Colors

### Raw tokens
| Token | Value | Usage |
|---|---|---|
| `brand` | `#EC9B5A` | Signature orange accent |
| `brandDeep` | `#C9762F` | Hover / accent gradient |
| `ink` | `#0B0B10` | Text black |
| `paper` | `#EDEDE9` | Off-white background |
| `card` | `#FFFFFF` | Card surface |
| `line` | `#DCDCD6` | Separators, thin borders |
| `muted` | `#6A6A73` | Secondary text |

### Semantic tokens (use these in components)
| Token | Points to | Role |
|---|---|---|
| `bg` | `paper` | Page background |
| `surface` | `card` | Card background |
| `text` | `ink` | Primary text |
| `textMuted` | `muted` | Secondary text |
| `border` | `line` | Borders |
| `accent` | `brand` | Accent color |
| `accentFg` | `#FFFFFF` | Text on accent background |

---

## Typography

### Fonts
| Token | Font | Usage |
|---|---|---|
| `display` | Archivo Black | Hero title, nav links |
| `heading` | IBM Plex Mono 600 | Section titles, project names |
| `body` | IBM Plex Mono 400 | Body text |
| `mono` | IBM Plex Mono 500 | Labels, dates, tags, eyebrows |

### PandaCSS text styles
| Style | Font | Size | Usage |
|---|---|---|---|
| `giant` | display | `clamp(3.2rem, 11vw, 8.6rem)` | Hero title |
| `heading` | heading | `1.75rem` | Section h2 titles |
| `body` | body | `1.1rem` | Paragraphs |
| `label` | mono | `0.85rem` | Dates, tags, meta |
| `eyebrow` | mono | `0.82rem` | Uppercase section labels |

---

## Spacing & Layout

| Variable | Value | Usage |
|---|---|---|
| `sizes.container` | `820px` | `maxW: "container"` - centered global wrapper |
| global `px` | `clamp(14px, 4vw, 40px)` | Responsive horizontal padding |
| `radii.sm` | `12px` | Small rounded elements |
| `radii.md` | `20px` | Panels, wide buttons |
| `radii.pill` | `999px` | Pills, round buttons |

### Borders
Always use side-specific properties to avoid CSS shorthand reset:
```astro
borderBottom: "1px solid", borderBottomColor: "border"  // ok
borderBottom: "1px solid", borderColor: "border"        // bug - shorthand overrides
```

---

## UI Patterns

### Eyebrow
Section label. Mono uppercase, wide letter-spacing, muted color.
```
textStyle: "eyebrow" | color: "textMuted"
```

### Tech tag
Icon + text label, inline-flex, gap 1. Resolve icon via `resolveTagIcon`.
```
display: inline-flex | alignItems: center | gap: 1
textStyle: "label" | color: "textMuted"
```

### Header nav link
Archivo Black, `1.1rem`, `fontWeight: 700`. Active state: `borderBottom: 2px solid`.

### Pill button
`rounded: pill | bg: text | color: bg | px: 5 | py: 2`
Inline SVG icon + label + accent arrow.

### Section separator
`borderBottom: "1px solid" | borderBottomColor: "border"` on the section.
Don't double up: if a section has `borderBottom`, the next one skips `borderTop`.

### void() in blog
Void entries with `showInBlog: true` appear in the `/blog` feed sorted by date.
Differentiated rendering: title in `fontFamily: mono`, `void()` label below, no tags.
