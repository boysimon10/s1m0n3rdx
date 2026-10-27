import avatar from "../assets/avatar.png";

export const site = {
  name: "s1m0n3rdx",
  author: "Simon Diouf",
  email: "simondiouf2710@gmail.com",
  bio: "Computer scientist at heart. I build software, and I like to understand everything underneath it.",
  bio_fr: "Computer scientist dans l'âme. Je construis du logiciel, et j'aime comprendre tout ce qu'il y a en dessous.",
  location: "Dakar",
  role: "Software Engineer",
  role_fr: "Ingénieur logiciel",
  avatar,
};

export const lastPlayed = {
  title: "jolagreen23",
  artist: "0.92",
};

export type Social = {
  label: string;
  href: string;
  icon: string;
};

export const socials: Social[] = [
  { label: "GitHub", href: "https://github.com/boysimon10", icon: "github" },
  { label: "LinkedIn", href: "https://linkedin.com/in/s1m0n-codes", icon: "linkedin" },
  { label: "X", href: "https://x.com/s1m0n3rdx", icon: "x" },
  { label: "Instagram", href: "https://instagram.com/s1m0n3rdx", icon: "instagram" },
  { label: "YouTube", href: "https://youtube.com/@s1m0n3rdx", icon: "youtube" },
  { label: "Twitch", href: "https://twitch.tv/s1m0n3rdx", icon: "twitch" },
  { label: "Email", href: `mailto:simondiouf2710@gmail.com`, icon: "mail" },
];
