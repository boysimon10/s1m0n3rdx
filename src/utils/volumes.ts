import { getCollection, type CollectionEntry } from "astro:content";
import type { Lang } from "../i18n";

export type Volume = {
  post: CollectionEntry<"articles">;
  num: string;
  minutes: number;
  soon: boolean;
};

const WORDS_PER_MINUTE = 200;

export function readingMinutes(body = ""): number {
  const text = body.replace(/^import .*$/gm, "").replace(/<[^>]+>/g, " ").replace(/[#*_`>[\]()!-]/g, " ");
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

export async function getVolumes(lang: Lang): Promise<Volume[]> {
  const posts = (await getCollection("articles", ({ id, data }) => !data.draft && id.startsWith(`${lang}/`))).sort(
    (a, b) => a.data.date.getTime() - b.data.date.getTime(),
  );
  return posts
    .map((post, i) => ({ post, num: String(i + 1).padStart(2, "0"), minutes: readingMinutes(post.body), soon: post.data.soon }))
    .reverse();
}
