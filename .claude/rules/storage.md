# Demo storage rules (browser)

Demo templates keep all their data in the visitor's browser. Nothing a demo user types is sent to our database.

## Zustand + persist

- Each template has one Zustand store in `store.ts`, using the `persist` middleware on localStorage.
- Components select only the slice they need, so only they re-render when it changes.
- Zustand is for demo state only. Server data (admin, leads) never goes in a Zustand store.

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

- Version 1: users pick images from a built-in image library (bundled, optimized files).
- Uploads are **not decided**. If enabled, they go to the owner's existing AWS S3 bucket
  (implementation to be created then, see `docs/03-architecture.md`). Never store uploaded images in localStorage (5MB limit).

## Reading stored data

- Data loaded from localStorage is validated with the template's Zod schema. Invalid data → reset to seed.
