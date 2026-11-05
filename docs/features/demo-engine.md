# Feature: Demo engine

Status: core built (storage, fake-auth, banner, dashboard-shell, palettes, ui, photo, format); editor and image-library are still planned

The full description, diagrams, and parts list are in `docs/05-demo-engine.md`. Storage rules are in `.claude/rules/storage.md`.

## Purpose

Write once what every template needs (storage, fake auth, dashboard shell, bilingual editors, image library, demo banner),
so each template only adds its design, content, and business modules.

## User stories

| # | As a demo user I want to… | So that… |
|---|---|---|
| E1 | register and log in to the dashboard of any template the same way | it feels like a real product |
| E2 | have my changes kept in my browser when I return | I continue where I stopped |
| E3 | reset a demo to its original state | I can start over |
| E4 | know clearly it's a demo saved only in my browser | I'm not confused |

| # | As a developer I want to… | So that… |
|---|---|---|
| E5 | create a new template store with key, version, and seed in a few lines | new templates are fast and consistent |
| E6 | reuse the dashboard form pieces, photo, palette scope, formatters, and business-name rule instead of copying them | the three categories stay consistent and a fix lands once |

## Tests

| Level | Test | Protects |
|---|---|---|
| Unit | store: old version → reset to seed keeping the account; invalid data → reset; reset demo keeps the account | E2, E3 |
| Unit | sample dates are relative to "today" | E2 |
| Unit | business name: register name replaces seed, Settings edit wins; dates keys; phone rules; contrast helper (WCAG) | E1, E2, E5 |
| Unit | fake auth: register hashes the password; right password logs in; wrong one fails | E1 |
| Contract | every template store uses `demo:<category>-<variant>` and has a version and a valid seed | E5 |
| E2E | banner visible on site and dashboard; changes survive reload; two tabs stay in sync | E2, E4 |

## Files

```
src/features/demo-engine/
  types.ts          LocalizedText { ar, en }
  messages.ts       getEngineT(locale) over messages/{ar,en}.json
  storage/          createTemplateStore, restore (pure rules), daysFrom, HydrationGate, useHydrated, session flags
  fake-auth/        account schema, register/login logic, businessNameOf, RegisterForm, LoginForm, DashboardGuard
  banner/           DemoBanner
  dashboard-shell/  DashboardShell, ValueTipBox, pickValueTip, createVariantContext (store + config + locale context), DashboardModule/OverviewCard/ActivityItem types
  palettes/         Palette, applyPalette, findPalette, PaletteScope (palette + optional fonts), contrast (WCAG ratio for palette tests)
  ui/               dashboard form pieces (TextInput, NumberInput, TextArea, SelectInput, BilingualField, Field, parseNumber) and page pieces (PageHeader, Panel, StatusBadge, ErrorSummary)
  photo/            Photo (CDN srcset + fallback box), PhotoData
  format/           formatPrice/Number/Date/DateTime/DateKey/Time, weekdayName, intlLocale · dates (date keys, minutesOf, timeKey) · phone (isValidPhone, phoneDigits, phoneWhatsAppUrl)
  track-edit.ts     trackEdit (content_edited with the section name only)
  storage/ also exports StoreOf<State>, the store type the shared dashboard parts select from
  editor/           (planned) bilingual text, rich text, image picker, list editor
  image-library/    (planned)
```
