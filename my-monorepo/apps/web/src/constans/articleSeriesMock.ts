export interface ArticleSeries {
  id: string;
  title: string;
  description?: string;
  articles: string[];
}

export const ARTICLE_SERIES_MOCK: ArticleSeries[] = [
  {
    id: "full-stack-setup",
    title: "Full Stack Setup od Zera",
    description: "Monorepo, design system i backend - krok po kroku",
    articles: [
      "jak-zbudowac-monorepo-z-turborepo-i-pnpm",
      "css-design-system-od-zera-tokeny-motywy-layout",
      "nestjs-prisma-driver-adapter-pattern",
      "docker-compose-dla-full-stack-developera",
      "testowanie-komponentow-react-z-vitest-i-testing-library",
      "esm-w-nodejs-kompletny-przewodnik",
      "github-actions-cicd-od-podstaw",
      "nginx-jako-reverse-proxy-konfiguracja-produkcyjna",
      "postgresql-17-nowosci-i-optymalizacja",
      "redis-7-cache-i-sesje-w-praktyce",
    ],
  },
  {
    id: "react-19-focus",
    title: "React 19 Focus",
    articles: ["react-19-server-components-i-nowe-api"],
  },
];
