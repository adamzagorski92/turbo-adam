# Backend (NestJS)

API for the turbo-adam monorepo — NestJS 11 + Prisma 7 (adapter-pg) + PostgreSQL 17 + Redis 7.

## Stack

| Technology | Version           | Role                                       |
| ---------- | ----------------- | ------------------------------------------ |
| NestJS     | 11                | HTTP framework                             |
| Prisma     | 7                 | ORM (driver adapter: `@prisma/adapter-pg`) |
| PostgreSQL | 17                | Database (via `pg` pool)                   |
| Redis      | 7                 | Cache (`redis` package)                    |
| TypeScript | 5.9 (strict, ESM) | Language                                   |
| Jest       | 30                | Testing                                    |
| ESLint     | 10 (flat config)  | Linting                                    |

## Architecture

```
AppModule
├── AppController
│   ├── GET /              → "Hello World!" (health check)
│   ├── GET /redis-test    → Redis read/write test
│   └── GET /postgres-test → PostgreSQL connectivity test (SELECT NOW())
├── AppService             → Business logic (placeholder)
├── DatabaseService        → Prisma + pg.Pool (adapter-pg), lifecycle hooks
└── RedisService           → Redis client, get/set, graceful connect/disconnect
```

### DatabaseService

- Creates a `pg.Pool` from `DATABASE_URL` and passes it to Prisma via `@prisma/adapter-pg`.
- Lifecycle: `onModuleInit` → `$connect()`, `onModuleDestroy` → `$disconnect()`.
- `getPrisma()` returns the ready-to-use Prisma client.

### RedisService

- Connects to Redis on `onModuleInit` (env: `REDIS_HOST`, `REDIS_PORT`).
- Soft-fail: logs a warning instead of crashing the app if Redis is unavailable.
- Methods: `get(key)`, `set(key, value)`.

## Prisma

Schema: `prisma/schema.prisma`

```prisma
generator client {
  provider = "prisma-client"
  output   = "../src/generated/prisma"
}

datasource db {
  provider = "postgresql"
}
```

Client generated to `src/generated/prisma`. Configuration: `prisma.config.ts`.

### Prisma commands

```bash
pnpm --filter backend prisma:generate          # generate client
pnpm --filter backend prisma:migrate:dev       # dev migration
pnpm --filter backend prisma:migrate:deploy    # production migration
```

## Environment variables

| Variable       | Default      | Description                  |
| -------------- | ------------ | ---------------------------- |
| `PORT`         | `3000`       | HTTP server port             |
| `DATABASE_URL` | — (required) | PostgreSQL connection string |
| `REDIS_HOST`   | `localhost`  | Redis host                   |
| `REDIS_PORT`   | `6379`       | Redis port                   |

## Development

From the monorepo root:

```bash
pnpm --filter backend dev          # nest start --watch
```

Or via Docker Compose (recommended):

```bash
pnpm compose:dev up                # starts backend + postgres + redis + nginx + web
```

## Build

```bash
pnpm --filter backend build        # prisma:generate + nest build → dist/
```

## Tests

```bash
pnpm --filter backend test         # unit (Jest)
pnpm --filter backend test:cov     # unit + coverage
pnpm --filter backend test:e2e     # e2e (supertest)
```

Prisma client is mocked in tests (`src/__mocks__/generated/prisma/client.ts`).

## Docker

- `Dockerfile` — multi-stage production build (build → migrate → runtime)
- `Dockerfile.dev` — dev with hot-reload (mounted source code)

The production image listens on port 3000 and runs `node dist/src/main.js`.
