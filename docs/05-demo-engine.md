# 05 · Demo engine

The shared core every template uses, in `src/features/demo-engine/`. It is written once so each template
only adds its design, content, and business modules. Templates import from it; it never imports a template.

## What it provides

| Part | What it does |
|---|---|
| `storage/` | Helper to create a template's Zustand persist store: key `demo:<slug>`, version, seed (with sample dates made relative to today), reset that keeps the account, Zod validation of loaded data, sync between tabs (browser `storage` event) |
| `fake-auth/` | Register and login pages/components (name + password hashed in the browser + optional business name), a guard for dashboard routes, logout |
| `dashboard-shell/` | Sidebar, header, language switch, RTL-ready layout, page title, empty states, value-tip box |
| `palettes/` | Applies the selected palette (CSS variables) to a template's site and dashboard |
| `editor/` | Bilingual field editors: text `{ar,en}`, rich text, image picker from the library, list editor (add/remove/reorder) |
| `image-library/` | Bundled, optimized images grouped by topic |
| `banner/` | "Live demo, saved only in your browser" bar with Dashboard, WhatsApp, and Reset buttons |
| tracking | Calls `track()` for `demo_opened`, `demo_registered`, `demo_login`, `content_edited`, `demo_reset` |

Business-specific modules (bookings, menu, appointments, listings) live in each template, not here.
If two templates need the same module, it is copied first; it moves into the engine only when a third needs it (KISS).

## Template store lifecycle

```mermaid
flowchart TD
  O[Template opened] --> K{localStorage has demo:slug?}
  K -->|no| SEED[Load seed content]
  K -->|yes| V{Version matches?}
  V -->|no| RESET[Reset to new seed, keep fake account]
  V -->|yes| Z{Valid by Zod schema?}
  Z -->|no| RESET
  Z -->|yes| USE[Use saved data]
  SEED --> USE
  RESET --> USE
  USE --> E[User edits / makes bookings]
  E --> SAVE[persist saves to localStorage]
  SAVE --> E
  USE --> R[User clicks Reset demo]
  R --> RESET
```

## Fake auth flow

```mermaid
flowchart TD
  D[User opens dashboard] --> A{Account in store?}
  A -->|no| REG[Register: name + password]
  REG --> H[Hash password in browser]
  H --> SAVE[Save account in store]
  SAVE --> TR[track demo_registered]
  TR --> IN[Logged in → dashboard]
  A -->|yes| S{Session active?}
  S -->|yes| IN
  S -->|no| LOGIN[Login: name + password]
  LOGIN --> C{Hash matches?}
  C -->|yes| TL[track demo_login] --> IN
  C -->|no| ERR[Show error] --> LOGIN
```

## Closed loop (the selling moment)

```mermaid
sequenceDiagram
  participant Site as Template site
  participant Store as Template store (localStorage)
  participant Dash as Template dashboard
  participant T as track()
  Site->>Store: addBooking({...})
  Site->>T: demo_action { template, kind: "booking" }
  Site-->>Site: "Booking received" + "Open your dashboard to see it"
  Dash->>Store: read bookings
  Store-->>Dash: booking appears in the list
```

## Demo banner

Always visible on template site and dashboard, small, dismissible per session:
"This is a live demo: your changes are saved only in your browser" · Open dashboard · Talk to us on WhatsApp · Reset demo.
