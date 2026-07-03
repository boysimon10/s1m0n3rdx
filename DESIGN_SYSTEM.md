# Design System - s1m0n3rdx

Style brutaliste/éditorial. Orange signature sur fond blanc cassé, tout en IBM Plex Mono sauf les moments display (Archivo Black).

---

## Couleurs

### Tokens bruts
| Token | Valeur | Usage |
|---|---|---|
| `brand` | `#EC9B5A` | Accent orange signature |
| `brandDeep` | `#C9762F` | Hover / dégradé accent |
| `brandSoft` | `#FBEBDA` | Fond teinté accent (badges, tints) |
| `ink` | `#0B0B10` | Noir texte + cartes sombres |
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
| `accentTint` | `brandSoft` | Fond teinté léger |

---

## Typographie

### Polices
| Token | Police | Usage |
|---|---|---|
| `display` | Archivo Black | Giant text hero, footer statement |
| `heading` | IBM Plex Mono 600 | Titres de section, noms |
| `body` | IBM Plex Mono 400 | Corps de texte |
| `mono` | IBM Plex Mono 500 | Labels, dates, badges, tags |

### Text styles PandaCSS
| Style | Police | Taille | Usage |
|---|---|---|---|
| `giant` | display | `clamp(3.2rem, 11vw, 8.6rem)` | Hero title, footer CTA |
| `heading` | heading | `1.5rem` | Titres h2 section |
| `body` | body | `0.95rem` | Paragraphes |
| `label` | mono | `0.72rem` | Dates, badges, meta |
| `eyebrow` | mono | `0.7rem` | Labels de section uppercase |

---

## Espacements & Layout

| Variable | Valeur | Usage |
|---|---|---|
| `maxW` | `1140px` | Wrapper global `.wrap` |
| `gap` | `22px` | Gap standard grilles |
| `radii.sm` | `12px` | Tags, chips, petits éléments |
| `radii.md` | `20px` | Cartes, panels |
| `radii.pill` | `999px` | Pills, boutons ronds |

---

## Patterns UI

### Pill / Tag
Trois variantes :
- **outline** - border ink, fond transparent
- **solid** - fond accent, texte blanc
- **ink** - fond ink, texte blanc

```
fontFamily: mono | fontSize: 0.72rem | fontWeight: 500
padding: 5px 11px | border-radius: pill | border: 1.5px
```

### Eyebrow
Label de section. Mono uppercase, letter-spacing large, couleur muted.
```
fontFamily: mono | fontSize: 0.7rem | letterSpacing: 0.14em | uppercase | color: textMuted
```

### Chev (bouton circulaire)
Bouton rond 30–34px, border line, fond surface. Hover → accentTint.

### Carte `.card`
`bg: surface | border: 1px solid border | rounded: md | padding: 22px`

### Carte dark `.card.dark`
`bg: ink | color: white | border: ink`

### Hero panel
Grande carte accent (`bg: accent`), rounded md, min-height 430px.
- Top : ligne de commande terminal (mono, opacity 0.9)
- Middle : `.giant` text right-aligned
- Bottom : année (display, bg white, color accent) + localisation

### Touch links (contact)
Grille 3 colonnes, cartes min-height 104px, rounded sm.
- `.t-ink` - bg ink, texte blanc
- `.t-accent` - bg accent, texte blanc  
- `.t-out` - bg surface, border ink

### Item (experience / education)
Carte blanche avec dot accent top-right, date badge (accentTint + accent), org en mono muted, titre en heading.
Variante `.dark` : bg ink, tout en blanc.

### Stack logos
Fond ink, chips 40×40px rounded 11px, chaque chip coloré selon la techno.

### Project card
`bg: surface | border | rounded: md | overflow: hidden`
Thumbnail aspect-ratio 16/10 (couleur pleine ou gradient).
Body : titre + description + tags + lien accent.

---

## Structure de page

```
topbar          - sticky top, logo + nav links + icons
hero            - grid 2 col (0.85fr / 1.6fr)
  hero-left     - arrow SVG + hashtag rows
  hero-panel    - orange card
seemore         - border row + chevron
secnav          - sticky nav secondaire
section#about   - grid 2 col (photo dark card / intro + contacts)
section#resume  - grid 3 col (experience / stack / education)
section#work    - grid 3 col (project cards)
footer          - giant statement + CTA email
```
