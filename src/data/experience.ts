import type { IconSource } from "../utils/icons";

export type ExpTag = {
  label: string;
  icon: string;
  iconSource: IconSource;
};

export type Experience = {
  role: string;
  company: string;
  period: string;
  tags: ExpTag[];
};

export const experience: Experience[] = [
  {
    role: "Développeur Full-Stack",
    company: "Way2Tech.ai",
    period: "Juin 2025 - Déc. 2025",
    tags: [
      { label: "React Native", icon: "React", iconSource: "dev" },
      { label: "Expo", icon: "siExpo", iconSource: "si" },
      { label: "React", icon: "React", iconSource: "dev" },
      { label: "Node.js", icon: "NodeJs", iconSource: "dev" },
      { label: "TypeScript", icon: "TypeScript", iconSource: "dev" },
      { label: "Python", icon: "Python", iconSource: "dev" },
      { label: "OpenAI", icon: "OpenAI", iconSource: "dev" },
    ],
  },
  {
    role: "Développeur Full-Stack / Mobile",
    company: "MonaxTech (co-fondateur - Freelance)",
    period: "Juil. 2024 - Présent",
    tags: [
      { label: "React Native", icon: "React", iconSource: "dev" },
      { label: "Expo", icon: "siExpo", iconSource: "si" },
      { label: "NestJS", icon: "NestJS", iconSource: "dev" },
      { label: "AdonisJS", icon: "siAdonisjs", iconSource: "si" },
      { label: "MongoDB", icon: "MongoDB", iconSource: "dev" },
      { label: "MySQL", icon: "MySQL", iconSource: "dev" },
      { label: "Coolify", icon: "siCoolify", iconSource: "si" },
    ],
  },
  {
    role: "Développeur Full-Stack",
    company: "Senyone SAS",
    period: "Oct. 2024 - Jan. 2025",
    tags: [
      { label: "Next.js", icon: "NextJs", iconSource: "dev" },
      { label: "NestJS", icon: "NestJS", iconSource: "dev" },
      { label: "Supabase", icon: "Supabase", iconSource: "dev" },
      { label: "TailwindCSS", icon: "TailwindCSS", iconSource: "dev" },
      { label: "TypeScript", icon: "TypeScript", iconSource: "dev" },
    ],
  },
];
