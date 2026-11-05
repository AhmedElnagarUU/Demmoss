# Template rules (the template contract)

A template is a **complete business website plus its dashboard**, built so a business owner sees exactly
what their final product could be and what value it brings. It is never a page of random sections.

## Organization: categories and variants

- Demos are grouped by **business category** (Restaurants & cafés, Clinics, Real estate…).
  The list is in `docs/06-template-contract.md`.
- Each category has **2 variants**. A variant is a **different kind of business inside the category**
  (e.g. Restaurant → Fine dining with reservations, Fast food with online orders), not a color or style change.
- **No generic content.** Each variant has its own business, its own real content, and its own website design.
- **One dashboard per category**, shared by both variants: the same shell and common modules
  (overview, content editing, customers, settings), plus **variant modules** for what differs
  (e.g. reservations for fine dining, orders for fast food).
- Each category is one feature: `src/features/template-<category>/`.
- Each variant has its own slug `<category>-<variant>` (used for the storage key, tracking, and the gallery)
  and its own thin route folder: `src/routes/$locale/demos/<category>/<variant>/...`.

## Every template must have

1. **A business goal per section.** For each page/section, the plan states which business goal it serves
   (trust, leads, bookings, sales, saving time…). Sections without a goal are removed.
2. **Real, specific content** in Arabic and English. No lorem ipsum, no generic filler.
3. **At least one closed-loop flow**: an action on the public site (booking, order, inquiry, appointment)
   that appears in the template dashboard.
4. **Fake register and login** (name + password, stored in the browser) before the dashboard.
5. **A dashboard** with: content editing (bilingual) + the business-specific management for that field.
6. **Language switch** (AR/EN) on the site and in the dashboard; full RTL.
7. **Seed data** (`seed/`), a **schema version**, and a **reset demo** action.
8. **Demo banner** from `demo-engine` ("live demo, changes saved only in your browser").
9. **Tracking** of key actions via `track()`.
10. **Catalog entry** per variant (`meta.ts`: slug, category, variant, name ar/en, short value pitch ar/en, screenshot) used by the gallery.
11. **Mobile-first, accessible, fast**: semantic HTML, keyboard usable, images optimized.
12. **A plan doc** per category `docs/features/template-<category>.md` (shared dashboard + both variants), agreed before building.

Rules 1–11 apply to **each variant**.

## Every template also has (agreed)

- **Business name at register (optional):** if given, it replaces the seed business name on the site and dashboard.
- **Color palettes:** 5 palettes per variant in Settings, defined as tokens with checked contrast.
- **Value tips:** small notes in the dashboard computed from the demo data (e.g. a booking that came while closed). Never invented numbers.
- **Sample data:** the seed includes sample activity with dates relative to today, so the dashboard is never empty.

## Folder layout

```
src/features/template-<category>/
  dashboard/               shared dashboard: shell config + common modules
  modules/                 variant modules (e.g. reservations/, orders/), each used by one or both variants
  types.ts                 zod schemas shared by both variants
  variants/
    <variant>/
      site/                public website pages and sections (own design)
      seed/                content { ar, en } and sample data for this business
      dashboard.ts         which modules this variant shows in the dashboard
      store.ts             Zustand store (key demo:<category>-<variant>, version, seed, actions)
      meta.ts              catalog entry for the gallery
```

- The two variants never import each other. Shared code lives at the category level.
- A variant's dashboard = shared modules + the modules listed in its `dashboard.ts`. No other switches.

## Converting a template from `theme-sources/`

- `theme-sources/<name>/` holds the original HTML/CSS. Code never imports from it.
- Conversion rebuilds the design as React + Tailwind components inside the variant folder (`variants/<variant>/site/`):
  keep the look, replace the original CSS/JS with Tailwind and React, extract all text into the seed as `{ ar, en }`,
  make it RTL-safe, and remove anything that does not serve a business goal.
- The themes are the owner's own original work, so there is no license check.
- Follow `.claude/skills/new-template`.
