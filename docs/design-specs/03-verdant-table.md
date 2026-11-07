# DESIGN SPEC — Verdant Table (`theme-sources/03-verdant-table.html`)

Source: single HTML file (inline `<style>` + inline `<script>`), `lang="en"`, title `Verdant Table | Farm-to-Table Mediterranean`.
Google Fonts: Cormorant Garamond 500/600, Jost 300/400, Pinyon Script. Everything below is quoted from that file.
The restaurant fine-dining variant (`src/features/template-restaurant/variants/fine-dining/`) mirrors it.

---

## 1. Tokens and base

```css
:root{--g1:#1d3b2f;--g2:#23453a;--g3:#2b5244;--cream:#efe6d2;--gold:#c8a46a;--line:rgba(239,230,210,.35);
--shadow:0 30px 60px rgba(0,0,0,.45),0 8px 20px rgba(0,0,0,.35)}
html{scroll-behavior:smooth;scroll-padding-top:70px}
body{background:var(--g1);color:var(--cream);font-family:'Jost',sans-serif;font-weight:300;line-height:1.7;overflow-x:hidden}
h1,h2,h3,h4{font-family:'Cormorant Garamond',serif;font-weight:600;line-height:1.15}
.script{font-family:'Pinyon Script',cursive;font-weight:400;color:var(--gold)}
.wrap{max-width:1200px;margin:0 auto;padding:0 16px}
.btn{border:1px solid var(--cream);padding:13px 30px;font-size:12px;letter-spacing:.22em;text-transform:uppercase;font-weight:400;
  color:var(--cream);background:transparent;transition:.3s}   .btn:hover{background:var(--gold);border-color:var(--gold);color:var(--g1)}
.plate{border-radius:50%;object-fit:cover;aspect-ratio:1;box-shadow:var(--shadow);border:1px solid rgba(239,230,210,.15)}
.rv{opacity:0;transform:translateY(26px);transition:opacity .9s,transform .9s}  .rv.in{opacity:1;transform:none}
```

| Source | Our token |
|---|---|
| `--g1` #1d3b2f (page) | `--color-bg` |
| `--g2` #23453a (story, signature, reserve) | `--color-surface` |
| `--g3` #2b5244 (hero glow, gallery band) | `--fd-band` |
| footer `#142c22`, panel `rgba(20,44,34,.75)`, form `rgba(20,44,34,.45)` | `--fd-deep` (footer solid, panels with 75% and 45% alpha) |
| `--cream` #efe6d2 | `--color-text` |
| `--gold` #c8a46a | `--color-primary` (fills, borders) and `--fd-accent` (gold as text; same value in the default palette, 4.52:1 on `--color-surface`) |
| `--line` cream at 35% | `border-text/35` |
| `--shadow` | `shadow-[0_30px_60px_rgba(0,0,0,0.45),0_8px_20px_rgba(0,0,0,0.35)]` on `Plate` |

Fonts in the demo (self-hosted by `next/font/google`, `fonts.ts`): Latin Cormorant Garamond 500/600 + italic, Jost 300/400,
Pinyon Script. Arabic pairs: Amiri (headings), IBM Plex Sans Arabic (text), Aref Ruqaa (script, falls in after Pinyon Script).

## 2. Header (`nav`)

- `position:sticky;top:0;z-index:50;background:rgba(29,59,47,.92);backdrop-filter:blur(8px);border-bottom:1px solid rgba(239,230,210,.12)`.
- `.nav-in`: flex, space-between, `height:68px`, inside `.wrap`.
- `.logo`: Pinyon Script 34px, cream, `line-height:1`.
- `.links`: flex, `gap:26px` (16px at ≤1024px); links 11px, `letter-spacing:.2em`, uppercase, hover gold.
  `.reserve`: `border:1px solid gold; padding:9px 20px; color:gold`, hover gold fill with `--g1` text.
- Links: Story, Signature, Menu, Gallery, Visit, Reserve (anchors on the single page).
- ≤820px: burger 42x42 with a `--line` border; `.links` becomes a dropdown (`position:absolute;top:68px;left:0;right:0;background:var(--g1);
  flex-direction:column;padding:20px 16px 26px;border-bottom:1px solid var(--line);gap:18px`), closed by default, closed again on link click.

## 3. Sections in order

1. **Hero** (`header.hero`): `background:radial-gradient(ellipse at 70% 40%,var(--g3),var(--g1) 70%);padding:70px 0 130px`.
   Grid `1fr 1.1fr`, gap 40px, centred; ≤1024px one column and the plate moves first (`order:-1;width:min(86%,440px)`).
   - `h1` `font-size:clamp(42px,5.5vw,72px);margin-bottom:22px`; `em` is italic, gold, weight 500 ("simply").
   - `p` `max-width:460px;opacity:.85;margin-bottom:28px`.
   - `.chefs`: flex, gap 14px, margin-bottom 34px; two 46px round photos with a gold border, the second `margin-left:-24px`;
     text 13px with a Cormorant 17px gold `<b>` line.
   - Button "Book a table" to `#reserve`.
   - `.hero-plate` `width:min(100%,540px)`: round plate photo + leaf (left -14%, bottom -6%, 110px), dots (right -6%, top -4%, 100px),
     leaf (right -12%, bottom 12%, 70px, rotate 70deg, hidden ≤640px). Section-level dots (left 6%, bottom 80px, 80px, hidden ≤640px).
   - Torn paper edge at the bottom, 50px high, filled `#23453a`.
