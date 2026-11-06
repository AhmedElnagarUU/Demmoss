# 11 · Production readiness (code side)

Status: **plan, ready to implement**. Server setup (VPS, Cloudflare, Atlas, domain) is a separate checklist at the end.
Each batch below is sized for **one agent run** with a smaller model: exact files, rules, and acceptance tests.
All batches follow `CLAUDE.md`, `.claude/rules/*`, and the testing rules (valuable tests only, never weakened).

Decisions: admin stays English only. No new npm dependencies unless a batch says so.

## Batch 1 · Abuse protection and security headers (must have)

**1.1 Rate limiter** · `src/shared/rate-limit.ts` (server-only)
- `checkRateLimit(key, { limit, windowMs, now })` → `{ allowed, retryAfterMs }`. In-memory `Map` with expiry cleanup.
  One VPS process makes in-memory correct; note in the file that several processes would need a shared store.
- Client key: `cf-connecting-ip` header (or `x-forwarded-for` first value), **hashed** with SHA-256 + `SESSION_SECRET`; raw IPs are never stored or logged.

**1.2 Where limits apply**

| Action | Key | Limit | When blocked |
|---|---|---|---|
| `loginAction` (admin) | ip + email | 5 failures / 15 min (count failures only) | generic "Too many attempts, try again in N minutes"; a correct password is also refused while blocked |
| `createLeadAction` | ip | 5 / hour | field-less error message in ar/en, nothing saved |
| `createFeedbackAction` | ip | 5 / hour | same |
| `recordEventAction` | ip | 120 / min | silently ignored |

Tests: unit tests for the limiter (window, expiry, retry time, keys independent); integration for login lockout
(5 wrong → blocked, wait past window → allowed) and lead/feedback limit (6th call not saved). Use fake `now`, no sleeps.

**1.3 Security headers** · `next.config.ts` `headers()` for all routes
- `Content-Security-Policy`: `default-src 'self'`; `img-src 'self' data: https://images.unsplash.com https://images.pexels.com`;
  `style-src 'self' 'unsafe-inline'`; `script-src 'self' 'unsafe-inline'` (Next.js inline runtime; tighten with nonces later);
  `font-src 'self'`; `connect-src 'self'`; `frame-ancestors 'none'`; `base-uri 'self'`; `form-action 'self'`.
- `Strict-Transport-Security: max-age=31536000; includeSubDomains` (production only), `X-Content-Type-Options: nosniff`,
  `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy: camera=(), microphone=(), geolocation=()`.
- E2E: response headers present on `/ar`; existing E2E (incl. WhatsApp links, photos, fonts) still pass.

## Batch 2 · Errors, logs, health (must have)

**2.1 Error pages** (ar/en text in `src/features/site-shell/messages`)
- `src/app/[locale]/not-found.tsx`: friendly 404 with links home / demos / start.
- `src/app/[locale]/error.tsx` (client): "Something went wrong" + retry button + home link; calls `logError` via a Server Action.
- `src/app/global-not-found.tsx` (or the Next 16 equivalent, check `node_modules/next/dist/docs`) for URLs outside `[locale]`.
- E2E: unknown page → 404 status with the localized page in ar and en; axe clean.

**2.2 Logging** · `src/shared/log.ts` (server-only)
- `logError(where, error, context?)` and `logInfo(where, message, context?)` write **one JSON line** to stdout/stderr:
  `{ time, level, where, message, stack?, context }`. Context is an allowlist of safe fields (route, action, template, status);
  never names, phones, emails, passwords, IPs.
- Use it in: every Server Action's unexpected-error path (actions keep returning clean errors to the UI),
  `connectDb` failures, admin login failures (without the email), rate-limit blocks.
- Unit test: output is valid JSON, unknown context keys are dropped, an `Error` keeps message + stack.

**2.3 Health check** · `src/app/health/route.ts` (the one allowed Route Handler; add this exception to `code-rules.md`)
- `GET /health` → `200 { status: "ok", db: "ok" }` after `mongoose.connection.db.admin().ping()`; `503 { status: "error", db: "down" }` otherwise.
  No caching (`dynamic = "force-dynamic"`), excluded from `proxy.ts` locale redirect.
