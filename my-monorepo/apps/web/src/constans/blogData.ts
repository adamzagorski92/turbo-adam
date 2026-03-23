export interface BlogEntity {
  id: string;
  label: string;
}

export interface BlogCategory extends BlogEntity {
  subcategories?: BlogEntity[];
}

export interface BlogSection {
  id: string;
  label: string;
}

export type TranslateFn = (key: string) => string;

export const sectionKey = (id: string) => `blog.sections.${id}`;

export const BLOG_SECTIONS: BlogSection[] = [
  { id: "categories", label: "Kategorie" },
  { id: "tags", label: "Tagi" },
  { id: "authors", label: "Autorzy" },
  { id: "dates", label: "Daty publikacji" },
  { id: "types", label: "Typy wpisów" },
];

export const TAGS: BlogEntity[] = [
  { id: "a11y", label: "A11y" },
  { id: "cache", label: "Cache" },
  { id: "ci-cd", label: "CI/CD" },
  { id: "connection-pooling", label: "Connection pooling" },
  { id: "coverage", label: "Coverage" },
  { id: "custom-properties", label: "Custom properties" },
  { id: "dark-mode", label: "Dark mode" },
  { id: "design-system", label: "Design System" },
  { id: "esm", label: "ESM" },
  { id: "hot-reload", label: "Hot-reload" },
  { id: "i18n", label: "i18n" },
  { id: "migracje", label: "Migracje" },
  { id: "monorepo", label: "Monorepo" },
  { id: "multi-stage-builds", label: "Multi-stage builds" },
  { id: "performance", label: "Performance" },
  { id: "reverse-proxy", label: "Reverse proxy" },
  { id: "security", label: "Security" },
  { id: "snapshot-testing", label: "Snapshot testing" },
  { id: "ssr", label: "SSR" },
  { id: "state-management", label: "State management" },
  { id: "tokeny", label: "Tokeny" },
  { id: "tooling", label: "Tooling" },
  { id: "ux", label: "UX" },
  { id: "wcag", label: "WCAG" },
  { id: "workspaces", label: "Workspaces" },
];

