---
name: new-feature
description: Plan and build a new feature in this project the agreed way - flow doc with human flow, user stories and Mermaid diagrams first, then feature-based code following KISS. Use when the user asks to add, plan, or build a feature or a new section of the site.
---

# New feature

Follow these steps in order. Do not write code before step 2 is agreed.

## 1. Understand

- Read `CLAUDE.md`, `.claude/rules/code-rules.md`, and `docs/02-flows.md`.
- Ask the user anything unclear: who uses it, what business value it brings, what data it needs.

## 2. Write the flow doc

- Copy `docs/features/_template.md` to `docs/features/<feature>.md`.
- Fill: purpose (business value), flow in plain words, user stories, Mermaid `flowchart`,
  `sequenceDiagram` if the browser talks to the server, data (where and what shape), files, out of scope.
- If it adds tracking events, update `.claude/rules/analytics.md` and `docs/04-data-and-tracking.md`.
- Show the doc to the user and get agreement.

## 3. Build

Create only what the feature needs:

```
src/features/<feature>/
  components/
  hooks/          only if needed
  model.ts        only if it stores data in MongoDB
  repository.ts   only with model.ts
  actions.ts      Server Actions, only if the UI writes to the server
  service.ts
  store.ts        only for client demo state (Zustand)
  types.ts        zod schemas + inferred types
```

- Routes in `src/app/**`: read params → call a service (server) → render. No business logic.
- Server Actions: validate with Zod → call service → return. No business logic.
- Server Components by default; `"use client"` only where interaction needs it.
- Validate all outside input with Zod.
- All UI text in ar/en; logical CSS only (`.claude/rules/i18n-rtl.md`).
- Imports from other features: types, schemas, public functions only, one direction, no cycles.
- Generic, domain-free pieces go to `src/shared/`; everything else stays in the feature.

## 4. Check

- [ ] Code is boring and obvious (KISS); no unneeded abstraction
- [ ] Works in `ar` and `en`, RTL correct
- [ ] Inputs validated; types inferred from Zod
- [ ] Key actions tracked (only the listed ones)
- [ ] Flow doc matches what was built; status updated
- [ ] Type check and lint pass
