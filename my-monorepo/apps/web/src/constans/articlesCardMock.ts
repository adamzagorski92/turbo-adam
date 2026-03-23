export interface ArticleCard {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  date: string;
  author: string;
  tags: string[];
  categories: string[];
  authors: string[];
  types: string[];
  dates: string[];
}

export const ARTICLES_CARD_MOCK: ArticleCard[] = [
  {
    id: 1,
    slug: "jak-zbudowac-monorepo-z-turborepo-i-pnpm",
    title: "Jak zbudować monorepo z Turborepo i pnpm",
    subtitle: "Turborepo + pnpm workspaces — konfiguracja krok po kroku",
    excerpt:
      "Praktyczny przewodnik po konfiguracji monorepo z użyciem Turborepo, pnpm workspaces i TypeScript. Dowiedz się, jak efektywnie zarządzać wieloma pakietami w jednym repozytorium.",
    date: "2026-03-10",
    author: "Adam",
    tags: ["Monorepo", "Workspaces", "Tooling"],
    categories: ["Frontend", "Narzędzia"],
    authors: ["Adam"],
    types: ["unsponsored"],
    dates: ["mar-2026"],
  },
  {
    id: 2,
    slug: "css-design-system-od-zera-tokeny-motywy-layout",
    title: "CSS Design System od zera — tokeny, motywy, layout",
    subtitle: "Od custom properties do pełnego systemu motywów",
    excerpt:
      "Tworzenie skalowalnego systemu designu opartego na CSS custom properties. Od tokenów kolorów i typografii po ciemny motyw i responsywne layouty.",
    date: "2026-03-05",
    author: "Adam",
    tags: ["Design System", "Custom properties", "Tokeny", "Dark mode"],
    categories: ["Frontend"],
    authors: ["Adam"],
    types: ["unsponsored"],
    dates: ["mar-2026"],
  },
  {
    id: 3,
    slug: "nestjs-prisma-driver-adapter-pattern",
    title: "NestJS + Prisma — driver adapter pattern",
    subtitle: "Pełna kontrola nad connection poolingiem z @prisma/adapter-pg",
    excerpt:
      "Jak połączyć NestJS z Prisma 7 używając @prisma/adapter-pg i surowego pg.Pool. Konfiguracja, migracje i best practices dla produkcyjnego API.",
    date: "2026-02-28",
    author: "Adam",
    tags: ["Connection pooling", "Migracje"],
    categories: ["Backend", "Bazy danych"],
    authors: ["Adam"],
    types: ["sponsored"],
    dates: ["lut-2026"],
  },
  {
    id: 4,
    slug: "docker-compose-dla-full-stack-developera",
    title: "Docker Compose dla full-stack developera",
    subtitle:
      "Dev i produkcja w kontenerach — od hot-reload po multi-stage builds",
    excerpt:
      "Konfiguracja środowisk dev i produkcyjnych z Docker Compose. Nginx jako reverse proxy, hot-reload w kontenerach i multi-stage builds.",
    date: "2026-02-20",
    author: "Adam",
    tags: ["Hot-reload", "Multi-stage builds"],
    categories: ["DevOps"],
    authors: ["Adam"],
    types: ["unsponsored"],
    dates: ["lut-2026"],
  },
  {
    id: 5,
    slug: "testowanie-komponentow-react-z-vitest-i-testing-library",
    title: "Testowanie komponentów React z Vitest i Testing Library",
    subtitle: "Strategia testów w monorepo — unit, snapshot i coverage",
    excerpt:
      "Strategia testowania w monorepo — unit testy, snapshot testy i coverage. Konfiguracja Vitest z jsdom dla shared component library.",
    date: "2026-02-15",
    author: "Adam",
    tags: ["Coverage", "Snapshot testing"],
    categories: ["Testowanie", "Frontend"],
    authors: ["Adam"],
    types: ["unsponsored"],
    dates: ["lut-2026"],
  },
  {
    id: 6,
    slug: "esm-w-nodejs-kompletny-przewodnik",
    title: "ESM w Node.js — kompletny przewodnik",
    subtitle:
      "Migracja z CommonJS — rozszerzenia, import.meta i kompatybilność",
    excerpt:
      "Migracja z CommonJS do ES Modules w Node.js. Rozszerzenia .js w importach, package.json type module i kompatybilność z ekosystemem.",
    date: "2026-02-10",
    author: "Adam",
    tags: ["ESM", "Monorepo"],
    categories: ["Backend", "Frontend"],
    authors: ["Adam"],
    types: ["unsponsored"],
    dates: ["lut-2026"],
  },
  {
    id: 7,
    slug: "github-actions-cicd-od-podstaw",
    title: "GitHub Actions — CI/CD od podstaw",
    subtitle: "Pipeline od testów po deployment na VPS",
    excerpt:
      "Budowanie pipeline CI/CD z GitHub Actions. Automatyczne testy, build, push do GHCR i deployment na VPS.",
    date: "2026-02-05",
    author: "Adam",
    tags: ["CI/CD", "Tooling"],
    categories: ["DevOps"],
    authors: ["Adam"],
    types: ["sponsored"],
    dates: ["lut-2026"],
  },
  {
    id: 8,
    slug: "nginx-jako-reverse-proxy-konfiguracja-produkcyjna",
    title: "Nginx jako reverse proxy — konfiguracja produkcyjna",
    subtitle: "TLS, upstream balancing i security headers w praktyce",
    excerpt:
      "Konfiguracja Nginx dla aplikacji full-stack. TLS termination, upstream balancing, cache headers i security headers.",
    date: "2026-01-30",
    author: "Adam",
    tags: ["Reverse proxy", "Security"],
    categories: ["DevOps"],
    authors: ["Adam"],
    types: ["unsponsored"],
    dates: ["sty-2026"],
  },
  {
    id: 9,
    slug: "postgresql-17-nowosci-i-optymalizacja",
    title: "PostgreSQL 17 — nowości i optymalizacja",
    subtitle: "Incremental backup, JSON_TABLE i performance tuning",
    excerpt:
      "Przegląd nowych funkcji PostgreSQL 17. Incremental backup, JSON improvements i performance tuning dla aplikacji webowych.",
    date: "2026-01-25",
    author: "Adam",
    tags: ["Performance", "Migracje"],
    categories: ["Bazy danych"],
    authors: ["Adam"],
    types: ["unsponsored"],
    dates: ["sty-2026"],
  },
  {
    id: 10,
    slug: "redis-7-cache-i-sesje-w-praktyce",
    title: "Redis 7 — cache i sesje w praktyce",
    subtitle: "AOF persistence, eviction policies i integracja z NestJS",
    excerpt:
      "Implementacja cache'owania i zarządzania sesjami z Redis 7. AOF persistence, eviction policies i integracja z NestJS.",
    date: "2026-01-20",
    author: "Adam",
    tags: ["Cache", "Performance"],
    categories: ["Backend", "Bazy danych"],
    authors: ["Adam"],
    types: ["unsponsored"],
    dates: ["sty-2026"],
  },
  {
    id: 11,
    slug: "accessibility-w-react-praktyczny-poradnik",
    title: "Accessibility w React — praktyczny poradnik",
    subtitle: "ARIA, focus management i WCAG 2.1 w komponentach",
    excerpt:
      "Tworzenie dostępnych komponentów React. ARIA attributes, focus management, screen reader testing i WCAG 2.1 compliance.",
    date: "2026-01-15",
    author: "Adam",
    tags: ["A11y", "UX", "WCAG"],
    categories: ["Frontend"],
    authors: ["Adam"],
    types: ["unsponsored"],
    dates: ["sty-2026"],
  },
  {
    id: 12,
    slug: "vite-7-co-nowego-w-bundlerze",
    title: "Vite 7 — co nowego w bundlerze",
    subtitle: "Environment API, szybszy dev server i Rollup 4",
    excerpt:
      "Przegląd zmian w Vite 7. Environment API, nowy dev server, HMR improvements i migracja z poprzednich wersji.",
    date: "2026-01-10",
    author: "Adam",
    tags: ["Tooling", "Hot-reload"],
    categories: ["Frontend", "Narzędzia"],
    authors: ["Adam"],
    types: ["sponsored"],
    dates: ["sty-2026"],
  },
  {
    id: 13,
    slug: "css-modules-vs-styled-components-porownanie",
    title: "CSS Modules vs styled-components — porównanie",
    subtitle: "Performance, DX i bundle size — co wybrać w React?",
    excerpt:
      "Szczegółowe porównanie podejść do stylowania w React. Performance, DX, bundle size i kiedy wybrać które rozwiązanie.",
    date: "2026-01-05",
    author: "Adam",
    tags: ["Performance", "Design System"],
    categories: ["Frontend"],
    authors: ["Adam"],
    types: ["unsponsored"],
    dates: ["sty-2026"],
  },
  {
    id: 14,
    slug: "prisma-7-migracje-i-seeding",
    title: "Prisma 7 — migracje i seeding",
    subtitle: "Migration workflow, reset i best practices dla zespołów",
    excerpt:
      "Zarządzanie schematem bazy danych z Prisma. Migration workflow, seeding, reset i best practices dla zespołów.",
    date: "2025-12-28",
    author: "Adam",
    tags: ["Migracje", "Tooling"],
    categories: ["Backend", "Bazy danych"],
    authors: ["Adam"],
    types: ["unsponsored"],
    dates: ["gru-2025"],
  },
  {
    id: 15,
    slug: "react-19-server-components-i-nowe-api",
    title: "React 19 — Server Components i nowe API",
    subtitle: "use() hook, Actions, useOptimistic i migracja z React 18",
    excerpt:
      "Przegląd React 19. use() hook, Server Components, Actions, useOptimistic i strategie migracji z React 18.",
    date: "2025-12-20",
    author: "Adam",
    tags: ["SSR", "State management"],
    categories: ["Frontend"],
    authors: ["Adam"],
    types: ["unsponsored"],
    dates: ["gru-2025"],
  },
];
