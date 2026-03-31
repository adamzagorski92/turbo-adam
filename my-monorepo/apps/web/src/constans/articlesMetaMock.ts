export interface ArticleMeta {
  id: number;
  title: string;
  description: string;
  keywords: string;
  robots: string;
  ogType: "article";
  twitterCard: "summary" | "summary_large_image";
  ogImagePath?: string;
  articleJsonLd: Record<string, unknown>;
}

export const ARTICLES_META_MOCK: ArticleMeta[] = [
  {
    id: 1,
    title: "Jak zbudować monorepo z Turborepo i pnpm — Blog",
    description:
      "Konfiguracja Turborepo i pnpm workspaces w TypeScript — pipeline, cache i zarządzanie pakietami.",
    keywords: "turborepo, pnpm, monorepo, typescript, workspaces",
    robots: "index, follow",
    ogType: "article",
    twitterCard: "summary_large_image",
    articleJsonLd: {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: "Jak zbudować monorepo z Turborepo i pnpm",
      author: { "@type": "Person", name: "Adam Zagorski" },
      datePublished: "2026-03-10",
    },
  },
  {
    id: 2,
    title: "CSS Design System od zera — tokeny, motywy, layout — Blog",
    description:
      "Budowa systemu designu z CSS custom properties — tokeny, dark mode i responsywne layouty.",
    keywords: "css, design system, tokeny, custom properties, ciemny motyw",
    robots: "index, follow",
    ogType: "article",
    twitterCard: "summary_large_image",
    articleJsonLd: {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: "CSS Design System od zera — tokeny, motywy, layout",
      author: { "@type": "Person", name: "Adam Zagorski" },
      datePublished: "2026-03-05",
    },
  },
  {
    id: 3,
    title: "NestJS + Prisma — driver adapter pattern — Blog",
    description:
      "Integracja NestJS z Prisma 7 przez @prisma/adapter-pg — kontrola nad poolingiem i migracje.",
    keywords: "nestjs, prisma, postgresql, driver adapter, pg pool",
    robots: "index, follow",
    ogType: "article",
    twitterCard: "summary_large_image",
    articleJsonLd: {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: "NestJS + Prisma — driver adapter pattern",
      author: { "@type": "Person", name: "Adam Zagorski" },
      datePublished: "2026-02-28",
    },
  },
  {
    id: 4,
    title: "Docker Compose dla full-stack developera — Blog",
    description:
      "Środowiska dev i prod z Docker Compose — Nginx, hot-reload i multi-stage builds.",
    keywords:
      "docker, docker compose, nginx, reverse proxy, multi-stage builds",
    robots: "index, follow",
    ogType: "article",
    twitterCard: "summary_large_image",
    articleJsonLd: {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: "Docker Compose dla full-stack developera",
      author: { "@type": "Person", name: "Adam Zagorski" },
      datePublished: "2026-02-20",
    },
  },
  {
    id: 5,
    title: "Testowanie komponentów React z Vitest i Testing Library — Blog",
    description:
      "Vitest + Testing Library w monorepo — testy jednostkowe, snapshoty i progi coverage.",
    keywords: "vitest, testing library, react, testy, coverage",
    robots: "index, follow",
    ogType: "article",
    twitterCard: "summary_large_image",
    articleJsonLd: {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: "Testowanie komponentów React z Vitest i Testing Library",
      author: { "@type": "Person", name: "Adam Zagorski" },
      datePublished: "2026-02-15",
    },
  },
  {
    id: 6,
    title: "ESM w Node.js — kompletny przewodnik — Blog",
    description:
      "Przejście z CJS na ESM w Node.js — rozszerzenia .js, import.meta i kompatybilność.",
    keywords: "esm, es modules, commonjs, nodejs, typescript",
    robots: "index, follow",
    ogType: "article",
    twitterCard: "summary_large_image",
    articleJsonLd: {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: "ESM w Node.js — kompletny przewodnik",
      author: { "@type": "Person", name: "Adam Zagorski" },
      datePublished: "2026-02-10",
    },
  },
  {
    id: 7,
    title: "GitHub Actions — CI/CD od podstaw — Blog",
    description:
      "Pipeline CI/CD z GitHub Actions — testy, build, GHCR i deployment na VPS.",
    keywords: "github actions, ci/cd, ghcr, deployment, vps",
    robots: "index, follow",
    ogType: "article",
    twitterCard: "summary_large_image",
    articleJsonLd: {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: "GitHub Actions — CI/CD od podstaw",
      author: { "@type": "Person", name: "Adam Zagorski" },
      datePublished: "2026-02-05",
    },
  },
  {
    id: 8,
    title: "Nginx jako reverse proxy — konfiguracja produkcyjna — Blog",
    description:
      "Produkcyjna konfiguracja Nginx — TLS, upstream, cache i nagłówki bezpieczeństwa.",
    keywords: "nginx, reverse proxy, tls, security headers, cache",
    robots: "index, follow",
    ogType: "article",
    twitterCard: "summary_large_image",
    articleJsonLd: {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: "Nginx jako reverse proxy — konfiguracja produkcyjna",
      author: { "@type": "Person", name: "Adam Zagorski" },
      datePublished: "2026-01-30",
    },
  },
  {
    id: 9,
    title: "PostgreSQL 17 — nowości i optymalizacja — Blog",
    description:
      "Nowości w PostgreSQL 17 — incremental backup, JSON_TABLE i tuning wydajności.",
    keywords: "postgresql, bazy danych, performance, backup, json",
    robots: "index, follow",
    ogType: "article",
    twitterCard: "summary_large_image",
    articleJsonLd: {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: "PostgreSQL 17 — nowości i optymalizacja",
      author: { "@type": "Person", name: "Adam Zagorski" },
      datePublished: "2026-01-25",
    },
  },
  {
    id: 10,
    title: "Redis 7 — cache i sesje w praktyce — Blog",
    description:
      "Cache i sesje z Redis 7 w NestJS — AOF, eviction policies i cache-aside pattern.",
    keywords: "redis, cache, sesje, nestjs, aof",
    robots: "index, follow",
    ogType: "article",
    twitterCard: "summary_large_image",
    articleJsonLd: {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: "Redis 7 — cache i sesje w praktyce",
      author: { "@type": "Person", name: "Adam Zagorski" },
      datePublished: "2026-01-20",
    },
  },
  {
    id: 11,
    title: "Accessibility w React — praktyczny poradnik — Blog",
    description:
      "Dostępne komponenty React — ARIA, focus management i zgodność z WCAG 2.1.",
    keywords: "accessibility, a11y, react, aria, wcag",
    robots: "index, follow",
    ogType: "article",
    twitterCard: "summary_large_image",
    articleJsonLd: {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: "Accessibility w React — praktyczny poradnik",
      author: { "@type": "Person", name: "Adam Zagorski" },
      datePublished: "2026-01-15",
    },
  },
  {
    id: 12,
    title: "Vite 7 — co nowego w bundlerze — Blog",
    description: "Zmiany w Vite 7 — Environment API, szybszy HMR i Rollup 4.",
    keywords: "vite, bundler, hmr, environment api, frontend",
    robots: "index, follow",
    ogType: "article",
    twitterCard: "summary_large_image",
    articleJsonLd: {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: "Vite 7 — co nowego w bundlerze",
      author: { "@type": "Person", name: "Adam Zagorski" },
      datePublished: "2026-01-10",
    },
  },
  {
    id: 13,
    title: "CSS Modules vs styled-components — porównanie — Blog",
    description:
      "CSS Modules kontra styled-components — wydajność, bundle size i ergonomia w React.",
    keywords: "css modules, styled-components, react, performance, stylowanie",
    robots: "index, follow",
    ogType: "article",
    twitterCard: "summary_large_image",
    articleJsonLd: {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: "CSS Modules vs styled-components — porównanie",
      author: { "@type": "Person", name: "Adam Zagorski" },
      datePublished: "2026-01-05",
    },
  },
  {
    id: 14,
    title: "Prisma 7 — migracje i seeding — Blog",
    description:
      "Zarządzanie schematem bazy z Prisma 7 — migracje, seeding i workflow zespołowy.",
    keywords: "prisma, migracje, seeding, bazy danych, typescript",
    robots: "index, follow",
    ogType: "article",
    twitterCard: "summary_large_image",
    articleJsonLd: {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: "Prisma 7 — migracje i seeding",
      author: { "@type": "Person", name: "Adam Zagorski" },
      datePublished: "2025-12-28",
    },
  },
  {
    id: 15,
    title: "React 19 — Server Components i nowe API — Blog",
    description:
      "React 19 w pigułce — use(), Server Components, Actions i migracja z React 18.",
    keywords: "react 19, server components, hooks, use, actions",
    robots: "index, follow",
    ogType: "article",
    twitterCard: "summary_large_image",
    articleJsonLd: {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: "React 19 — Server Components i nowe API",
      author: { "@type": "Person", name: "Adam Zagorski" },
      datePublished: "2025-12-20",
    },
  },
];
