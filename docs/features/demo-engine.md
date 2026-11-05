# Feature: Demo engine

Status: core built (storage, fake-auth, banner, dashboard-shell, palettes); editor and image-library are still planned

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

## Tests

| Level | Test | Protects |
|---|---|---|
| Unit | store: old version → reset to seed keeping the account; invalid data → reset; reset demo keeps the account | E2, E3 |
| Unit | sample dates are relative to "today" | E2 |
| Unit | fake auth: register hashes the password; right password logs in; wrong one fails | E1 |
| Contract | every template store uses `demo:<category>-<variant>` and has a version and a valid seed | E5 |
| E2E | banner visible on site and dashboard; changes survive reload; two tabs stay in sync | E2, E4 |

## Files

```
src/features/demo-engine/
  types.ts          LocalizedText { ar, en }
  messages.ts       getEngineT(locale) over messages/{ar,en}.json
  storage/          createTemplateStore, restore (pure rules), daysFrom, HydrationGate, useHydrated, session flags
  fake-auth/        account schema, register/login logic, RegisterForm, LoginForm, DashboardGuard
  banner/           DemoBanner
  dashboard-shell/  DashboardShell, ValueTipBox, pickValueTip
  palettes/         Palette, applyPalette, findPalette
  editor/           (planned) bilingual text, rich text, image picker, list editor
  image-library/    (planned)
```
