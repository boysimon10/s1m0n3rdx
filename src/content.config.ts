import { defineCollection } from "astro:content";
import { z } from "zod";
import { glob } from "astro/loaders";

const articles = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/articles" }),
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    // 1200×630 link preview, falls back to public/og.png
    ogImage: image().optional(),
    tags: z.array(z.string()).default([]),
    tagIcons: z.record(z.string(), z.object({
      icon: z.string(),
      iconSource: z.enum(["dev", "si"]),
    })).optional(),
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
    showInBlog: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  loader: glob({
    pattern: "*/index.md",
    base: "./src/content/projects",
    generateId: ({ entry }) => entry.split("/")[0],
  }),
  schema: ({ image }) =>
    z
      .object({
        name: z.string(),
        order: z.number(),
        year: z.string(),
        desc: z.string(),
        desc_fr: z.string().optional(),
        tags: z
          .array(z.object({ label: z.string(), icon: z.string(), iconSource: z.enum(["dev", "si"]).default("dev") }))
          .default([]),
        // true → the row opens /projects/[slug]; false → it opens href directly
        page: z.boolean().default(false),
        href: z.url().optional(),
        repo: z.url().optional(),
        confidential: z.boolean().default(false),
        role: z.string().optional(),
        role_fr: z.string().optional(),
        context: z.string().optional(),
        context_fr: z.string().optional(),
        intro: z.string().optional(),
        intro_fr: z.string().optional(),
        details: z.string().optional(),
        details_fr: z.string().optional(),
        screens: z
          .array(z.object({ src: image(), caption: z.string(), caption_fr: z.string().optional() }))
          .default([]),
        draft: z.boolean().default(false),
      })
      .refine((p) => p.page || p.href, { message: "a project needs `page: true` or an `href`" }),
});

export const collections = { articles, void: voidCollection, projects };
