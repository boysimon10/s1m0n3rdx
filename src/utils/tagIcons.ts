import type { IconSource } from "./icons";

export type TagIconEntry = { icon: string; iconSource: IconSource };

export const tagIconMap: Record<string, { icon: string; iconSource: IconSource }> = {
  // Languages
  "Go":           { icon: "Go",          iconSource: "dev" },
  "TypeScript":   { icon: "TypeScript",  iconSource: "dev" },
  "JavaScript":   { icon: "JavaScript",  iconSource: "dev" },
  "Python":       { icon: "Python",      iconSource: "dev" },
  "Rust":         { icon: "Rust",        iconSource: "dev" },
  "Kotlin":       { icon: "Kotlin",      iconSource: "dev" },
  "Swift":        { icon: "Swift",       iconSource: "dev" },
  "Dart":         { icon: "Dart",        iconSource: "dev" },
  "Java":         { icon: "Java",        iconSource: "dev" },
  "PHP":          { icon: "PHP",         iconSource: "dev" },
  "C":            { icon: "C",           iconSource: "dev" },
  "C++":          { icon: "CPlusPlus",   iconSource: "dev" },
  "Elixir":       { icon: "Elixir",      iconSource: "dev" },
  "Haskell":      { icon: "Haskell",     iconSource: "dev" },
  "Scala":        { icon: "Scala",       iconSource: "dev" },
  "Zig":          { icon: "siZig",       iconSource: "si"  },

  // Frontend
  "React":        { icon: "React",       iconSource: "dev" },
  "React Native": { icon: "React",       iconSource: "dev" },
  "Next.js":      { icon: "NextJs",      iconSource: "dev" },
  "Vue":          { icon: "VueJs",       iconSource: "dev" },
  "Svelte":       { icon: "siSvelte",    iconSource: "si"  },
  "Angular":      { icon: "Angular",     iconSource: "dev" },
  "Astro":        { icon: "Astro",       iconSource: "dev" },
  "Electron":     { icon: "Electron",    iconSource: "dev" },

  // Styling
  "TailwindCSS":  { icon: "TailwindCSS", iconSource: "dev" },

  // Mobile
  "Flutter":      { icon: "Flutter",     iconSource: "dev" },
  "Expo":         { icon: "siExpo",      iconSource: "si"  },
  "Bluetooth":    { icon: "siBluetooth", iconSource: "si"  },
  "BLE":          { icon: "siBluetooth", iconSource: "si"  },

  // Backend / Frameworks
  "Node.js":      { icon: "NodeJs",      iconSource: "dev" },
  "NestJS":       { icon: "NestJS",      iconSource: "dev" },
  "Laravel":      { icon: "Laravel",     iconSource: "dev" },
  "Django":       { icon: "Django",      iconSource: "dev" },
  "FastAPI":      { icon: "FastAPI",     iconSource: "dev" },
  "Spring":       { icon: "Spring",      iconSource: "dev" },
  "Hono":         { icon: "siHono",      iconSource: "si"  },
  "Bun":          { icon: "siBun",       iconSource: "si"  },
  "Deno":         { icon: "Deno",        iconSource: "dev" },

  // API
  "GraphQL":      { icon: "GraphQL",     iconSource: "dev" },
  "tRPC":         { icon: "TRPC",        iconSource: "dev" },

  // Databases / ORM
  "PostgreSQL":   { icon: "PostgreSQL",  iconSource: "dev" },
  "MySQL":        { icon: "MySQL",       iconSource: "dev" },
  "MongoDB":      { icon: "MongoDB",     iconSource: "dev" },
  "Redis":        { icon: "Redis",       iconSource: "dev" },
  "SQLite":       { icon: "SQLite",      iconSource: "dev" },
  "Prisma":       { icon: "Prisma",      iconSource: "dev" },
  "Drizzle":      { icon: "siDrizzle",   iconSource: "si"  },
  "Supabase":     { icon: "Supabase",    iconSource: "dev" },
  "Firebase":     { icon: "Firebase",    iconSource: "dev" },

  // Infra / Cloud
  "Docker":       { icon: "Docker",      iconSource: "dev" },
  "Kubernetes":   { icon: "Kubernetes",  iconSource: "dev" },
  "Terraform":    { icon: "Terraform",   iconSource: "dev" },
  "AWS":          { icon: "AWS",         iconSource: "dev" },
  "Vercel":       { icon: "siVercel",    iconSource: "si"  },
  "Cloudflare":   { icon: "Cloudflare",  iconSource: "dev" },

  // Tooling
  "Git":          { icon: "Git",         iconSource: "dev" },
  "GitHub":       { icon: "siGithub",    iconSource: "si"  },
  "GitLab":       { icon: "GitLab",      iconSource: "dev" },
  "Vite":         { icon: "siVite",      iconSource: "si"  },
  "Webpack":      { icon: "Webpack",     iconSource: "dev" },
  "Turborepo":    { icon: "siTurborepo", iconSource: "si"  },
  "Linux":        { icon: "Linux",       iconSource: "dev" },

  // AI / Payments
  "OpenAI":       { icon: "OpenAI",      iconSource: "dev" },
  "Anthropic":    { icon: "Anthropic",   iconSource: "dev" },
  "Ollama":       { icon: "siOllama",    iconSource: "si"  },
  "Stripe":       { icon: "siStripe",    iconSource: "si"  },

  // Messaging
  "Kafka":        { icon: "Kafka",       iconSource: "dev" },
};

export function resolveTagIcon(
  tag: string,
  tagIcons?: Record<string, TagIconEntry>
): TagIconEntry | undefined {
  return tagIcons?.[tag] ?? tagIconMap[tag];
}
