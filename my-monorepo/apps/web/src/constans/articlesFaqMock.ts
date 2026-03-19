export interface FaqItem {
  question: string;
  answer: string;
}

export interface ArticleFaq {
  id: number;
  faq: FaqItem[];
}

export const ARTICLES_FAQ_MOCK: ArticleFaq[] = [
  {
    id: 1,
    faq: [
      {
        question: "Czym Turborepo różni się od Nx?",
        answer:
          "Turborepo jest lżejszy i prostszy w konfiguracji — wystarczy plik turbo.json. Nx oferuje więcej generatorów i pluginów, ale kosztem większej złożoności. Turborepo lepiej integruje się z pnpm workspaces i skupia na cachowaniu tasków.",
      },
      {
        question: "Czy Turborepo wymaga pnpm jako package managera?",
        answer:
          "Nie — Turborepo wspiera npm, yarn i pnpm. Jednak pnpm workspaces są rekomendowane ze względu na szybkość instalacji, oszczędność dysku i natywne wsparcie dla workspace protocol (workspace:*).",
      },
      {
        question: "Jak działa remote caching w Turborepo?",
        answer:
          "Remote caching zapisuje wyniki tasków (build, test) na zewnętrznym serwerze. Gdy inny developer lub CI uruchamia ten sam task z tymi samymi inputami, Turborepo pobiera gotowy wynik zamiast budować od zera. Można użyć Vercel Remote Cache lub self-hosted rozwiązania.",
      },
    ],
  },
  {
    id: 2,
    faq: [
      {
        question: "Co to są design tokens w CSS?",
        answer:
          "Design tokens to CSS custom properties (np. --color-primary, --space-4) definiujące podstawowe wartości systemu designu — kolory, spacing, typografię, cienie i promienie. Służą jako single source of truth dla spójnego wyglądu UI.",
      },
      {
        question: "Jak zaimplementować ciemny motyw oparty na tokenach?",
        answer:
          "Definiujemy dwa zestawy semantic tokens — dla jasnego i ciemnego motywu. Przełączanie odbywa się przez atrybut [data-theme='dark'] na elemencie :root lub automatycznie przez @media (prefers-color-scheme: dark). Podmiana wartości tokenów zmienia cały UI.",
      },
      {
        question: "Jaka jest różnica między primitive a semantic tokens?",
        answer:
          "Primitive tokens to surowe wartości (np. #1a1a2e), a semantic tokens mapują je na kontekst użycia (np. --color-bg-canvas). Komponenty używają wyłącznie semantic tokens, co umożliwia łatwą zmianę motywu bez modyfikacji kodu komponentów.",
      },
    ],
  },
  {
    id: 3,
    faq: [
      {
        question: "Co to jest driver adapter pattern w Prisma?",
        answer:
          "Driver adapter pattern pozwala przekazać własny sterownik bazy danych (np. pg.Pool) do Prisma Client zamiast korzystać z wbudowanego. Daje to pełną kontrolę nad connection poolingiem, timeoutami i konfiguracją połączenia.",
      },
      {
        question:
          "Dlaczego warto używać @prisma/adapter-pg zamiast domyślnego połączenia?",
        answer:
          "Adapter pg daje kontrolę nad pulą połączeń (min/max connections, idle timeout), umożliwia konfigurację read replicas i pozwala korzystać z zaawansowanych funkcji PostgreSQL jak LISTEN/NOTIFY bezpośrednio przez ten sam pool.",
      },
      {
        question: "Jak wygląda lifecycle PrismaClient w NestJS?",
        answer:
          "DatabaseService implementuje OnModuleInit i OnModuleDestroy. W onModuleInit tworzy pg.Pool, adapter i łączy PrismaClient. W onModuleDestroy zamyka klienta i pool. Dzięki temu połączenia są prawidłowo zarządzane przez cały cykl życia aplikacji.",
      },
    ],
  },
  {
    id: 4,
    faq: [
      {
        question: "Jak skonfigurować hot-reload w Docker Compose?",
        answer:
          "Używamy bind mounts do montowania kodu źródłowego z hosta do kontenera (volumes: ./src:/app/src). Vite i NestJS wykrywają zmiany plików automatycznie. Ważne: node_modules powinny być w named volume, by nie nadpisywać zależności z hosta.",
      },
      {
        question: "Czym jest multi-stage build i dlaczego go stosować?",
        answer:
          "Multi-stage build dzieli Dockerfile na etapy — builder instaluje zależności i buduje aplikację, a etap runtime kopiuje tylko wynikowe artefakty. Rezultat: znacznie mniejszy obraz produkcyjny, bez devDependencies i narzędzi kompilacji.",
      },
      {
        question: "Jak działa routing w Nginx jako reverse proxy?",
        answer:
          "Nginx nasłuchuje na porcie 8080 i routuje ruch: żądania /api/* trafiają do kontenera backend:3000 (z usunięciem prefixu /api), a pozostałe do web:5173 (dev) lub web:80 (produkcja). Cały routing jest transparentny dla klienta.",
      },
    ],
  },
  {
    id: 5,
    faq: [
      {
        question: "Czym Vitest różni się od Jest?",
        answer:
          "Vitest jest natywnie zintegrowany z Vite — współdzieli konfigurację, pipeline transformacji i HMR. Dzięki temu testy uruchamiają się szybciej, a watch mode instantly re-runuje zmienione testy. Jest wymaga osobnej konfiguracji transformerów (ts-jest, babel-jest).",
      },
      {
        question: "Jak testować komponenty React z Testing Library?",
        answer:
          "Renderujemy komponent przez render(), a potem wyszukujemy elementy przez role, labele lub tekst (getByRole, getByText). Interakcje symulujemy przez userEvent — kliknięcia, wpisywanie tekstu. Testujemy zachowanie z perspektywy użytkownika, nie implementację.",
      },
      {
        question: "Co to jest Mock Service Worker (MSW)?",
        answer:
          "MSW przechwytuje requesty HTTP na poziomie service workera i zwraca zdefiniowane odpowiedzi. Pozwala testować komponenty z realistycznymi danymi API bez uruchamiania backendu. Handlery definiujemy w setup file i możemy je nadpisywać per test.",
      },
    ],
  },
  {
    id: 6,
    faq: [
      {
        question: "Dlaczego importy ESM wymagają rozszerzenia .js?",
        answer:
          "TypeScript kompiluje pliki .ts do .js, ale nie zmienia ścieżek importów. Node.js w trybie ESM wymaga pełnych rozszerzeń plików. Dlatego w kodzie TypeScript piszemy import z '.js' — TypeScript rozwiąże to do odpowiedniego pliku .ts w compile time.",
      },
      {
        question: "Jak zastąpić __dirname w ES Modules?",
        answer:
          "W ESM nie istnieje __dirname ani __filename. Zamiast tego używamy import.meta.url, który zwraca URL bieżącego modułu. Do konwersji na ścieżkę systemową służy fileURLToPath z modułu 'node:url', a dirname z 'node:path' daje katalog.",
      },
      {
        question: "Czy można mieszać CJS i ESM w jednym projekcie?",
        answer:
          'Tak, ale z ograniczeniami. Pliki CJS muszą mieć rozszerzenie .cjs, a ESM — .mjs lub .js (przy "type": "module"). ESM może importować CJS, ale CJS nie może używać require() na ESM modułach — wymaga dynamic import().',
      },
    ],
  },
  {
    id: 7,
    faq: [
      {
        question: "Jak cache'ować node_modules w GitHub Actions?",
        answer:
          "Używamy actions/cache z kluczem opartym na hashie pnpm-lock.yaml. Jeśli lockfile się nie zmienił, Actions przywraca cache zamiast instalować od zera. Przyspieszenie: od 60% do 80% czasu instalacji.",
      },
      {
        question: "Co to są reusable workflows?",
        answer:
          "Reusable workflows to osobne pliki workflow, które można wywoływać z innych workflows przez workflow_call. Definiują inputs i secrets, co pozwala współdzielić logikę CI/CD między repozytoriami bez duplikacji kodu YAML.",
      },
      {
        question: "Jak bezpiecznie deployować na VPS z GitHub Actions?",
        answer:
          "Przechowujemy klucz SSH jako GitHub Secret. Actions łączy się z VPS, pobiera najnowsze obrazy z GHCR i uruchamia docker compose up -d. Concurrency groups zapobiegają równoległym deploymentom, a environment protection rules wymagają manualnego approval.",
      },
    ],
  },
  {
    id: 8,
    faq: [
      {
        question: "Jak Nginx stripuje prefix /api z requestów?",
        answer:
          "Kluczowy jest trailing slash w proxy_pass. Location /api/ z proxy_pass http://backend/ powoduje, że Nginx usuwa dopasowany prefix i przekazuje resztę ścieżki. Bez slasha cała ścieżka jest zachowywana. To subtelna, ale bardzo ważna różnica.",
      },
      {
        question: "Jakie security headers powinien ustawiać Nginx?",
        answer:
          "Minimum to: X-Content-Type-Options: nosniff, X-Frame-Options: DENY, Strict-Transport-Security z max-age=31536000, X-XSS-Protection: 1; mode=block i Content-Security-Policy. Chroni to przed sniffingiem typów, clickjackingiem i atakami XSS.",
      },
      {
        question: "Jak obsłużyć client-side routing w SPA za pomocą Nginx?",
        answer:
          "Dyrektywa try_files $uri $uri/ /index.html sprawia, że Nginx najpierw szuka pliku statycznego, potem katalogu, a jeśli nic nie znajdzie — serwuje index.html. Dzięki temu React Router obsługuje routing po stronie klienta.",
      },
    ],
  },
  {
    id: 9,
    faq: [
      {
        question: "Co to jest incremental backup w PostgreSQL 17?",
        answer:
          "Incremental backup (pg_basebackup --incremental) tworzy kopię tylko zmienionych bloków od ostatniego pełnego backupu. Drastycznie redukuje czas i rozmiar kopii zapasowych dla dużych baz danych, gdzie zmienia się niewielki procent danych.",
      },
      {
        question: "Kiedy używać indeksów GIN zamiast B-tree?",
        answer:
          "GIN (Generalized Inverted Index) jest optymalny dla full-text search, JSONB queries i tablic. B-tree sprawdza się dla prostych porównań (=, <, >) na skalarnych kolumnach. GIN jest wolniejszy przy INSERT, ale szybszy przy wyszukiwaniu w złożonych strukturach.",
      },
      {
        question: "Czym jest Row Level Security (RLS)?",
        answer:
          "RLS pozwala definiować polityki dostępu na poziomie poszczególnych wierszy tabeli. PostgreSQL automatycznie filtruje wyniki zapytań na podstawie tożsamości użytkownika. Idealny do multi-tenant aplikacji, gdzie każdy tenant widzi tylko swoje dane.",
      },
    ],
  },
  {
    id: 10,
    faq: [
      {
        question: "Czym jest AOF persistence w Redis?",
        answer:
          "AOF (Append Only File) loguje każdą operację zapisu do pliku na dysku. Po restarcie Redis odtwarza stan z tego logu. Oferuje lepszą trwałość danych niż snapshoty (RDB), ale kosztem większego zużycia dysku i wolniejszego restartu.",
      },
      {
        question: "Jak działa eviction policy allkeys-lru?",
        answer:
          "Gdy Redis osiągnie limit pamięci (maxmemory), allkeys-lru usuwa najdawniej używane klucze ze wszystkich kluczy (nie tylko tych z TTL). To najczęściej stosowana polityka dla cache'u — zapewnia, że gorące dane pozostają, a zimne są automatycznie czyszczone.",
      },
      {
        question: "Co to jest cache-aside pattern?",
        answer:
          "Cache-aside: aplikacja najpierw sprawdza Redis. Jeśli klucz istnieje (cache hit) — zwraca dane. Jeśli nie (cache miss) — pobiera z bazy danych, zapisuje wynik w Redis z TTL i zwraca. Kolejne żądania trafiają w cache bez odpytywania bazy.",
      },
    ],
  },
  {
    id: 11,
    faq: [
      {
        question: "Jakie są najważniejsze atrybuty ARIA dla komponentów React?",
        answer:
          "Kluczowe atrybuty to: aria-label (opis elementu), aria-expanded (stan rozwinięcia), aria-live (dynamiczne aktualizacje), aria-hidden (ukrywanie dekoracyjnych elementów) i role (nadanie semantyki niestandardowym elementom). Używaj ich, gdy HTML semantyczny nie wystarcza.",
      },
      {
        question: "Jak zaimplementować focus trap w modalu?",
        answer:
          "Focus trap nasłuchuje zdarzenia keydown na Tab. Gdy focus dociera do ostatniego elementu i użytkownik naciśnie Tab — przenosi go na pierwszy. Shift+Tab z pierwszego przenosi na ostatni. Po zamknięciu modala focus wraca do elementu, który go otworzył.",
      },
      {
        question: "Jak testować dostępność automatycznie?",
        answer:
          "Axe-core zintegrowany z Testing Library (vitest-axe lub jest-axe) automatycznie wykrywa problemy a11y. Sprawdza kontrast, brakujące labele, nieprawidłowe role i strukturę nagłówków. Nie zastępuje testów manualnych ze screen readerem, ale łapie typowe błędy.",
      },
    ],
  },
  {
    id: 12,
    faq: [
      {
        question: "Co to jest Environment API w Vite 7?",
        answer:
          "Environment API pozwala definiować odrębne konfiguracje (resolve, plugins, optymalizacje) dla różnych środowisk: client, SSR, web workery. Np. client nie potrzebuje polyfilli Node.js, a SSR nie potrzebuje code splitting. Zastępuje wcześniejsze workaround.",
      },
      {
        question: "Jak działa HMR w Vite?",
        answer:
          "Hot Module Replacement w Vite korzysta z natywnych ES Modules przeglądarki. Gdy plik się zmienia, Vite przekompilowuje tylko ten moduł i wysyła aktualizację przez WebSocket. React Fast Refresh zachowuje state komponentu — odświeżenie jest natychmiastowe i precyzyjne.",
      },
      {
        question: "Czym jest dependency pre-bundling w Vite?",
        answer:
          "Vite pre-bundluje zależności z node_modules przez esbuild przy pierwszym uruchomieniu dev servera. Konwertuje CJS na ESM i łączy wiele plików w jeden moduł. Dzięki temu przeglądarka nie musi ładować setek osobnych plików — znacznie przyspiesza initial load.",
      },
    ],
  },
  {
    id: 13,
    faq: [
      {
        question: "Dlaczego CSS Modules nie mają runtime overhead?",
        answer:
          "CSS Modules są przetwarzane w build time — klasy są hashowane i zamieniane na unikalne nazwy. Wynikowy CSS jest statyczny i parsowany przez przeglądarkę jak zwykły arkusz stylów. Nie ma żadnego JavaScript generującego CSS w runtime, w przeciwieństwie do styled-components.",
      },
      {
        question: "Jak działa composes w CSS Modules?",
        answer:
          "composes pozwala dziedziczyć klasy z tego samego lub innego modułu CSS. Np. '.button composes: base from './base.module.css'' doda klasy z base do button. W runtime element dostaje obie klasy — bez duplikacji CSS. To odpowiednik @extend w Sass.",
      },
      {
        question: "Co to są CSS Layers i jak pomagają ze specyficznością?",
        answer:
          "CSS Layers (@layer) pozwalają definiować kolejność priorytetów: @layer reset, base, components, utilities. Style z wyższej warstwy zawsze wygrywają, niezależnie od specyficzności selektorów. Eliminuje to problem !important i wojny specyficzności.",
      },
    ],
  },
  {
    id: 14,
    faq: [
      {
        question: "Czym jest shadow database w Prisma?",
        answer:
          "Shadow database to tymczasowa baza, którą Prisma tworzy podczas prisma migrate dev. Aplikuje na niej wszystkie dotychczasowe migracje, generuje diff z aktualnym schematem i na tej podstawie tworzy nową migrację. Jest usuwana po zakończeniu procesu.",
      },
      {
        question: "Czy można edytować istniejące migracje Prisma?",
        answer:
          "Nie zaleca się edycji istniejących migracji, które zostały już zastosowane. Zamiast tego tworzymy nowe migracje korygujące. Wyjątek: można ręcznie dodać SQL (np. data migration, indeksy) do świeżo wygenerowanej, jeszcze niezastosowanej migracji.",
      },
      {
        question: "Jak seedować bazę danych w Prisma?",
        answer:
          "Tworzymy skrypt seed.ts, który importuje PrismaClient i wypełnia bazę danymi testowymi. Konfigurujemy go w package.json w sekcji prisma.seed. Uruchamiamy przez prisma db seed — działa automatycznie po prisma migrate reset.",
      },
    ],
  },
  {
    id: 15,
    faq: [
      {
        question: "Co to jest use() hook w React 19?",
        answer:
          "use() to nowy hook pozwalający czytać wartości z Promise lub Context bezpośrednio w render. W przeciwieństwie do innych hooków, może być wywoływany warunkowo. Rzucony Promise aktywuje najbliższy Suspense boundary, eliminując potrzebę useEffect do data fetching.",
      },
      {
        question: "Czym są Server Actions w React 19?",
        answer:
          "Server Actions to funkcje oznaczone dyrektywą 'use server', które wykonują się na serwerze. Mogą być przekazywane jako prop action w formularzach. React automatycznie serializuje dane formularza i wywołuje funkcję — bez konieczności pisania osobnego API endpoint.",
      },
      {
        question: "Czy w React 19 nadal potrzeba forwardRef?",
        answer:
          "Nie — w React 19 ref jest zwykłym propem, przekazywanym bezpośrednio do komponentu. forwardRef jest nadal wspierany dla kompatybilności wstecznej, ale nie jest już potrzebny dla nowych komponentów. To znacznie upraszcza tworzenie wrapper components.",
      },
    ],
  },
];
