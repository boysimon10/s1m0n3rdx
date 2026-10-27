import type { IconSource } from "../utils/icons";

export type StackItem = {
  label: string;
  label_fr?: string;
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
    category: "practices",
    category_fr: "pratiques",
    items: [
      { label: "TDD", icon: "", iconSource: "dev" },
      { label: "DDD", icon: "", iconSource: "dev" },
      { label: "unit & integration tests", label_fr: "tests unitaires & d'intégration", icon: "", iconSource: "dev" },
      { label: "technical documentation", label_fr: "documentation technique", icon: "", iconSource: "dev" },
    ],
  },
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
      { label: "React", icon: "React", iconSource: "dev" },
      { label: "Vue.js", icon: "VueJs", iconSource: "dev" },
      { label: "Astro", icon: "Astro", iconSource: "dev" },
      { label: "HTMX", icon: "siHtmx", iconSource: "si" },
      { label: "TailwindCSS", icon: "TailwindCSS", iconSource: "dev" },
      { label: "PandaCSS", icon: "PandaCSS", iconSource: "dev" },
    ],
  },
  {
    category: "frontend mobile",
    items: [
      {
        label: "React Native",
        icon: "React",
        iconSource: "dev",
        related: [{ label: "Expo", icon: "siExpo", iconSource: "si" }],
      },
    ],
  },
  {
    category: "backend",
    items: [
      { label: "Gin", icon: "siGin", iconSource: "si" },
      { label: "Go Fiber", icon: "", iconSource: "dev" },
      {
        label: "Node.js",
        icon: "NodeJs",
        iconSource: "dev",
        related: [
          { label: "NestJS", icon: "NestJS", iconSource: "dev" },
          { label: "AdonisJS", icon: "siAdonisjs", iconSource: "si" },
        ],
      },
      { label: "GraphQL", icon: "GraphQL", iconSource: "dev" },
      { label: "tRPC", icon: "TRPC", iconSource: "dev" },
      { label: "WebSockets", icon: "", iconSource: "dev" },
      { label: "WebRTC", icon: "WebRTC", iconSource: "dev" },
    ],
  },
  {
    category: "databases",
    category_fr: "bases de données",
    items: [
      { label: "MySQL", icon: "MySQL", iconSource: "dev" },
      { label: "PostgreSQL", icon: "PostgreSQL", iconSource: "dev" },
      { label: "MongoDB", icon: "MongoDB", iconSource: "dev" },
    ],
  },
  {
    category: "cache / messaging",
    items: [
      { label: "Redis", icon: "siRedis", iconSource: "si" },
      { label: "RabbitMQ", icon: "siRabbitmq", iconSource: "si" },
    ],
  },
  {
    category: "observability",
    category_fr: "observabilité",
    items: [
      { label: "OpenTelemetry", icon: "siOpentelemetry", iconSource: "si" },
      { label: "SigNoz", icon: "", iconSource: "dev" },
      { label: "Grafana", icon: "Grafana", iconSource: "dev" },
      { label: "Prometheus", icon: "siPrometheus", iconSource: "si" },
      { label: "HyperDX", icon: "", iconSource: "dev" },
    ],
  },
  {
    category: "dev tools",
    category_fr: "outils de dev",
    items: [
      { label: "Webpack", icon: "Webpack", iconSource: "dev" },
      { label: "Vite", icon: "ViteJS", iconSource: "dev" },
      { label: "Jest", icon: "Jest", iconSource: "dev" },
      { label: "Cypress", icon: "Cypress", iconSource: "dev" },
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
    category: "ai / llm",
    category_fr: "ia / llm",
    items: [
      { label: "RAG", icon: "", iconSource: "dev" },
      { label: "semantic search & embeddings", label_fr: "recherche sémantique & embeddings", icon: "", iconSource: "dev" },
      { label: "function calling", icon: "", iconSource: "dev" },
      { label: "STT / TTS", icon: "", iconSource: "dev" },
      { label: "LLM streaming", label_fr: "streaming LLM", icon: "", iconSource: "dev" },
    ],
  },
  {
    category: "iot",
    items: [
      { label: "BLE", icon: "siBluetooth", iconSource: "si" },
      { label: "MQTT", icon: "siMqtt", iconSource: "si" },
      { label: "Arduino", icon: "siArduino", iconSource: "si" },
    ],
  },
];