2. **Story** (`.story`, `--g2`): `padding:90px 0 40px;text-align:center`. `.script` title `clamp(44px,6vw,68px)`, `line-height:1.1`, margin-bottom 18px;
   `p` `max-width:720px;margin:0 auto;opacity:.85`.
3. **Signature** (`.sig`, `--g2`): `padding:50px 0 100px`. Grid `1fr 1.15fr`, gap 60px (one column ≤1024px). Round plate `width:min(100%,460px)` with a leaf
   (left -6%, top -6%, 70px, rotate -30deg) and dots (right -4%, bottom 4%, 60px).
   `.panel`: `background:rgba(20,44,34,.75);border:1px solid var(--line);padding:38px` (22px ≤640px); `h3` 30px; intro 14px, `opacity:.7`;
   `.dish` rows: flex, gap 18px, `padding:16px 0`, `border-top:1px solid rgba(239,230,210,.15)`; photo 72px round, gold border, shadow `0 8px 18px rgba(0,0,0,.45)`;
   `h4` 21px; text 14px, `opacity:.75`, `line-height:1.5`; price Cormorant 22px 600 gold, pushed to the end; rows wrap ≤640px.
   Torn edge filled `#2b5244`.
4. **Band / gallery** (`.band`, `--g3`): `padding:90px 0 110px;overflow:hidden`. Grid `1fr 70px 1fr`, gap 30px, `max-width:1000px`; one column ≤640px.
   Plates `max-width:400px`, `border:6px solid rgba(239,230,210,.9)`, margin-bottom 22px; caption `h3` 26px + 13px line at `opacity:.7`.
   Silver fork SVG between them: 50px wide, `drop-shadow(8px 10px 8px rgba(0,0,0,.4))`; ≤640px it lies down (`rotate(90deg)`, 44px).
   Two leaves (hidden ≤640px). Torn edge filled `#1d3b2f`.
5. **Menu** (`.menu`, `--g1`): `padding:90px 0 100px`. `.sec-head` centred, margin-bottom 40px, `.script` `clamp(44px,6vw,64px)`, `p` `opacity:.75;max-width:520px`.
   Tabs: flex, wrap, centred, gap 10px, margin-bottom 44px; each `border:1px solid var(--line);padding:10px 22px;font-size:12px;letter-spacing:.18em;uppercase`;
   hover gold border; `.on` gold fill with `--g1` text.
   Items: grid `1fr 1fr`, `gap:10px 60px`, `max-width:960px` (one column ≤640px), shown with `animation: fade .5s` (opacity 0 + 10px up).
   `.item`: `padding:16px 0;border-bottom:1px dashed var(--line)`; title row flex, baseline, gap 10px; `h4` 23px; dotted leader (`border-bottom:1px dotted`, raised 4px);
   price Cormorant 22px gold; description 14px, `opacity:.7`, `line-height:1.5`.
   Courses: Small plates, Mains, From the garden, Desserts, 4 dishes each.
6. **Reserve** (`.resv`, `--g2`): `padding:90px 0 100px`. Grid `1fr 1fr`, gap 50px, `max-width:1000px` (one column ≤1024px).
   Form card: `border:1px solid var(--line);padding:34px;background:rgba(20,44,34,.45)` (22px ≤640px), `h3` 30px; fields date, time, guests, phone, name; button "Request table".
   Info: `h3` 28px "Opening hours" + dashed rows (flex, space-between, 15px) + "Find us" + map block (200px high, 36px grid lines at 8% cream, gold pin, address).
7. **Footer** (`#142c22`): `padding:70px 0 30px`. Grid `1.2fr 1fr 1fr`, gap 40px, centred (2 columns ≤1024px, 1 column ≤640px).
   Logo Pinyon 48px gold + tagline 14px + three 38px round social links; contact block (gold Cormorant 20px headings, 14px text at `opacity:.8`);
   96px round salad bowl with a 4px cream border and "Come hungry. / Leave rooted."; copyright 12px, `opacity:.55`, `letter-spacing:.1em`, uppercase.

## 4. Interactions

Reveal on scroll (IntersectionObserver, threshold .12, one-shot); menu tabs switch the list with a fade; burger toggles the dropdown;
the reserve form shows a thank-you line (in the demo it becomes a real reservation in the dashboard);
`prefers-reduced-motion` turns the reveal and the fade off.

## 5. Differences between the demo and the source (on purpose)

| Source | Demo | Why |
|---|---|---|
| One page with anchors | Real pages: Home, Menu, Story, Events, Reserve, Visit | The site is a complete product; the home page mirrors the source |
| Link "Gallery" | Link "Events" (private dinners page) | The gallery is a home band, not a page; events is a business goal |
| Reserve form: date, time, guests, phone, name | Shared reservation form (free times only, optional occasion and note) with the source card around it | Closed loop to the dashboard; the fields of the shared form are kept |
| Static text | Hero, story, menu, hours and contact come from the editable seed; accent word marked with `*stars*` | The dashboard edits content in Arabic and English |
| Prices in `$` | SAR (x3.75) | Demo currency |
| Fixed hours text | Hours rows computed from the editable weekly hours | Settings page edits them |
| No language switch, no demo banner | Language switch in the header, demo banner above it | Bilingual demo |
| Burger menu closes on link click | Same | Same |
| Palette fixed | Five palettes; "Verdant" is the source palette | Settings feature |
| Leaves, dots and torn edges in fixed colors | Same colors in every palette | Decorations from the source |
