# Code rules

## 1. KISS: Keep It Simple

- Code must be simple enough to read and review with zero ambiguity about what is right or wrong.
- No clever abstractions, no premature generalization, no "frameworks inside the framework".
- Optimize for readability over cleverness. If two implementations exist, pick the boring one.
- Do not add comments explaining obvious code; write code so obvious it needs no comments.

## 2. Feature-based structure: never organize by file type

The codebase is organized by feature/module, not by technical type.

```
src/
  routes/                       TanStack Router route files only (thin)
  features/
    <feature>/
      components/               React components of this feature
      hooks/                    React hooks of this feature (if needed)
      model.ts                  Mongoose schema/model (if it persists data)
      repository.ts             data access through model.ts
      server-functions.ts       createServerFn wrappers: validate input → call service → return
      service.ts                feature logic called by server functions
      store.ts                  Zustand store (client-side demo state only)
      types.ts                  zod schemas + inferred types
      <sub-area>/               group related files when the feature grows
  shared/
    db/                         MongoDB connection, db error helpers
    ui/                         generic UI primitives (button, field, card, icon, logo)
    i18n/                       locale config, ar/en messages for shared UI
    env.ts                      validated environment variables
scripts/                        CLI entry points for the developer
theme-sources/<name>/           original HTML/CSS templates (input for conversion, never imported by code)
docs/                           vision, flows, architecture, feature flow docs, design references
```

- Each feature owns its components, hooks, API logic, schemas, and types under `src/features/<feature>/`.
- A route file in `src/routes/**` must contain no business logic: read params → call loader/server function → render feature components.
- A server function must contain no business logic: validate input with Zod → call the service → return the result.
- `src/shared/` holds generic, domain-free code only (db connection, UI primitives, i18n setup, env).
  Domain code (templates, leads, events, catalog, content) stays in its feature, even when another feature uses it.
- A feature may import another feature's types, schemas, and public functions
  (e.g. `wizard` imports the template catalog from `gallery`). Imports go one way: never create a cycle between two features.
- Templates import from `demo-engine`; `demo-engine` never imports from a template.
- Any feature can be understood, modified, or removed without breaking unrelated features.

## 3. Flow document for every new feature

Before a feature is built it must have `docs/features/<feature>.md` with:

1. **Purpose**: the business value it brings.
2. **Flow in plain words**: step by step, human language.
3. **User stories**: "As a … I want … so that …".
4. **Mermaid diagrams**: a `flowchart`; add a `sequenceDiagram` when the browser talks to the server.
5. **Data**: what is stored, where (MongoDB or localStorage), and its shape.

The doc is updated in the same change whenever the flow changes. Use `docs/features/_template.md`.

## 4. TypeScript and validation

- `strict` mode. No `any`. No non-null assertions to silence errors.
- Every input from outside (request body, query, form, localStorage, env) is parsed with Zod.
- Types come from Zod: `type Lead = z.infer<typeof leadSchema>`. Do not write the same shape twice.

## 5. Data access

- Only `repository.ts` talks to the Mongoose model. Services call repositories. Server functions call services.
- Mongoose code runs only on the server: never import `model.ts`, `repository.ts`, or `service.ts` from a component.
- One model per file: `model.ts` in the feature that owns the data. The schema is the documentation of the data shape.

## 6. Configuration

- Anything that may change (brand name, WhatsApp number, default locale, site URL, secrets) comes from `.env`,
  read only through `src/shared/env.ts`, which validates it with Zod.
- Public values use the `VITE_` prefix (visible in the browser). Secrets never use it.
- Never hardcode those values in components.

## 7. Naming

- Files and folders: `kebab-case`. Components: `PascalCase`. Functions and variables: `camelCase`.
- Name things after the business meaning (`createLead`, `bookingList`), not the technique (`handleData`, `utils2`).

## 8. Dependencies

- Add a package only when writing it ourselves would be clearly worse. Prefer the platform (fetch, Intl, crypto.subtle).
