export const defaultLang = "en" as const;
export type Lang = "en" | "fr";

export const ui = {
  en: {
    "nav.home": "Home",
    "nav.blog": "Blog",
    "nav.projects": "Projects",
    "nav.about": "About",
    "blog.heading": "blog",
    "blog.seeAll": "see all",
    "projects.heading": "projects",
    "projects.seeAll": "see all",
    "about.heading": "about",
    "section.experience": "experience",
    "section.education": "education",
    "section.contact": "contact",
    "section.stack": "stack",
    "education.text": "Self-taught. No degree, just code.",
    "contract.fulltime": "Full-time",
    "contract.parttime": "Part-time",
    "contract.contract": "Contract",
    "contract.internship": "Internship",
    "contract.independent": "Independent",
  },
  fr: {
    "nav.home": "Accueil",
    "nav.blog": "Blog",
    "nav.projects": "Projets",
    "nav.about": "À propos",
    "blog.heading": "blog",
    "blog.seeAll": "voir tout",
    "projects.heading": "projets",
    "projects.seeAll": "voir tout",
    "about.heading": "à propos",
    "section.experience": "expérience",
    "section.education": "éducation",
    "section.contact": "contact",
    "section.stack": "stack",
    "education.text": "Self-taught. Pas de diplôme, juste du code.",
    "contract.fulltime": "Temps plein",
    "contract.parttime": "Temps partiel",
    "contract.contract": "Contrat",
    "contract.internship": "Stage",
    "contract.independent": "Indépendant",
  },
} as const;

export type UIKey = keyof (typeof ui)[typeof defaultLang];

export function useTranslations(lang: Lang) {
  return function t(key: UIKey): string {
    return (ui[lang] as Record<string, string>)[key] ?? (ui[defaultLang] as Record<string, string>)[key];
  };
}

export function getLangFromUrl(url: URL): Lang {
  return url.pathname.startsWith("/fr") ? "fr" : "en";
}

export function getLangFromId(id: string): Lang {
  return id.startsWith("fr/") ? "fr" : "en";
}

export function getSlugFromId(id: string): string {
  return id.replace(/^(en|fr)\//, "");
}

export function getAlternatePath(currentPath: string, targetLang: Lang): string {
  const isFr = currentPath.startsWith("/fr");
  const basePath = isFr ? currentPath.slice(3) || "/" : currentPath;
  const safePath = /^\/(blog|void)\/.+/.test(basePath)
    ? basePath.replace(/\/[^/]+$/, "")
    : basePath;
  return targetLang === "fr" ? "/fr" + (safePath === "/" ? "" : safePath) : safePath || "/";
}

export function getNavLinks(lang: Lang) {
  const base = lang === "fr" ? "/fr" : "";
  return [
    { labelKey: "nav.home" as UIKey, href: base || "/" },
    { labelKey: "nav.blog" as UIKey, href: `${base}/blog` },
    { labelKey: "nav.projects" as UIKey, href: `${base}/projects` },
    { labelKey: "nav.about" as UIKey, href: `${base}/about` },
  ];
}
