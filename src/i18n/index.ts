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
    "footer.rights": "All rights reserved",
    "footer.rss": "subscribe to RSS",
    "notfound.text": "This page doesn't exist.",
    "notfound.back": "back to home",
    "theme.label": "theme",
    "theme.modern": "modern theme",
    "theme.classic": "classic theme",
    "hero.greeting": "I'm",
    "hero.lastPlayed": "Last played",
    "hero.copy": "copy email",
    "hero.copied": "copied ✓",
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
    "footer.rights": "Tous droits réservés",
    "footer.rss": "s'abonner au flux RSS",
    "notfound.text": "Cette page n'existe pas.",
    "notfound.back": "retour à l'accueil",
    "theme.label": "thème",
    "theme.modern": "thème moderne",
    "theme.classic": "thème classique",
    "hero.greeting": "Je suis",
    "hero.lastPlayed": "Dernière écoute",
    "hero.copy": "copier l'email",
    "hero.copied": "copié ✓",
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

export type Theme = "modern" | "classic";

function splitPath(pathname: string): { lang: Lang; theme: Theme; rest: string } {
  let rest = pathname;
  const isFr = rest === "/fr" || rest.startsWith("/fr/");
  if (isFr) rest = rest.slice(3) || "/";
  const isClassic = rest === "/classic" || rest.startsWith("/classic/");
  if (isClassic) rest = rest.slice(8) || "/";
  return { lang: isFr ? "fr" : "en", theme: isClassic ? "classic" : "modern", rest };
}

export function getThemeFromUrl(url: URL): Theme {
  return splitPath(url.pathname).theme;
}

export function localePath(lang: Lang, theme: Theme, path = "/"): string {
  const prefix = (lang === "fr" ? "/fr" : "") + (theme === "classic" ? "/classic" : "");
  return path === "/" ? prefix || "/" : prefix + path;
}

export function getAlternatePath(currentPath: string, targetLang: Lang): string {
  const { theme, rest } = splitPath(currentPath);
  // slugs differ between languages, so fall back to the listing page
  const safePath = /^\/(blog|void)\/.+/.test(rest) ? rest.replace(/\/[^/]+\/?$/, "") : rest;
  return localePath(targetLang, theme, safePath);
}

export function getThemePath(currentPath: string, targetTheme: Theme): string {
  const { lang, rest } = splitPath(currentPath);
  return localePath(lang, targetTheme, rest);
}

export function getNavLinks(lang: Lang, theme: Theme = "modern") {
  return [
    { labelKey: "nav.home" as UIKey, href: localePath(lang, theme) },
    { labelKey: "nav.blog" as UIKey, href: localePath(lang, theme, "/blog") },
    { labelKey: "nav.projects" as UIKey, href: localePath(lang, theme, "/projects") },
    { labelKey: "nav.about" as UIKey, href: localePath(lang, theme, "/about") },
  ];
}
