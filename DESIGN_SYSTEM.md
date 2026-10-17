# Design System - s1m0n3rdx

Two themes share one set of semantic tokens:

- **Modern** (default) - warm beige paper, bordered cards, pill shapes, signature orange and diamond markers. Schibsted Grotesk + Geist Mono.
- **Classic** - brutalist/editorial, off-white background, hairline separators, IBM Plex Mono everywhere except display moments in Archivo Black.

Semantic tokens hold the modern values by default and switch to the classic values under `data-theme="classic"`. Components always use semantic tokens, never raw ones.

---

## Colors

### Raw tokens

| Token | Value | Usage |
|---|---|---|
| `brand` | `#EC9B5A` | Signature orange - accents, highlights, diamonds |
| `brandSoft` | `#F7E1CB` | Card hover background |
| `brandInk` | `#A0541A` | Orange readable as text (links, company names) |
| `brandDeep` | `#C9762F` | Deep orange |
| `paper` | `#EEEADB` | Modern page background |
| `cream` | `#FAF8F1` | Modern card surface |
| `sand` | `#E3DCC8` | Modern secondary surface |
| `ink` | `#141310` | Modern text and borders |
| `muted` | `#5C584C` | Modern secondary text |
| `faint` | `#A39D8B` | Modern tertiary text |
| `line` | `#CBC3AC` | Modern hairlines |
| `classic.paper` | `#EDEDE9` | Classic page background |
| `classic.card` | `#FFFFFF` | Classic surface |
| `classic.ink` | `#0B0B10` | Classic text |
| `classic.line` | `#DCDCD6` | Classic separators |
| `classic.muted` | `#6A6A73` | Classic secondary text |

### Code tokens (modern)

| Token | Value | Usage |
|---|---|---|
| `code.bg` | `#1B1A16` | Code block / code-like card background |
| `code.border` | `#3A382F` | Code block inner separators |
| `code.text` | `#EEEADB` | Code text |
| `code.muted` | `#CFC9B6` | Secondary code text |
| `code.keyword` | `#EC9B5A` | Keywords |
| `code.fn` | `#A8D5C2` | Functions |
| `code.type` | `#FF8E66` | Types, literals |
| `code.comment` | `#8E897B` | Comments |

### Semantic tokens

| Token | Modern | Classic | Role |
|---|---|---|---|
| `bg` | `paper` | `classic.paper` | Page background |
| `surface` | `cream` | `classic.card` | Card background |
| `surfaceAlt` | `sand` | `classic.card` | Secondary card, asides, meta panels |
| `text` | `ink` | `classic.ink` | Primary text, dark fills |
| `textMuted` | `muted` | `classic.muted` | Secondary text |
| `textFaint` | `faint` | `classic.muted` | Tertiary text, discreet links |
| `inverse` | `paper` | `classic.paper` | Text on dark fills |
| `border` | `ink` | `classic.line` | Card and pill borders (modern), separators (classic) |
| `hairline` | `line` | `classic.line` | Thin dividers inside cards |
| `accent` | `brand` | `brand` | Accent fills, diamonds, active states |
| `accentSoft` | `brandSoft` | `brandSoft` | Hover background |
| `accentText` | `brandInk` | `brand` | Orange text |
| `accentFg` | `ink` | `#FFFFFF` | Text on accent background |

Text selection: `accent` background, `text` color.

---

## Typography

### Fonts

| Token | Modern | Classic |
|---|---|---|
| `display` | Schibsted Grotesk | Archivo Black |
| `heading` | Schibsted Grotesk | IBM Plex Mono |
| `body` | Schibsted Grotesk | IBM Plex Mono |
| `mono` | Geist Mono | IBM Plex Mono |

### Text styles - modern

