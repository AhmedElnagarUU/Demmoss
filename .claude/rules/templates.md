# Template rules (the template contract)

A template is a **complete business website plus its dashboard**, built so a business owner sees exactly
what their final product could be and what value it brings. It is never a page of random sections.

## Organization

- Business field → one or more complete templates (e.g. Restaurant → Fine Dining, Fast Food & Delivery).
- No color/theme variants of one template. Variety comes from different complete templates.
- Each template is its own feature: `src/features/template-<slug>/`.
- Each template has its own thin route folder: `src/app/[locale]/demos/<slug>/...`.

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
10. **Catalog entry** (`meta.ts`: slug, field, name ar/en, short value pitch ar/en, screenshot) used by the gallery.
11. **Mobile-first, accessible, fast**: semantic HTML, keyboard usable, images optimized.
12. **A plan doc** `docs/features/template-<slug>.md` written and agreed before building.

## Folder layout

```
src/features/template-<slug>/
  site/            public website pages and sections
  dashboard/       dashboard pages and modules
  seed/            initial content { ar, en } and sample data
  store.ts         Zustand store (persist key, version, seed, actions)
  types.ts         zod schemas for the template data
  meta.ts          catalog entry for the gallery
```

## Converting a template from `theme-sources/`

- `theme-sources/<name>/` holds the original HTML/CSS. Code never imports from it.
- Conversion rebuilds the design as React + Tailwind components inside the template feature:
  keep the look, replace the original CSS/JS with Tailwind and React, extract all text into the seed as `{ ar, en }`,
  make it RTL-safe, and remove anything that does not serve a business goal.
- Confirm the theme's license allows this use before converting.
- Follow `.claude/skills/new-template`.
