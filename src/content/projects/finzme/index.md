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
context: Personal project, full rebuild of a first version. Not on the App Store yet, Apple developer enrollment still pending.
context_fr: Projet personnel, refonte complète d'une première version. Pas encore sur l'App Store, l'inscription au programme développeur Apple est toujours en attente.
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
cover: ../../../assets/projects/finzme/11-home.png
screens:
  - { src: ../../../assets/projects/finzme/01-onboarding-1.png, caption: onboarding · log expenses in seconds, caption_fr: onboarding · noter ses dépenses en quelques secondes }
  - { src: ../../../assets/projects/finzme/02-onboarding-2.png, caption: onboarding · understand your habits, caption_fr: onboarding · comprendre ses habitudes }
  - { src: ../../../assets/projects/finzme/03-onboarding-3.png, caption: onboarding · sign in or sign up, caption_fr: onboarding · connexion ou inscription }
  - { src: ../../../assets/projects/finzme/04-login-phone.png, caption: login · phone number, caption_fr: connexion · numéro de téléphone }
  - { src: ../../../assets/projects/finzme/05-login-pin.png, caption: login · PIN code, caption_fr: connexion · code PIN }
  - { src: ../../../assets/projects/finzme/06-signup-profile.png, caption: sign up · profile, caption_fr: inscription · profil }
  - { src: ../../../assets/projects/finzme/07-signup-currency.png, caption: sign up · currency detected from the phone, caption_fr: inscription · devise détectée depuis le téléphone }
  - { src: ../../../assets/projects/finzme/08-signup-categories.png, caption: sign up · starting categories, caption_fr: inscription · catégories de départ }
  - { src: ../../../assets/projects/finzme/09-signup-notifications.png, caption: sign up · notifications, caption_fr: inscription · notifications }
  - { src: ../../../assets/projects/finzme/10-home-empty.png, caption: home · empty state, caption_fr: accueil · état vide }
  - { src: ../../../assets/projects/finzme/11-home.png, caption: home · balance and recent transactions, caption_fr: accueil · solde et transactions récentes }
  - { src: ../../../assets/projects/finzme/12-new-transaction.png, caption: new transaction, caption_fr: nouvelle transaction }
  - { src: ../../../assets/projects/finzme/13-new-transaction-filled.png, caption: new transaction · category and description, caption_fr: nouvelle transaction · catégorie et description }
  - { src: ../../../assets/projects/finzme/14-new-transaction-amount.png, caption: new transaction · amount, caption_fr: nouvelle transaction · montant }
  - { src: ../../../assets/projects/finzme/15-transaction-detail.png, caption: transaction detail, caption_fr: détail d'une transaction }
  - { src: ../../../assets/projects/finzme/16-categories.png, caption: categories, caption_fr: catégories }
  - { src: ../../../assets/projects/finzme/17-savings.png, caption: savings goals, caption_fr: objectifs d'épargne }
  - { src: ../../../assets/projects/finzme/18-stats.png, caption: stats, caption_fr: statistiques }
  # shows the account phone number and email
  # - { src: ../../../assets/projects/finzme/19-settings.png, caption: settings, caption_fr: paramètres }
  - { src: ../../../assets/projects/finzme/20-settings-more.png, caption: settings · data and support, caption_fr: paramètres · données et assistance }
---
