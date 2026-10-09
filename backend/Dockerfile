# Dev image: hot reload bilan. Build context — repo ildizi (pnpm workspace lockfile u yerda).
FROM node:20-alpine

# Prisma engine uchun openssl kerak
RUN apk add --no-cache openssl && corepack enable

WORKDIR /app

# Avval faqat manifestlar — kod o'zgarganda dependencylar qayta o'rnatilmaydi
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY backend/package.json backend/
COPY frontend/package.json frontend/
COPY mobile/package.json mobile/
COPY packages/ui/package.json packages/ui/
COPY packages/types/package.json packages/types/
COPY packages/config/package.json packages/config/
RUN pnpm install --frozen-lockfile --filter @formo/backend

COPY backend/ backend/
WORKDIR /app/backend
RUN pnpm prisma generate

EXPOSE 3001
# Har ishga tushganda sxema bazaga qo'llanadi, keyin watch rejimida server
CMD ["sh", "-c", "pnpm prisma db push --skip-generate && pnpm dev"]
