# Agency site with live demos

The website of our web design and software agency: it sells value to businesses, explains the kinds of software,
collects project requests, and offers working demo templates (full business websites with dashboards, saved in the browser).

Status: phase 1 (foundation) built. See [`docs/07-roadmap.md`](docs/07-roadmap.md).

## Run it

Requires Node.js 22.

```bash
npm install
cp .env.example .env.local      # fill in the values
npm run dev                     # http://localhost:3000 → /ar or /en
```

| Command | What it does |
|---|---|
| `npm run check` | Types, lint, format, unit + integration + contract tests (before every commit) |
| `npm run e2e` | Production build + Playwright journeys with an in-memory MongoDB |
| `npm run format` | Format the code |

Tests download a MongoDB binary the first time (`mongodb-memory-server`). If that is blocked on your network,
set `E2E_MONGODB_URI` to a local MongoDB for E2E. Details: [`docs/08-testing.md`](docs/08-testing.md).

- Start here: [`CLAUDE.md`](CLAUDE.md)
- Vision: [`docs/01-vision.md`](docs/01-vision.md)
- Flows and user stories: [`docs/02-flows.md`](docs/02-flows.md)
- Architecture: [`docs/03-architecture.md`](docs/03-architecture.md)
- Data and tracking: [`docs/04-data-and-tracking.md`](docs/04-data-and-tracking.md)
- Demo engine: [`docs/05-demo-engine.md`](docs/05-demo-engine.md)
- Template contract: [`docs/06-template-contract.md`](docs/06-template-contract.md)
- Roadmap: [`docs/07-roadmap.md`](docs/07-roadmap.md)
- Testing: [`docs/08-testing.md`](docs/08-testing.md)
- Design sources (uploaded designs → site structure): [`docs/09-design-sources.md`](docs/09-design-sources.md)
- Theme system (skins): [`docs/10-theme-system.md`](docs/10-theme-system.md)
- Production readiness: [`docs/11-production.md`](docs/11-production.md)
- Feature flow docs: [`docs/features/`](docs/features/)
