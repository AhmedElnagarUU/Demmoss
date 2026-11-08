# DESIGN SPEC — Orbis Cargo (`theme-sources/01-orbis-cargo.html`)

Source: a single HTML file (inline `<style>` and `<script>`), `lang="en"`, title
`ORBIS CARGO — Freight from Asia, door to door`. Google Font: **Manrope 300/400/500/600/700**.
The logistics freight variant (`src/features/template-logistics/variants/freight/`) mirrors it.
Every value below is quoted from that file.

---

## 1. Tokens and base

```css
:root{--bg:#f3f3f4;--ink:#111;--muted:#6b6b70;--line:#e7e7ea;--card:#fff;
      --r:22px;--shadow:0 10px 40px rgba(17,17,17,.06);--shadow2:0 18px 50px rgba(17,17,17,.10)}
body{font-family:'Manrope',system-ui,sans-serif;color:var(--ink);background:#fff;line-height:1.55;
     overflow-x:hidden;-webkit-font-smoothing:antialiased}
.wrap{max-width:1240px;margin:0 auto;padding:0 32px}
h1,h2,h3{font-weight:500;letter-spacing:-.025em;line-height:1.08}
h2{font-size:clamp(28px,3.4vw,44px)}
h2 span,h1 span{color:var(--muted)}
.eyebrow{font-size:11.5px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);font-weight:500}
```

| Source | Our token (default palette `graphite`) |
|---|---|
| page/body `#fff` | `--color-bg` |
| card `#fff` | `--color-surface` |
| `--ink` `#111` | `--color-text`, `--color-primary`, `--color-focus` |
| `--muted` `#6b6b70` | `--color-muted` (same value, 5.1:1 on white) |
| `--line` `#e7e7ea` | `--color-border` |
| button hover (ink, darker) | `--color-primary-hover` `#2b2b2e` |
| text on ink buttons | `--color-on-primary` `#fff` |
| `--bg` `#f3f3f4` fallback / stats `#f6f6f7` | `--lg-band` `#f6f6f7` |
| ink used as small text (outline buttons, links) | `--lg-primary-text` `#111` |
| `--r` 22px, panel 32px, result 24px, plan 26px | exact Tailwind radii |

Other palettes keep the same token names and get their own `--lg-band` / `--lg-primary-text`.
Reduced motion (`prefers-reduced-motion:reduce`) turns every animation and transition off and shows reveals.

## 2. Header (fixed)

```css
header{position:fixed;top:0;left:0;right:0;z-index:50;transition:.3s}
header.sc{background:rgba(255,255,255,.86);backdrop-filter:blur(14px);box-shadow:0 1px 0 rgba(0,0,0,.06)}
.nav{display:flex;align-items:center;justify-content:space-between;height:78px;gap:20px}
.logo svg{width:36px;height:36px}
.logo b{font-weight:700;letter-spacing:.04em;font-size:16px;line-height:1.1}
.logo small{font-size:8.5px;letter-spacing:.2em;color:var(--muted);text-transform:uppercase;font-weight:500}
.links{gap:30px}.links a{font-size:13.5px;font-weight:500;color:#333}
.links a::after{4px dot, centred, scales in}
.navr{gap:22px}.tel{font-size:13px;font-weight:600}.tel small{font-weight:400;color:var(--muted);font-size:11.5px}
.navr .btn{padding:12px 22px;font-size:13.5px}
.burger{44px circle, 1px #d6d6da border, white}
```

Logo mark: hexagon box (`40x40`, stroke 2.4) with a node. Name **ORBIS CARGO**, tagline **Freight from Asia**.
Links: Home · Services · About · Pricing · FAQ · Contacts (active dot) — ours adds **Track** so the demo's
tracker page stays reachable, and the language switch. Nav/phone hidden at 1024px, burger shown; CTA hidden at 640px;
`.mob` panel at `top:78px` (`68px` at 640px) with 17px links and the CTA.

