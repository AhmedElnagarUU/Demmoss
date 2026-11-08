# DESIGN SPEC — Stackwell (`theme-sources/03-stackwell-3pl.html`)

Source: a single HTML file (inline `<style>` and `<script>`), `lang="en"`, title
`STACKWELL — Warehousing & 3PL Fulfillment`. Google Font: **Plus Jakarta Sans 400/500/600/700**.
The logistics warehousing variant (`src/features/template-logistics/variants/warehousing/`) mirrors it.
Every value below is quoted from that file.

---

## 1. Tokens and base

```css
:root{--ink:#111;--mute:#6b6b72;--bg:#fff;--grey:#f5f5f6;--red:#e3262b;--red2:#c81e23;--black:#141414;--line:#e6e6e9;--r:16px}
html{scroll-behavior:smooth;scroll-padding-top:80px}
body{font-family:'Plus Jakarta Sans',system-ui,sans-serif;color:var(--ink);background:#fff;line-height:1.5;
     overflow-x:hidden;-webkit-font-smoothing:antialiased}
.wrap{max-width:1200px;margin:0 auto;padding:0 24px}      /* 16px at <=640px */
h1,h2,h3{letter-spacing:-.02em;line-height:1.1}
h2{font-size:clamp(28px,3.6vw,42px);font-weight:600}
```

| Source | Our token (default palette `red`) |
|---|---|
| `--bg` `#fff` | `--color-bg` |
| `--grey` `#f5f5f6` | `--color-surface` |
| `--ink` `#111` | `--color-text` |
| `--mute` `#6b6b72` | `--color-muted` `#5a5a63` (darker so small text is AA on `--grey`) |
| `--line` `#e6e6e9` | `--color-border` `#dcdce0` |
| `--red` `#e3262b` | `--color-primary` |
| `--red2` `#c81e23` | `--color-primary-hover` and `--lg-accent` (red used as small text, AA on bg and surface) |
| `--black` `#141414` | `--color-text` (dark cards: stat card, estimator result, footer) |
| `--r` 16px | `rounded-2xl` |

Reduced motion turns every animation and transition off and shows the reveals.

## 2. Header (sticky)

```css
header{position:sticky;top:0;z-index:50;background:rgba(255,255,255,.92);backdrop-filter:blur(12px);
       border-bottom:1px solid transparent;transition:.3s}
header.s{border-color:var(--line)}                       /* after scrolling 10px */
.nav{display:flex;align-items:center;gap:28px;height:68px}
.logo{gap:9px;font-weight:700;font-size:17px;letter-spacing:.02em}   .logo svg{26px}
.links{gap:26px;margin-left:auto;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.05em}
.links a{padding:4px 0;color:#333}  .links a:after{height:1.5px;width:0 → 100% on hover;background:red}
.burger{38px circle, grey, red 16px icon}
```

Hexagon logo mark (red hexagon, white node stack). Links: About us · Services · Pricing · 3PL Solutions ·
Warehouses · Case studies; button **Request a quote** (pill). At 1024px the links and button hide and the
burger shows; the mobile panel has 13px uppercase links and the quote link in red.
Ours: links go to the home anchors (`#storage`, `#estimator`, `#tpl`) and to the inner pages
(`/services`, `/warehouses`, `/case-studies`); the language switch sits before the button.

## 3. Home sections, in order

1. **Hero** (`.hero`, `padding-top:20px`). `.hero-top` min-height 520px. Photo `.hero-img` absolute, `right:-24px`, 68% wide
   (80% under 1024px), full height, radius 16, with a white gradient
   `linear-gradient(90deg,#fff 0%,rgba(255,255,255,.75) 18%,rgba(255,255,255,0) 55%)`. Text block max-width 470px,
   `padding-top:50px`; H1 `clamp(34px,4.6vw,54px)/600`, the words *Delays* and *Extra Costs* in red; paragraph 14px, max 300px;
   pill button **Get a quote →** (11.5px/700 uppercase, `.06em`, padding 12px 18px, hover lifts 2px with a red shadow).
   Floating card (white, radius 14, bobbing 5s) "2 warehouses / in prime locations"; round red contact button with a
   pulsing ring (1.8s). Under 640px: the photo moves below the text at 280px high, the card and button sit on it.
