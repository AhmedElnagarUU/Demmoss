# DESIGN SPEC — Hartwell & Co. Realty (`theme-sources/02-hartwell-realty.html`)

Source: single HTML file (inline `<style>` + inline `<script>`), `lang="en"`, title `Hartwell & Co. Realty`. Google Fonts: Montserrat 200/300/400/500/600.
The real estate agency variant (`src/features/template-real-estate/variants/agency/`) mirrors it. Everything below is quoted from that file.

---

## 1. Tokens and base

```css
:root{--bg:#f4f1ec;--surf:#fff;--ink:#111;--muted:#7c776f;--acc:#b8946f;--dark:#121212;--beige:#d9b99b;--line:rgba(17,17,17,.14);--lined:rgba(255,255,255,.15)}
html{scroll-behavior:smooth;scroll-padding-top:80px}
body{font-family:'Montserrat';font-weight:300;background:var(--bg);color:var(--ink);line-height:1.7;overflow-x:clip}
.wrap{max-width:1320px;padding:0 32px}   /* 16px under 640px */
section{padding:110px 0}                  /* 80px under 1024px, 64px under 640px */
h1,h2,h3{font-weight:200;text-transform:uppercase;letter-spacing:.14em;line-height:1.2}   h2{font-size:clamp(26px,3.4vw,44px)}
.label{font-size:11px;font-weight:500;letter-spacing:.28em;uppercase;color:var(--acc);gap:14px;margin-bottom:22px}  .label:before{44px x 1px rule}
.pill{padding:14px 30px;font-size:11px;font-weight:500;letter-spacing:.2em;uppercase;border-radius:999px;transition:.3s}
.pill.dark{bg ink, white text; hover bg --acc}   .pill.line{border 1px --line; hover border --ink}
.rv{opacity:0;transform:translateY(28px);transition:opacity .9s,transform .9s}  .rv.in{none}
```

| Source | Our token (Bronze palette, the default) |
|---|---|
| `--bg` #f4f1ec | `--color-bg` |
| `--surf` #fff | `--color-surface` |
| `--ink` #111 | `--color-text`, `--color-primary` (buttons), `--color-focus` |
| `--muted` #7c776f (4.0:1 on the page, fails AA) | `--color-muted` #6b665e |
| `--line` rgba(17,17,17,.14) | `--color-border` #d4d1cd (the same blend on the page) |
| `--acc` #b8946f as text (2.7:1, fails AA) | `--re-accent` #7d5f3a for small text; `--re-gold` #b8946f for decoration only (slider fill, bar, icons, rules) |
| `--dark` #121212 | `--re-dark` |
| `--beige` #d9b99b | `--re-beige` |
| pill hover `--acc` with white text (2.8:1) | `--color-primary-hover` #7a5a37 (white text passes AA) |

Reduced motion: all animations and transitions off, `.rv` shown.

## 2. Header (fixed nav, 76px)

- `nav`: fixed, `rgba(244,241,236,.88)` + `backdrop-filter: blur(14px)`, bottom border `--line`. Ours: sticky under the demo banner, `bg-bg/90 backdrop-blur-[14px]`.
- Logo: weight 300, `letter-spacing:.3em`, 14px, uppercase, nowrap, with `<b>&</b>` (weight 600): "Hartwell **&** Co. Realty".
- Links (gap 38px): 11px, `.22em`, uppercase, `padding 6px 0`, a 1px `--acc` underline that grows from 0 to 100% on hover: Buy, Rent, Sell, Agents, Contact.
- Pill `dark` "Schedule a viewing".
- Under 1024px: links and the pill are hidden, a 40px burger (three 1px lines at 14/20/26px, turns into an X) opens a panel under the bar (`padding 10px 16px 26px`, links 12px `.22em`, 16px vertical padding, hairlines, the pill at the end).
- Added by us: the language switch (always visible) and, under 460px, a smaller logo (11px, `.18em`) so the header fits 360px.

## 3. Sections of the home page, in order