## 3. Home sections, in order

1. **Hero** (`linear-gradient(180deg,#ececee 0%,#f3f3f4 45%,#fff 100%)`, padding `130px 0 150px`, overflow hidden).
   Grid `1fr 1.05fr` gap 30, align centre. Eyebrow **Import freight from China & Asia**.
   **h1** "We move your business / **further**", `clamp(44px,6vw,82px)`, weight 400, `.035em`, line-height 1.02;
   the second line is weight 500 muted. Lead 16.5px `#3a3a3f`, max 400px, margin-bottom 36:
   "Reliable turnkey cargo delivery from Asia by air, sea, road and rail. From supplier check to your warehouse door."
   CTA pill **Calculate shipping** + round play **Watch our / story** (52px white circle, soft shadow, pulse ring).
   Four features (grid 4, gap 18, top margin 58, max 560): Cargo insured at every stage · Delivery from 7 days by air or
   road · Customs fully handled · Personal manager 24/7 (26px line icons, 11.5px `#555`).
   Composition `560px` high: `.m1` top/end 84% × 350 (radius 200px one corner), `.m2` bottom/start 62% × 250,
   `.m3` bottom 30/end 30% × 170 (pill top). Photos grayscale, zoom 1.05 on hover; dashed 150px ring spins;
   floating white card `right:2%;top:340px` with two 36px avatars and **5000+** / "clients trust us / with their cargo"
   (bob 5s). Under 1024: one column, composition 520px; under 640: padding `96px 0 110px`, composition 430px,
   m1 270/88%, m2 190/60%, m3 130/32%, float top 250, ring hidden.
2. **About panel** — white, `border-radius:32px`, `margin:-90px auto 0`, `max-width:1400px`, shadow
   `0 -10px 60px rgba(17,17,17,.06)`, `padding:70px 0`. Grid `1fr 1.1fr` gap 50. Eyebrow **About the company**;
   h2 **Complete logistics from Asia / for your business** `clamp(26px,3vw,38px)`; paragraph (max 430, 15px muted);
   note (38px globe + 13.5px): "We work with companies / and private importers". Photos: 2 columns gap 20;
   one `3/3.6`, a square one below a full-width outlined **More about us** button (radius 22, shadow, image zoom 1.06).
   Under 1024: one column and `margin:-80px 12px 0`, radius 26; under 640: `margin:-80px 8px`, padding 44px.
3. **Services** (inside the panel, `padding-top:60px`). Head: top hairline, padding-top 34, margin-bottom 34;
   eyebrow **Our services**, h2 **Solutions for any task** `clamp(26px,3vw,36px)`; right link **All services** with arrow.
   Four cards (grid 4, gap 18; 2 under 1024, 1 under 640): photo `150px` (radius 16, grayscale .9 → .2 and zoom 1.07 on
   hover), h3 18px/600, two 13px muted bullets with 4px dots, 44px round arrow at the end. Cards:
   **Air freight** (Fast delivery from 7 days · Ideal for urgent cargo),
   **Sea freight** (Best rates for large shipments · FCL and LCL options),
   **Road freight** (Balanced price and speed · Door-to-door delivery),
   **Customs clearance** (Full documentation support · Certification and declaration).
4. **Calculator** (`padding:100px 0 0`): ink card `#111`, radius 32, padding 56, grid `1.15fr 1fr` gap 50, overflow hidden,
   decorative 380px circle at the top-end. Eyebrow **Shipping calculator** (`#9a9aa1`); h2
   **Estimate your cost / in seconds** (second line `#8b8b92`); text 14.5px `#a0a0a8`;
   tab pill (bg white/8, 5px padding): Air · Sea · Road · Rail, active white/ink; fields grid 2 gap 14:
   Weight (500), Volume (2), Origin, Destination, labels 11.5px uppercase `.06em` `#9a9aa1`,
   inputs bg white/7, border white/14, radius 14, padding 14/16. Result card white, radius 24, padding 34:
   eyebrow **Estimated cost**, price `clamp(34px,4.2vw,52px)`/600, rows Mode / Transit time / Chargeable weight
   (14px, hairlines), pill **Get exact quote**, 11.5px disclaimer. Under 1024: one column, padding 40;
   under 640: padding 26/20, radius 24, tabs scroll, fields one column.