2. **Hero cards** (`margin-top:-90px`, grid `1fr 1.15fr 1.4fr`, gap 14, one column under 640px): dark card "20+ Years in the
   market" (44px/500); card "We work by standards: GMP • HACCP • Clean Label • ISO"; stepper card (Storage → Picking →
   Delivery, auto-advances every 2.6s, clickable) with a small photo.
3. **Partners** (`padding:64px 0 10px`): "Our Partners" with prev/next round buttons; a scrolling row of ten logo words in
   different type styles (letter-spaced caps, italic serif, lower-case, boxed, filled).
4. **Smart Storage** (`#storage`, `padding:90px 0 70px`): H2 "Smart Storage / for Your Business", pill button with a `+`
   split, a grey schedule card (Mon–Sun hours, today ticked) with "Receiving and shipping by appointment";
   four feature tiles (grey, radius 16, min-height 170, lift on hover, 34px red line icons); chips "Additional services:
   Labeling · Document handling · Packaging · Kitting · Returns".
5. **3PL** (`#tpl`, grey band, `padding:70px 0 40px`): grid `1.2fr 1fr`. H2 "Comprehensive / 3PL Logistics", loading-dock photo
   (16:10) with three black number tags (01, 02, 03); white card "End-to-end process" with a vertical red timeline of four
   steps, a red glow at the corner and a round red arrow button.
6. **Stats** (grey band, white card, 4 columns with hairlines): 99.8% Order accuracy · 24/7 Support and control ·
   5000+ m² Total warehouse space · 100+ Satisfied clients (22px/600 values, 34px red icons).
7. **Estimator** (`#estimator`, `padding:90px 0`): H2 "Estimate Your Storage Cost"; grey input card (pallet positions
   5–500 step 5, storage period 1–24 months, extra-service chips) and a dark result card ("Estimated monthly cost",
   52px total, breakdown rows, **Get exact quote →**). Sliders: 5px track filled in red, 22px white thumb with a 3px red ring.
8. **Our Warehouses** (`#warehouses`, grey band): two white cards, photo 240px, name 20/600, address 13px, three grey spec tiles
   (floor area, rack height, dock doors): North Hub 3,200 m², 8 m, 12 · Port Annex 1,800 m², 6 m, 6.
9. **Case Studies** (`#cases`): three bordered cards: Retail (-38% order cycle time), Food & Beverage (-92% stock write-offs),
   E-commerce (99.9% on-time dispatch); the border turns red and the card lifts on hover.
10. **FAQ**: grid `1fr 1.5fr`; heading with a short text on the start side; five questions as a one-open-at-a-time accordion
    (15px/600, round `+` button that turns into a red `×`).
11. **Quote** (`#quote`, grey band): white form card "Request a quote" (company, name, phone, email, pallets, service, message)
    and a grey map card with two pins and an info box (STACKWELL HQ, address, phone, email).
12. **Footer**: near-black `#0b0b0b`, grid `1.5fr 1fr 1fr 1fr` (logo + tagline + four round social icons; Company; Services;
    Contact), a hairline, then "© 2026 STACKWELL. All rights reserved." and "Privacy · Terms".

## 4. Interactions

Header border after 10px of scroll; mobile burger; reveal on scroll (`opacity 0, translateY(24px)`, .7s, one time);
stat counters; auto-advancing stepper; partner row scroll buttons; schedule highlights today; estimator
(rate 16 per pallet, 8% discount from 6 months, 15% from 12, handling 45, picking 2.4 per pallet, insurance 2%);
FAQ accordion; quote form shows a thank-you message.

## 5. Differences with the demo (on purpose)

| Source | Demo |
|---|---|
| Prices in USD, rate 16 per pallet | Currency SAR, the demo's own estimator logic and rates (38 per pallet, editable in the dashboard); same inputs and breakdown look |
| Extra-service chips: picking, labeling, insurance | Chips: order picking (with a monthly orders field) and cargo insurance, the two options the demo prices |
| Stat counters count up | Values shown directly (formatted strings from messages) |
| Quote form is a local thank-you | The shared quote form saves the request to the dashboard (the closed loop) and attaches the estimate |
| Static map | Same CSS map; the info box reads the address and phone from the settings the owner edits |
| Page is one scroll | Besides the home, inner pages Services, Warehouses, Case studies and Quote reuse the same components and tokens |
| White "Contact us" label over the photo | The label sits on a white pill so it is AA over any photo |
| Muted text `#6b6b72` | `#5a5a63` for AA on the grey surface |
| Header links are anchors only | Links also reach the inner pages; a language switch is added |
