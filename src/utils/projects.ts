import { getCollection, type CollectionEntry } from "astro:content";

export type ProjectEntry = CollectionEntry<"projects"> & { num: string };

export async function getProjects(): Promise<ProjectEntry[]> {
  const all = await getCollection("projects", ({ data }) => !data.draft);
  return all
    .sort((a, b) => a.data.order - b.data.order)
    .map((p, i) => ({ ...p, num: String(i + 1).padStart(2, "0") }));
}
