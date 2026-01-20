# syntax=docker/dockerfile:1

FROM node:22-bookworm-slim AS build

RUN apt-get update \
  && apt-get install -y --no-install-recommends ca-certificates \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /repo
RUN corepack enable

# Copy workspace manifests first to maximize Docker layer caching.
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./

# Copy web sources.
COPY apps/web/package.json apps/web/
COPY apps/web/tsconfig*.json apps/web/
COPY apps/web/vite.config.ts apps/web/
COPY apps/web/index.html apps/web/
COPY apps/web/public apps/web/public
COPY apps/web/src apps/web/src

RUN pnpm install --frozen-lockfile --ignore-scripts
RUN pnpm --filter web build


FROM nginx:1.27-alpine AS runtime

COPY apps/web/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /repo/apps/web/dist /usr/share/nginx/html

EXPOSE 80
