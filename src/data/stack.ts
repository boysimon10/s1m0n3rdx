import type { IconSource } from "../utils/icons";

export type StackItem = {
  label: string;
  icon: string;
  iconSource: IconSource;
};

export type StackCategory = {
  category: string;
  items: StackItem[];
};

export const stack: StackCategory[] = [
  {
    category: "languages",
    items: [
      { label: "TypeScript", icon: "TypeScript", iconSource: "dev" },
      { label: "Go", icon: "Go", iconSource: "dev" },
      { label: "Python", icon: "Python", iconSource: "dev" },
      { label: "PHP", icon: "PHP", iconSource: "dev" },
      { label: "Java", icon: "Java", iconSource: "dev" },
    ],
  },
  {
    category: "frontend web",
    items: [
      { label: "TanStack Start", icon: "siTanstack", iconSource: "si" },
      { label: "React", icon: "React", iconSource: "dev" },
      { label: "Next.js", icon: "NextJs", iconSource: "dev" },
      { label: "Vue.js", icon: "VueJs", iconSource: "dev" },
      { label: "Nuxt.js", icon: "NuxtJs", iconSource: "dev" },
      { label: "Astro", icon: "Astro", iconSource: "dev" },
    ],
  },
  {
    category: "design systems",
    items: [
      { label: "TailwindCSS", icon: "TailwindCSS", iconSource: "dev" },
      { label: "PandaCSS", icon: "", iconSource: "dev" },
    ],
  },
  {
    category: "state management",
    items: [
      { label: "Zustand", icon: "", iconSource: "dev" },
      { label: "Redux", icon: "Redux", iconSource: "dev" },
      { label: "Pinia", icon: "Pinia", iconSource: "dev" },
    ],
  },
  {
    category: "frontend mobile",
    items: [
      { label: "React Native", icon: "React", iconSource: "dev" },
      { label: "Expo", icon: "siExpo", iconSource: "si" },
      { label: "Nativewind", icon: "TailwindCSS", iconSource: "dev" },
      { label: "Tamagui", icon: "", iconSource: "dev" },
    ],
  },
  {
    category: "desktop",
    items: [
      { label: "Electron.js", icon: "Electron", iconSource: "dev" },
      { label: "Wails", icon: "siWails", iconSource: "si" },
    ],
  },
  {
    category: "backend",
    items: [
      { label: "Node.js", icon: "NodeJs", iconSource: "dev" },
      { label: "NestJS", icon: "NestJS", iconSource: "dev" },
      { label: "tRPC", icon: "TRPC", iconSource: "dev" },
      { label: "Express.js", icon: "JavaScript", iconSource: "dev" },
      { label: "Go Fiber", icon: "Go", iconSource: "dev" },
      { label: "Gin", icon: "Go", iconSource: "dev" },
      { label: "AdonisJS", icon: "siAdonisjs", iconSource: "si" },
      { label: "GraphQL", icon: "GraphQL", iconSource: "dev" },
      { label: "WebSockets", icon: "", iconSource: "dev" },
    ],
  },
  {
    category: "baas",
    items: [
      { label: "Firebase", icon: "Firebase", iconSource: "dev" },
      { label: "Supabase", icon: "Supabase", iconSource: "dev" },
    ],
  },
  {
    category: "database",
    items: [
      { label: "PostgreSQL", icon: "PostgreSQL", iconSource: "dev" },
      { label: "MongoDB", icon: "MongoDB", iconSource: "dev" },
      { label: "MySQL", icon: "MySQL", iconSource: "dev" },
    ],
  },
  {
    category: "orm",
    items: [
      { label: "Prisma", icon: "Prisma", iconSource: "dev" },
      { label: "Drizzle ORM", icon: "siDrizzle", iconSource: "si" },
      { label: "TypeORM", icon: "siTypeorm", iconSource: "si" },
      { label: "GORM", icon: "Go", iconSource: "dev" },
      { label: "LucidORM", icon: "", iconSource: "dev" },
    ],
  },
  {
    category: "devops",
    items: [
      { label: "Docker", icon: "Docker", iconSource: "dev" },
      { label: "GitHub Actions", icon: "siGithubactions", iconSource: "si" },
      { label: "Coolify", icon: "siCoolify", iconSource: "si" },
      { label: "Dokploy", icon: "", iconSource: "dev" },
      { label: "Traefik", icon: "", iconSource: "dev" },
      { label: "Nginx", icon: "siNginx", iconSource: "si" },
      { label: "Cloudflare", icon: "Cloudflare", iconSource: "dev" },
    ],
  },
  {
    category: "tests",
    items: [
      { label: "Jest", icon: "Jest", iconSource: "dev" },
      { label: "Cypress", icon: "Cypress", iconSource: "dev" },
      { label: "Postman", icon: "Postman", iconSource: "dev" },
      { label: "Insomnia", icon: "Insomnia", iconSource: "dev" },
    ],
  },
  {
    category: "ai / ml",
    items: [
      { label: "OpenAI", icon: "OpenAI", iconSource: "dev" },
      { label: "RAG", icon: "", iconSource: "dev" },
      { label: "LLM", icon: "", iconSource: "dev" },
    ],
  },
];