- Integration test with in-memory MongoDB (ok) and a stopped connection (503).

## Batch 3 · SEO, privacy, data retention (must have)

**3.1 SEO** · `src/app/sitemap.ts`, `src/app/robots.ts`
- Sitemap: `/ar` and `/en` versions of landing, guide, start, demos, and every demo **home** page from the gallery catalog,
  with `alternates.languages`. Base URL from `NEXT_PUBLIC_SITE_URL`.
- Robots: allow all; disallow `/*/admin`, `/*/demos/*/*/dashboard`; link the sitemap.
- Unit test: sitemap contains both locales of each public page and no admin/dashboard URL.

**3.2 Privacy page** · `/[locale]/privacy` in the `(site)` group, footer link
- Sections: what we collect (anonymous visit events, wizard/feedback data you type), why, how long, demo data stays in the
  browser, no selling, contact via WhatsApp/email, last updated date. ar/en in a feature messages file.
- **Owner must review the text** (and a lawyer if needed) before launch; mark it draft in the page source until then.

**3.3 Data retention** (MongoDB TTL indexes, no script)
- `Event.createdAt` TTL **365 days**; `Notification.createdAt` TTL **180 days**. Leads and feedback are kept (business records).
- Indexes for admin queries: leads `{ status, createdAt }`, feedback `{ read, createdAt }`, notifications `{ read, createdAt }`,
  events `{ name, createdAt }`, `{ template, createdAt }`, visitors `{ lastSeenAt }`.
- Integration test: the indexes exist with the right `expireAfterSeconds`.
- Update `docs/04-data-and-tracking.md` and the privacy page with the same durations.

## Batch 4 · Admin paging and deployment files (should have)

**4.1 Admin paging and date filter** (Visitors, Activity, Leads)
- `?page=` (50 per page, newest first) and `?from=&to=` (dates) parsed with Zod; "Newer / Older" links; total count shown.
- Repository functions take `{ skip, limit, from, to }`. Integration tests: page 2 continues page 1 without overlap; date filter.

**4.2 Production build files**
- `next.config.ts`: `output: "standalone"`.
- `Dockerfile` (multi-stage: deps → build → runner on `node:22-alpine`, non-root user, `HEALTHCHECK` on `/health`),
  `.dockerignore`, `docker-compose.yml` (app only, `restart: unless-stopped`, env from `.env.production`, log rotation
  `max-size: 10m, max-file: 5`). MongoDB is Atlas, not in compose.
- `src/shared/env.server.ts`: in production, admin variables are required at startup (fail fast with a clear message).
- `README.md`: "Run in production" section (build, env, compose up, health URL).
- CI: add a job that builds the Docker image (no push).

## Later (not needed for launch)

- Error alerts service (e.g. Sentry free plan): a few lines + one env var.
- CSP nonces instead of `'unsafe-inline'`; Lighthouse budget in CI; admin in Arabic; demo photo uploads (Cloudflare R2, plan in `03-architecture.md`).

## Owner decisions still needed (not code)

| Decision | Needed before |
|---|---|
| Brand name + logo + domain | launch |
| Privacy text review (Saudi PDPL / GDPR as relevant) | launch |
| Data retention durations (proposed: events 1 year, notifications 6 months) | batch 3 |
| Native Arabic review of public site + demos copy | launch (can run in parallel) |
| Check photos in a real browser (Smash Lab food, clinic doctors) | launch |

## Server setup checklist (owner, with help; not code)

VPS (2 GB RAM is enough) with Docker → clone repo → `.env.production` → `docker compose up -d` → Caddy or Nginx
for HTTPS (or Cloudflare origin certificate) → Cloudflare DNS + proxy, "Always use HTTPS", rate-limit rule on `/*/admin/login` →
MongoDB Atlas free cluster, network access for the VPS IP, daily backup → UptimeRobot on `https://<domain>/health` →
log in to admin and check notifications.
