# scripts/

Command-line tools for the developer, run from the terminal (e.g. `npm run hash-password`).
They are not part of the website.

Rule (KISS): add a script only when a real, repeated need appears.

Planned candidates:

| Script | Purpose | When |
|---|---|---|
| `hash-password` | Create the admin password hash for `.env` | Phase 3 (admin login) |
| `screenshots` | Capture gallery screenshots of each template | When templates exist |
| `clean-events` | Delete old tracking events | If the database grows |
