# 07 · Roadmap

```mermaid
flowchart LR
  P0[0 Planning] --> P1[1 Foundation]
  P1 --> P2[2 Marketing site]
  P1 --> P4[4 Demo engine]
  P2 --> P3[3 Admin dashboard]
  P4 --> P5[5 First category: 2 variants]
  P3 --> P6[6 More templates]
  P5 --> P6
```

| Phase | Scope | Status |
|---|---|---|
| **0. Planning** | Vision, flows, architecture, data, demo engine, template contract, rules, skills | done |
| **0b. Planning next** | Software Guide (decisions closed, content draft ready); category/variant model agreed; Restaurants & cafés plan (draft) | in progress |
| **1. Foundation** | Next.js (App Router) + TS strict, Tailwind tokens, own i18n AR/EN + RTL (`[locale]` + `proxy.ts`), `shared/ui` primitives, `shared/db`, `shared/env`, tracking Server Action, demo store hydration pattern, **test setup** (Vitest, in-memory MongoDB, Playwright, contract checks, GitHub Actions CI; see `docs/08-testing.md`) | |
| **2. Marketing site** | Landing, Software Guide, wizard + result, gallery, feedback, WhatsApp buttons | |
| **3. Admin dashboard** | Login, overview, leads, demos, visitors + journeys, activity, feedback, notifications | |
| **4. Demo engine** | Storage helper, fake auth, dashboard shell, editors, image library, banner | |
| **5. First category** | Restaurants & cafés: 2 variants + shared dashboard, built against the contract | |
| **6. More categories** | Next categories from `docs/06-template-contract.md`, designs from `theme-sources/`, order guided by admin stats | |

## Open decisions

| Decision | Status |
|---|---|
| Brand name, logo, colors, fonts | not decided; placeholders via `.env` and tokens |
| Hosting | not decided: VPS + Cloudflare CDN, or AWS (S3 + CloudFront + Lambda); MongoDB Atlas free tier either way. See `docs/03-architecture.md` |
| Image uploads | not decided; if enabled, create the AWS S3 upload implementation (owner's existing bucket) |
| Admin dashboard language | proposal: English first, Arabic later if needed |
| Wizard business list | = gallery category list + "other" (decided) |
| First category | Restaurants & cafés (decided) |
| Theme designs (HTML/CSS) | owner provides later in `theme-sources/`; plans are written without them |
| Cross-template features | decided: optional business name, color palettes, value tips, relative sample data (`.claude/rules/templates.md`) |
