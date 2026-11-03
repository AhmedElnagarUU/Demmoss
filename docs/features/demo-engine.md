# Feature: Demo engine

Status: planned

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

## Files

```
src/features/demo-engine/
  storage/          createTemplateStore(slug, version, seed, schema)
  fake-auth/        register, login, guard, logout
  dashboard-shell/  sidebar, header, layout
  editor/           bilingual text, rich text, image picker, list editor
  image-library/
  banner/
```
