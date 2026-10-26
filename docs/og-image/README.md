# Link preview image

`public/og.png` (1200×630) is the Open Graph / Twitter image shown when a link to the site is shared (WhatsApp, LinkedIn, X, Discord…). Every page uses it.

## Regenerate it

1. Edit [`template.html`](./template.html): a manga wanted poster (avatar, DEAD OR ALIVE, 10,000 h bounty) next to the site name, the role and the domain, on a screentone background. The avatar comes from `src/assets/avatar.png`.
2. From the root of the repo, render it with headless Chrome:

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless=new --hide-scrollbars --force-device-scale-factor=1 \
  --allow-file-access-from-files --virtual-time-budget=5000 \
  --window-size=1200,630 \
  --screenshot=public/og.png \
  "file://$PWD/docs/og-image/template.html"
```

3. Check `public/og.png`, then deploy.

## Article images

An article can have its own preview image. Without one, it uses `public/og.png`.

1. Render [`article.html`](./article.html) (the avatar saying the title in a speech bubble) with the title (URL-encoded) and the volume number in the URL, into the article's assets folder:

```bash
mkdir -p src/assets/blog/<article>/og
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless=new --hide-scrollbars --force-device-scale-factor=1 \
  --allow-file-access-from-files --virtual-time-budget=5000 \
  --window-size=1200,630 \
  --screenshot=src/assets/blog/<article>/og/en.png \
  "file://$PWD/docs/og-image/article.html?title=My%20article%20title&vol=02"
```

2. Reference it in the article frontmatter, relative to the `.mdx` file:

```yaml
ogImage: ../../../assets/blog/<article>/og/en.png
```

One image per language (`og/en.png`, `og/fr.png`), since the titles differ. `vol` is the article's volume number on the manga blog (oldest article = `01`).

## Notes

- Keep the size at 1200×630: it's the format every platform expects for large previews.
- `--virtual-time-budget` gives Chrome time to load the Google Fonts and the avatar before taking the screenshot.
- Platforms cache previews. After deploying, use LinkedIn's [Post Inspector](https://www.linkedin.com/post-inspector/) or [opengraph.xyz](https://www.opengraph.xyz/) to check and refresh it.
