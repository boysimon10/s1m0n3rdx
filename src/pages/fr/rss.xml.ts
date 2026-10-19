import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIContext } from "astro";
import { site } from "../../data/site";
import { getSlugFromId } from "../../i18n";
import { underConstruction } from "../../utils/construction";

export async function GET(context: APIContext) {
  if (!context.site) throw new Error("SITE_URL is not configured");

  const posts = (
    await getCollection("articles", ({ id, data }) => !data.draft && id.startsWith("fr/"))
  ).sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
  const items = underConstruction ? [] : posts;

  return rss({
    title: site.name,
    description: site.bio_fr,
    site: context.site,
    items: items.map(post => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/fr/blog/${getSlugFromId(post.id)}`,
    })),
  });
}
