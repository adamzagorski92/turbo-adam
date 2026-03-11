import { useSearchParams } from "react-router";
import styles from "./BlogCard.module.css";

const POSTS_PER_PAGE = 10;

const MOCK_POSTS = [
  {
    id: 1,
    title: "Jak zbudować monorepo z Turborepo i pnpm",
    excerpt:
      "Praktyczny przewodnik po konfiguracji monorepo z użyciem Turborepo, pnpm workspaces i TypeScript. Dowiedz się, jak efektywnie zarządzać wieloma pakietami w jednym repozytorium.",
    date: "2026-03-10",
    author: "Adam",
    tags: ["Turborepo", "pnpm", "TypeScript"],
  },
  {
    id: 2,
    title: "CSS Design System od zera — tokeny, motywy, layout",
    excerpt:
      "Tworzenie skalowalnego systemu designu opartego na CSS custom properties. Od tokenów kolorów i typografii po ciemny motyw i responsywne layouty.",
    date: "2026-03-05",
    author: "Adam",
    tags: ["CSS", "Design System", "Tokeny"],
  },
  {
    id: 3,
    title: "NestJS + Prisma — driver adapter pattern",
    excerpt:
      "Jak połączyć NestJS z Prisma 7 używając @prisma/adapter-pg i surowego pg.Pool. Konfiguracja, migracje i best practices dla produkcyjnego API.",
    date: "2026-02-28",
    author: "Adam",
    tags: ["NestJS", "Prisma", "PostgreSQL"],
  },
  {
    id: 4,
    title: "Docker Compose dla full-stack developera",
    excerpt:
      "Konfiguracja środowisk dev i produkcyjnych z Docker Compose. Nginx jako reverse proxy, hot-reload w kontenerach i multi-stage builds.",
    date: "2026-02-20",
    author: "Adam",
    tags: ["Docker", "DevOps", "nginx"],
  },
  {
    id: 5,
    title: "Testowanie komponentów React z Vitest i Testing Library",
    excerpt:
      "Strategia testowania w monorepo — unit testy, snapshot testy i coverage. Konfiguracja Vitest z jsdom dla shared component library.",
    date: "2026-02-15",
    author: "Adam",
    tags: ["React", "Vitest", "Testing Library"],
  },
  {
    id: 6,
    title: "ESM w Node.js — kompletny przewodnik",
    excerpt:
      "Migracja z CommonJS do ES Modules w Node.js. Rozszerzenia .js w importach, package.json type module i kompatybilność z ekosystemem.",
    date: "2026-02-10",
    author: "Adam",
    tags: ["Node.js", "ESM", "TypeScript"],
  },
  {
    id: 7,
    title: "GitHub Actions — CI/CD od podstaw",
    excerpt:
      "Budowanie pipeline CI/CD z GitHub Actions. Automatyczne testy, build, push do GHCR i deployment na VPS.",
    date: "2026-02-05",
    author: "Adam",
    tags: ["CI/CD", "GitHub Actions", "DevOps"],
  },
  {
    id: 8,
    title: "Nginx jako reverse proxy — konfiguracja produkcyjna",
    excerpt:
      "Konfiguracja Nginx dla aplikacji full-stack. TLS termination, upstream balancing, cache headers i security headers.",
    date: "2026-01-30",
    author: "Adam",
    tags: ["nginx", "DevOps", "Security"],
  },
  {
    id: 9,
    title: "PostgreSQL 17 — nowości i optymalizacja",
    excerpt:
      "Przegląd nowych funkcji PostgreSQL 17. Incremental backup, JSON improvements i performance tuning dla aplikacji webowych.",
    date: "2026-01-25",
    author: "Adam",
    tags: ["PostgreSQL", "Bazy danych", "Performance"],
  },
  {
    id: 10,
    title: "Redis 7 — cache i sesje w praktyce",
    excerpt:
      "Implementacja cache'owania i zarządzania sesjami z Redis 7. AOF persistence, eviction policies i integracja z NestJS.",
    date: "2026-01-20",
    author: "Adam",
    tags: ["Redis", "Cache", "NestJS"],
  },
  {
    id: 11,
    title: "Accessibility w React — praktyczny poradnik",
    excerpt:
      "Tworzenie dostępnych komponentów React. ARIA attributes, focus management, screen reader testing i WCAG 2.1 compliance.",
    date: "2026-01-15",
    author: "Adam",
    tags: ["React", "A11y", "UX"],
  },
  {
    id: 12,
    title: "Vite 7 — co nowego w bundlerze",
    excerpt:
      "Przegląd zmian w Vite 7. Environment API, nowy dev server, HMR improvements i migracja z poprzednich wersji.",
    date: "2026-01-10",
    author: "Adam",
    tags: ["Vite", "Frontend", "Tooling"],
  },
  {
    id: 13,
    title: "CSS Modules vs styled-components — porównanie",
    excerpt:
      "Szczegółowe porównanie podejść do stylowania w React. Performance, DX, bundle size i kiedy wybrać które rozwiązanie.",
    date: "2026-01-05",
    author: "Adam",
    tags: ["CSS", "React", "Performance"],
  },
  {
    id: 14,
    title: "Prisma 7 — migracje i seeding",
    excerpt:
      "Zarządzanie schematem bazy danych z Prisma. Migration workflow, seeding, reset i best practices dla zespołów.",
    date: "2025-12-28",
    author: "Adam",
    tags: ["Prisma", "Bazy danych", "TypeScript"],
  },
  {
    id: 15,
    title: "React 19 — Server Components i nowe API",
    excerpt:
      "Przegląd React 19. use() hook, Server Components, Actions, useOptimistic i strategie migracji z React 18.",
    date: "2025-12-20",
    author: "Adam",
    tags: ["React", "Frontend", "SSR"],
  },
];

const BlogCard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page") || "1");
  const totalPages = Math.ceil(MOCK_POSTS.length / POSTS_PER_PAGE);

  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const paginatedPosts = MOCK_POSTS.slice(
    startIndex,
    startIndex + POSTS_PER_PAGE,
  );

  const goToPage = (page: number) => {
    setSearchParams({ page: String(page) });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={styles.list}>
      {paginatedPosts.map((post) => (
        <article key={post.id} className={styles.card}>
          <div className={styles.thumbnail}>
            <svg
              className={styles.thumbnailSvg}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="9" cy="9" r="2" />
              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
            </svg>
          </div>
          <div className={styles.cardBody}>
            <div className={styles.meta}>
              <time dateTime={post.date}>{post.date}</time>
              <span>{post.author}</span>
            </div>
            <h3 className={styles.title}>{post.title}</h3>
            <p className={styles.excerpt}>{post.excerpt}</p>
            <div className={styles.tags}>
              {post.tags.map((tag) => (
                <span key={tag} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </article>
      ))}

      {totalPages > 1 && (
        <nav className={styles.pagination} aria-label="Paginacja wpisów">
          <button
            className={styles.pageButton}
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage <= 1}
          >
            ← Poprzednia
          </button>
          <div className={styles.pageNumbers}>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`${styles.pageNumber} ${page === currentPage ? styles.pageNumberActive : ""}`}
                onClick={() => goToPage(page)}
                aria-current={page === currentPage ? "page" : undefined}
              >
                {page}
              </button>
            ))}
          </div>
          <button
            className={styles.pageButton}
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage >= totalPages}
          >
            Następna →
          </button>
        </nav>
      )}
    </div>
  );
};

export default BlogCard;
