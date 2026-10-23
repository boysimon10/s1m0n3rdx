// One-time helper: gets a Spotify refresh token and appends it to .dev.vars.
// Run from the repo root: node docs/spotify/get-refresh-token.mjs
import http from "node:http";
import fs from "node:fs";
import { execFile } from "node:child_process";

const VARS = ".dev.vars";
const REDIRECT = "http://127.0.0.1:8888/callback";
const SCOPES = "user-read-currently-playing user-read-recently-played user-top-read";

const vars = Object.fromEntries(
  fs.readFileSync(VARS, "utf8").split("\n").filter((l) => l.includes("=")).map((l) => {
    const i = l.indexOf("=");
    return [l.slice(0, i).trim(), l.slice(i + 1).trim()];
  }),
);
const { SPOTIFY_CLIENT_ID: id, SPOTIFY_CLIENT_SECRET: secret } = vars;
if (!id || !secret) throw new Error("SPOTIFY_CLIENT_ID / SPOTIFY_CLIENT_SECRET missing in .dev.vars");

const authUrl = `https://accounts.spotify.com/authorize?${new URLSearchParams({
  client_id: id,
  response_type: "code",
  redirect_uri: REDIRECT,
  scope: SCOPES,
})}`;

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, REDIRECT);
  if (url.pathname !== "/callback") return res.end();
  const code = url.searchParams.get("code");
  if (!code) {
    res.end("Authorization refused or failed. You can close this tab.");
    return server.close();
  }
  const r = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${id}:${secret}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ grant_type: "authorization_code", code, redirect_uri: REDIRECT }),
  });
  const data = await r.json();
  if (!data.refresh_token) {
    res.end("Token exchange failed, see the terminal.");
    console.error(data);
    return server.close();
  }
  const content = fs.readFileSync(VARS, "utf8").replace(/^SPOTIFY_REFRESH_TOKEN=.*\n?/m, "");
  fs.writeFileSync(VARS, `${content.trimEnd()}\nSPOTIFY_REFRESH_TOKEN=${data.refresh_token}\n`);
  res.end("Done! Refresh token saved to .dev.vars. You can close this tab.");
  console.log("✓ SPOTIFY_REFRESH_TOKEN saved to .dev.vars");
  server.close();
});

server.listen(8888, "127.0.0.1", () => {
  console.log("Opening Spotify authorization in your browser…");
  execFile("open", [authUrl]);
});