5. **Stats** (`padding:100px 0 0`): strip bg `#f6f6f7`, radius 28, four columns, cells `44px 34px`, vertical hairlines:
   **12** years on the market · **5,000+** clients worldwide · **48** countries served · **99.2%** deliveries on time.
   Numbers `clamp(38px,4.5vw,60px)` weight 300 `.04em`, labels 14px muted margin-top 12. Counts up over 1.6s when
   revealed (reduced motion: final value). Under 1024: 2 columns.
6. **How it works** (`padding:110px 0 0`): centred head (max 640, margin-bottom 54): eyebrow **How it works**,
   h2 **Five steps / from request to door**. Five steps (grid 5, gap 18) with a dashed line at 29px from 10% to 10%;
   58px white numbered circle (hover ink), h3 17px/600, 13.5px muted text:
   Request · Supplier check · Consolidation · Shipping · Delivery (exact source texts).
   Under 1024: 3 columns, row gap 36, no line; under 640: 2 columns.
7. **Pricing** (`padding:110px 0 0`): centred head: eyebrow **Pricing**, h2 **Plans / for every volume**,
   "Transparent service tiers. Freight itself is quoted per shipment." Three plans, gap 22, padding 38/34, radius 26:
   **Start** (tag 12px `.12em`, $49 → SAR 185 / shipment, 4 ticks, outline CTA), **Business** (dark, lifted -14px,
   badge **Most popular**, $199 → SAR 750, 5 ticks, white CTA), **Enterprise** (Custom, 4 ticks, outline CTA).
   Under 1024: one column, max 520, no lift.
8. **Testimonials** (`padding:110px 0 0`): centred head: eyebrow **Testimonials**, h2 **Trusted / by importers**.
   Slider radius 28, slide grid `300px 1fr` gap 50, band bg, padding 44; square grayscale portrait radius 24;
   sector eyebrow, quote `clamp(19px,2.2vw,27px)` weight 400, author 600 + role 13.5 muted. Auto every 7s
   (not with reduced motion), dots (8px, active 28px ink) and two 44px round arrows.
   Four source slides: Daniel Reyes / Voltline, Amelia Brandt / Nordhaus Living, Marcus Hale / Hale Motors,
   Priya Nair / Studio Aurelle. Under 1024: 200px portrait, gap 30; under 640: one column, padding 26/22, 120px portrait.
9. **FAQ** (`padding:110px 0 0`): grid `.8fr 1.2fr` gap 60. Left: eyebrow **FAQ**, h2 **Questions / we hear often**,
   text, outlined **Ask a manager**. Right: six rows, top hairline, 24px padding, 17px question, 32px circular
   plus that turns ink and rotates to a minus when open, answer 15px muted, one row open at a time.
   Six source questions (delivery time, insurance, customs, minimum shipment, supplier check, tracking).
   Under 1024: one column.
10. **Quote** (`padding:110px 0 0`, `#contacts`): centred head: eyebrow **Get a quote**, h2 **Tell us about / your cargo**.
    Grid `1.15fr 1fr` gap 22. Form card padding 42, radius 28: h3 28px **Request a quote**, 14.5px muted line,
    fields grid 2 gap 14 (Name, Phone, Email full, Cargo type, Mode, Message full), labels 12px muted,
    inputs border `#dcdce0` radius 14 padding 14/16 on `#fafafa`, focus ink/white, pill **Send request**;
    success box bg `#f0f0f2` with a check icon. Side: ink info card radius 26 padding 32 with four rows
    (Phone, Email, Office, Hours; 12px `#9a9aa1` labels), then a map (min 220, radius 26, 36px grid lines,
    white/grey roads, ink pin, label **ORBIS CARGO HQ**). Under 1024: one column.
