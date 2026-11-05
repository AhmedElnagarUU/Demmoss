# Testing rules

AI agents change this code often. Tests are how we know a change did not break anything.
A test exists only if it protects something the business cares about. Strategy and examples: `docs/08-testing.md`.

## 1. What a valuable test is

- **Linked to the project.** Every test protects a user story (`W6`, `R3`…), a business rule (tie → simpler type,
  order total, slot capacity), or a project contract (ar/en parity, template contract, no physical CSS).
  The test name says which: `it("W6: saving a lead creates a new_lead notification")`.
- **Tests behavior, not implementation.** Call the public function, action, or page, and check the result a user or the
  admin would see. Never check private details (internal state names, number of calls, CSS classes).
- **Fails when the feature breaks.** When writing a test, break the code once on purpose and watch the test fail.
  A test that cannot fail is deleted.
- **Deterministic.** Fixed time (`vi.setSystemTime`, Playwright `page.clock`), no real network, no `sleep`, no order dependence.

## 2. Forbidden (fake or useless tests)

- Tests of libraries or the framework (that Zod validates, that Mongoose saves, that Next.js renders).
- Snapshot tests of markup or large objects.
- `expect(true)`-style tests, tests with no assertion, tests that only check "it renders without crashing".
- Mocking our own code (services, repositories, stores). Tests use the **real** code with a real in-memory MongoDB.
  Only true external boundaries may be faked (S3 if added, WhatsApp links are only checked as URLs).
- Tests written to raise a coverage number. We do not have a coverage target.
- Generated tests that repeat the implementation line by line.

## 3. Never weaken tests to get green

- Never delete, skip (`.skip`, `.only`, `test.fixme`), or loosen an assertion to make a change pass.
- If a behavior changes **on purpose**, update the test in the same change, update the flow doc, and say why in the commit message.
- A bug fix starts with a test that reproduces the bug and fails; then the fix makes it pass.

## 4. What each change must include

| Change | Required tests |
|---|---|
| Pure logic (quiz, totals, slots, value tips, status rules) | Unit tests: normal cases, edges, invalid input |
| Service / repository | Integration test with in-memory MongoDB |
| Server Action | Its Zod schema rejects bad input (unit); its happy path is covered by an integration or E2E test |
| Zustand store | Unit tests of its actions using the store directly (add, change status, reset keeps account, version reset) |
| New page or user flow | E2E test of the main path; ar + en and RTL smoke |
| New template variant | Gets the generic template contract tests automatically (catalog-driven) + E2E of its closed loop(s) |
| Content edit (guide, seeds, messages) | Content checks run automatically (schema + ar/en parity) |
| Bug fix | Regression test that failed before the fix |

## 5. Tools (only these)

| Tool | Used for |
|---|---|
| TypeScript `tsc --noEmit` | type errors |
| ESLint (Next.js config) + Prettier | code mistakes, consistent formatting |
| Vitest | unit, integration, content, and project-contract checks |
| mongodb-memory-server | real MongoDB for integration tests, no external database |
| Playwright + @axe-core/playwright | E2E journeys in a real browser, accessibility checks |

No React Testing Library and no component unit tests by default: logic is extracted into pure functions (unit tested)
and the UI is tested through real journeys (E2E). Add it only with the owner's agreement for a component whose logic
cannot be extracted.

## 6. Where tests live

- Unit and integration: next to the file, `name.test.ts` (e.g. `features/wizard/service.test.ts`).
- Project-wide contract checks: `tests/contracts/` (ar/en parity, template contract, physical CSS, event names).
- E2E: `e2e/<journey>.spec.ts`, one file per journey (e.g. `e2e/wizard.spec.ts`, `e2e/restaurant-fast-food.spec.ts`).
- Test helpers: `tests/helpers/` (in-memory db setup, admin login). No helper hides what a test checks.

## 7. Commands and definition of done

| Command | Runs | When |
|---|---|---|
| `npm run check` | typecheck + lint + format check + Vitest (unit, integration, contracts) | before every commit |
| `npm run e2e` | Playwright on a production build (`next build` + `next start`) with an in-memory db | before every push that touches UI or flows |
| `npm run e2e -- <file>` | one journey | while working |

A change is done only when `npm run check` passes, the related E2E journeys pass, and CI is green.
The agent reports test results honestly: if something fails, it says so with the output.

## 8. CI

GitHub Actions runs `npm run check` and `npm run e2e` on every push and pull request.
A red CI blocks merging (branch protection on the main branch).
