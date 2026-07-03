import type { IconSource } from "../utils/icons";

export type ProjectTag = {
  label: string;
  icon: string;
  iconSource?: IconSource;
};

export type Project = {
  num: string;
  name: string;
  desc: string;
  tags: ProjectTag[];
  href: string;
  year: string;
};

export const projects: Project[] = [
  {
    num: "01",
    name: "Project A",
    desc: "Description courte du projet.",
    tags: [
      { label: "Go", icon: "Go", iconSource: "dev" },
      { label: "GraphQL", icon: "GraphQL", iconSource: "dev" },
    ],
    href: "https://github.com/boysimon10",
    year: "2026",
  },
  {
    num: "02",
    name: "Project B",
    desc: "Description courte du projet.",
    tags: [
      { label: "React Native", icon: "React", iconSource: "dev" },
      { label: "Expo", icon: "siExpo", iconSource: "si" },
      { label: "NestJS", icon: "NestJS", iconSource: "dev" },
    ],
    href: "https://github.com/boysimon10",
    year: "2025",
  },
  {
    num: "03",
    name: "Project C",
    desc: "Description courte du projet.",
    tags: [
      { label: "NestJS", icon: "NestJS", iconSource: "dev" },
      { label: "GraphQL", icon: "GraphQL", iconSource: "dev" },
    ],
    href: "https://github.com/boysimon10",
    year: "2025",
  },
];
