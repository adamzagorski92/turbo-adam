# Web (React SPA)

Frontend for the turbo-adam monorepo — React 19 + Vite 7 + React Router 7 + i18next.

## Stack

| Technology                | Version           | Role                            |
| ------------------------- | ----------------- | ------------------------------- |
| React                     | 19.2              | UI                              |
| Vite                      | 7.2               | Bundler + dev server            |
| React Router              | 7.13 (data mode)  | Routing (`createBrowserRouter`) |
| CSS Modules               | —                 | Styling (+ PostCSS Nesting)     |
| i18next + react-i18next   | 25 / 16           | Internationalization (PL / EN)  |
| react-helmet-async        | 3.0               | SEO — dynamic meta tags         |
| react-markdown            | 10.1              | Article content rendering       |
| lucide-react              | 0.575             | Icons                           |
| `@my-monorepo/components` | workspace         | Shared UI components            |
| `@my-monorepo/styles`     | workspace         | Design tokens, themes, base CSS |
| Vitest + Testing Library  | 4.0               | Testing                         |
| TypeScript                | 5.9 (strict, ESM) | Language                        |

## Routing

```
/                    → HomePage (hero + projects + promo)
/blog                → ArticleList (paginated article list)
/blog/:slug          → Article (Markdown content + FAQ)
```

Router: `src/features/App/router.tsx` — `createBrowserRouter` with layouts:

```
RootSeoLayout           ← GlobalSeo (meta tags per route)
├── MainLayout          ← Navbar + Footer
│   └── /              → HomePage
└── BlogLayout          ← BlogNavbar + Sidebar + Drawer (mobile)
    ├── /blog          → ArticleList
    └── /blog/:slug    → Article
```

## `src/` structure

```
src/
├── assets/              # Logo, static images
├── components/          # Local shared components
│   ├── AboveTheFold/    # Hero section
│   ├── Card/            # Article card
│   ├── GlobalSeo/       # Route-aware SEO handler
│   ├── LanguageSwitcher/ # PL/EN switcher
│   ├── Logo/
│   ├── ProjectLink/
│   └── SeoHelmet/       # react-helmet-async wrapper
├── constans/            # Article mock data + links
├── features/
│   ├── App/             # Entry point + router
│   ├── Footer/
│   ├── HomePage/        # Home page (sections: ATF, projects, promo)
│   ├── Navbar/
│   ├── RootSeoLayout/
│   ├── TopNavigation/
│   └── blog/            # Full blog module
│       ├── Article/         # Article view
│       ├── ArticleFaq/      # Per-article FAQ
│       ├── ArticleList/     # List with pagination
│       ├── AsideData/       # Sidebar data
│       ├── BlogLayout/      # Blog layout (drawer, scroll-to-top)
│       ├── BlogNavbar/      # Blog navigation
│       ├── Breadcrumbs/     # Breadcrumbs
│       ├── SidebarMenuLayout/
│       └── SideTreeNavigation/ # Category tree (useMenuStack hook)
├── i18n/                # Config + translation files (pl/, en/)
├── leyouts/             # MainLayout (Navbar + Outlet + Footer)
├── types/               # Shared types
└── main.tsx             # Entry point
```

## i18n

- Languages: **Polish** (default), **English**
- Persistence: `localStorage`
- Translation files: `src/i18n/pl/*.json`, `src/i18n/en/*.json` (Blog, HomePage, Links, UI)
- Component: `LanguageSwitcher` (`i18n.changeLanguage()`)

## Application state

| Type            | Where          | Description                                         |
| --------------- | -------------- | --------------------------------------------------- |
| Component state | `BlogLayout`   | `activeDrawer` — open/close drawer                  |
| Custom hook     | `useMenuStack` | `stack[]` + `selected` Set — filter tree navigation |
| URL state       | React Router   | Article slug (`:slug`), pagination (`?page=N`)      |
| i18n state      | react-i18next  | Language in `localStorage`                          |
| Article data    | Local mocks    | `constans/` — cards, Markdown content, FAQ, meta    |

## Environment variables

| Variable           | Description                                |
| ------------------ | ------------------------------------------ |
| `VITE_*`           | Public variables (available in client)     |
| `DEFAULT_SITE_URL` | Site URL (used for SEO, set at build time) |

## Development

```bash
pnpm --filter web dev              # Vite dev server (:5173)
```

Or via Docker Compose (recommended):

```bash
pnpm compose:dev up                # full stack with nginx on :8080
```

## Build

```bash
pnpm --filter web build            # tsc -b + vite build → dist/
```

## Tests

```bash
pnpm --filter web test             # Vitest run
pnpm --filter web test:watch       # Vitest watch
pnpm --filter web test:cov         # Vitest + coverage
```

## Docker

- `Dockerfile` — multi-stage (deps → build → nginx:1.27-alpine serving static)
- `Dockerfile.dev` — Vite dev server with hot-reload (mounted source code)
