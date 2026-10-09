# FORMО

Monorepo for the FORMО custom tailoring platform MVP.

## Tez ishga tushirish (Docker)

Faqat [Docker Desktop](https://www.docker.com/products/docker-desktop/) kerak — Node, pnpm, Postgres yoki `.env` shart emas.

```bash
git clone https://github.com/Umar033ya/Formo.git
cd Formo
docker compose up --build
```

| Xizmat | Manzil |
|---|---|
| Frontend (panel) | http://localhost:5173 |
| Backend API | http://localhost:3001/api |
| Swagger | http://localhost:3001/api/docs |
| Postgres | `localhost:5435` · `formo` / `formo` |

Superadmin avtomatik yaratiladi: **+998 90 111 11 11** / **admin123**. Operator va tikuv sexi akkauntlarini superadmin paneldan yaratadi.

| Buyruq | Nima qiladi |
|---|---|
| `docker compose up --build` | Hammasini ko'taradi (birinchi marta ~2-3 daqiqa) |
| `docker compose up -d` | Fonda ishga tushiradi |
| `docker compose down` | To'xtatadi (baza saqlanib qoladi) |
| `docker compose down -v` | To'xtatadi va bazani **o'chiradi** |
| `docker compose logs -f backend` | Backend loglari |
| `docker compose exec backend pnpm test:e2e` | E2e testlar |

`backend/src`, `frontend/src` dagi o'zgarishlar konteynerda avtomatik qayta yuklanadi. `package.json` ga yangi paket qo'shilsa — `docker compose up --build`.

### Mobil ilova (Expo) backendga ulanishi

Mobil ilova Docker'da emas — `mobile/` da Expo bilan alohida ishga tushadi va Wi-Fi orqali kompyuterdagi backendga ulanadi.

1. Kompyuterda `docker compose up` ishlab tursin.
2. Kompyuterning Wi-Fi IP manzilini bilib oling: macOS `ipconfig getifaddr en0`, Windows `ipconfig` → "IPv4 Address".
3. `mobile/.env` yarating (`mobile/.env.example` dan nusxa) va IP ni yozing: `EXPO_PUBLIC_API_URL=http://192.168.1.10:3001/api`
4. `cd mobile && npm install && npx expo start --clear` — telefon va kompyuter **bitta Wi-Fi'da** bo'lsin.
5. Brauzerda telefondan `http://<IP>:3001/api/docs` ochilsa — ulanish bor. Ochilmasa, kompyuter firewall'i 3001-portni bloklayapti.

Kodda: `import { auth, api } from './services/api'` → `auth.register(...)`, `auth.login(...)`, `auth.logout()`, `auth.me()`.

> **Production:** yuqoridagi parol va JWT secret faqat dev uchun. `NODE_ENV=production` da backend repodagi dev qiymatlari (`admin123`, dev JWT secret) yoki qisqa qiymatlar bilan **ishga tushmaydi** — `JWT_ACCESS_SECRET` (kamida 32 belgi, `openssl rand -hex 32`) va `SUPERADMIN_PASSWORD` (kamida 10 belgi) ni o'zingiz bering.

Sozlamalarni o'zgartirish (ixtiyoriy): ildizda `.env` yarating, masalan `SUPERADMIN_PASSWORD=...` yoki port band bo'lsa `FORMO_WEB_PORT=5174`, `FORMO_API_PORT=3002`, `FORMO_DB_PORT=5436`.

## Architecture

pnpm + Turborepo monorepo. This is a structure-only skeleton — no business logic is implemented yet.

| App | Stack | Roles |
|-----|-------|-------|
| `backend` | NestJS, Node.js, PostgreSQL, Prisma, TypeScript | — |
| `frontend` | React + Vite, JavaScript | USER, OPERATOR, TAILOR, SUPERADMIN |
| `mobile` | React Native + Expo, JavaScript | USER only |

## MVP Roles

- **USER** — creates orders via web or mobile
- **OPERATOR** — reviews, confirms, and assigns orders to factories
- **TAILOR** — produces assigned orders at a factory
- **SUPERADMIN** — system administration

Factory/sewing shop is a domain entity, not a role. A TAILOR belongs to / works with a factory.
All roles authenticate through ONE common web login page; the backend determines the role.

## Project Structure

```
formo/
├── backend/            # NestJS API
│   ├── src/
│   │   ├── modules/
│   │   │   ├── auth/
│   │   │   ├── users/
│   │   │   ├── orders/
│   │   │   ├── products/
│   │   │   ├── factories/
│   │   │   ├── payments/
│   │   │   └── notifications/
│   │   ├── common/
│   │   ├── config/
│   │   ├── database/
│   │   └── app.module.ts
│   ├── prisma/
│   ├── test/
│   └── package.json
│
├── frontend/           # React + Vite (JS)
│   └── src/
│       ├── assets/
│       ├── components/  # common, layout, ui
│       ├── pages/
│       │   ├── Login/
│       │   ├── Operator/   # Dashboard, Orders, Factories
│       │   ├── Tailor/     # Dashboard, Orders
│       │   └── Superadmin/ # Dashboard, Users, Orders, Factories
│       ├── features/   # auth, orders, products, factories
│       ├── routes/
│       ├── services/
│       ├── store/
│       ├── hooks/
│       ├── utils/
│       └── constants/
│
├── mobile/             # React Native + Expo (JS), USER only
│   └── src/
│       ├── assets/
│       ├── components/  # common, ui
│       ├── screens/     # Login, Home, Products, ProductDetails, Cart, Checkout, Orders
│       ├── features/    # auth, products, cart, orders
│       ├── navigation/
│       ├── services/
│       ├── store/
│       ├── hooks/
│       ├── utils/
│       └── constants/
│
├── packages/
│   ├── types/
│   ├── config/
│   └── ui/
│
├── package.json
├── pnpm-workspace.yaml
├── turbo.json
└── README.md
```

## Setup

```bash
pnpm install

# Backend (port 3001)
pnpm --filter @formo/backend dev

# Frontend (port 5173)
pnpm --filter @formo/frontend dev

# Mobile
pnpm --filter @formo/mobile start
```

## Notes

- No features are implemented yet — purely an architectural skeleton.
- Frontend and mobile use plain JavaScript (.js / .jsx); backend uses TypeScript (NestJS).