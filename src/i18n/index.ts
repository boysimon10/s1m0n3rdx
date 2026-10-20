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
    "hero.nowPlaying": "Now playing",
    "hero.copy": "copy email",
    "hero.copied": "copied ✓",
    "blog.empty": "No posts yet.",
    "about.p1": "I'm Simon, a self-taught developer based in Dakar. I build web and mobile applications, mostly backend in Go and NestJS, and mobile in React Native.",
    "about.p2": "This site is my space to write about what I'm learning, the projects I'm building, and what interests me in software development.",
    "void.comment": "// you're not supposed to be here",
    "void.line1": "- no format.",
    "void.line2": "- no subject.",
    "void.line3": "- just stuff.",
    "void.empty": "// nothing yet.",
    "void.back": "// back to void",
    "project.role": "role",
    "project.context": "context",
    "project.stack": "stack",
    "project.screens": "screens",
    "project.confidential": "client · confidential",
    "project.site": "website",
    "project.repo": "repo",
    "construction.badge": "work in progress",
    "construction.title": "Under construction",
    "construction.text": "I'm rebuilding this place, articles and projects included. Come back soon. In the meantime, you can find me here:",
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
    "hero.nowPlaying": "En écoute",
    "hero.copy": "copier l'email",
    "hero.copied": "copié ✓",
    "blog.empty": "Aucun article en français pour l'instant.",
    "about.p1": "Je suis Simon, développeur self-taught basé à Dakar. Je construis des applications web et mobile, principalement du backend en Go et NestJS, et du mobile en React Native.",
    "about.p2": "Ce site est mon espace pour écrire sur ce que j'apprends, les projets que je construis, et ce qui m'intéresse dans le développement logiciel.",
    "void.comment": "// t'es pas censé être là",
    "void.line1": "- pas de format.",
    "void.line2": "- pas de sujet.",
    "void.line3": "- juste des trucs.",
    "void.empty": "// rien pour l'instant.",
    "void.back": "// retour au void",
    "project.role": "rôle",
    "project.context": "contexte",
    "project.stack": "stack",
    "project.screens": "captures",
    "project.confidential": "client · confidentiel",
    "project.site": "site",
    "project.repo": "repo",
    "construction.badge": "travaux en cours",
    "construction.title": "En construction",
    "construction.text": "Je reconstruis cet endroit, articles et projets compris. Reviens bientôt. En attendant, tu me trouves ici :",
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
