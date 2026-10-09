# Dev image: Vite hot reload bilan. Build context — repo ildizi.
FROM node:20-alpine

RUN corepack enable

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY backend/package.json backend/
COPY frontend/package.json frontend/
COPY mobile/package.json mobile/
COPY packages/ui/package.json packages/ui/
COPY packages/types/package.json packages/types/
COPY packages/config/package.json packages/config/
RUN pnpm install --frozen-lockfile --filter @formo/frontend

COPY frontend/ frontend/
WORKDIR /app/frontend

EXPOSE 5173
CMD ["pnpm", "dev", "--host", "0.0.0.0"]
