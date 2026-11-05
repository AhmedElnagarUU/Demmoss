---
name: new-template
description: Plan and build a demo template (complete business website + dashboard), from scratch or by converting an HTML/CSS theme in theme-sources/. Use when the user asks to create, plan, add, or convert a template or demo.
---

# New template

A template is a complete business website plus its dashboard. It must sell value.
Templates are planned per **category**: 2 variants (different kinds of business, own content and site) and one shared dashboard.

Read first: `CLAUDE.md`, `.claude/rules/templates.md`, `.claude/rules/storage.md`, `.claude/rules/i18n-rtl.md`,
`docs/05-demo-engine.md`, `docs/06-template-contract.md`.

## 1. Plan (no code)

Create `docs/features/template-<category>.md` from `docs/features/_template.md` and add, for each variant:

1. **Business profile**: field, its customers, what the owner wants.
2. **Value map**: every page and section with the business goal it serves and its value message. Drop anything without a goal.
3. **Site pages and sections**.
4. **Closed-loop flow(s)**: site action → what appears in the dashboard (at least one).
5. **Dashboard modules**: shared modules (both variants) and variant modules.
6. **Data schema** (Zod outline) and **seed content** outline in ar/en.
7. **Source**: scratch, or `theme-sources/<name>/`.
8. Mermaid diagrams and user stories.
9. **Tests**: unit tests for the variant's business rules and E2E for each closed loop (the generic template contract tests run automatically).

Get the user's agreement on the plan.

## 2. If converting from `theme-sources/<name>/`

- Read the original HTML/CSS. List its pages and sections and map them to the value map; drop or replace sections without a goal.
- Rebuild as React + Tailwind components in `src/features/template-<category>/variants/<variant>/site/`. Keep the look; do not copy the original CSS/JS files.
  Replace jQuery or plugin behaviour with plain React.
- Move every text into the seed as `{ ar, en }`. Write real Arabic, not a literal translation.
- Make it RTL-safe (logical utilities, flipped directional icons).
- Never import anything from `theme-sources/`.

## 3. Build

Folder layout: `.claude/rules/templates.md`. Short version:

```
src/features/template-<category>/
  dashboard/ modules/ types.ts           shared by both variants
  variants/<variant>/site/ seed/ dashboard.ts store.ts meta.ts
src/app/[locale]/demos/<category>/<variant>/...   thin route files only
```

- `store.ts`: `createTemplateStore("<category>-<variant>", version, seed, schema)` from demo-engine.
- Use `demo-engine` for storage, fake auth, dashboard shell, editors, image library, banner.
- Business modules (bookings, menu, requests…) stay in the category feature (`modules/`).
- Track `demo_action` for each closed-loop action.
- Add `meta` to the gallery catalog.

## 4. Test

- Unit tests for business rules (totals, slots, status paths, value tips) and store actions.
- E2E per closed loop, in ar and en, desktop and phone (`e2e/<category>-<variant>.spec.ts`).
- `npm run check` (includes the template contract checks) and the template's E2E must pass.

## 5. Accept

Run the checklist in `docs/06-template-contract.md`, check both languages on mobile and desktop,
then update the template's status in `docs/06-template-contract.md` and its plan doc.
