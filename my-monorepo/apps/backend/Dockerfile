# syntax=docker/dockerfile:1

FROM node:22-bookworm-slim AS build

RUN apt-get update \
  && apt-get install -y --no-install-recommends openssl ca-certificates \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /repo
RUN corepack enable

# Copy workspace manifests first to maximize Docker layer caching.
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY .npmrc ./

# Minimal workspace package manifests (needed for pnpm workspace + frozen lockfile).
COPY apps/web/package.json apps/web/
COPY packages/components/package.json packages/components/

# Copy backend sources.
COPY apps/backend/package.json apps/backend/
COPY apps/backend/nest-cli.json apps/backend/
COPY apps/backend/tsconfig*.json apps/backend/
COPY apps/backend/prisma.config.ts apps/backend/
COPY apps/backend/prisma ./apps/backend/prisma
COPY apps/backend/src ./apps/backend/src

# Install all deps needed to build (includes dev deps), then build.
RUN pnpm install --frozen-lockfile
RUN pnpm --filter backend build

# Create a minimal production directory (legacy mode avoids requiring inject-workspace-packages).
RUN pnpm --filter backend deploy --prod --legacy /out

# Prisma Client generation writes artifacts to a `.prisma` directory.
# Under pnpm, this lives inside the virtual store (`node_modules/.pnpm/.../node_modules/.prisma`).
# pnpm deploy recreates node_modules and may not recreate the `node_modules/.prisma` link,
# so we copy the generated artifacts explicitly into the deployed runtime folder.
RUN set -e; \
    PRISMA_DIR="$(find /repo/node_modules/.pnpm -type d -path '*/@prisma+client@*/node_modules/.prisma' | head -n 1)"; \
    if [ -n "$PRISMA_DIR" ] && [ -d "$PRISMA_DIR" ]; then \
      mkdir -p /out/node_modules; \
      cp -R "$PRISMA_DIR" /out/node_modules/.prisma; \
    else \
      echo "Prisma artifacts directory not found" >&2; \
      exit 1; \
    fi


# One-off migrations image.
# Includes Prisma CLI (devDependencies) so we can run `prisma migrate deploy`
# safely as a separate step during deployment.
FROM node:22-bookworm-slim AS migrate

RUN apt-get update \
  && apt-get install -y --no-install-recommends openssl ca-certificates \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /repo
RUN corepack enable

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY .npmrc ./
COPY apps/web/package.json apps/web/
COPY packages/components/package.json packages/components/
COPY apps/backend/package.json apps/backend/
COPY apps/backend/prisma.config.ts apps/backend/
COPY apps/backend/prisma ./apps/backend/prisma

# Install dependencies (includes prisma CLI from devDependencies)
RUN pnpm install --frozen-lockfile

WORKDIR /repo/apps/backend

ENV NODE_ENV=production

CMD ["pnpm", "prisma:migrate:deploy"]


FROM node:22-bookworm-slim AS runtime

RUN apt-get update \
  && apt-get install -y --no-install-recommends openssl ca-certificates \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

COPY --from=build /out/ ./

EXPOSE 3000
CMD ["node", "dist/src/main.js"]
