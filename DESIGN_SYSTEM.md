# Design System - s1m0n3rdx

Style brutaliste/éditorial. Orange signature sur fond blanc cassé, tout en IBM Plex Mono sauf les moments display (Archivo Black).

---

## Icônes

### UI generales
Source : [Iconoir](https://iconoir.com) - stroke 1.5, style linéaire cohérent.

SVG téléchargés manuellement dans `src/assets/icons/`, importés en `?raw` dans les composants Astro.

```astro
import IconGithub from "../../assets/icons/github.svg?raw";
<span set:html={IconGithub} />
```

Toujours remplacer `stroke="#000000"` par `stroke="currentColor"` pour que l'icône hérite la couleur du parent.

### Logos technos
Source : [developer-icons](https://github.com/xandemon/developer-icons) - logos des stacks (React, Go, NestJS, GraphQL, etc.)

Utilisé via `renderToStaticMarkup` dans le frontmatter Astro - pas de `@astrojs/react` nécessaire.

```astro
---
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Go } from "developer-icons";

const goSvg = renderToStaticMarkup(createElement(Go, { size: 16 }));
---
<span set:html={goSvg} />
```

---

## Couleurs

### Tokens bruts
| Token | Valeur | Usage |
|---|---|---|
| `brand` | `#EC9B5A` | Accent orange signature |
| `brandDeep` | `#C9762F` | Hover / dégradé accent |
| `ink` | `#0B0B10` | Noir texte |
| `paper` | `#EDEDE9` | Fond général blanc cassé |
| `card` | `#FFFFFF` | Surface carte |
| `line` | `#DCDCD6` | Séparateurs, borders fins |
| `muted` | `#6A6A73` | Texte secondaire |

### Tokens sémantiques (à utiliser dans les composants)
| Token | Pointe vers | Rôle |
|---|---|---|
| `bg` | `paper` | Fond page |
| `surface` | `card` | Fond carte |
| `text` | `ink` | Texte principal |
| `textMuted` | `muted` | Texte secondaire |
| `border` | `line` | Borders |
| `accent` | `brand` | Couleur accent |
| `accentFg` | `#FFFFFF` | Texte sur fond accent |

---

## Typographie

### Polices
| Token | Police | Usage |
|---|---|---|
| `display` | Archivo Black | Hero title, nav links |
| `heading` | IBM Plex Mono 600 | Titres de section, noms projets |
| `body` | IBM Plex Mono 400 | Corps de texte |
| `mono` | IBM Plex Mono 500 | Labels, dates, tags, eyebrows |

### Text styles PandaCSS
| Style | Police | Taille | Usage |
|---|---|---|---|
| `giant` | display | `clamp(3.2rem, 11vw, 8.6rem)` | Hero title |
| `heading` | heading | `1.75rem` | Titres h2 section |
| `body` | body | `1.1rem` | Paragraphes |
| `label` | mono | `0.85rem` | Dates, tags, meta |
| `eyebrow` | mono | `0.82rem` | Labels de section uppercase |

---

## Espacements & Layout

| Variable | Valeur | Usage |
|---|---|---|
| `sizes.container` | `820px` | `maxW: "container"` - wrapper global centré |
| `px` global | `clamp(14px, 4vw, 40px)` | Padding horizontal responsive |
| `radii.sm` | `12px` | Petits éléments arrondis |
| `radii.md` | `20px` | Panneaux, boutons larges |
| `radii.pill` | `999px` | Pills, boutons ronds |

### Borders
Toujours utiliser les propriétés côté-spécifiques pour éviter le reset CSS shorthand :
```astro
borderBottom: "1px solid", borderBottomColor: "border"  // ok
borderBottom: "1px solid", borderColor: "border"        // bug - shorthand écrase
```

---

## Patterns UI

### Eyebrow
Label de section. Mono uppercase, letter-spacing large, couleur muted.
```
textStyle: "eyebrow" | color: "textMuted"
```

### Tag techno
Icone developer-icons + label texte, inline-flex, gap 1.
```
display: inline-flex | alignItems: center | gap: 1
textStyle: "label" | color: "textMuted"
```

### Lien nav header
Archivo Black, `1.1rem`, `fontWeight: 700`. Active state : `borderBottom: 2px solid`.

### Bouton pill (GitHub hero)
`rounded: pill | bg: text | color: bg | px: 5 | py: 2`
Icone SVG inline + label + flèche accent.

### Séparateur de section
`borderBottom: "1px solid" | borderBottomColor: "border"` sur la section.
Ne pas doubler : si une section a `borderBottom`, la suivante ne met pas `borderTop`.

---

## Structure de page

```
Header (centré)
  avatar (GitHub)
  nav - Blog / Projects / About + icone RSS
  lang switcher - EN / FR

index.astro
  Hero     - eyebrow + h1 giant + bouton GitHub
  Projects - liste avec num accent, nom, desc, tags technos
  Articles - liste avec titre et date

Footer (centré, maxW: container)
  copyright + lien RSS
```

### Hiérarchie des layouts
- `Base.astro` - shell HTML, SEO, fonts, ViewTransitions
- `Page.astro` - Header + `<slot />` + Footer
- `index.astro` - `px` responsive + `maxW: container` wrappant les sections