1. **Hero** (`padding:130px 0 0`; 100px under 640px). Grid `1.1fr 1fr`, gap 60px. Left: label "Residential brokerage", h1 "Find the place you'll call home" (`clamp(34px,5vw,76px)`, `letter-spacing:.12em`, line-height 1.12), `p.sub` (max-width 440px, muted, 14px, `.04em`, margin-top 28px), padding `50px 0 170px`. Right: photo (`photo-1600585154340`) with radius `200px 200px 24px 24px`, `min-height:640px`; under 1024px the grid becomes a column, the photo `min-height:480px; radius 140/20; order 2`; under 640px `380px; 110/18`. Two **hotspots** (18px white dots with a pulsing white glow, `pulse 2.4s`): at 30%/42% "Heated pool terrace — Included" and 68%/62% "Open-plan living — 180 m² ground floor"; the tip (10px, `.16em`, uppercase, `rgba(18,18,18,.9)`, radius 12px) shows on hover, focus or tap.
2. **Search card** (overlaps the hero: `margin:-90px 0 0`, white, radius 28px, `padding 22px 26px 26px`, shadow `0 30px 70px rgba(17,17,17,.12)`, `width:min(760px,62%)`; under 1024px `100%`, margin -60px; under 640px padding `18px 16px 20px`, margin -40px). Tabs Buy / Rent (11px, `.22em`, active ink with a 1px underline). Grid `1fr 1fr 1fr auto`, gap 14px (under 1024px two columns, the pill full width): Location (Any location, Riverside, Old Town, Hillcrest, Harbour District), Property type (All types, House, Apartment, Villa), Price range, pill "Search". Field labels 9px, `.22em`; inputs have only a bottom border that turns `--acc` on focus.
3. **Numbers** (`margin-top:70px`, white, borders top and bottom): four columns, `padding 46px 20px`, hairline dividers, value `clamp(30px,3.6vw,52px)` weight 200 `.06em` that **counts up** over 1.6s (cubic ease-out) when it scrolls into view; label 10px, `.26em`, muted. 2,400+ Homes sold · $1.2B Sales volume · 35 Expert agents · 18 Years in business. Under 640px: two columns.
4. **Current listings** (`#listings`). Head: label "Featured properties", h2 "Current listings", filter tabs (pills, 10px, `.2em`, active ink) All / Houses / Apartments / Villas / For rent. Cards: grid of 4 (2 under 1024px, 1 under 640px), gap 24px, white, radius 20px, hover lifts 6px with shadow `0 24px 50px rgba(17,17,17,.1)`; photo 4:3 (zoom 1.06 on hover), tag (9px pill, top-left), heart button (36px, top-right, turns red `#c0504a` when on); body `padding 20px 22px 24px`: price 20px weight 300 `.08em` (rent adds `/mo`), address 11px uppercase muted, three facts (bd / ba / m²) with bronze line icons under a hairline. Empty text "No properties match this filter right now."
   The eight listings: 14 Alder Lane, Riverside (house, $1,250,000, 4/3/260, New) · 8 Quay Street, Harbour District (apartment, $4,200 /mo, 2/1/92, Open house) · 3 Cypress Court, Hillcrest (villa, $2,980,000, 6/5/480, New) · 27 Mill Yard, Old Town (apartment, $690,000, 2/2/88) · 61 Birch Road, Riverside (house, $3,400 /mo, 3/2/145) · 9 Laurel Heights, Hillcrest (villa, $2,450,000, 5/4/390, Open house) · 102 Dock Lofts, Harbour District (apartment, $2,900 /mo, 1/1/64, New) · 40 Orchard Close, Old Town (house, $985,000, 4/2/198).
