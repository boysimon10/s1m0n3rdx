import type { IconSource } from "../utils/icons";

export type StackItem = {
  label: string;
  icon: string;
  iconSource: IconSource;
  related?: StackItem[];
};

export type StackCategory = {
  category: string;
  category_fr?: string;
  items: StackItem[];
};

export const stack: StackCategory[] = [
  {
    category: "languages",
    category_fr: "langages",
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
      {
        label: "React",
        icon: "React",
        iconSource: "dev",
        related: [
          { label: "TanStack Start", icon: "siTanstack", iconSource: "si" },
          { label: "Next.js", icon: "NextJs", iconSource: "dev" },
        ],
      },
      {
        label: "Vue.js",
        icon: "VueJs",
        iconSource: "dev",
        related: [
          { label: "Nuxt.js", icon: "NuxtJs", iconSource: "dev" },
        ],
      },
      { label: "Astro", icon: "Astro", iconSource: "dev" },
      { label: "Inertia.js", icon: "siInertia", iconSource: "si" },
      { label: "HTMX", icon: "siHtmx", iconSource: "si" },
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
    category_fr: "gestion d'état",
    items: [
      { label: "Zustand", icon: "", iconSource: "dev" },
      { label: "Redux", icon: "Redux", iconSource: "dev" },
      { label: "Pinia", icon: "Pinia", iconSource: "dev" },
    ],
  },
  {
    category: "frontend mobile",
    items: [
      {
        label: "React Native",
        icon: "React",
        iconSource: "dev",
        related: [
          { label: "Expo", icon: "siExpo", iconSource: "si" },
          { label: "Nativewind", icon: "TailwindCSS", iconSource: "dev" },
          { label: "Tamagui", icon: "", iconSource: "dev" },
        ],
      },
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
      {
        label: "Node.js",
        icon: "NodeJs",
        iconSource: "dev",
        related: [
          { label: "NestJS", icon: "NestJS", iconSource: "dev" },
          { label: "Express.js", icon: "siExpress", iconSource: "si" },
          { label: "AdonisJS", icon: "siAdonisjs", iconSource: "si" },
          { label: "tRPC", icon: "TRPC", iconSource: "dev" },
        ],
      },
      {
        label: "Go",
        icon: "Go",
        iconSource: "dev",
        related: [
          { label: "Go Fiber", icon: "Go", iconSource: "dev" },
          { label: "Gin", icon: "siGin", iconSource: "si" },
          { label: "Echo", icon: "Go", iconSource: "dev" },
          { label: "Chi", icon: "Go", iconSource: "dev" },
        ],
      },
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
    category_fr: "base de données",
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
      { label: "Traefik", icon: "siTraefikproxy", iconSource: "si" },
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
    category: "messaging",
    category_fr: "messagerie",
    items: [
      {
        label: "Redis",
        icon: "siRedis",
        iconSource: "si",
        related: [
          { label: "Caching", icon: "siRedis", iconSource: "si" },
          { label: "Rate Limiting", icon: "siRedis", iconSource: "si" },
          { label: "BullMQ", icon: "siRedis", iconSource: "si" },
        ],
      },
      { label: "RabbitMQ", icon: "siRabbitmq", iconSource: "si" },
    ],
  },
  {
    category: "iot",
    items: [
      { label: "Arduino", icon: "siArduino", iconSource: "si" },
      { label: "MQTT", icon: "siMqtt", iconSource: "si" },
      { label: "BLE", icon: "siBluetooth", iconSource: "si" },
    ],
  },
  {
    category: "ai / ml",
    category_fr: "ia / ml",
    items: [
      { label: "OpenAI", icon: "OpenAI", iconSource: "dev" },
      { label: "RAG", icon: "", iconSource: "dev" },
      { label: "LLM", icon: "", iconSource: "dev" },
    ],
  },
];
