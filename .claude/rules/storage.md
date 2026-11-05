# Demo storage rules (browser)

Demo templates keep all their data in the visitor's browser. Nothing a demo user types is sent to our database.

## Zustand + persist

- Each template has one Zustand store in `store.ts`, using the `persist` middleware on localStorage.
- Components select only the slice they need, so only they re-render when it changes.
- Zustand is for demo state only. Server data (admin, leads) never goes in a Zustand store.

## Next.js: client only, hydrate safely

- Stores and every component that reads them are client components (`"use client"`).
- The server cannot read localStorage, so the store is created with `skipHydration` and loaded in the browser
  by the demo-engine helper. Until it is loaded, demo pages show a light skeleton (never seed text that then jumps),
  which avoids hydration mismatches.
- This pattern lives once in `demo-engine/storage`; templates do not repeat it.

## Keys

- One key per template: `demo:<template-slug>`. Templates never read or write another template's key.
- Shared visitor id (for tracking): `demo:visitor-id`.

## Version: reset, do not migrate

- Each store has a `version` number.
- When we change the shape of a template's data, we increase its version.
- If the saved data has an older version, the store **resets to the new seed** and keeps only the fake account
  (so the user stays registered). No migration code.

## Reset

- Every template offers "Reset demo", which restores the seed and keeps the fake account.

## Fake account

- Name + password only. The password is hashed in the browser (`crypto.subtle`, SHA-256) before saving.
- It protects the dashboard routes locally. It is not security; it makes the demo feel real.
- The name and password are never sent to the server. Registration is reported to tracking anonymously.

## Images

- Now: users pick images from the template's photo list (CDN URLs, see `design.md`). Only the chosen URL is stored.
- Later (planned): demo users can upload their own photos to **Cloudflare R2**. Uploaded demo photos live **10 hours**,
  then they are deleted (see `docs/03-architecture.md`). The demo shows a fallback photo when an upload has expired.
- Never store image files in localStorage (5MB limit); store only the URL.

## Reading stored data

- Data loaded from localStorage is validated with the template's Zod schema. Invalid data → reset to seed.