11. **Footer** (`#111`, white, `margin-top:110px`, `padding:80px 0 30px`): grid `1.5fr 1fr 1fr 1fr` gap 40,
    bottom hairline; logo + tagline 14px `#8b8b92` (max 300) + four 44px round social icons (Telegram, WhatsApp,
    LinkedIn, Instagram); column titles 12px uppercase `.14em` `#8b8b92`; links 14.5px `#ddd` → white;
    columns Services (4), Company (About us, How it works, Pricing, FAQ), Contacts (phone, email, address);
    bottom row 13px `#8b8b92`: "© 2026 ORBIS CARGO. All rights reserved." + "Privacy policy · Terms of service".
    Under 1024: 2 columns; under 640: 1 column.

## 4. Interactions

- Sticky header turns white/blurred after 20px of scroll; burger opens the mobile panel.
- Reveal on scroll: `.rv{opacity:0;translateY(26px);transition:.8s}` with 0.08s stagger classes; reduced motion shows all.
- Stats count up on reveal; testimonial slider auto-advances every 7s and has dots/arrows; FAQ opens one row.
- Calculator: mode tabs, weight/volume/origin/destination, price range and transit days update immediately
  (source: chargeable weight, rate, origin/destination factors, minimum charge).
- "Get exact quote" fills the quote form's mode and message (ours: opens the quote form with the estimate attached).
- "Watch our story" opens a modal with a video placeholder; Escape / backdrop closes it.
- Forms validate and show a success box; ours sends the quote to the demo dashboard.

## 5. Differences from our old variant (before this mirror)

- Business was **Jisr Cargo** (freight from China/Asia to the Gulf). Now **Orbis Cargo** (أوربس كارجو), the source's
  own business and copy, with the source phone/address/email/hours and source people.
- Colours were light grey with a red accent (`--lg-accent` #b3202a). Now the source's ink-on-white palette
  (grey band, no red), with `--lg-primary-text` and `--lg-band` tokens.
- Home order was hero → stats → about → services (5) → calculator → steps → routes → tracker → pricing →
  testimonials → FAQ → quote band. Now exactly the source: hero → about panel + 4 services → calculator → stats →
  5 steps → pricing → testimonials slider → FAQ → quote form + info + map. The routes section and the standalone
  quote band are gone; the tracker keeps its own page (and is linked from the header).
- Services are the source's 4 (rail is still a calculator mode and a quote service, as in the source).
- Testimonials are a slider with grayscale portraits; FAQ is a single-open accordion; the quote form has the source's
  cargo-type field and inline success; pricing is the source's 3 plans (SAR 185 / 750).
- Header and footer now mirror the source (fixed bar, logo mark, phone, burger panel; dark four-column footer).
- Inner pages (Services, Calculator, Track, Quote) keep their functions and loops but reuse the source's panel,
  pill, field and card language. Calculator routes are the source's origins/destinations with the source factors.

## 6. Differences kept on purpose

- Prices are SAR (USD × 3.75, rounded): $49 → 185, $199 → 750; freight rates stay the demo's editable SAR rates
  (they are already the source's USD rates converted).
- The quote form keeps the demo's validation (name and phone required, email optional) and sends the lead to the
  dashboard; the source's success line is shown plus a link to the dashboard.
- "Watch our story" plays no video (the source itself shows a placeholder); ours shows the same placeholder in a modal.
- The source's header has no Track item; ours adds it because the demo's tracker page is a core loop.
- The source's footer social links go nowhere (`#`); ours do the same, with accessible labels.
- Arabic switches off letter-spacing and uppercase, uses weight 300 instead of the thinnest Latin weights, and pairs
  Manrope with IBM Plex Sans Arabic.
