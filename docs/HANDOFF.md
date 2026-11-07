# Handoff for the next session

Read `CLAUDE.md` first, then this file. Everything below is pushed to `main` (and `ccr-889f7fc7-vxt4yo`, identical).

## What the project is

Agency website (Next.js 16 App Router, TS strict, Tailwind v4, Zod 4, Mongoose 9, Zustand 5, own ar/en i18n + RTL) that sells
value to businesses: landing, Software Guide, wizard → leads, gallery of **working demo sites** (each with its own dashboard,
data in the visitor's browser), feedback, anonymous tracking, owner admin.

## Done

| Area | Where | Notes |
|---|---|---|
| Foundation, tests, CI | `src/shared`, `tests/`, `e2e/`, `.github/workflows/ci.yml` | `npm run check`, `npm run e2e`; CI green so far |
| Public site | `src/app/[locale]/(site)`, features `landing`, `site-shell`, `software-guide`, `wizard`, `gallery`, `feedback` | landing copy approved by owner |
| Tracking + notifications | features `tracking`, `notifications` | privacy rules in `.claude/rules/analytics.md` |
| Admin (English only, decided) | `src/app/[locale]/admin`, feature `admin` | scrypt + HMAC cookie, no new deps |
| Demo engine | `src/features/demo-engine` | storage, fake auth, banner, dashboard shell, ui/, photo/, palettes/, format/ |
| Restaurants | `template-restaurant`: Verdant Table (fine dining), Sole Trattoria (pizza & pasta ordering); each home mirrors its `theme-sources` design exactly | plan `docs/features/template-restaurant.md` |
| Real estate | `template-real-estate`: Hartwell & Co. Realty (agency), Solenne Estates (developer); each home mirrors its `theme-sources` design exactly | plan `docs/features/template-real-estate.md` |
| Logistics | `template-logistics`: Jisr Cargo (freight), Makhzan 3PL (warehousing) | plan `docs/features/template-logistics.md` |
| Clinics | `template-clinic`: Dr. Rayan Al Harthi (specialist), Noor (medical centre) | plan `docs/features/template-clinic.md` |
| Plans not built | `docs/09-design-sources.md` (designs → categories), `docs/10-theme-system.md` (skins, parked by owner), `docs/11-production.md` (go-live code batches) | |

## Next steps (owner's order of preference: production batches, then remaining categories)

1. **Production batches** from `docs/11-production.md`, one agent each, in order:
   Batch 1 abuse protection + security headers → Batch 2 errors/logs/health → Batch 3 SEO, privacy page, TTL retention →
   Batch 4 admin paging + Docker files. Each batch has exact files, limits, and tests.
2. **Remaining demo categories** (designs in `theme-sources/`, mapping in `docs/09-design-sources.md`):
   Marketing & creative (KZ Digital `04-marketing-agency.html` + Olivine `03-organic-studio.html`),
   Cafés (Hearthbean + Sage & Grain; **reuse `template-restaurant`**, same dashboard),
   Online stores (Solène `05-minimal-decor.html` + Ember & Oak `02-ember-roast-co.html`).
   Each: write `docs/features/template-<category>.md` first, then build, following `template-clinic` as the latest reference.
3. Later: theme/skin system (owner's reference needed), Cloudflare R2 demo uploads (10-hour life, plan in `docs/03-architecture.md`).

## How to work (owner's instructions)

- **Save tokens:** the lead session plans and reviews; implementation goes to **one Sonnet agent at a time** in a worktree
  (`isolation: worktree`). Do not run agents in parallel (5-hour usage limit was hit twice).
- Agent briefs that worked: list files to read (rules + one reference category), exact scope, "do not edit" list,
  the check commands below, "break the code once per new unit test", "commit in worktree, do not push, short report".
- Agents should commit at checkpoints (container restarts happen; uncommitted worktree work survives only on disk).
- After an agent: merge its worktree branch with `--no-ff`, resolve `src/features/gallery/catalog.ts` and
  `tests/contracts/template-registry.ts` conflicts additively, run checks, push, remove the worktree.
- Push to `ccr-889f7fc7-vxt4yo`; update `main` only when the owner asks (`git push origin ccr-889f7fc7-vxt4yo:main`).

## Checks (sandbox)

```bash
export NEXT_PUBLIC_BRAND_NAME=Brand NEXT_PUBLIC_WHATSAPP_NUMBER=966500000000 NEXT_PUBLIC_DEFAULT_LOCALE=ar NEXT_PUBLIC_SITE_URL=http://localhost:3000
npm run typecheck && npx eslint . && npx prettier --check . && npx vitest run --exclude "**/service.test.ts"
npx next build && E2E_MONGODB_URI="mongodb://127.0.0.1:1/none" npx playwright test <specs>
```

## Sandbox limits and gotchas

- MongoDB binary download is blocked: DB integration tests (`*service.test.ts`) and DB E2E run **only in GitHub CI**.
- `images.unsplash.com` / `images.pexels.com` blocked: photos don't load here; tests must not depend on images. Google Fonts work.
- Inside worktrees Turbopack can't follow a `node_modules` symlink: use `next build --webpack` there.
- `dynamicParams = false` in `[locale]` layout: demo detail pages use `?id=` query params, not dynamic segments.
- Playwright: use exact role names (`"Back"` matched `"Send feedback"` once).
- Admin password hash contains `$`: write `\$` in `.env.local`.

## Open owner decisions

Brand name/logo/domain · privacy text review · data retention (proposed events 1 year, notifications 6 months) ·
native Arabic review · checking photos in a real browser (Sole Trattoria food, clinic doctors) · new skin reference (parked).
