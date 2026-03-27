import type {
  TagId,
  CategoryId,
  AuthorId,
  ArticleTypeId,
  DateId,
} from "./blogData";

export interface ArticleCard {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  date: string;
  tags: TagId[];
  categories: CategoryId[];
  authors: AuthorId[];
  types: ArticleTypeId[];
  dates: DateId[];
  seriesId?: string;
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
    tags: ["monorepo", "workspaces", "tooling"],
    categories: ["frontend", "narzedzia"],
    authors: ["adam"],
    types: ["unsponsored"],
    dates: ["2026/mar"],
    seriesId: "full-stack-setup",
  },
  {
    id: 2,
    slug: "css-design-system-od-zera-tokeny-motywy-layout",
    title: "CSS Design System od zera — tokeny, motywy, layout",
    subtitle: "Od custom properties do pełnego systemu motywów",
    excerpt:
      "Tworzenie skalowalnego systemu designu opartego na CSS custom properties. Od tokenów kolorów i typografii po ciemny motyw i responsywne layouty.",
    date: "2026-03-05",
    tags: ["design-system", "custom-properties", "tokeny", "dark-mode"],
    categories: ["frontend"],
    authors: ["adam"],
    types: ["unsponsored"],
    dates: ["2026/mar"],
    seriesId: "full-stack-setup",
  },
  {
    id: 3,
    slug: "nestjs-prisma-driver-adapter-pattern",
    title: "NestJS + Prisma — driver adapter pattern",
    subtitle: "Pełna kontrola nad connection poolingiem z @prisma/adapter-pg",
    excerpt:
      "Jak połączyć NestJS z Prisma 7 używając @prisma/adapter-pg i surowego pg.Pool. Konfiguracja, migracje i best practices dla produkcyjnego API.",
    date: "2026-02-28",
    tags: ["connection-pooling", "migracje"],
    categories: ["backend", "bazy-danych"],
    authors: ["adam"],
    types: ["sponsored"],
    dates: ["2026/lut"],
    seriesId: "full-stack-setup",
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
    tags: ["hot-reload", "multi-stage-builds"],
    categories: ["devops"],
    authors: ["adam"],
    types: ["unsponsored"],
    dates: ["2026/lut"],
    seriesId: "full-stack-setup",
  },
  {
    id: 5,
    slug: "testowanie-komponentow-react-z-vitest-i-testing-library",
    title: "Testowanie komponentów React z Vitest i Testing Library",
    subtitle: "Strategia testów w monorepo — unit, snapshot i coverage",
    excerpt:
      "Strategia testowania w monorepo — unit testy, snapshot testy i coverage. Konfiguracja Vitest z jsdom dla shared component library.",
    date: "2026-02-15",
    tags: ["coverage", "snapshot-testing"],
    categories: ["testowanie", "frontend"],
    authors: ["adam"],
    types: ["unsponsored"],
    dates: ["2026/lut"],
    seriesId: "full-stack-setup",
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
    tags: ["esm", "monorepo"],
    categories: ["backend", "frontend"],
    authors: ["adam"],
    types: ["unsponsored"],
    dates: ["2026/lut"],
    seriesId: "full-stack-setup",
  },
  {
    id: 7,
    slug: "github-actions-cicd-od-podstaw",
    title: "GitHub Actions — CI/CD od podstaw",
    subtitle: "Pipeline od testów po deployment na VPS",
    excerpt:
      "Budowanie pipeline CI/CD z GitHub Actions. Automatyczne testy, build, push do GHCR i deployment na VPS.",
    date: "2026-02-05",
    tags: ["ci-cd", "tooling"],
    categories: ["devops"],
    authors: ["adam"],
    types: ["sponsored"],
    dates: ["2026/lut"],
    seriesId: "full-stack-setup",
  },
  {
    id: 8,
    slug: "nginx-jako-reverse-proxy-konfiguracja-produkcyjna",
    title: "Nginx jako reverse proxy — konfiguracja produkcyjna",
    subtitle: "TLS, upstream balancing i security headers w praktyce",
    excerpt:
      "Konfiguracja Nginx dla aplikacji full-stack. TLS termination, upstream balancing, cache headers i security headers.",
    date: "2026-01-30",
    tags: ["reverse-proxy", "security"],
    categories: ["devops"],
    authors: ["adam"],
    types: ["unsponsored"],
    dates: ["2026/sty"],
    seriesId: "full-stack-setup",
  },
  {
    id: 9,
    slug: "postgresql-17-nowosci-i-optymalizacja",
    title: "PostgreSQL 17 — nowości i optymalizacja",
    subtitle: "Incremental backup, JSON_TABLE i performance tuning",
    excerpt:
      "Przegląd nowych funkcji PostgreSQL 17. Incremental backup, JSON improvements i performance tuning dla aplikacji webowych.",
    date: "2026-01-25",
    tags: ["performance", "migracje"],
    categories: ["bazy-danych"],
    authors: ["adam"],
    types: ["unsponsored"],
    dates: ["2026/sty"],
    seriesId: "full-stack-setup",
  },
  {
    id: 10,
    slug: "redis-7-cache-i-sesje-w-praktyce",
    title: "Redis 7 — cache i sesje w praktyce",
    subtitle: "AOF persistence, eviction policies i integracja z NestJS",
    excerpt:
      "Implementacja cache'owania i zarządzania sesjami z Redis 7. AOF persistence, eviction policies i integracja z NestJS.",
    date: "2026-01-20",
    tags: ["cache", "performance"],
    categories: ["backend", "bazy-danych"],
    authors: ["adam"],
    types: ["unsponsored"],
    dates: ["2026/sty"],
    seriesId: "full-stack-setup",
  },
  {
    id: 11,
    slug: "accessibility-w-react-praktyczny-poradnik",
    title: "Accessibility w React — praktyczny poradnik",
    subtitle: "ARIA, focus management i WCAG 2.1 w komponentach",
    excerpt:
      "Tworzenie dostępnych komponentów React. ARIA attributes, focus management, screen reader testing i WCAG 2.1 compliance.",
    date: "2026-01-15",
    tags: ["a11y", "ux", "wcag"],
    categories: ["frontend"],
    authors: ["adam"],
    types: ["unsponsored"],
    dates: ["2026/sty"],
  },
  {
    id: 12,
    slug: "vite-7-co-nowego-w-bundlerze",
    title: "Vite 7 — co nowego w bundlerze",
    subtitle: "Environment API, szybszy dev server i Rollup 4",
    excerpt:
      "Przegląd zmian w Vite 7. Environment API, nowy dev server, HMR improvements i migracja z poprzednich wersji.",
    date: "2026-01-10",
    tags: ["tooling", "hot-reload"],
    categories: ["frontend", "narzedzia"],
    authors: ["adam"],
    types: ["sponsored"],
    dates: ["2026/sty"],
  },
  {
    id: 13,
    slug: "css-modules-vs-styled-components-porownanie",
    title: "CSS Modules vs styled-components — porównanie",
    subtitle: "Performance, DX i bundle size — co wybrać w React?",
    excerpt:
      "Szczegółowe porównanie podejść do stylowania w React. Performance, DX, bundle size i kiedy wybrać które rozwiązanie.",
    date: "2026-01-05",
    tags: ["performance", "design-system"],
    categories: ["frontend"],
    authors: ["adam"],
    types: ["unsponsored"],
    dates: ["2026/sty"],
  },
  {
    id: 14,
    slug: "prisma-7-migracje-i-seeding",
    title: "Prisma 7 — migracje i seeding",
    subtitle: "Migration workflow, reset i best practices dla zespołów",
    excerpt:
      "Zarządzanie schematem bazy danych z Prisma. Migration workflow, seeding, reset i best practices dla zespołów.",
    date: "2025-12-28",
    tags: ["migracje", "tooling"],
    categories: ["backend", "bazy-danych"],
    authors: ["adam"],
    types: ["unsponsored"],
    dates: ["2025/gru"],
  },
  {
    id: 15,
    slug: "react-19-server-components-i-nowe-api",
    title: "React 19 — Server Components i nowe API",
    subtitle: "use() hook, Actions, useOptimistic i migracja z React 18",
    excerpt:
      "Przegląd React 19. use() hook, Server Components, Actions, useOptimistic i strategie migracji z React 18.",
    date: "2025-12-20",
    tags: ["ssr", "state-management"],
    categories: ["frontend"],
    authors: ["adam"],
    types: ["unsponsored"],
    dates: ["2025/gru"],
    seriesId: "react-19-focus",
  },
];
