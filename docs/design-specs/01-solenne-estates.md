# DESIGN SPEC — Solenne Estates (`theme-sources/01-solenne-estates.html`)

Source: single HTML file (inline `<style>` + inline `<script>`), `lang="en"`, title `Solenne Estates — Villas & Architectural Homes`. Google Fonts: Montserrat 200/300/400/500/600.
The real estate developer variant (`src/features/template-real-estate/variants/developer/`) mirrors it. Everything below is quoted from that file.

---

## 1. Tokens and base

```css
:root{--bg:#0b0b0b;--panel:#141414;--text:#f2efe9;--muted:#8a857d;--accent:#d9b99b;--line:rgba(255,255,255,.14);--pad:clamp(16px,5vw,72px)}
body{background:var(--bg);color:var(--text);font-family:'Montserrat';font-weight:300;line-height:1.7;overflow-x:clip}
.wrap{padding:0 var(--pad);max-width:1600px;margin:0 auto}
section{position:relative;overflow-x:clip}
.label{display:flex;gap:16px;font-size:11px;letter-spacing:.3em;uppercase;color:var(--muted);font-weight:400}  .label::before{48px x 1px rule}
h2.big{font-weight:200;uppercase;letter-spacing:.14em;font-size:clamp(28px,4.4vw,64px);line-height:1.2;margin-top:28px}
.pill{bg var(--accent);color #14110d;radius 999px;padding 14px 30px;11px;.2em;uppercase;weight 500;hover bg #e8cdb3 + translateY(-2px) + glow}
.reveal{opacity:0;transform:translateY(32px);transition:opacity 1s,transform 1s}
```

