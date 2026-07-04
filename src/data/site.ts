export const site = {
  name: "s1m0n3rdx",
  author: "Simon Diouf",
  email: "simondiouf2710@gmail.com",
  bio: "Full-stack & mobile engineer. I build products from idea to deployment.",
  location: "Dakar",
  role: "Software Engineer",
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
  { label: "Email", href: `mailto:simondiouf2710@gmail.com`, icon: "mail" },
];