| Style | Font | Weight | Size | Line height | Usage |
|---|---|---|---|---|---|
| `giant` | display | 800 | `clamp(4.4rem, 19vw, 9.75rem)` | 0.84 | Oversized display text |
| `h1` | display | 800 | `clamp(2.5rem, 6.6vw, 4.6rem)` | 0.98 | Page and hero titles |
| `h2` | heading | 700 | `1.75rem` | 1.15 | Section titles |
| `h3` | heading | 700 | `1.375rem` | 1.15 | Card titles, project names |
| `lead` | body | 500 | `clamp(1.3rem, 2.6vw, 1.875rem)` | 1.25 | Bio, intro statements |
| `body` | body | 400 | `1.0625rem` | 1.7 | Paragraphs |
| `small` | body | 400 | `0.97rem` | 1.45 | Descriptions |
| `nav` | heading | 600 | `0.9375rem` | 1 | Navigation, buttons |
| `label` | mono | 500 | `0.78rem` | 1 | Dates, meta |
| `eyebrow` | mono | 500 | `0.75rem` | 1 | Uppercase card labels (`0.08em` tracking) |
| `code` | mono | 400 | `0.84rem` | 1.7 | Code |

Headings use negative tracking (`-0.02em` to `-0.05em`). Pills, tags, dates and badges are always mono.

### Text styles - classic

| Style | Font | Size | Usage |
|---|---|---|---|
| `classic.body` | body | `1.1rem` | Paragraphs |
| `classic.label` | mono 500 | `0.85rem` | Dates, tags, meta |
| `classic.eyebrow` | mono 400 | `0.82rem` | Uppercase section labels (`0.14em` tracking) |

Classic base font size is `18px`.

---

## Layout & spacing

| Token / rule | Modern | Classic |
|---|---|---|
| Container | `container` - `1180px` | `classic` - `820px` |
| Article column | `prose` - `720px` | full container |
| Page padding | `clamp(16px, 4vw, 48px)` | `clamp(14px, 4vw, 40px)` |
| Header / content / footer gap | `clamp(28px, 4vw, 48px)` | - |
| Gap between home sections | `clamp(32px, 4vw, 48px)` | sections separated by a rule |
| Section header to content | `20px` | `32px` |
| Card grid gap | `16px` | - |
| Card padding | `clamp(18px, 2.6vw, 28px)` (lists), `22px` (post cards), `clamp(20px, 3vw, 32px)` (hero, bio) | - |

Spacing scale: Panda default (4px steps).

### Radii

| Token | Value | Usage |
|---|---|---|
| `xs` | `6px` | Inline code |
| `sm` | `10px` | Small tabs |
| `md` | `18px` | Screenshot frames, code blocks |
| `lg` | `22px` | Cards, footer |
| `pill` | `999px` | Pills, buttons, nav, tags |

### Borders

| Token | Value | Usage |
|---|---|---|
| `base` | `1.5px` | Cards, pills, buttons, section rules (modern) |
| `thin` | `1px` | Tags, hairline dividers |

- Modern: borders are `border` (ink). Dividers inside cards use `hairline`.
- Dashed borders mark void elements.
- Classic: thin `1px` separators only. Always set side-specific border colors (`borderBottomColor`), never the `borderColor` shorthand after a side border.

---

## Icons

| Source | Usage | Style |
|---|---|---|
| Iconoir | UI icons (arrows, copy, RSS, mail, LinkedIn) | Linear, stroke 1.5, `currentColor` |
| developer-icons | Tech logos (React, Go, TypeScript...) | Original colors |
| simple-icons | Brand logos (GitHub, X, YouTube...) | Brand color; recolored to `text` inside modern social buttons. Spotify keeps its green. |

Sizes: 14px in tags, 15-17px in arrow buttons, 18px in nav, 22px in social buttons.

---

## Modern patterns

### Diamond
Square rotated 45deg, `accent` fill. Sizes 6 / 7 / 8 / 10 / 11px. On an `accent` background use the outlined variant (`1.5px` ink border). Used as bullet, label marker, separator and fallback tag icon.

