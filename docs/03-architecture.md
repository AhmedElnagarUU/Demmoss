# 03 · Architecture

## Stack

| Need | Choice | Why |
|---|---|---|
| Framework | **TanStack Start** (React + Vite) + TypeScript strict | One full-stack app for site, demos, admin, and server logic |
| Routing | TanStack Router (file-based, in `src/routes/`) | Type-safe routes, params, and search params; loaders for data |
| Server logic | TanStack Start server functions (`createServerFn`) | Typed calls from the UI to the server, Zod-validated; no separate REST API |
| Styling | Tailwind CSS only | Full control over every layout; our own UI primitives |
| Translation | Our own small i18n in `shared/i18n` (JSON messages + `t()`) | `/ar` and `/en` routes, RTL; no extra dependency (KISS) |
| Database | MongoDB + Mongoose | `model.ts` per feature documents each data shape |
| Validation | Zod | One schema for forms, API, env, and localStorage |
| Demo state | Zustand + persist | localStorage save/load, version reset, selective re-render |
| Admin data | Route loaders calling server functions | Simple; TanStack Query added only if a real need appears |
| Charts (admin) | chosen in Phase 3, simple library | Admin statistics |
| Hosting | not decided | Code stays host-agnostic |

## Folder structure

```
src/
  routes/                             TanStack Router file-based routes (thin)
    __root.tsx                        html shell, lang/dir from locale
    index.tsx                         redirect / → /ar or /en (browser language or saved choice)
    $locale/
      route.tsx                       validates locale, header/footer, feedback + WhatsApp buttons
      index.tsx                       → features/landing
      guide.tsx                       → features/software-guide
      start/index.tsx                 → features/wizard
      start/result.tsx                → features/wizard
      demos/index.tsx                 → features/gallery
      demos/generic-business/...      → features/template-generic-business
      admin/login.tsx                 → features/admin
      admin/_protected/...            → features/admin (beforeLoad checks the session)
  features/
    landing/
    software-guide/
    wizard/
    gallery/
    feedback/
    tracking/
    notifications/
    admin/
    demo-engine/
    template-generic-business/
  shared/
    db/
    ui/
    i18n/
    env.ts
scripts/
theme-sources/
docs/
```

## Feature dependencies (one way, no cycles)

```mermaid
flowchart LR
  wizard --> gallery
  wizard --> tracking
  wizard --> notifications
  feedback --> notifications
  tracking --> notifications
  admin --> wizard
  admin --> feedback
  admin --> tracking
  admin --> notifications
  admin --> gallery
  gallery --> tgb[template-generic-business<br/>meta only]
  tgb --> engine[demo-engine]
  engine --> tracking
  landing --> gallery
```

Everything may import from `shared/`. `shared/` imports from no feature.

## Request flow (server features)

UI components and route loaders call **server functions**. A server function lives in the feature
(`server-functions.ts`), validates input with the Zod schema from `types.ts`, calls the service, and returns the result.
It contains no business logic itself.

```mermaid
sequenceDiagram
  participant B as Component / loader
  participant F as server-functions.ts
  participant S as service.ts
  participant Rep as repository.ts
  participant M as model.ts (Mongoose)
  B->>F: call createLeadFn(data)
  F->>F: validate with Zod schema from types.ts
  F->>S: call feature function
  S->>Rep: save / query
  Rep->>M: Mongoose operation
  M-->>Rep: document
  Rep-->>S: data
  S-->>F: result
  F-->>B: typed result
```

## Routes

| Route | Feature |
|---|---|
| `/$locale` | landing |
| `/$locale/guide` | software-guide |
| `/$locale/start`, `/$locale/start/result` | wizard |
| `/$locale/demos` | gallery |
| `/$locale/demos/<slug>/...` | template-<slug> (site) |
| `/$locale/demos/<slug>/register`, `/login` | template-<slug> via demo-engine fake auth |
| `/$locale/demos/<slug>/dashboard/...` | template-<slug> (dashboard) |
| `/$locale/admin/login`, `/$locale/admin/...` | admin |

## Server functions

| Function | Feature |
|---|---|
| `recordEventFn` | tracking (called by `track()`) |
| `createLeadFn` | wizard |
| `createFeedbackFn` | feedback |
| `loginFn`, `logoutFn`, admin queries and updates | admin (each checks the session) |

Feedback is a floating button + modal on every page, not a separate route.

## Image uploads (not decided)

Version 1 uses the built-in image library only. If uploads are enabled later, they go to the owner's existing
**AWS S3 bucket**: a server function returns a short-lived upload URL, the browser uploads directly to S3,
and only the image URL is saved. The S3 implementation is **to be created** when the decision is made.

## Admin authentication

- A single admin. Email and bcrypt password hash in `.env` (`ADMIN_EMAIL`, `ADMIN_PASSWORD_HASH`).
- Login creates a signed, httpOnly session cookie (`SESSION_SECRET`) using TanStack Start's session helpers.
  Admin routes check it in `beforeLoad`; every admin server function checks it again.
- `scripts/hash-password` (first script) produces the hash.

## Configuration (`.env`)

See `.env.example`. Read only through `src/shared/env.ts` (validated with Zod).
Variables starting with `VITE_` are public (sent to the browser). The others are server-only and never prefixed.

| Variable | Purpose |
|---|---|
| `VITE_BRAND_NAME` | Brand name shown in the UI (not decided yet) |
| `VITE_WHATSAPP_NUMBER` | Number for every WhatsApp button |
| `VITE_DEFAULT_LOCALE` | Fallback locale (`ar`) |
| `VITE_SITE_URL` | Absolute site URL |
| `MONGODB_URI` | Database connection |
| `ADMIN_EMAIL` | Admin login |
| `ADMIN_PASSWORD_HASH` | Admin password hash |
| `SESSION_SECRET` | Signs the admin session cookie |

## Host-agnostic rules

- TanStack Start builds a standard Node server that runs on most hosts. No platform-only APIs.
- Country: read a known country header if present (e.g. Cloudflare or Vercel), otherwise `unknown`.
- MongoDB connection is cached across hot reloads and serverless invocations in `shared/db`.
