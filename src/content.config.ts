import { defineCollection } from "astro:content";
import { z } from "zod";
import { glob } from "astro/loaders";

const articles = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/articles" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    translationKey: z.string().optional(),
  }),
});

const voidCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/void" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { articles, void: voidCollection };
