import type { IconSource } from "../utils/icons";

export type ExpTag = {
  label: string;
  icon: string;
  iconSource: IconSource;
};

export enum contractType {
  FULL_TIME = "Full-time",
  PART_TIME = "Part-time",
  CONTRACT = "Contract",
  INTERNSHIP = "Internship",
  INDEPENDENT = "Independent",
}

export type Experience = {
  role: string;
  company: string;
  url?: string;
  contractType?: contractType;
  period: string;
  tags: ExpTag[];
};

export const experience: Experience[] = [
  {
    role: "Software Engineer - Lead Backend & Mobile",
    company: "Made In Senegal Center",
    url: "https://misen.sn",
    contractType: contractType.FULL_TIME,
    period: "Jan. 2026 - Present",
    tags: [
      { label: "React Native", icon: "React", iconSource: "dev" },
      { label: "Expo", icon: "siExpo", iconSource: "si" },
      { label: "TypeScript", icon: "TypeScript", iconSource: "dev" },
      { label: "Go", icon: "Go", iconSource: "dev" },
      { label: "NestJS", icon: "NestJS", iconSource: "dev" },
      { label: "Redis", icon: "siRedis", iconSource: "si" },
      { label: "PostgreSQL", icon: "PostgreSQL", iconSource: "dev" },
      { label: "MySQL", icon: "MySQL", iconSource: "dev" },
    ],
  },
  {
    role: "Founding Engineer",
    company: "MonaxTech",
    url: "",
    contractType: contractType.INDEPENDENT,
    period: "Jul. 2024 - Present",
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
    role: "Full-Stack Developer",
    company: "Way2Tech.ai",
    url: "https://way2tech.ai",
    contractType: contractType.INTERNSHIP,
    period: "Jun. 2025 - Dec. 2025",
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
    role: "Full-Stack Developer",
    company: "Senyone SAS",
    url: "https://senyone.sn",
    contractType: contractType.INTERNSHIP,
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
