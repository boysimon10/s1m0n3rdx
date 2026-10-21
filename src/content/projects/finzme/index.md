---
name: FinzMe
order: 1
year: "2026"
desc: Personal finance app for iOS, built with a typed GraphQL API.
desc_fr: App de gestion financière personnelle iOS, avec une API GraphQL typée de bout en bout.
tags:
  - { label: React Native, icon: React }
  - { label: Expo, icon: siExpo, iconSource: si }
  - { label: TypeScript, icon: TypeScript }
  - { label: GraphQL, icon: GraphQL }
  - { label: NestJS, icon: NestJS }
  - { label: PostgreSQL, icon: PostgreSQL }
  - { label: Drizzle, icon: siDrizzle, iconSource: si }
page: true
role: Full-stack developer (mobile & backend)
role_fr: Développeur full-stack (mobile & backend)
context: Personal project, full rebuild of a first version
context_fr: Projet personnel, refonte complète d'une première version
intro: Track income, expenses, budgets and savings goals in one place, with clear monthly stats.
intro_fr: Suivre revenus, dépenses, budgets et objectifs d'épargne au même endroit, avec des statistiques mensuelles claires.
details: >-
  I built both sides. The NestJS API exposes a GraphQL schema backed by PostgreSQL and Drizzle,
  with JWT auth and refresh-token rotation. On mobile, Apollo Codegen generates types and hooks
  straight from that schema, so the API and the app share one contract and a backend change breaks
  the build, not production. Server state lives only in the Apollo cache; Zustand handles UI state.
  The main challenge was the app shell. A header that follows the scroll had to work the same over
  plain screens and virtualized lists, without hiding the native pull-to-refresh. I pulled the
  scroll logic into a hook that doesn't depend on the list type, so any screen can switch to a
  FlatList without touching the header. The result is a codebase where new screens and API fields
  come with type safety by default.
details_fr: >-
  J'ai développé les deux côtés. L'API NestJS expose un schéma GraphQL sur PostgreSQL avec Drizzle,
  avec une authentification JWT et rotation des refresh tokens. Côté mobile, Apollo Codegen génère
  les types et les hooks directement depuis ce schéma : l'API et l'app partagent un seul contrat,
  et un changement backend casse la compilation plutôt que la prod. L'état serveur vit uniquement
  dans le cache Apollo, Zustand gère l'état UI. Le principal défi était la structure des écrans :
  un header qui suit le scroll devait fonctionner de la même façon sur des écrans simples et des
  listes virtualisées, sans masquer le pull-to-refresh natif. J'ai isolé la logique de scroll dans
  un hook indépendant du type de liste, ce qui permet de passer un écran en FlatList sans toucher
  au header. Résultat : chaque nouvel écran ou champ d'API arrive typé par défaut.
---
