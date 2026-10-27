import type { APIRoute } from "astro";
import { underConstruction } from "../utils/construction";

export const GET: APIRoute = ({ site }) => {
  const lines = ["User-agent: *", underConstruction ? "Disallow: /" : "Allow: /"];
  if (!underConstruction && site) lines.push("", `Sitemap: ${new URL("sitemap-index.xml", site).href}`);
  return new Response(lines.join("\n") + "\n", { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
