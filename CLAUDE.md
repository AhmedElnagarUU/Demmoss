# CLAUDE.md

Guide for AI agents working in this repository. Read this first, then the rules in `.claude/rules/`.

## What this project is

The website of a web design and software agency. It sells **value to businesses**, not features.
Visitors learn what kind of software they need, tell us about their project, and try **working demos**:
complete business websites, each with its own dashboard, that behave like real products.

It is not a store and visitors have no real accounts. The only real login is the admin (the owner).

Read `docs/01-vision.md` before writing any user-facing content.

## Main parts

| Part | What it does | Data |
|---|---|---|
| Landing | Marketing page: value, what we deliver, how we work | none |
| Software Guide | Explains profile website vs functional website + dashboard vs SaaS | none |
| Wizard | "What do you want to build?" → saved as a lead → suggested demos + WhatsApp | MongoDB |
| Gallery | All demos, open to everyone, filtered by business field | none (static catalog) |
| Demo templates | Full business website + fake register/login + dashboard | browser localStorage |
| Feedback | Message form, everywhere | MongoDB |
| Tracking | Anonymous visitors + key actions | MongoDB |
| Admin | Owner dashboard: visitors, leads, demo registrations, activity, feedback, notifications | MongoDB |

## Stack

- Next.js (App Router) + TypeScript (strict)
- Tailwind CSS only, no component library; our own UI primitives in `src/shared/ui`
- MongoDB + Mongoose, one `model.ts` per feature that stores data
- Zod for all validation; types are inferred from Zod schemas
- next-intl for Arabic/English with full RTL support
- Zustand (with `persist`) for demo state in localStorage only, never for server data
- Hosting not decided: stay host-agnostic, no platform-only APIs

## Folder map

```
src/
  app/                    routes only (page.tsx, layout.tsx, route.ts)
  features/<feature>/     everything a feature needs
  shared/                 generic, domain-free code (db, ui, i18n, env)
scripts/                  CLI tools for the developer (added only when needed)
theme-sources/<name>/     original HTML/CSS templates to convert, never imported by code
docs/                     vision, flows, architecture, feature flow docs
```

Details: `docs/03-architecture.md`.

## Golden rules

1. **KISS.** Boring, readable code. See `.claude/rules/code-rules.md`.
2. **Feature-based structure.** Never organize by file type. Routes contain no business logic.
3. **Flow doc first.** No feature is built without `docs/features/<feature>.md` (human flow, user stories, Mermaid).
4. **Bilingual and RTL always.** No hardcoded UI text; logical CSS only. See `.claude/rules/i18n-rtl.md`.
5. **Value, not filler.** Every section of every template serves a business goal. See `.claude/rules/templates.md`.
6. **Demo data stays in the browser.** Templates write to the server only through `track()`. See `.claude/rules/storage.md`.
7. **Track key actions only, anonymously.** See `.claude/rules/analytics.md`.
8. **Changeable settings live in `.env`** (brand name, WhatsApp number, default locale, secrets). See `.env.example`.

## Skills

- `.claude/skills/new-feature`: plan and build a new feature (flow doc → code)
- `.claude/skills/new-template`: plan and build a demo template, from scratch or from `theme-sources/`

## Status

Phase 0 (planning) is done. See `docs/07-roadmap.md` for the phases and what is still to be planned
(Software Guide content, Generic Business template).
