# 10 · Theme system (skins)

Status: **plan** (not built). Scope: the agency site (landing, guide, wizard, gallery, feedback) and the admin.
Demo templates keep their own palettes per variant (`PaletteScope`); they are not changed by a skin.

## Goal

Change the whole look (colors, fonts, sizes, spacing, corners, shadows, section style) by editing **one small file**,
without reading or touching feature code. A new skin costs a few hundred tokens of context, not the whole codebase.

## Today's problem

- Tokens exist (`src/app/globals.css`) but only colors, one font, and one radius.
- Features style themselves with raw Tailwind sizes (`text-3xl`, `py-16`, `gap-6`, `rounded-control`…), so the look is spread
  across ~50 components. Changing the design means editing all of them, and there is no typography scale or section rhythm,
  which is why pages look plain.

## Structure

```
src/shared/theme/
  skin.css          THE SOURCE OF TRUTH. Every value of the look, commented: colors, fonts, type scale,
                    spacing rhythm, radii, shadows, motion. A new skin = edit this file.
  recipes.css       How tokens combine into patterns (Tailwind @utility): section, container, eyebrow,
                    display / heading / lead text, card, chip, input, focus ring. Changed only when the
                    "shape" of the design changes, not for colors.
  fonts.ts          next/font: one Latin + one Arabic font for display and body (self-hosted).
  skins/            Saved skins (copies of skin.css), e.g. skins/neutral.css, skins/<name>.css.
                    To switch: copy the chosen one over skin.css (one change, one commit).
src/shared/ui/      Primitives built only from recipes: Section, Container, Heading, Eyebrow, Lead, Card,
                    Badge, Button, LinkButton, Field, Stat. Features use these, never raw sizes or colors.
docs/10-theme-system.md   This file: the token list and the rules.
```

Why one file and not a folder of docs: the skin is ~80 lines of named values. One commented file is enough for a person
or an agent to understand and change it; the rules live here once.

## What `skin.css` contains (the contract)

Names never change; only values do. Components use names only.

| Group | Tokens |
|---|---|
| Color, surfaces | `--color-bg`, `--color-surface`, `--color-surface-2`, `--color-inverse` (dark band), `--color-border` |
| Color, text | `--color-text`, `--color-muted`, `--color-on-inverse` |
| Color, brand | `--color-primary`, `--color-primary-hover`, `--color-on-primary`, `--color-accent`, `--color-on-accent` |
| Color, states | `--color-focus`, `--color-danger`, `--color-success`, `--color-whatsapp`, `--color-on-whatsapp` |
| Fonts | `--font-display`, `--font-body`, `--font-display-ar`, `--font-body-ar` (set by `fonts.ts`) |
| Type scale | `--text-display`, `--text-h1`, `--text-h2`, `--text-h3`, `--text-lead`, `--text-body`, `--text-small` (fluid `clamp()`), `--leading-tight`, `--leading-body`, `--leading-body-ar`, `--tracking-display` |
| Rhythm | `--space-section` (vertical padding of a section), `--space-section-sm`, `--container-max`, `--gutter`, `--stack` (gap between blocks) |
| Shape | `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-pill`, `--border-width` |
| Depth | `--shadow-card`, `--shadow-raised` |
| Motion | `--duration`, `--ease` (respects `prefers-reduced-motion`) |
| Section style | `--hero-style` choices are expressed as values (e.g. hero background = `--color-inverse` or `--color-surface`) |

## Rules

1. Features and pages use **primitives** (`<Section tone="inverse">`, `<Heading level={2}>`, `<Card>`), never raw text sizes,
   colors, shadows, or radii. Layout utilities (flex, grid, gap from the rhythm scale, logical spacing) stay allowed.
2. No hex values, `rgb()`, or arbitrary values (`bg-[#…]`, `text-[22px]`) outside `src/shared/theme/`.
3. Every skin passes contrast AA for text/background pairs (checked by a test that reads `skin.css`).
4. Arabic gets its own fonts and line height from the skin; nothing else changes for RTL.

A contract test (`tests/contracts/theme.test.ts`) enforces rules 2 and 3 so agents cannot drift.

## How a new skin is made (cheap in context)

1. Input: a reference (screenshot, HTML file in `theme-sources/`, or a short description: mood, 2–3 colors, fonts).
2. The agent reads only this doc + `skin.css` (+ the reference), writes a new `skins/<name>.css`, copies it to `skin.css`.
3. If the reference needs a different shape (e.g. pill buttons, full-bleed dark hero), the agent also edits `recipes.css`.
4. Checks: contrast test, axe, screenshots of landing / guide / wizard / gallery in ar + en for review.

## Migration plan (one agent, in order)

1. Create `src/shared/theme/` (skin, recipes, fonts) with the current neutral values as `skins/neutral.css`.
2. Add the primitives in `src/shared/ui`.
3. Refactor the agency site and admin features to the primitives (no visual redesign yet; behaviour and tests unchanged).
4. Add `tests/contracts/theme.test.ts` (no raw colors / arbitrary values outside theme, AA contrast of the skin).
5. Then design the first real skin from the owner's reference.

## Open questions

1. Reference for the new look of the agency site: a design to add to `theme-sources/`, one of the uploaded designs' styles,
   or a short brief (mood, colors, fonts)?
2. Brand name and logo: still placeholders, or decided?
3. Dark mode: not needed now (proposal), or wanted?
