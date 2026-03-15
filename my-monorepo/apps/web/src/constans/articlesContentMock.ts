export interface ArticleContent {
  id: number;
  content: string;
}

export const ARTICLES_CONTENT_MOCK: ArticleContent[] = [
  {
    id: 1,
    content:
      "Monorepo to podejście, w którym wiele pakietów żyje w jednym repozytorium. Turborepo w połączeniu z pnpm workspaces daje nam potężne narzędzie do zarządzania zależnościami i cachowania buildów. Kluczem jest plik turbo.json definiujący pipeline — kolejność tasków, ich zależności i outputy do cache'owania. Dzięki temu rebuild dotyka tylko zmienionych pakietów. Konfiguracja pnpm-workspace.yaml wskazuje foldery apps/ i packages/, a każdy pakiet ma własny package.json z zależnościami workspace:*. TypeScript strict mode wymusza bezpieczeństwo typów w całym monorepo. Ważne jest też prawidłowe ustawienie tsconfig z references między pakietami, co przyspiesza typecheck. Turborepo potrafi równolegle uruchamiać taski, co drastycznie skraca czas CI/CD.",
  },
  {
    id: 2,
    content:
      "CSS Design System zaczyna się od tokenów — CSS custom properties definiujących kolory, typografię, spacing, promienie i cienie. Tokeny to single source of truth dla całego UI. Na nich budujemy semantic variables: --color-fg-primary, --color-bg-canvas, które zmieniają wartości w zależności od motywu. Ciemny motyw to podmiana tych zmiennych w selektorze [data-theme='dark']. System wspiera też prefers-color-scheme dla automatycznego wykrywania. Layout opiera się na tokenach spacing i CSS Grid. Reset normalizuje style przeglądarek, a typography.css ustawia skalę fontów. Całość importowana jest z pakietu @my-monorepo/styles, co zapewnia spójność między apps/ i packages/.",
  },
  {
    id: 3,
    content:
      "NestJS świetnie współpracuje z Prisma 7 dzięki driver adapter pattern. Zamiast pozwalać Prisma na bezpośrednie połączenie z bazą, tworzymy własny pg.Pool i przekazujemy go przez @prisma/adapter-pg. Daje to pełną kontrolę nad connection poolingiem. DatabaseService w NestJS inicjalizuje PrismaClient z adapterem w onModuleInit i zamyka połączenie w onModuleDestroy. Schema Prisma definiuje modele, relacje i indeksy. Migracje tworzymy przez prisma migrate dev, a na produkcji aplikujemy przez prisma migrate deploy. Prisma Client jest generowany do folderu generated/ i gitignorowany — każde środowisko generuje go lokalnie.",
  },
  {
    id: 4,
    content:
      "Docker Compose pozwala definiować wielokontenerowe środowiska deklaratywnie. W naszym stacku dev mamy kontenery: web (Vite z hot-reload), backend (NestJS z watch mode), postgres, redis i nginx jako reverse proxy. Nginx routuje /api/* do backendu, a resztę do frontendu. Multi-stage builds w Dockerfile minimalizują rozmiar obrazów produkcyjnych — etap builder instaluje zależności i buduje, a etap runtime kopiuje tylko artefakty. Volumes montują kod źródłowy dla hot-reload w dev, ale w produkcji kod jest wbudowany w obraz. Docker networks izolują usługi, a healthchecki dbają o prawidłową kolejność startu.",
  },
  {
    id: 5,
    content:
      "Vitest to natywny test runner dla Vite, współdzielący konfigurację i pipeline transformacji. W połączeniu z Testing Library testujemy komponenty React tak, jak używa ich użytkownik — przez role, labele i tekst, nie przez implementację. Setup file konfiguruje jsdom i rozszerza expect o matchers z @testing-library/jest-dom. Snapshot testy łapią niezamierzone zmiany w renderowanym HTML. Coverage zbieramy przez v8 provider z progami 80% dla lines, functions, branches i statements. W monorepo każdy pakiet ma własny vitest.config — web i components używają jsdom, backend używa Jest z ts-jest.",
  },
  {
    id: 6,
    content:
      'ES Modules w Node.js wymagają kilku kluczowych zmian. Package.json musi mieć "type": "module". Importy relatywne wymagają rozszerzenia .js — nawet dla plików .ts, bo TypeScript kompiluje do .js. Dynamic import() zastępuje require(). __dirname i __filename nie istnieją — używamy import.meta.url z fileURLToPath. Tsconfig potrzebuje "module": "nodenext" i "moduleResolution": "nodenext". Niektóre pakiety npm nadal są CJS — Node.js potrafi je importować przez named imports, ale default export wymaga .default. ESM jest przyszłością Node.js i daje korzyści jak tree-shaking i statyczna analiza importów.',
  },
  {
    id: 7,
    content:
      "GitHub Actions to silnik CI/CD zintegrowany z GitHubem. Workflow definiujemy w YAML w .github/workflows/. Nasz pipeline: checkout → setup Node + pnpm → install → typecheck → build → test → push do GHCR → deploy na VPS. Cache'ujemy node_modules przez actions/cache z kluczem opartym na pnpm-lock.yaml. Matrix strategy pozwala testować na wielu wersjach Node. Secrets przechowują tokeny i klucze SSH. Deployment na Mikrus VPS przez SSH — pull nowych obrazów z GHCR i docker compose up. Branch protection rules wymuszają przejście CI przed merge do main.",
  },
  {
    id: 8,
    content:
      "Nginx jako reverse proxy to standard w produkcyjnych deploymentach. Konfiguracja upstream definiuje backendy z load balancingiem. Location /api/ przekierowuje do NestJS z proxy_pass i stripuje prefix. TLS termination z certyfikatem Cloudflare Origin — ssl_certificate i ssl_certificate_key. Security headers: X-Content-Type-Options, X-Frame-Options, Strict-Transport-Security. Gzip compression dla text/html, application/json i CSS. Cache headers dla statycznych assetów — immutable z długim max-age dla hashowanych plików Vite. Worker processes ustawiamy na auto, a worker connections na 1024 dla małych VPS-ów.",
  },
  {
    id: 9,
    content:
      "PostgreSQL 17 wprowadza incremental backup — pg_basebackup z --incremental pozwala tworzyć przyrostowe kopie. JSON_TABLE upraszcza parsowanie JSON w zapytaniach SQL. Nowy merge command jest w pełni zgodny ze standardem SQL. Performance: partition pruning jest szybszy, a vacuum ma lepszą obsługę dużych tabel. Monitoring przez pg_stat_io daje wgląd w I/O operacje. Dla aplikacji webowych kluczowe jest connection pooling — PgBouncer lub wbudowany w Prisma. Indeksy GIN dla full-text search i JSONB, B-tree dla prostych zapytań. EXPLAIN ANALYZE to podstawowe narzędzie do optymalizacji.",
  },
  {
    id: 10,
    content:
      "Redis 7 to nie tylko cache — to wielofunkcyjny data store. W naszym stacku służy jako cache odpowiedzi API i session store. AOF (Append Only File) persistence zapewnia trwałość danych po restarcie. Konfiguracja eviction policy: allkeys-lru usuwa najrzadziej używane klucze gdy pamięć się kończy. TTL na kluczach automatycznie czyści stare dane. W NestJS integrujemy przez ioredis — RedisService zarządza połączeniem i udostępnia metody get/set/del. Cache-aside pattern: sprawdź Redis → jeśli brak, pobierz z DB → zapisz w Redis. Pub/Sub w Redis nadaje się do real-time notyfikacji między instancjami.",
  },
  {
    id: 11,
    content:
      "Dostępność (a11y) to nie tylko wymóg prawny, ale dobra praktyka UX. W React zaczynamy od semantycznego HTML — button zamiast div z onClick, nav dla nawigacji, main dla głównej treści. ARIA attributes uzupełniają semantykę: aria-label, aria-expanded, aria-live dla dynamicznych treści. Focus management — po otwarciu modala focus idzie na pierwszy interaktywny element, po zamknięciu wraca. Skip links pozwalają pominąć nawigację. Kontrast minimum 4.5:1 dla tekstu. Testing Library naturalnie wspiera a11y — getByRole wymusza prawidłowe role. Axe-core w testach automatycznie wykrywa problemy.",
  },
  {
    id: 12,
    content:
      "Vite 7 wprowadza Environment API — zunifikowany sposób na konfigurację różnych środowisk (client, SSR, workery). Nowy dev server jest szybszy dzięki natywnym ESM i optymalizacjom HMR. Dependency pre-bundling przez esbuild jest teraz bardziej inteligentny — automatycznie wykrywa zmiany w node_modules. CSS Modules mają lepszą obsługę z typowanymi importami. Config file wspiera TypeScript bez dodatkowej konfiguracji. Build przez Rollup 4 generuje mniejsze bundle dzięki lepszemu tree-shaking. Plugin API jest stabilniejsze z pełną kompatybilnością wsteczną. Migracja z Vite 6 wymaga minimalnych zmian — głównie aktualizacji zależności.",
  },
  {
    id: 13,
    content:
      "CSS Modules oferują scoped styles bez runtime overhead — klasy są hashowane w build time. Każdy komponent importuje swój .module.css i używa klas jako obiekt JS. Zero kolizji nazw, zero bundle overhead. Styled-components dają dynamic styling z JS, ale kosztem runtime: generowanie CSS w JS, większy bundle, hydration issues w SSR. Performance: CSS Modules wygrywają — style są statyczne, parsowane raz przez przeglądarkę. DX: styled-components mają lepszą ergonomię dla dynamicznych stylów. W naszym projekcie wybieramy CSS Modules + postcss-nesting dla nested selectors. Design tokens przez CSS custom properties działają z oboma podejściami.",
  },
  {
    id: 14,
    content:
      "Prisma Migrate to deklaratywny system migracji. Definiujesz docelowy schemat w schema.prisma, a Prisma generuje SQL migracji. prisma migrate dev tworzy migrację, aplikuje ją i regeneruje klienta. prisma migrate deploy aplikuje oczekujące migracje na produkcji — bez generowania nowych. prisma migrate reset czyści bazę i aplikuje wszystkie od zera — przydatne w dev. Seeding przez prisma db seed wykonuje skrypt TypeScript wypełniający bazę danymi testowymi. Best practice: każda migracja w osobnym folderze z timestamp, SQL i metadata. Nigdy nie edytuj istniejących migracji — twórz nowe korygujące.",
  },
  {
    id: 15,
    content:
      "React 19 to największa zmiana od Hooks. use() hook pozwala czytać Promise i Context w render — zastępuje useEffect dla data fetching. Server Components renderują się na serwerze, redukując bundle klienta. Actions to nowy wzorzec dla mutacji — useActionState zarządza stanem formularza, useOptimistic daje natychmiastowy feedback. ref jest teraz zwykłym propem — koniec z forwardRef. Suspense boundaries obsługują loading states deklaratywnie. Compiler React (dawniej React Forget) automatycznie memoizuje komponenty. Migracja z React 18: usuń niepotrzebne useMemo/useCallback, zamień useEffect na use() dla fetching.",
  },
];