| Source | Our token (Sand palette, the default) |
|---|---|
| `--bg` #0b0b0b | `--color-bg` |
| `--panel` #141414 | `--color-surface` |
| `--text` #f2efe9 | `--color-text` |
| `--muted` #8a857d (5.0:1 on the panel, passes AA) | `--color-muted` (same value) |
| `--line` rgba(255,255,255,.14) | `--color-border` (same value) |
| `--accent` #d9b99b | `--color-primary`, `--color-focus`, `--re-accent` |
| pill hover #e8cdb3, pill text #14110d | `--color-primary-hover`, `--color-on-primary` |
| `#000` bands (principles, panorama, process, footer) | `--re-deep` |
| About band `#f2efe9` / ink `#16130f` / text `#4a463f` / small text `#6f6a62`, `#7a756c` | `--re-paper`, `--re-ink`, `--re-ink-body`, `--re-ink-muted` (#6a655d: the source #7a756c is 3.9:1 on the paper and fails AA) |
| error `#e08a7a` | `--re-error` |

Reduced motion: all animations and transitions off, `.reveal` shown.

## 2. Header (fixed nav)

- `nav`: fixed, padding 22px; after 60px of scroll: `.solid` = `rgba(11,11,11,.92)` + `blur(12px)`, padding 14px, bottom border `--line`. Ours: a zero-height sticky wrapper under the demo banner, the header floats over the hero.
- Logo: weight 200, `.42em`, 18px, uppercase, nowrap; the last word is weight 500: "Solenne **Estates**". Under 640px: 15px, `.3em`.
- Links (gap 36px): 11px, `.22em`, uppercase, 80% text colour, a 1px accent underline grows on hover: Residences (panorama), Principles, Collection, About, Contact, then the pill "Book a viewing" (padding 11px 22px).
- Under 860px: burger (32x20, three 1px lines that turn into an X) opens a full-screen `#0b0b0b` panel with the links centred (15px, gap 28px) and the pill (12px, 14px 30px). Ours switches at 1024px so the header never overflows on tablets with the language switch added.
- Added by us: the language switch, always visible.

## 3. Sections of the home page, in order

1. **Hero** `height:100vh;min-height:680px` (760px under 640px), flex column, content at the bottom, photo `photo-1449844908441` cover. Overlay: `linear-gradient(180deg,rgba(11,11,11,.55) 0%,rgba(11,11,11,.15) 35%,rgba(11,11,11,.7) 75%,#0b0b0b 100%)` and `linear-gradient(90deg,rgba(11,11,11,.6),transparent 60%)`. `.wrap` padding-bottom 40px. `.hero-main` flex between, align end, gap 40px, wrap: **h1** "Homes shaped by landscape" (weight 200, uppercase, `.12em`, `clamp(34px,6.2vw,96px)`, line-height 1.08, `max-width:11ch`) and **"Since 2009"** (accent, uppercase, `.3em`, `clamp(14px,1.6vw,22px)`, weight 300, align top, `margin-top:-40px`, right aligned). Sub text (max 520px, 14px, `.04em`, 78% text) with margin 28px 0, the pill "Explore residences", then **stats**: 3 columns, `margin-top:56px`, top border; `.stat` padding `24px 24px 0 0`, later ones `padding-left:32px` + left border; number `clamp(30px,3.6vw,52px)` weight 200 `.08em`, accent `+` / `%`, **counts up** over 1.8s (cubic ease-out) when 50% visible; label 10px `.26em` uppercase muted. 120+ Homes delivered · 14 Awards · 98% Client referral. Three **hotspots** (18px white dots, `0 0 0 6px rgba(255,255,255,.18), 0 0 24px 6px rgba(217,185,155,.7)`, `pulse 2.4s`) at 18%/34% "Floor-to-ceiling glazing", 56%/46% "Cedar cladding", 78%/62% "Heated terrace"; the glass tip (`rgba(255,255,255,.1)`, blur 14px, 1px border, radius 10px, 11px, `.16em`, uppercase) shows on hover, focus or click. Under 1024px the "since" margin is 0; under 640px the main row is a reversed column (gap 20px), "since" left aligned, stats one column with hairlines.
2. **Principles** (`#000`, padding `140px 0 120px`): label "Our philosophy", h2 "Principles every / home is built on", 3 columns `margin-top:80px`, `.pcol` padding `0 40px` with left border (first has none); h3 weight 400, 13px, `.24em`, uppercase, `#9b958c`, min-height 44px; p 13px muted line-height 1.9, margin-top 28px; big number 48px weight 200 `.1em`, 20% white, margin-top 48px. Site first · Honest materials · Quiet luxury. Under 640px: one column with top hairlines.
3. **Panorama** (`#000`): 4 columns, `height:min(88vh,760px);min-height:480px`; one photo (`photo-1486406146926`) spread over the four panels (`width:400%`, offsets 0/-100/-200/-300%), `brightness(.6)` → `1.05` on hover (0.6s); bottom gradient `transparent 45% → rgba(0,0,0,.85)`; caption at 28px/36px: h4 14px weight 300 `.22em` uppercase, p 12px 70% text max 240px, an accent arrow (22px) that slides in on hover. Forest Villas · Coastal Homes · City Penthouses · Bespoke Builds. Under 640px: 2 columns, panels 260px, no p, arrow always shown.
4. **Collection** (`padding:140px 0`): header row (label "The collection", h2 "Residences available") + tabs (All, Villas, Penthouses, Coastal; pills 10px/22px, 11px, `.2em`, active = accent fill with dark text, weight 500). Grid 3 columns gap 28px `margin-top:64px` (2 under 1024px, 1 under 640px). **Card**: panel bg, 1px line border, hover lifts 6px and the border turns 50% accent; photo 4/3 zooms 1.07 (0.9s); tag top-left (10px, `.2em`, uppercase, weight 500, pill, `rgba(11,11,11,.7)` + blur 8px, border line; Available = accent, Reserved = `#c9c4bb`); body padding `26px 26px 28px`: location 10px `.26em` muted, h3 19px weight 300 `.14em` uppercase, price accent 17px `.08em`, spec row (top border, 12px, `#b9b4ab`, accent line icons for bed, bath, area).
5. **About** (`#f2efe9` band, ink `#16130f`, padding 140px): label "About us", h2 "Built slowly, / lived in for generations", grid 1fr 1fr gap 80px `margin-top:70px` aligned centre: two paragraphs (14px, line-height 2, `#4a463f`), signature "Elena Marchetti" (cursive, 44px) + "Founder & Principal Architect" (10px `.26em` uppercase); photo `photo-1600607687939` 4/5. Team: 3 columns gap 28px, `margin-top:100px`, top border 14% black; member = 84px grayscale round photo (colour on hover) + name (13px, `.18em`, weight 400, uppercase) + role (11px). Elena Marchetti · Daniel Reyes · Sofia Lindqvist. Under 1024px: one column.
6. **Process** (`#000`, padding 140px): label "How we work", h2 "From first sketch / to final key"; 4 steps (`margin-top:90px`), a 1px line at the top with a 15px ring per step that fills with accent and a glow on hover; number 13px `.3em` accent; h3 16px weight 300 `.2em` uppercase; p 13px muted line-height 1.9. Consultation · Site & design · Build · Handover. Under 1024px: 2 columns, no line; under 640px: 1 column.
7. **Testimonials** (panel bg, borders top and bottom): label "Client voices"; slider (0.8s `cubic-bezier(.7,0,.2,1)`, auto every 6s, not with reduced motion): quote `clamp(20px,2.8vw,38px)` weight 200, line-height 1.5, `.04em`, max 960px; cite 11px `.26em` uppercase accent + a muted small line; controls: two 50px round arrow buttons (accent fill on hover) and line dots (28px x 1px, accent when current).
8. **Contact** (`padding:140px 0`): label "Private viewings", h2 "Book a viewing", grid `1.15fr .85fr` gap 80px `margin-top:70px` (one column under 1024px). Form: 2 columns gap `26px 24px`, fields without a box, only a bottom line that turns accent on focus, labels 10px `.24em` uppercase muted. Fields: Full name, Email, Phone, Residence of interest, Budget, Preferred viewing date, Message, pill "Request viewing"; errors `#e08a7a`; success box with accent border. Info: Studio, Contact, Hours (h4 11px `.26em` uppercase muted, p 14px) and a 240px grid map (40px grid lines, a faint road, an accent pin, label "Solenne Studio").
9. **Footer** (`#000`, padding `100px 0 36px`, top border): big word "Solenne" (weight 200, uppercase, `.3em`, `clamp(30px,8.6vw,150px)`, 90% text, centred, no wrap), 4 columns `1.4fr 1fr 1fr 1fr` gap 40px (`margin-top:90px;padding-top:50px`, top border): brand + tagline + four round social icons (42px), Residences, Company, Contact; copyright row (11px, `.14em`, muted) "© 2026 Solenne Estates. All rights reserved." + "Privacy · Terms".

## 4. Differences kept on purpose

- Form: the source has Email and Budget fields. Our viewing request keeps the dashboard's data (name, phone, residence, date, free time, message), so these two fields are not shown; the free-time choice is added (a visitor cannot book a taken slot).
- The source's "About" photo frame (`::after` with `z-index:-1`) is painted behind the section background in the source itself, so it is never visible; it is not drawn.
- The header link "Residences" goes to the panorama on the home page; the full residences list, the residence page (unit table, viewing, brochure) and the contact page are reached from the cards, the panorama panels and the footer.
- Burger breakpoint 1024px instead of 860px (the language switch needs the room).
- Prices are in SAR (USD x 3.75, rounded to 10,000). Studio address and hours are one line each (they are editable in the dashboard).
- Arabic: letter-spacing and uppercase are switched off (they break letter joining); the thin weights become 300; IBM Plex Sans Arabic is the Arabic pair of Montserrat.