5. **Why Hartwell** (dark `#121212`): label, h2 "Three principles,<br>one calm process", three columns (`margin-top:70px`, hairline dividers `--lined`, `padding 10px 44px`): number 48px weight 200 beige, h3 15px `.2em` beige, text 13px `rgba(255,255,255,.62)`, line-height 1.9. Under 640px one column with top hairlines.
6. **Neighbourhoods** (`height:620px`, 560px under 1024px): night photo (`photo-1486406146926`) under a gradient `180deg rgba(0,0,0,.25), rgba(0,0,0,.1) 40%, rgba(0,0,0,.75)`; title at the top (60px); four columns with left hairlines (`rgba(255,255,255,.3)`), h3 14px `.22em` beige, p 12px (Riverside 46 listings · Old Town 31 · Hillcrest 28 · Harbour District 19); hover tints `rgba(217,185,155,.14)`. Under 640px: auto height, 2x2 grid with 200px rows, no gradient.
7. **Mortgage calculator** (`#mortgage`): two columns, gap 60px, centred. Left: label, h2 "Plan your monthly payment", lead (muted, 14px, max-width 420px), pill `line` "Request a valuation". Right: white card (radius 28px, padding 42px) with four sliders (Home price 100k–3M step 10k default 850k; Down payment 5–60% default 20; Interest rate 1–10 step .05 default 5.2; Term 5–35 years step 5 default 25): 2px line filled `--acc` up to an 18px ink thumb; value 13px; then the monthly payment (`clamp(34px,4vw,52px)`, weight 200, `/ month`), a 10px principal/interest bar and a legend.
8. **Agents** (`padding-top:0`): label "Our agents", h2 "Meet the team"; grid of 4; portrait 3:4, radius 20px, grayscale .3 that clears and zooms 1.05 on hover, three social icons slide up from the bottom on hover or focus; h3 14px `.2em`, role 10px `.22em` bronze, phone 12px muted. Edward Hartwell (Principal Broker) · James Calloway (Senior Sales Agent) · Matteo Marchetti (Lettings Director) · Marcus Bell (Luxury Specialist).
9. **Client stories** (white band, centred): label "Kind words", h2 "Client stories", slider (max-width 780px) of three quotes (`clamp(18px,2.2vw,26px)`, weight 200, `.04em`), cite 11px `.24em` bronze + context 10px muted; arrows (40px circles) and dots (8px), moves with `cubic-bezier(.7,0,.2,1)` 0.7s, auto every 6s. Maya & Daniel R. (Bought in Riverside) · Tomas Whitfield (Sold in Old Town) · Priya Nair (Renting in Harbour District).
10. **Contact** (`#contact`): grid `1.1fr 1fr`, gap 60px. Left: white form card (radius 28px, padding 42px): label "Book a viewing", h2 "Schedule a visit" (`clamp(22px,2.6vw,32px)`), fields Name, Email, Phone, Property, Date, Time (six times), Message, pill "Request viewing", a confirmation box (bronze border, radius 14px). Right: label "Visit our office", h2 "Hartwell House", Address (12 Example Row, Riverside, 00000), Contact (+1 (555) 010-2030, hello@hartwell.example), Hours (Mon - Fri 9:00 - 18:00, Sat 10:00 - 15:00), a drawn street map (280px, radius 24px) with a pin and the label "Hartwell & Co.".

## 4. Footer

Dark, `rgba(255,255,255,.65)`, `padding 90px 0 36px`. Grid `1.5fr 1fr 1fr 1fr`, gap 50px (two columns under 1024px, one under 640px), hairline below. Column 1: logo, "Property news and new listings, delivered monthly. No noise.", newsletter (underlined input + beige "Subscribe"; answers "Thank you for subscribing. Welcome to Hartwell."). Explore: Buy, Rent, Sell, Mortgage calculator. Company: Agents, Reviews, Neighbourhoods, Contact. Follow: Instagram, Facebook, LinkedIn, X (36px circles). Bottom row: "© 2026 Hartwell & Co. Realty", "Privacy · Terms".

## 5. Interactions

Reveal on scroll (`.rv`, threshold .12) · counters · filter tabs and the Buy/Rent search · heart toggles · hotspots · burger · client slider (auto, arrows, dots) · sliders recalculate the mortgage · viewing form and newsletter confirmations.

## 6. Differences between the source and our variant (on purpose)

| Source | Ours | Why |
|---|---|---|
| Dollars | Riyals (x3.75, rounded); the sales volume reads "SAR 4.5B"; rent is per year | Project currency; the data shape keeps rent per year |
| Search with location and price does nothing (only type and Buy/Rent filter) | The location and price choices also filter the listings | The demo's working filter logic |
| Price bands $500k / $1M / $2M | SAR 2M / 4M / 8M (rent: 140k / 180k per year) | Rounded riyal bands |
| Viewing form has Email | No email field | The viewing data (and dashboard) has name and phone only |
| Time is a select of six times | Chips of the free times only (a taken slot cannot be booked) | Working slot logic |
| Buy / Rent / Sell nav filter or scroll inside one page | Buy and Rent open the Listings page with that filter; Sell scrolls to the calculator | The inner Listings page is part of the demo |
| Muted text #7c776f, accent text #b8946f, hover #b8946f with white text | Darker AA-safe values, see section 1 | Contrast AA |
| Hover colour on dark pill | `--color-primary-hover` | Contrast AA |
| Neighbourhood counts are fixed text | The same fixed text (46, 31, 28, 19) | Mirrors the source |
| Fixed nav | Sticky header below the demo banner, plus the language switch | The demo banner and the language rule |
| `<h4>` column titles | Plain paragraphs | Heading order |
| "house" listing type | The townhouse type of the shared data, shown as "House" | Shared real estate schema |

Inner pages (Listings, Property, About, Contact) keep their function, use the same tokens, the same thin uppercase headings and the same pill and card language. The Contact page reuses the home page's viewing form and office block, plus the question / valuation form.