export const CATEGORIES: BlogCategory[] = [
  {
    id: "frontend",
    label: "Frontend",
    subcategories: [
      { id: "react", label: "React" },
      { id: "vue", label: "Vue" },
      { id: "angular", label: "Angular" },
      { id: "svelte", label: "Svelte" },
      { id: "css", label: "CSS" },
      { id: "nextjs", label: "Next.js" },
      { id: "nuxt", label: "Nuxt" },
      { id: "remix", label: "Remix" },
      { id: "astro", label: "Astro" },
      { id: "solidjs", label: "SolidJS" },
      { id: "preact", label: "Preact" },
      { id: "qwik", label: "Qwik" },
      { id: "htmx", label: "HTMX" },
      { id: "alpine", label: "Alpine.js" },
      { id: "lit", label: "Lit" },
      { id: "stencil", label: "Stencil" },
      { id: "ember", label: "Ember.js" },
      { id: "backbone", label: "Backbone.js" },
      { id: "mithril", label: "Mithril" },
      { id: "inferno", label: "Inferno" },
      { id: "riot", label: "Riot.js" },
      { id: "marko", label: "Marko" },
      { id: "stimulus", label: "Stimulus" },
      { id: "petite-vue", label: "Petite Vue" },
      { id: "hyperapp", label: "Hyperapp" },
      { id: "typescript", label: "TypeScript" },
      { id: "javascript", label: "JavaScript" },
      { id: "html5", label: "HTML5" },
      { id: "sass", label: "Sass" },
      { id: "less", label: "Less" },
      { id: "tailwind", label: "Tailwind CSS" },
      { id: "bootstrap", label: "Bootstrap" },
      { id: "bulma", label: "Bulma" },
      { id: "foundation", label: "Foundation" },
      { id: "materialize", label: "Materialize" },
      { id: "chakra-ui", label: "Chakra UI" },
      { id: "mui", label: "Material UI" },
      { id: "ant-design", label: "Ant Design" },
      { id: "radix", label: "Radix UI" },
      { id: "headless-ui", label: "Headless UI" },
      { id: "shadcn", label: "shadcn/ui" },
      { id: "daisyui", label: "DaisyUI" },
      { id: "mantine", label: "Mantine" },
      { id: "park-ui", label: "Park UI" },
      { id: "panda-css", label: "Panda CSS" },
      { id: "vanilla-extract", label: "Vanilla Extract" },
      { id: "styled-components", label: "Styled Components" },
      { id: "emotion", label: "Emotion" },
      { id: "css-modules", label: "CSS Modules" },
      { id: "postcss", label: "PostCSS" },
      { id: "webpack", label: "Webpack" },
      { id: "vite", label: "Vite" },
      { id: "esbuild", label: "esbuild" },
      { id: "rollup", label: "Rollup" },
      { id: "parcel", label: "Parcel" },
      { id: "turbopack", label: "Turbopack" },
      { id: "rspack", label: "Rspack" },
      { id: "swc", label: "SWC" },
      { id: "babel", label: "Babel" },
      { id: "biome", label: "Biome" },
      { id: "eslint", label: "ESLint" },
      { id: "prettier", label: "Prettier" },
      { id: "stylelint", label: "Stylelint" },
      { id: "storybook", label: "Storybook" },
      { id: "chromatic", label: "Chromatic" },
      { id: "vitest", label: "Vitest" },
      { id: "jest", label: "Jest" },
      { id: "cypress", label: "Cypress" },
      { id: "playwright", label: "Playwright" },
      { id: "testing-library", label: "Testing Library" },
      { id: "msw", label: "MSW" },
      { id: "react-query", label: "React Query" },
      { id: "swr", label: "SWR" },
      { id: "zustand", label: "Zustand" },
      { id: "jotai", label: "Jotai" },
      { id: "recoil", label: "Recoil" },
      { id: "redux", label: "Redux" },
      { id: "mobx", label: "MobX" },
      { id: "xstate", label: "XState" },
      { id: "pinia", label: "Pinia" },
      { id: "vuex", label: "Vuex" },
      { id: "ngrx", label: "NgRx" },
      { id: "react-router", label: "React Router" },
      { id: "tanstack-router", label: "TanStack Router" },
      { id: "react-hook-form", label: "React Hook Form" },
      { id: "formik", label: "Formik" },
      { id: "zod", label: "Zod" },
      { id: "yup", label: "Yup" },
      { id: "framer-motion", label: "Framer Motion" },
      { id: "gsap", label: "GSAP" },
      { id: "three-js", label: "Three.js" },
      { id: "d3", label: "D3.js" },
      { id: "chart-js", label: "Chart.js" },
      { id: "recharts", label: "Recharts" },
      { id: "i18next", label: "i18next" },
      { id: "date-fns", label: "date-fns" },
      { id: "lodash", label: "Lodash" },
      { id: "axios", label: "Axios" },
      { id: "pwa", label: "PWA" },
      { id: "web-components", label: "Web Components" },
      { id: "wasm", label: "WebAssembly" },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    subcategories: [
      { id: "node", label: "Node.js" },
      { id: "python", label: "Python" },
    ],
  },
  { id: "bazy-danych", label: "Bazy danych" },
  { id: "devops", label: "DevOps" },
  { id: "narzedzia", label: "Narzędzia" },
  { id: "testowanie", label: "Testowanie" },
];

export const AUTHORS: BlogEntity[] = [
  { id: "adam", label: "Adam" },
  { id: "ewa", label: "Ewa" },
];

export const ARTICLE_TYPES: BlogEntity[] = [
  { id: "sponsored", label: "sponsored" },
  { id: "unsponsored", label: "unsponsored" },
];

export const PUBLICATION_DATES: BlogEntity[] = [
  { id: "2025/sty", label: "Styczeń 2025" },
  { id: "2025/lut", label: "Luty 2025" },
  { id: "2025/mar", label: "Marzec 2025" },
  { id: "2025/kwi", label: "Kwiecień 2025" },
  { id: "2025/maj", label: "Maj 2025" },
  { id: "2025/cze", label: "Czerwiec 2025" },
  { id: "2025/lip", label: "Lipiec 2025" },
  { id: "2025/sie", label: "Sierpień 2025" },
  { id: "2025/wrz", label: "Wrzesień 2025" },
  { id: "2025/paź", label: "Październik 2025" },
  { id: "2025/lis", label: "Listopad 2025" },
  { id: "2025/gru", label: "Grudzień 2025" },
  { id: "2026/sty", label: "Styczeń 2026" },
  { id: "2026/lut", label: "Luty 2026" },
  { id: "2026/mar", label: "Marzec 2026" },
];

const MONTH_KEY_MAP: Record<string, string> = {
  sty: "blog.months.jan",
  lut: "blog.months.feb",
  mar: "blog.months.mar",
  kwi: "blog.months.apr",
  maj: "blog.months.may",
  cze: "blog.months.jun",
  lip: "blog.months.jul",
  sie: "blog.months.aug",
  wrz: "blog.months.sep",
  paź: "blog.months.oct",
  lis: "blog.months.nov",
  gru: "blog.months.dec",
};

export const getPublicationDates = (t: TranslateFn): BlogEntity[] =>
  PUBLICATION_DATES.map(({ id }) => {
    const [year, monthKey] = id.split("/");
    const key = MONTH_KEY_MAP[monthKey];
    return { id, label: key ? `${t(key)} ${year}` : id };
  });
