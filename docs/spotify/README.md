# Spotify "now playing"

The Spotify pill in the home hero shows what is playing right now, or the last track played.

## How it works

- The site is static, but `wrangler.jsonc` also deploys a small Worker ([`worker/index.ts`](../../worker/index.ts)). It only handles `/api/*`; everything else is served from `dist/`.
- `GET /api/now-playing` refreshes a Spotify access token, asks for the currently playing track and falls back to the last played one. It returns:

```json
{ "playing": true, "title": "…", "artist": "…", "url": "https://open.spotify.com/track/…", "image": "https://i.scdn.co/…" }
```

  `null` when Spotify has no history, `502 { "error": "spotify unavailable" }` when the call fails.
- The response is cached **15 s at the edge** (`s-maxage=15`) and never in the browser (`max-age=0`), so every visitor sees the same track.
- The pill shows a skeleton until the first answer of the API. The script in `Hero.astro` fetches it on load, every 30 s while the tab is visible, and when the tab becomes visible again. If the first call fails or takes more than 5 s, the pill shows the static fallback (`lastPlayed` in `src/data/site.ts`) instead. Without JavaScript, the fallback is shown directly.
- In `npm run dev` there is no Worker: the request fails and the fallback is shown.

## Setup

### 1. Create a Spotify app

On the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard), create an app:

| Field | Value |
| :--- | :--- |
| App name | anything, e.g. `s1m0n3rdx` |
| App description | e.g. `Now playing widget for my portfolio` |
| Website | the site URL |
| Redirect URIs | `http://127.0.0.1:8888/callback` (Spotify rejects `localhost`) |
| APIs | **Web API** only |

The app can stay in development mode: you are its only user. Copy the **Client ID** and **Client secret** from the app settings.

### 2. Get a refresh token

Create `.dev.vars` at the root of the repo (it is gitignored):

```
SPOTIFY_CLIENT_ID=...
SPOTIFY_CLIENT_SECRET=...
```

Then run, from the root of the repo:

```bash
node docs/spotify/get-refresh-token.mjs
```

It opens the Spotify authorization page, catches the redirect on `127.0.0.1:8888` and appends `SPOTIFY_REFRESH_TOKEN` to `.dev.vars`. The token is never printed. Requested scopes are read-only: `user-read-currently-playing` and `user-read-recently-played`.

The refresh token does not expire unless you revoke the app's access in your Spotify account. If that happens, run the script again.

### 3. Add the secrets to Cloudflare

The three values are read by the Worker **at runtime**, not at build time:

- Dashboard: Workers & Pages → the Worker → Settings → **Runtime variables and secrets** → Add, type **Secret**.
- Or CLI: `npx wrangler secret put SPOTIFY_CLIENT_ID` (same for `SPOTIFY_CLIENT_SECRET` and `SPOTIFY_REFRESH_TOKEN`).

Do not put them in **Build variables and secrets**: the Worker would not see them. Use type **Secret**, not text: text variables are overwritten by every `wrangler deploy`. Secrets apply immediately, no rebuild needed.

## Test locally

```bash
npm run build
npx wrangler dev
```

`wrangler dev` reads `.dev.vars`. Open <http://localhost:8787/api/now-playing> for the raw response and <http://localhost:8787> for the pill.

## Troubleshooting

| Symptom | Cause |
| :--- | :--- |
| `/api/now-playing` returns `502` | A secret is missing or wrong. Check `npx wrangler secret list`, then `npx wrangler tail` while reloading the endpoint: `token: 400/401` means bad credentials or refresh token. |
| The pill shows an old track for a while | Up to 15 s of edge cache, plus up to 30 s until the next refresh. |
| The pill shows the previous track, not the current one | Spotify did not report a current track (private session, local file, podcast). The fallback is the history, and Spotify only adds a track there once it has finished. |
| "Variables cannot be added to a Worker that only has static assets" in the dashboard | The dashboard is showing a version deployed before `main` was added to `wrangler.jsonc`. Reload the page or use `wrangler secret put`. |
