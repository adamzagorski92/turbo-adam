export interface ArticleContent {
  id: number;
  content: string;
}

export const ARTICLES_CONTENT_MOCK: ArticleContent[] = [
  {
    id: 1,
    content: `## Czym jest monorepo z Turborepo?

Monorepo to podejście, w którym wiele pakietów żyje w jednym repozytorium. Turborepo w połączeniu z pnpm workspaces daje nam potężne narzędzie do zarządzania zależnościami i cachowania buildów. Kluczem jest plik \`turbo.json\` definiujący pipeline — kolejność tasków, ich zależności i outputy do cache'owania. Dzięki temu rebuild dotyka tylko zmienionych pakietów. Konfiguracja \`pnpm-workspace.yaml\` wskazuje foldery \`apps/\` i \`packages/\`, a każdy pakiet ma własny \`package.json\` z zależnościami \`workspace:*\`. TypeScript strict mode wymusza bezpieczeństwo typów w całym monorepo.

## Remote caching i optymalizacja

Turborepo potrafi równolegle uruchamiać taski, co drastycznie skraca czas CI/CD. Zmiana w jednym pakiecie nie wymusza przebudowy całego repozytorium — Turborepo analizuje graf zależności i uruchamia tylko te taski, które są rzeczywiście dotknięte zmianą. Remote caching pozwala współdzielić wyniki buildów między członkami zespołu i środowiskami CI. Wystarczy skonfigurować token Vercel lub self-hosted cache server, a Turborepo automatycznie pobierze gotowe artefakty zamiast budować od zera. Filtrowanie tasków przez \`--filter=web...\` uruchamia build tylko dla wybranego pakietu i jego zależności.`,
  },
  {
    id: 2,
    content: `## Tokeny jako fundament Design System

CSS Design System zaczyna się od tokenów — CSS custom properties definiujących kolory, typografię, spacing, promienie i cienie. Tokeny to single source of truth dla całego UI. Na nich budujemy semantic variables: \`--color-fg-primary\`, \`--color-bg-canvas\`, które zmieniają wartości w zależności od motywu. Ciemny motyw to podmiana tych zmiennych w selektorze \`[data-theme='dark']\`. System wspiera też \`prefers-color-scheme\` dla automatycznego wykrywania.

## Architektura warstw tokenów

Architektura tokenów dzieli się na trzy warstwy: **primitive tokens** (surowe wartości jak \`#1a1a2e\`), **semantic tokens** (mapujące na kontekst jak \`--color-bg-canvas\`) i **component tokens** (specyficzne dla komponentów jak \`--button-bg\`). Primitive tokens nigdy nie są używane bezpośrednio w komponentach — zawsze przez warstwę semantyczną. Spacing tokens używają skali 4px — od \`--spacing-1\` (4px) do \`--spacing-16\` (64px). Shadow tokens definiują trzy poziomy elevation dla głębi wizualnej.`,
  },
  {
    id: 3,
    content: `## Driver Adapter Pattern w NestJS + Prisma

NestJS świetnie współpracuje z Prisma 7 dzięki driver adapter pattern. Zamiast pozwalać Prisma na bezpośrednie połączenie z bazą, tworzymy własny \`pg.Pool\` i przekazujemy go przez \`@prisma/adapter-pg\`. Daje to pełną kontrolę nad connection poolingiem. \`DatabaseService\` w NestJS inicjalizuje \`PrismaClient\` z adapterem w \`onModuleInit\` i zamyka połączenie w \`onModuleDestroy\`. Schema Prisma definiuje modele, relacje i indeksy.

## Zaawansowane scenariusze

Driver adapter pattern otwiera drzwi do zaawansowanych scenariuszy — na przykład **read replicas**, gdzie zapytania SELECT trafiają do repliki, a mutacje do primary. Prisma 7 wspiera typed SQL queries przez \`prisma.$queryRawTyped\`, co daje bezpieczeństwo typów nawet dla surowych zapytań SQL. Pool size konfigurujemy przez \`pg.Pool\` z min/max connections — dla małych VPS-ów sprawdza się max 5 połączeń z idle timeout 30 sekund.`,
  },
  {
    id: 4,
    content: `## Wielokontenerowe środowisko z Docker Compose

Docker Compose pozwala definiować wielokontenerowe środowiska deklaratywnie. W naszym stacku dev mamy kontenery: web (Vite z hot-reload), backend (NestJS z watch mode), postgres, redis i nginx jako reverse proxy. Nginx routuje \`/api/*\` do backendu, a resztę do frontendu. Multi-stage builds w Dockerfile minimalizują rozmiar obrazów produkcyjnych — etap builder instaluje zależności i buduje, a etap runtime kopiuje tylko artefakty.

## Optymalizacja warstw i healthchecki

Kluczowe jest prawidłowe cache'owanie warstw Docker — najpierw kopiujemy \`package.json\` i \`pnpm-lock.yaml\`, instalujemy zależności, a dopiero potem kopiujemy kod źródłowy. Dzięki temu zmiana w kodzie nie wymaga ponownej instalacji \`node_modules\`. W dev używamy bind mounts dla kodu źródłowego, ale named volumes dla \`node_modules\`. Healthchecki dla PostgreSQL używają \`pg_isready\`, dla Redis — \`redis-cli ping\`, a dla NestJS — curl na \`/api/health\`.`,
  },
  {
    id: 5,
    content: `## Vitest + Testing Library — testowanie komponentów

Vitest to natywny test runner dla Vite, współdzielący konfigurację i pipeline transformacji. W połączeniu z Testing Library testujemy komponenty React tak, jak używa ich użytkownik — przez role, labele i tekst, nie przez implementację. Setup file konfiguruje jsdom i rozszerza \`expect\` o matchers z \`@testing-library/jest-dom\`. Coverage zbieramy przez v8 provider z progami 80% dla lines, functions, branches i statements.

## Zaawansowane techniki testowania

Vitest watch mode wykorzystuje HMR Vite do natychmiastowego re-runu zmienionych testów. **Mock Service Worker** (MSW) przechwytuje requesty HTTP na poziomie service workera, co pozwala testować komponenty z realistycznymi odpowiedziami API bez uruchamiania backendu. Vitest wspiera concurrent mode — testy w jednym pliku mogą biec równolegle dzięki \`test.concurrent\`. In-source testing pozwala pisać testy bezpośrednio w pliku źródłowym.`,
  },
  {
    id: 6,
    content: `## Kluczowe zmiany w ES Modules

ES Modules w Node.js wymagają kilku kluczowych zmian. \`package.json\` musi mieć \`"type": "module"\`. Importy relatywne wymagają rozszerzenia \`.js\` — nawet dla plików \`.ts\`, bo TypeScript kompiluje do \`.js\`. Dynamic \`import()\` zastępuje \`require()\`. \`__dirname\` i \`__filename\` nie istnieją — używamy \`import.meta.url\` z \`fileURLToPath\`.

## Migracja i zaawansowane wzorce

Migracja z CJS do ESM wymaga systematycznego podejścia. Zaczynamy od zmiany \`"type": "module"\` w \`package.json\`, co sprawia że wszystkie pliki \`.js\` są traktowane jako ESM. Top-level await działa natywnie w ESM. Conditional exports w \`package.json\` przez pole \`"exports"\` pozwalają definiować różne entry points dla ESM i CJS konsumentów pakietu. Debugowanie ESM w VS Code wymaga konfiguracji \`launch.json\` z odpowiednim \`runtimeArgs\`.`,
  },
  {
    id: 7,
    content: `## Pipeline CI/CD z GitHub Actions

GitHub Actions to silnik CI/CD zintegrowany z GitHubem. Workflow definiujemy w YAML w \`.github/workflows/\`. Nasz pipeline: checkout → setup Node + pnpm → install → typecheck → build → test → push do GHCR → deploy na VPS. Cache'ujemy \`node_modules\` przez \`actions/cache\` z kluczem opartym na \`pnpm-lock.yaml\`. Matrix strategy pozwala testować na wielu wersjach Node.

## Zaawansowane funkcje Actions

Reusable workflows pozwalają współdzielić logikę CI między repozytoriami — definiujemy \`workflow_call\` z inputs i secrets. Concurrency groups zapobiegają równoległym deploymentom na to samo środowisko — nowy run anuluje poprzedni. OIDC token authentication eliminuje potrzebę przechowywania długoterminowych credentials — Actions dostaje krótkotrwały token od cloud providera. Self-hosted runners na VPS dają pełną kontrolę nad środowiskiem CI.`,
  },
  {
    id: 8,
    content: `## Nginx jako reverse proxy

Nginx jako reverse proxy to standard w produkcyjnych deploymentach. Konfiguracja upstream definiuje backendy z load balancingiem. Location \`/api/\` przekierowuje do NestJS z \`proxy_pass\` i stripuje prefix. TLS termination z certyfikatem Cloudflare Origin zapewnia bezpieczeństwo. Security headers: \`X-Content-Type-Options\`, \`X-Frame-Options\`, \`Strict-Transport-Security\`. Gzip compression dla \`text/html\`, \`application/json\` i CSS.

## Konfiguracja i bezpieczeństwo

Konfiguracja \`proxy_pass\` wymaga uwagi na trailing slash — location \`/api/\` z \`proxy_pass http://backend/\` stripuje prefix. WebSocket upgrade wymaga dodatkowych \`proxy_set_header Upgrade\` i \`Connection\`. Rate limiting przez \`limit_req_zone\` chroni przed DDoS — konfigurujemy strefę z rate 10r/s i burst 20. \`try_files $uri $uri/ /index.html\` obsługuje client-side routing w SPA.`,
  },
  {
    id: 9,
    content: `## Nowości w PostgreSQL 17

PostgreSQL 17 wprowadza incremental backup — \`pg_basebackup\` z \`--incremental\` pozwala tworzyć przyrostowe kopie. \`JSON_TABLE\` upraszcza parsowanie JSON w zapytaniach SQL. Performance: partition pruning jest szybszy, a vacuum ma lepszą obsługę dużych tabel. Dla aplikacji webowych kluczowe jest connection pooling — PgBouncer lub wbudowany w Prisma. Indeksy GIN dla full-text search i JSONB, B-tree dla prostych zapytań.

## Zaawansowane funkcje bazy danych

Partycjonowanie tabel przez \`PARTITION BY RANGE\` pozwala efektywnie zarządzać dużymi zbiorami danych — stare partycje można archiwizować bez wpływu na bieżące dane. **Row Level Security** (RLS) implementuje autoryzację na poziomie wiersza. \`LISTEN/NOTIFY\` implementuje pub/sub bezpośrednio w bazie — idealny mechanizm do powiadamiania aplikacji o zmianach w danych. Logical replication pozwala selektywnie replikować wybrane tabele do innych instancji.`,
  },
  {
    id: 10,
    content: `## Redis 7 — więcej niż cache

Redis 7 to nie tylko cache — to wielofunkcyjny data store. W naszym stacku służy jako cache odpowiedzi API i session store. AOF (Append Only File) persistence zapewnia trwałość danych po restarcie. Konfiguracja eviction policy: \`allkeys-lru\` usuwa najrzadziej używane klucze gdy pamięć się kończy. W NestJS integrujemy przez \`ioredis\` — \`RedisService\` zarządza połączeniem.

## Zaawansowane struktury danych

Redis Functions zastępują Lua scripting — pozwalają pisać złożoną logikę po stronie serwera. **Streams** to struktura danych do event sourcingu — idealny do logowania zdarzeń i kolejkowania zadań z consumer groups. Pipeline mode grupuje wiele komend w jednym round-trip do serwera — drastycznie redukuje latencję przy batch operacjach. Redis Sentinel zapewnia high availability z automatycznym failoverem.`,
  },
  {
    id: 11,
    content: `## Dostępność w aplikacjach React

Dostępność (a11y) to nie tylko wymóg prawny, ale dobra praktyka UX. W React zaczynamy od semantycznego HTML — \`button\` zamiast \`div\` z \`onClick\`, \`nav\` dla nawigacji, \`main\` dla głównej treści. ARIA attributes uzupełniają semantykę: \`aria-label\`, \`aria-expanded\`, \`aria-live\` dla dynamicznych treści. Focus management — po otwarciu modala focus idzie na pierwszy interaktywny element, po zamknięciu wraca.

## Nawigacja klawiaturą i testowanie

Keyboard navigation to fundament dostępności — każdy interaktywny element musi być osiągalny tabulacją. Focus trap w modalach zapewnia, że Tab nie wyjdzie poza dialog. \`aria-live\` regions powiadamiają screen readery o dynamicznych zmianach — \`polite\` czeka na przerwę w czytaniu, \`assertive\` przerywa natychmiast. \`prefers-reduced-motion\` media query wyłącza animacje dla użytkowników z vestibular disorders.`,
  },
  {
    id: 12,
    content: `## Vite 7 — Environment API i wydajność

Vite 7 wprowadza Environment API — zunifikowany sposób na konfigurację różnych środowisk (client, SSR, workery). Nowy dev server jest szybszy dzięki natywnym ESM i optymalizacjom HMR. Dependency pre-bundling przez esbuild jest bardziej inteligentny — automatycznie wykrywa zmiany w \`node_modules\`. CSS Modules mają lepszą obsługę z typowanymi importami. Build przez Rollup 4 generuje mniejsze bundle dzięki lepszemu tree-shaking.

## Zaawansowane możliwości

HMR w Vite 7 propaguje zmiany z chirurgiczną precyzją — edycja CSS Module odświeża tylko ten komponent, bez reload całej strony. Vite wspiera glob imports przez \`import.meta.glob\` — lazy loading modułów pasujących do wzorca. Library mode pozwala budować pakiety npm — konfiguracja \`build.lib\` definiuje entry points, formats (ESM, CJS) i external dependencies. Optimized deps discovery automatycznie pre-bundluje nowe zależności wykryte podczas dev.`,
  },
  {
    id: 13,
    content: `## CSS Modules vs Styled Components

CSS Modules oferują scoped styles bez runtime overhead — klasy są hashowane w build time. Każdy komponent importuje swój \`.module.css\` i używa klas jako obiekt JS. Zero kolizji nazw, zero bundle overhead. Styled-components dają dynamic styling z JS, ale kosztem runtime: generowanie CSS w JS, większy bundle, hydration issues w SSR. W naszym projekcie wybieramy **CSS Modules + postcss-nesting**.

## Zaawansowane wzorce stylowania

Composition w CSS Modules działa przez \`composes\` — pozwala dziedziczyć klasy z innych modułów bez duplikacji CSS. postcss-nesting pozwala na składnię nested selectors zgodną ze specyfikacją CSS Nesting. **CSS Layers** (\`@layer\`) organizują specyficzność — warstwa reset < base < components < utilities zapobiega wojnom specyficzności. **Container queries** (\`@container\`) pozwalają na responsive design na poziomie komponentu zamiast viewportu.`,
  },
  {
    id: 14,
    content: `## Prisma Migrate — deklaratywne migracje

Prisma Migrate to deklaratywny system migracji. Definiujesz docelowy schemat w \`schema.prisma\`, a Prisma generuje SQL migracji. \`prisma migrate dev\` tworzy migrację, aplikuje ją i regeneruje klienta. \`prisma migrate deploy\` aplikuje oczekujące migracje na produkcji — bez generowania nowych. \`prisma migrate reset\` czyści bazę i aplikuje wszystkie od zera — przydatne w dev.

## Ekosystem Prisma

Shadow database to mechanizm porównania aktualnego schematu z docelowym — tworzy tymczasową bazę, aplikuje wszystkie migracje i generuje diff. **Prisma Pulse** to real-time extension — nasłuchuje zmian w bazie i streamuje je do aplikacji przez type-safe API. **Prisma Accelerate** dodaje global edge cache i connection pooling — przydatne dla serverless deploymentów. Schema validation przez \`prisma validate\` sprawdza poprawność schematu bez generowania migracji.`,
  },
  {
    id: 15,
    content: `## React 19 — nowa era

React 19 to największa zmiana od Hooks. \`use()\` hook pozwala czytać Promise i Context w render — zastępuje \`useEffect\` dla data fetching. Server Components renderują się na serwerze, redukując bundle klienta. **Actions** to nowy wzorzec dla mutacji — \`useActionState\` zarządza stanem formularza, \`useOptimistic\` daje natychmiastowy feedback. \`ref\` jest teraz zwykłym propem — koniec z \`forwardRef\`.

## Nowe hooki i wzorce

\`use()\` hook ma fundamentalną różnicę od innych hooków — można go wywoływać warunkowo, wewnątrz pętli czy bloku \`if\`. Server Actions definiujemy przez dyrektywę \`'use server'\` — funkcje mogą być przekazywane jako prop \`action\` w formularzu. \`useFormStatus\` udostępnia stan bieżącej akcji formularza — \`pending\`, \`data\`, \`method\`. Transitions przez \`useTransition\` oznaczają aktualizacje jako low-priority — UI pozostaje responsywny podczas przetwarzania.`,
  },
  {
    id: 16,
    content: `## Czym jest TurboBundle?

TurboBundle to bundler nowej generacji napisany w Rust, zaprojektowany z myślą o szybkości. Dzięki natywnej kompilacji i wielowątkowemu przetwarzaniu, TurboBundle osiąga czas budowania nawet o 80% krótszy niż tradycyjne bundlery oparte na JavaScript. Integruje się bezproblemowo z istniejącymi projektami React, Vue i Svelte — wystarczy zamienić bundler w konfiguracji.

## Jak zacząć z TurboBundle?

Instalacja sprowadza się do jednej komendy: \`npm install -D turbobundle\`. Konfiguracja jest minimalna — TurboBundle automatycznie wykrywa framework i dostosowuje pipeline. Wspiera hot module replacement z natychmiastowym odświeżaniem, code splitting, tree shaking i lazy loading. Migracja z Webpack lub Vite wymaga jedynie podmianki konfiguracji — API jest kompatybilne z popularnymi pluginami.`,
  },
  {
    id: 17,
    content: `## Automatyzacja wdrożeń z AutoDeploy

AutoDeploy to platforma do automatyzacji deploymentów, która eliminuje ręczne procesy i minimalizuje ryzyko przestojów. Obsługuje strategie blue-green i canary deployment out of the box. Integracja z GitHub Actions, GitLab CI i Bitbucket Pipelines pozwala na seamless włączenie w istniejący workflow CI/CD.

## Zero-downtime w praktyce

AutoDeploy monitoruje healthchecki nowych instancji przed przełączeniem ruchu. Rollback jest automatyczny — jeśli nowa wersja nie przejdzie healthchecków, system wraca do poprzedniej wersji w sekundach. Dashboard w czasie rzeczywistym pokazuje status deploymentu, logi i metryki. Wspiera Docker, Kubernetes i bare-metal serwery z jednolitym interfejsem.`,
  },
];
