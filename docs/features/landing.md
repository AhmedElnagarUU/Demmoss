# Feature: Landing

Status: built (copy is a first version; the live demo cards arrive with the gallery)

## Purpose

Explain in a few seconds what the agency delivers and the **value it brings to a business**, and move the visitor
to the Software Guide, the wizard, or the demos.

## Flow in plain words

1. The visitor lands on `/ar` or `/en` (English by default; a remembered choice wins).
2. The hero states the business result we bring and offers two actions: **Start your project** (wizard) and **See live demos**.
3. Sections, in order:
   - **Hero**: badge, two-line headline whose last words sit in a green box with a blinking cursor, subtitle, green
     "Start your project" and white "See live demos" buttons, a caption, then three tilted sample-dashboard cards
     (New leads, Bookings this week, Orders today; only the centre one on phones) and green arcs at the bottom corner.
   - **Why choose us (bento)**: customers at any hour (three icon tiles), your time comes back (notification rows), trust at
     first sight (green donut), your dashboard live (weekday bar chart), customers in their own language (orbit
     illustration), requests flow to you automatically (node diagram).
   - **What we deliver**: website, website with dashboard, custom system or SaaS; icon tile, green value line, grey text.
   - **Not sure what you need?** one wide glass card linking to the Software Guide.
   - **Live demos**: one wide glass card with a few highlighted templates from the gallery.
   - **Get started in 4 simple steps**: a 2x2 grid of glass cards, each with a small green line illustration.
   - **Final call to action**: a glass card with green glow, wizard button and WhatsApp.
4. Header: logo/brand name, links (Guide, Demos, Start), language switch. Floating feedback and WhatsApp buttons.

## Look

The public site uses the BOCHKE identity: pure black background, dark-green glass cards (1px border, soft green glow in
one corner), white headings with an italic serif accent word (bold upright in Arabic), grey body text and emerald green
`#22c55e` accents. Primary buttons are small green rounded rectangles with an arrow; secondary buttons are white. The hero
has soft green light rays falling from the top and concentric green arcs below. Reference:
[`docs/design-references/bochke-ui.png`](../design-references/bochke-ui.png).

## User stories

| # | As a visitor I want to… | So that… |
|---|---|---|
| L1 | understand in one screen what this agency does for my business | I decide to stay |
| L2 | see the value of each kind of product, not a list of features | I connect it to my own problems |
| L3 | see how the agency works step by step | I trust the process |
| L4 | reach the wizard, the guide, or the demos from anywhere on the page | I act when I'm ready |

## Flow diagram

```mermaid
flowchart TD
  IN[Visitor arrives] --> H[Hero: business result]
  H -->|Start your project| W[Wizard]
  H -->|See live demos| GAL[Gallery]
  H --> VAL[Value section]
  VAL --> DEL[What we deliver]
  DEL --> GT[Not sure? → Software Guide]
  GT --> GUIDE[Software Guide]
  DEL --> DEM[Highlighted demos]
  DEM --> GAL
  DEM --> HOW[How we work]
  HOW --> CTA[Final CTA]
  CTA --> W
  CTA --> WA[WhatsApp]
```

## Data

None stored. `page_view` and `whatsapp_clicked` are tracked. Text in message files (ar/en). Highlighted demos come from the gallery catalog.

## Tests

| Level | Test | Protects |
|---|---|---|
| E2E | ar and en render, `dir` correct, CTAs reach wizard, guide, demos, WhatsApp | L1–L4 |
| E2E | axe: no serious accessibility issues; title, description, hreflang present | quality, SEO |

## Files

```
src/features/landing/
  components/      landing-page, hero, value, deliver, guide-teaser, demo-highlights, how-we-work, final-cta, section
  messages/        ar.json, en.json

src/features/site-shell/   header (nav, mobile menu, language switch), footer (WhatsApp), skip link
```

## Out of scope

- Pricing, client portfolio, testimonials (may be added later).
