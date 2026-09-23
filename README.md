# FORMО

Monorepo for the FORMО custom tailoring platform MVP.

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