# scripts/

Command-line tools for the developer, run from the terminal.
They are not part of the website.

Rule (KISS): add a script only when a real, repeated need appears.

Available:

| Script | Purpose |
|---|---|
| `hash-password` | `npm run hash-password -- "my password"` prints the `ADMIN_PASSWORD_HASH` value for `.env` (`scrypt$<salt>$<hash>`, Node `crypto`, no dependency) |

Planned candidates:

| Script | Purpose | When |
|---|---|---|
| `screenshots` | Capture gallery screenshots of each template | When templates exist |
| `clean-events` | Delete old tracking events | If the database grows |