### Card
`1.5px` ink border, radius `lg`, `surface` background. Variants:
- `surfaceAlt` - meta panels, asides
- `accent` - one highlight card per page (education)
- `code.bg` - code-like content
- dashed, transparent - void entries

Hover on clickable cards: `accentSoft` background, `0.15s` transition.

### Pill
Radius `pill`, mono 12-13px, line height 1. Variants:
- solid - `text` background, `inverse` text (role, active nav, primary links)
- outlined - `1.5px` ink border
- surface - outlined + `surface` background
- accent - `accent` background + ink border (active language, project number)
- badge - `text` background, `accent` text (`void()`, confidential)

### Section header
Outlined surface pill (diamond + label) - `1.5px` ink rule filling the row - optional "see all" link ending in a 36px `accent` arrow circle.

### Tag
`1px` ink border, pill, mono 12px, 14px icon. No icon: 7px diamond. Related items: dashed border, 11.5px, wrapped in `[ ]`.

### Arrow button
Circle with an Iconoir arrow:
- 32-40px, `text` fill, `inverse` icon - navigation (project rows, contact links, back link)
- 32-40px, `accent` fill - call to action inside a dark pill
- outlined - inside post cards

`arrow-up-right` = external link, `arrow-right` = internal page.

### Header
Desktop: one `surface` pill bar - avatar (44px, ink border) - rule - nav pills (active: `text` fill) + RSS circle - rule - theme switch (`1` / `2` circles, active filled) - language pill (active: `accent`).
Mobile: avatar + switches on the first row, nav as a full-width pill below.

### Footer
`text` background bar, radius `lg`, mono 12.5px `inverse` text, `accent` RSS pill.

### Hero
Intro card (`h1` + info pills) on top, then bio card (`lead`) next to the social card (52px outlined circles, hover `accent`).

### Project row
`accent` number column (mono 600 + outlined diamond) with an ink right border, then name (`h3`), confidential badge, description, tags, optional year and arrow button.

### Project detail
Title card (number, year, badge, display title) next to a `surfaceAlt` meta panel (role, context, stack separated by hairlines). Intro in `lead`-like 500 weight, details in muted body. Screenshots in frames: radius `md`, top bar with three dots, mono caption under a `1.5px` rule.

### Article body
- `h2` preceded by an 11px diamond
- Unordered lists: 8px diamond bullets
- Ordered lists: numbers in 28px `accent` circles with ink border
- Links: `accentText`, `1.5px` underline offset 3px, hover `accent` background
- Inline code: `surfaceAlt` background, `1px` border, radius `xs`
- Code blocks: `code.bg`, `1.5px` border, radius `md`, top bar with language label in `accent` and three dots
- Blockquote: ink rules top and bottom, large `accent` opening quote, italic 500
- `hr`: ink rule with a centered diamond

### Void
Code-like card (`code.bg`, mono, `void` keyword in `accent`), dashed entry cards, `void()` badge, discreet `// comments` in `textFaint`.

### 404
Oversized `surfaceAlt` numerals with a 2px ink stroke and an `accent` offset shadow.

---

## Classic patterns

### Eyebrow
Section label - `classic.eyebrow`, `textMuted`.

### Tech tag
Icon + text, inline-flex, gap 1, `classic.label`, `textMuted`.

### Header nav link
Archivo Black, `1.1rem`, weight 700. Active state: `2px` bottom border.

### Section separator
`1px` bottom border in `border` on the section. Don't double up: if a section has a bottom border, the next one has no top border.

### List row
Title in heading font, description in `classic.body` muted, meta (date, year) right-aligned in `classic.label`. Hover lowers opacity or mutes the text. Void entries: mono title with a faint `void()` label, no tags.

### Project detail
Back link in `classic.label` with an accent arrow, then number (accent), year and badge as labels, heading-font title, muted description. Meta rows use a fixed label column (role, context, stack). Screenshots are full width with a `1px` border, `12px` radius and a `classic.label` caption. Sections are separated by `1px` rules.
