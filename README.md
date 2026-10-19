# s1m0n3rdx

Personal blogfolio. Astro 7, PandaCSS, TypeScript strict, bilingual EN/FR.

## Stack

- **Framework** - Astro 7
- **Style** - PandaCSS
- **Content** - MDX + Content Collections
- **Icons** - Iconoir / developer-icons / simple-icons
- **i18n** - Built-in Astro i18n (EN/FR)
- **RSS** - @astrojs/rss
- **Linting** - ESLint + Prettier
- **Type checking** - TypeScript strict

## Commands

| Command | Action |
| :--- | :--- |
| `npm install` | Install dependencies |
| `npm run dev` | Dev server at `localhost:4321` |
| `npm run build` | Production build |
| `npm run preview` | Preview build |
| `npm run lint` | ESLint |
| `npm run format` | Prettier |
| `npm run typecheck` | Astro check |

## Environment variables

Copy `.env.example` to `.env` and fill in your values.

| Variable | Required | Description |
| :--- | :--- | :--- |
| `SITE_URL` | Yes | Your site's base URL (e.g. `https://your-domain.com`) |
| `UNDER_CONSTRUCTION` | No | Set to `true` to replace every page with an "under construction" page (modern theme, `noindex`, empty RSS, no sitemap). Read at build time: redeploy after changing it. |

## License

The code is released under the [MIT](./LICENSE) license.

The content is not: articles, void entries, project write-ups, photos and images
(`src/content/`, `src/assets/`, `public/`) are © Simon Diouf, all rights reserved.

## Inspirations

### Modern theme

- [romainlanz.com](https://romainlanz.com/) - Romain Lanz

### Classic theme

- [sleek-portfolio](https://github.com/ramxcodes/sleek-portfolio) - ramxcodes
- [blog](https://github.com/Christopher2K/blog) - Christopher2K
- [puang](https://github.com/puang59/puang) - puang59
