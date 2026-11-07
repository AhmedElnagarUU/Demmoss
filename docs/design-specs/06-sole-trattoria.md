# DESIGN SPEC — Sole Trattoria (`theme-sources/06-sole-trattoria.html`)

Source: 339-line single HTML file (inline `<style>` + inline `<script>`), `lang="en"`, title `Sole Trattoria | Pizza & Pasta`. Google Fonts loaded via one stylesheet link. Everything below is quoted/derived from that file; anything absent is marked **not specified**.

---

## 1. Global tokens & base

### 1.1 Custom properties (`:root`, line 9, one line)

```css
:root{--cream:#fbf5ec;--red:#d9412b;--red2:#b9321f;--green:#3f7d3a;--ink:#222;--mute:#6b6459;--card:#fff;--line:#eadfce;--sh:0 10px 30px rgba(80,50,20,.10)}
```

| Token | Value | Where used |
|---|---|---|
| `--cream` | `#fbf5ec` | body bg, `.tab` bg, `.mi:hover` bg, input bg, mobile open nav bg |
| `--red` | `#d9412b` | brand/primary: logo, `.btn` border+bg, underlines, `.ic` bg, eyebrow, `.heart`, `.badge`, `.bar` gradient end, `.pin`, `.av`? (no, av is green), stars? (no, gold), `.rev:before`, `.add`? (no, green), focus borders, `.soc a:hover` |
| `--red2` | `#b9321f` | `.btn:hover` bg/border, `.bar` gradient end |
| `--green` | `#3f7d3a` | logo SVG stroke, `.fresh` text, cart badge bg, `.add` bg, `.av` bg, `.sig .script`, `.res .script`, `#ok` text, leaf fill |
| `--ink` | `#222` | body text, burger bars |
| `--mute` | `#6b6459` | body copy, card body text, labels, `small` in stars, review roles |
| `--card` | `#fff` | `.fcard`, `.dish`, form backgrounds |
| `--line` | `#eadfce` | nav border, button/cart/burger borders, feature dividers, tab borders, input borders |
| `--sh` | `0 10px 30px rgba(80,50,20,.10)` | `.fcard`, `.dish`, `.photo img`, `.rev`, `form`, `.map` |

**There is no radius token, no spacing scale, no font variable.** All sizes are literal.

### 1.2 Every other colour literal in the file

| Colour | Location |
|---|---|
| `#fff` | `.btn` text, `.ic svg` stroke, `.heart svg` stroke/`.heart.on svg` fill, `.add` text, `.tab.on` text, `.badge` text, `.rev` bg, `.av` text, `.cart` bg, `.burger` bg, `.pin` text, `.bar .ic` bg, `.bar .ic svg` stroke → overridden to red, `#fff` stops in `.map` gradients, `footer .logo` text, `.soc svg` stroke |
| `rgba(251,245,236,.92)` | `nav` background |
| `#e9a21b` | `.stars` rating gold |
| `#2f6a2b` | `.add:hover` background |
| `#d8c9b3` | `.mi .n i` dotted leader border |
| `#f6ecdc` | `.revs` section background |
| `#444` | `.rev p` text |
| `#e8f3e6` | `#ok` success message background |
| `rgba(80,40,10,.25)` | `.plate .ph` shadow |
| `#e2503a` | `.bar` gradient start |
| `rgba(217,65,43,.3)` | `.btn:hover` shadow, `.bar` shadow |
| `rgba(217,65,43,.35)` | `.badge` shadow |
| `rgba(255,255,255,.3)` | `.bar .f` divider border |
| `rgba(255,255,255,.88)` | `.bar p` text |
| `#e6dcc6` | `.map` grid lines |
| `#efe6d3` | `.map` base colour |
| `#cfe0c3` | `.map:before` park blob |
| `rgba(0,0,0,.2)` | `.pin` shadow |
| `#2a2420` | `footer` background |
| `#d9cfc0` | `footer` text |
| `#5b5148` | `.soc a` border |
| `#a9d3a2` / `#b9e0b3` | leaf stem strokes (leaf a / leaf b) |
| `#3f7d3a` / `#4c9446` / `#35702f` | leaf fills a / b / c |
| `#222` | inline cart SVG `stroke="#222"` |

### 1.3 Fonts

```html
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Lora:wght@600&family=Poppins:wght@400;500;600&family=Yellowtail&display=swap" rel="stylesheet">
```

| Family | Weights loaded | Where used |
|---|---|---|
| **Poppins** | 400, 500, 600 | `body` base; `.links` 500; `.btn` 600; `.f h4` (600? — *not specified*, h4 default bold 700); `.tab` 500; `.badge span`; `.add` 600; `.mi .n b` (Poppins, weight from `<b>` = 700); `.av` 600; labels 600; `#ok` 500; `footer` body |
| **Bebas Neue** | single weight 400 | only `.hero h1` (`font-family:'Bebas Neue';font-weight:400`) |
| **Lora** | only `600` requested | `h2` (600), `.dish h3` (600), `.mi .n` (600), `.rev:before` quote glyph (weight not set → 400 requested nowhere, browser substitutes) |
| **Yellowtail** | 400 | `.script` class, `.logo`, `.badge b`; weight 400 |

```css
body{font-family:Poppins,sans-serif;background:var(--cream);color:var(--ink);line-height:1.6;overflow-x:hidden}
```
- Base `font-size`: **not specified** (browser default 16px). Base `line-height: 1.6`.
- `h1`: `line-height:.92`, `letter-spacing:.01em`, `font-size:clamp(78px,11vw,148px)`.
- `h2`: `font-size:clamp(30px,4vw,44px)`, `line-height:1.2`, `font-weight:600`, Lora.
- `h3` (dish): Lora `19px` / default line-height.
- Global reset: `*{box-sizing:border-box;margin:0;padding:0}`.
- `img{max-width:100%;display:block}`; `a{color:inherit;text-decoration:none}`; `button{font-family:inherit;cursor:pointer}`.
- `html{scroll-behavior:smooth;scroll-padding-top:80px}`.

### 1.4 Layout container

```css
.wrap{max-width:1180px;margin:0 auto;padding:0 24px}
```
- **Max width 1180px**, side padding **24px**, reduced to **16px** at `max-width:640px`.
- Multiple elements combine `.wrap` with a class: `<div class="feats wrap rv">`, `<div class="info wrap rv">`, `<div class="wrap nav">`, `.hero .wrap`, etc.

### 1.5 Breakpoints (only these)

| Media query | Rules |
|---|---|
| `@media(max-width:1024px)` | hide `.links`, show `.burger`, open mobile menu style, features/bar 2 columns, cards gap 16, section grid gaps 36 |
| `@media(max-width:760px)` | all 2-col grids → 1 col, hero top padding 30, plate 88%, `.fresh` 44px, hide `.btn.out` in `.ctas`, header buttons 8px/14px 12px, section padding 56px |
| `@media(max-width:640px)` | `.wrap` padding 16px, features/bar 1 col, feature borders removed, form 1 col + 22px padding, badge left 8px, logo 28px |
| `@media(prefers-reduced-motion:reduce)` | all animation/transition disabled, `.rv` visible |

No `min-width` queries anywhere.

---

## 2. Header / nav

### 2.1 DOM

```html
<nav>
  <div class="wrap nav">
    <a href="#home" class="logo"><svg viewBox="0 0 32 32" …>…sun…</svg>Sole Trattoria</a>
    <div class="links" id="links">
      <a href="#home" class="on">Home</a><a href="#menu">Menu</a>
      <a href="#about">About</a><a href="#reviews">Reviews</a><a href="#book">Contact</a>
    </div>
    <div class="ctas">
      <div class="cart" title="Cart">…svg…<b id="cnt">0</b></div>
      <a href="#menu" class="btn">ORDER NOW</a><a href="#book" class="btn out">BOOK</a>
      <button class="burger" id="bg" aria-label="Menu"><span></span><span></span><span></span></button>
    </div>
  </div>
</nav>
```

### 2.2 Bar

```css
nav{position:sticky;top:0;z-index:50;background:rgba(251,245,236,.92);backdrop-filter:blur(10px);border-bottom:1px solid var(--line)}
.nav{display:flex;align-items:center;justify-content:space-between;height:74px;gap:20px}
```
- **Sticky, always visible** (not transparent), height **74px** (fixed), z-index 50, translucent cream + 10px blur, 1px bottom border `#eadfce`.

### 2.3 Logo

```css
.logo{display:flex;align-items:center;gap:8px;font-family:Yellowtail;font-size:34px;color:var(--red);line-height:1}
.logo svg{width:30px;height:30px;stroke:var(--green)}
```
- Yellowtail 34px, red `#d9412b`, line-height 1.
- Sun icon 30×30, `viewBox="0 0 32 32"`, `fill="none"`, `stroke-width="1.8"`, `stroke-linecap="round"`, stroke = green. Geometry: `<circle cx="16" cy="16" r="5.5"/>` + 8 rays: `M16 3v4M16 25v4M3 16h4M25 16h4M6.8 6.8l2.8 2.8M22.4 22.4l2.8 2.8M25.2 6.8l-2.8 2.8M9.6 22.4l-2.8 2.8`.
- At ≤640px: `.logo{font-size:28px}`.

### 2.4 Links

```css
.links{display:flex;gap:30px;font-size:14px;font-weight:500}
.links a{position:relative;padding:4px 0}
.links a:after{content:"";position:absolute;left:0;bottom:-2px;height:2px;width:0;background:var(--red);transition:.25s}
.links a:hover:after,.links a.on:after{width:100%}
.links a.on{color:var(--red)}
```
- Poppins 14px / 500, gap 30px, 5 same-page anchor links.
- Animated 2px red underline growing 0 → 100% (`bottom:-2px`), transition `.25s`; active item red.
- Hidden ≤1024px, replaced by burger menu.

### 2.5 Buttons & cart

```css
.ctas{display:flex;gap:10px;align-items:center}
.ctas .btn{padding:9px 20px}
.cart{position:relative;width:42px;height:42px;border-radius:50%;background:#fff;border:1px solid var(--line);display:grid;place-items:center}
.cart svg{width:20px;height:20px}
.cart b{position:absolute;top:-4px;right:-4px;background:var(--green);color:#fff;font-size:11px;min-width:19px;height:19px;border-radius:99px;display:grid;place-items:center;font-weight:600;transition:transform .3s}
.cart b.pop{transform:scale(1.5)}
.burger{display:none;width:42px;height:42px;border-radius:10px;border:1px solid var(--line);background:#fff}
.burger span{display:block;width:20px;height:2px;background:var(--ink);margin:4px auto}
```
- Cart: 42px white circle, 1px `#eadfce` border, 20px cart icon forced `stroke="#222" stroke-width="1.8"`.
- Badge: green `#3f7d3a` pill at `top:-4px; right:-4px`, 11px/600, `min-width:19px; height:19px`, radius 99px; `.pop` scales 1.5 for 250 ms.
- Primary button: `ORDER NOW` (solid red), secondary `BOOK` (outline red) — see global `.btn` below.
- Burger: 42×42, radius 10px, white, 1px border; three 20×2 bars, 4px vertical margins; only visible ≤1024px.

### 2.6 Global `.btn` (used nav, hero, about, form)

```css
.btn{display:inline-flex;align-items:center;gap:8px;padding:12px 26px;border-radius:999px;font-size:13px;font-weight:600;letter-spacing:.06em;border:2px solid var(--red);background:var(--red);color:#fff;transition:.25s}
.btn:hover{background:var(--red2);border-color:var(--red2);transform:translateY(-2px);box-shadow:0 8px 18px rgba(217,65,43,.3)}
.btn.out{background:transparent;color:var(--red)}
.btn.out:hover{background:var(--red);color:#fff}
```
- **Radius 999px, 2px border, 13px/600, letter-spacing .06em**, padding 12×26 (nav 9×20).
- Hover: `#b9321f`, lift 2px, red glow. Outline hover fills red (keeps lift/glow via shared rule).
- Focus-visible: **not specified**.
- No `:active` state specified.

---

## 3. Sections in page order

### 3.1 Hero — `<header class="hero" id="home">` (lines 206–223)

Purpose: brand statement, two CTAs, circular "plate" photo with rotating dashed ring and floating leaves.

```css
.hero{padding:50px 0 70px}
.hero .wrap{display:grid;grid-template-columns:1.05fr .95fr;gap:40px;align-items:center}
.hero .fresh{font-size:54px;color:var(--green);line-height:1;transform:rotate(-4deg);display:block;margin-bottom:-6px}
.hero h1{font-family:'Bebas Neue';font-weight:400;font-size:clamp(78px,11vw,148px);line-height:.92;letter-spacing:.01em}
.hero h1 span{color:var(--red)}
.divider{display:flex;align-items:center;gap:12px;margin:18px 0;color:var(--red)}
.divider i{height:2px;width:70px;background:var(--red);opacity:.6}
.divider svg{width:20px;height:20px}
.hero p{max-width:420px;color:var(--mute);margin-bottom:26px}
.hero .row{display:flex;gap:12px;flex-wrap:wrap}
```

DOM left column `<div class="rv">`:
1. `<span class="script fresh">Fresh from the oven</span>` — **Yellowtail**, 54px, green, rotated **−4deg**, block, negative 6px bottom margin. At ≤760px 44px.
2. `<h1>PIZZA &amp;<br><span>PASTA</span></h1>` — Bebas 400, `clamp(78px,11vw,148px)`, line-height **.92**, tracking **.01em**; second line red `#d9412b`.
3. `.divider`: 70×2px red line at `opacity:.6`, 20px heart SVG filled `currentColor` (red), second line. Margins 18px top/bottom, gap 12px.
4. `<p>`: max-width 420px, `#6b6459`, margin-bottom 26px, 16px/1.6.
5. `.row`: `VIEW MENU →` solid btn + `RESERVE NOW` outline btn, gap 12px, wrap.

Right column `.plate`:
```css
.plate{position:relative;width:min(100%,520px);aspect-ratio:1;margin:auto}
.plate .ring{position:absolute;inset:-4%;border:2px dashed var(--red);border-radius:50%;opacity:.55;animation:spin 40s linear infinite}
.plate .ph{position:absolute;inset:6%;border-radius:50%;overflow:hidden;box-shadow:0 30px 60px rgba(80,40,10,.25);border:8px solid #fff}
.plate .ph img{width:100%;height:100%;object-fit:cover}
.leaf{position:absolute;width:74px;animation:float 5s ease-in-out infinite}
.leaf.a{top:2%;left:4%}.leaf.b{bottom:6%;right:-2%;width:90px;animation-delay:-2s}.leaf.c{bottom:20%;left:-4%;width:56px;animation-delay:-3.5s}
```
- Plate: **max 520px**, square, centered.
- Ring: dashed 2px red circle at **inset −4%**, opacity **.55**, rotates 40s linear infinite.
- Photo: circle at **inset 6%**, **8px solid white** border, shadow `0 30px 60px rgba(80,40,10,.25)`, `object-fit:cover`.
- Three decorative leaf SVGs (`viewBox 0 0 60 60`, path `M8 52C6 24 24 6 54 6c0 30-18 48-46 46z` + stem `M8 52C20 36 32 24 48 12`):
  - a: 74px, top 2% / left 4%, fill `#3f7d3a`, stem `#a9d3a2`.
  - b: 90px, bottom 6% / right −2%, fill `#4c9446`, stem `#b9e0b3`, float delay −2s.
  - c: 56px, bottom 20% / left −4%, fill `#35702f`, no stem, delay −3.5s.
- Hero image URL: `https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=900&q=70&auto=format&fit=crop` (alt "Wood-fired pizza").
- Responsive: ≤1024 `gap:36px`; ≤760 1 column, `padding-top:30px`, plate `width:88%`, `.fresh` 44px.

### 3.2 Feature strip — `<div class="feats wrap rv">` (lines 225–232)

Purpose: 4 trust points in one white card, overlapping the hero by 10px.

```css
.feats{margin-top:-10px}
.fcard{background:var(--card);border-radius:22px;box-shadow:var(--sh);padding:30px 10px;display:grid;grid-template-columns:repeat(4,1fr)}
.f{display:flex;gap:14px;padding:0 24px;border-right:1px solid var(--line)}
.f:last-child{border:0}
.ic{flex:none;width:52px;height:52px;border-radius:50%;background:var(--red);display:grid;place-items:center}
.ic svg{width:26px;height:26px;stroke:#fff;fill:none;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round}
.f h4{font-size:13px;letter-spacing:.07em;margin-bottom:4px}
.f p{font-size:13px;color:var(--mute);line-height:1.5}
```
- Not a `<section>`; no id. `margin-top:-10px`; white card, radius **22px**, shadow `--sh`, padding **30px 10px**.
- 4 equal columns; each item flex row, gap 14px, side padding 24px, 1px `#eadfce` right divider except last.
- Icon: 52px red circle with 26px white 1.7px line icon.
- h4 13px, tracking **.07em** (text typed uppercase), margin-bottom 4px; body 13px `#6b6459`, line-height 1.5.
- Content:
  - `WOOD-FIRED OVEN` — "Baked at 450 °C for a blistered, airy crust." (oven-arch icon)
  - `FRESH PASTA DAILY` — "Rolled and cut by hand each morning." (three wavy lines)
  - `LOCAL PRODUCE` — "Tomatoes and herbs from farms nearby." (lemon/leaf icon)
  - `FAMILY RECIPES` — "Nonna's secrets, served with love." (heart)
- ≤1024: 2 columns, `row-gap:26px`, `.f:nth-child(2){border:0}`; ≤640: 1 column, all borders removed (`!important`), padding `0 14px`.

### 3.3 Specials — `<section id="specials">` (lines 234–239)

```css
section{padding:80px 0}
.head{text-align:center;margin-bottom:44px}
.eyebrow{display:inline-flex;align-items:center;gap:12px;color:var(--red);font-size:12px;font-weight:600;letter-spacing:.15em;text-transform:uppercase}
.eyebrow:before,.eyebrow:after{content:"";width:30px;height:2px;background:var(--red)}
h2{font-family:Lora,serif;font-weight:600;font-size:clamp(30px,4vw,44px);line-height:1.2}
.head h2{margin-top:6px}
.cards{display:grid;grid-template-columns:repeat(3,1fr);gap:26px}
```
- Background: page cream `#fbf5ec` (no section bg).
- Section padding **80px 0** (56px ≤760).
- Heading block centered, margin-bottom **44px**: eyebrow `"Popular dishes"` (12px/600 uppercase, `letter-spacing:.15em`, red, 30×2px red rules on each side via `::before/::after`, gap 12px) + `h2` **"Chef's Specials"** — **Lora 600**, clamp(30,4vw,44), line-height 1.2, title case, margin-top 6px.
- 3-column grid, gap **26px** (16px ≤1024).
- Cards are injected by JS (`#spec`); content:

| Name | Price | Reviews | Unsplash id |
|---|---|---|---|
| Wood-Fired Margherita | 12.9 → `$12.90` | 125 | `1565299624946-b28f40a0ae38` |
| Tagliatelle al Ragu | 14.9 → `$14.90` | 98 | `1621996346565-e3dbc646d9a9` |
| Spaghetti Pomodoro | 11.9 → `$11.90` | 110 | `1473093295043-cdd812d0e601` |

Card DOM: `.dish > .im > img`, `.heart` button, `.bd > h3`, `.stars`, `.pr > b + .add`.

```css
.dish{background:var(--card);border-radius:20px;overflow:hidden;box-shadow:var(--sh);position:relative;transition:.3s}
.dish:hover{transform:translateY(-6px)}
.dish .im{height:210px;overflow:hidden}
.dish img{width:100%;height:100%;object-fit:cover;transition:.5s}
.dish:hover img{transform:scale(1.06)}
.heart{position:absolute;top:14px;right:14px;width:44px;height:44px;border-radius:50%;background:var(--red);border:0;display:grid;place-items:center;transition:.2s}
.heart svg{width:20px;height:20px;stroke:#fff;fill:none;stroke-width:2}
.heart.on svg{fill:#fff}
.heart:hover{transform:scale(1.12)}
.dish .bd{padding:18px 22px 22px}
.dish h3{font-family:Lora;font-size:19px;font-weight:600}
.stars{color:#e9a21b;font-size:13px;letter-spacing:2px;margin:2px 0 10px}
.stars small{color:var(--mute);letter-spacing:0;margin-left:6px}
.pr{display:flex;justify-content:space-between;align-items:center}
.pr b{color:var(--red);font-size:20px}
.add{background:var(--green);color:#fff;border:0;border-radius:99px;padding:8px 20px;font-size:13px;font-weight:600;transition:.2s}
.add:hover{background:#2f6a2b;transform:translateY(-2px)}
```
- Card: white, radius **20px**, shadow `--sh`, overflow hidden, lift **−6px** on hover.
- Image band: fixed **height 210px** (not aspect ratio), cover, zooms to 1.06 over `.5s`.
- Favourite button: 44px red circle at 14/14, white 2px heart outline; `.on` fills white; hover scale 1.12. No shadow.
- Body: padding **18px 22px 22px**; h3 Lora **19px/600**; stars gold `#e9a21b` **13px**, `letter-spacing:2px`, margin `2px 0 10px`, count in muted 13px after 6px gap; price red **20px** bold; **Add** pill green `#3f7d3a`, padding **8px 20px**, 13px/600, radius 99; hover `#2f6a2b` + lift 2px.
- Images `w=600&q=70&auto=format&fit=crop`.

### 3.4 Menu — `<section class="menu" id="menu">` (lines 241–247)

Purpose: category tabs + two-column dotted-leader price list.

```css
.menu{background:#fff}
.tabs{display:flex;justify-content:center;gap:10px;flex-wrap:wrap;margin-bottom:36px}
.tab{padding:10px 24px;border-radius:99px;border:2px solid var(--line);background:var(--cream);font-weight:500;font-size:14px;transition:.2s}
.tab:hover{border-color:var(--red)}
.tab.on{background:var(--red);border-color:var(--red);color:#fff}
.mgrid{display:grid;grid-template-columns:1fr 1fr;gap:18px 50px}
.mi{display:flex;gap:16px;align-items:flex-start;padding:14px;border-radius:16px;transition:.2s;animation:fade .4s}
.mi:hover{background:var(--cream)}
.mi img{width:76px;height:76px;border-radius:50%;object-fit:cover;flex:none}
.mi .t{flex:1}
.mi .n{display:flex;align-items:baseline;gap:8px;font-family:Lora;font-weight:600;font-size:17px}
.mi .n i{flex:1;border-bottom:2px dotted #d8c9b3;transform:translateY(-4px)}
.mi .n b{font-family:Poppins;color:var(--red)}
.mi p{font-size:13px;color:var(--mute)}
```
- Section background **white `#fff`** (only tint-free full-width band besides this).
- Same centered head pattern (margin-bottom 44px): eyebrow `"Our menu"`, h2 **"Taste of Italy"** (Lora 44 max).
- Tabs: centered flex, gap **10px**, wrap, margin-bottom **36px**; pill radius 99, 2px `#eadfce` border, cream bg, **10px 24px**, 14px/500; hover border red; active solid red/white.
- 5 tabs generated from data keys in order: **Pizza, Pasta, Antipasti, Dolci, Drinks**; `Pizza` active initially.
- Grid: **2 columns**, `gap:18px 50px` (row/column). One column ≤760.
- Row: flex, gap 16px, `padding:14px`, radius **16px**, hover cream, entry animation `fade .4s` (opacity 0 + translateY 10px → none).
- Image: **76×76 circle**, cover.
- Name row: Lora **17px/600**, flex with a flex-1 dotted 2px `#d8c9b3` leader (`transform:translateY(-4px)`), price in Poppins red bold after 8px gap.
- Description 13px `#6b6459`.
- Items (price in whole dollars, rendered `$n`):

**Pizza** — Margherita $11 (Tomato, fior di latte, basil, `1565299624946-…`); Diavola $13 (Spicy salami, chili, mozzarella, `1513104890138-7c749659a591`); Quattro Formaggi $14 (Four Italian cheeses, honey, `1574071318508-1cdbab80d002`); Prosciutto e Rucola $15 (Parma ham, rocket, parmesan, `1565299624946-…`).
**Pasta** — Tagliatelle al Ragu $14 (Slow-cooked beef and pork ragu, `1621996346565-e3dbc646d9a9`); Spaghetti Pomodoro $12 (San Marzano, basil, olive oil, `1473093295043-cdd812d0e601`); Pappardelle Funghi $15 (Wild mushroom, parmesan cream, `1476224203421-9ac39bcb3327`); Carbonara $14 (Guanciale, egg yolk, pecorino, `1473093295043-…`).
**Antipasti** — Bruschetta $8 (`1546069901-ba9599a7e63c`); Caprese $10 (`1512621776951-a57141f2eefd`); Burrata $12 (`1550966871-3ed3cdb5ed0c`); Arancini $9 (`1533777857889-4be7c70b33f7`).
**Dolci** — Tiramisu $7 (`1592861956120-e524fc739696`); Panna Cotta $7 (`1550966871-…`); Cannoli $6 (`1533777857889-…`); Affogato $6 (`1592861956120-…`).
**Drinks** — Aperol Spritz $9 (`1514933651103-005eec06c04b`); Chianti Classico $8 (`1510812431401-41d2bd2722f3`); Limonata $5 (`1514933651103-…`); Espresso $3 (`1510812431401-…`).

### 3.5 About — `<section class="about" id="about">` (lines 249–259)

```css
.about .wrap{display:grid;grid-template-columns:1.05fr .95fr;gap:60px;align-items:center}
.photo{position:relative}
.photo img{border-radius:22px;box-shadow:var(--sh);aspect-ratio:4/3;object-fit:cover;width:100%}
.badge{position:absolute;left:-18px;bottom:-22px;background:var(--red);color:#fff;border-radius:18px;padding:16px 24px;text-align:center;box-shadow:0 12px 26px rgba(217,65,43,.35)}
.badge b{display:block;font-family:Yellowtail;font-size:32px;font-weight:400;line-height:1.1}
.badge span{font-size:12px;letter-spacing:.1em}
.about .eyebrow:before{display:none}
.about h2{margin:8px 0 16px}
.about p{color:var(--mute);margin-bottom:22px}
.sig{display:flex;align-items:center;gap:26px;flex-wrap:wrap}
.sig .script{font-size:38px;color:var(--green)}
```
- Two columns `1.05fr .95fr`, gap **60px** (36px ≤1024), centered; 1 col ≤760. Page cream bg, section padding 80/56.
- Left: photo, radius **22px**, shadow `--sh`, **aspect-ratio 4/3**, cover, width 100%. URL `https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=900&q=70&auto=format&fit=crop`.
- Badge overlaps bottom-left at `left:-18px; bottom:-22px` (left 8px ≤640), red, radius **18px**, padding **16px 24px**, centered, shadow `0 12px 26px rgba(217,65,43,.35)`; `b` Yellowtail **32px**/400 lh 1.1 "Since 1998"; `span` 12px, tracking **.1em**, "FAMILY OWNED".
- Right: eyebrow `"About us"` with the **left rule hidden** (`::before` display none; right 30×2 line remains, so it reads as a trailing line), h2 **"A Sunlit Table for Family & Friends"** (margin 8px 0 16px), paragraph muted margin-bottom 22px, then `.sig`: solid btn **"LEARN MORE →"** + Yellowtail **38px** green signature "Sole & Famiglia", gap 26px, wrap.

### 3.6 Reviews — `<section class="revs" id="reviews">` (lines 261–270)

```css
.revs{background:#f6ecdc}
.rev{background:#fff;border-radius:20px;padding:28px;box-shadow:var(--sh);position:relative}
.rev:before{content:"\201C";position:absolute;top:6px;right:22px;font-family:Lora;font-size:80px;color:var(--red);opacity:.18;line-height:1}
.rev p{margin:10px 0 18px;font-size:14px;color:#444}
.who{display:flex;align-items:center;gap:12px}
.av{width:42px;height:42px;border-radius:50%;background:var(--green);color:#fff;display:grid;place-items:center;font-weight:600}
.who small{display:block;color:var(--mute);font-size:12px}
```
- Section background **`#f6ecdc`** (the only tinted section besides the dark footer).
- Head: eyebrow `"Happy guests"` (with both rules), h2 **"What People Say"**.
- 3 cards (same `.cards` 3-col, gap 26/16), white, radius **20px**, padding **28px**, shadow, relative.
- Decorative `“` glyph: Lora **80px**, red at **.18 opacity**, `top:6px; right:22px`.
- Stars gold 13px/2px before text (card markup uses `.stars` without price/`small`).
- Body 14px `#444`, margin `10px 0 18px`.
- `.who`: flex, gap 12px, 42px green circle avatar with white initial (600), name `<b>` 16px bold, role `<small>` 12px muted, block.
- Reviews: Marta R./Local guide (5★), Daniel K./Regular (5★), Sofia L./Verified diner (4★, last star is ☆).

### 3.7 Reservation — `<section class="res" id="book">` (lines 272–285)

```css
.res .wrap{display:grid;grid-template-columns:.9fr 1.1fr;gap:50px;align-items:center}
.res .script{font-size:42px;color:var(--green);line-height:1}
.res h2{margin:6px 0 14px}
.res p{color:var(--mute)}
form{background:#fff;border-radius:22px;padding:32px;box-shadow:var(--sh);display:grid;grid-template-columns:1fr 1fr;gap:16px}
label{font-size:12px;font-weight:600;letter-spacing:.06em;color:var(--mute);display:block}
input,select{width:100%;margin-top:5px;padding:12px 14px;border:1.5px solid var(--line);border-radius:12px;background:var(--cream);font:inherit;font-size:14px;color:var(--ink)}
input:focus,select:focus{outline:0;border-color:var(--red)}
form .full{grid-column:1/-1}
form .btn{justify-content:center;width:100%}
#ok{display:none;grid-column:1/-1;background:#e8f3e6;color:var(--green);border-radius:12px;padding:14px;font-weight:500;font-size:14px}
```
- Two columns **`.9fr 1.1fr`**, gap **50px** (36 ≤1024), centered, 1 col ≤760; cream bg, 80/56 padding.
- Left: script accent **"Save your seat"** — Yellowtail **42px**, green, lh 1; h2 **"Book a Table"** (margin 6px 0 14px); paragraph muted.
- Right: white form card radius **22px**, padding **32px** (22px ≤640), shadow `--sh`, 2-col grid gap **16px**.
- Labels: 12px/600, tracking **.06em**, muted, block; inputs underneath with 5px top margin, padding **12px 14px**, **1.5px** `#eadfce` border, radius **12px**, cream bg, 14px ink; focus outline none + red border.
- Fields in order: DATE (`type=date`, required), TIME (select 12:00/13:00/14:00/18:00/19:00/**20:00 selected**/21:00, required), GUESTS (select 1/**2 selected**/3/4/5/6/7+), NAME (text, required, placeholder "Your name"), PHONE (tel, required, placeholder "+1 555 010 0100", `.full` spans both columns), then `.btn.full` **"CONFIRM RESERVATION"** (full width, centered content), then hidden `#ok` success block.
- `.full` + `#ok` span `grid-column:1/-1`.

### 3.8 Info strip + map — `<div class="info wrap rv">` (lines 287–295)

```css
.info{padding:0 0 70px}
.bar{background:linear-gradient(135deg,#e2503a,var(--red2));border-radius:22px;padding:30px 20px;color:#fff;display:grid;grid-template-columns:repeat(4,1fr);box-shadow:0 18px 40px rgba(217,65,43,.3)}
.bar .f{border-color:rgba(255,255,255,.3)}
.bar .ic{background:#fff}
.bar .ic svg{stroke:var(--red)}
.bar p{color:rgba(255,255,255,.88)}
.map{margin-top:26px;height:200px;border-radius:22px;background:
 linear-gradient(90deg,transparent 48%,#fff 48%,#fff 52%,transparent 52%),linear-gradient(0deg,transparent 60%,#fff 60%,#fff 64%,transparent 64%),
 repeating-linear-gradient(0deg,#e6dcc6 0 1px,transparent 1px 36px),repeating-linear-gradient(90deg,#e6dcc6 0 1px,transparent 1px 36px),#efe6d3;display:grid;place-items:center;position:relative;overflow:hidden;box-shadow:var(--sh)}
.map:before{content:"";position:absolute;left:8%;top:12%;width:22%;height:40%;background:#cfe0c3;border-radius:14px}
.pin{position:relative;background:var(--red);color:#fff;padding:8px 16px;border-radius:99px;font-size:13px;font-weight:600;box-shadow:0 8px 18px rgba(0,0,0,.2)}
```
- Wrapper is `.wrap` with `padding:0 0 70px` (no top padding; not a `<section>`).
- Bar: **linear-gradient(135deg, #e2503a → #b9321f)**, radius **22px**, padding **30px 20px**, white, 4 equal columns, glow shadow `0 18px 40px rgba(217,65,43,.3)`.
- Each `.f` keeps feature layout (flex, gap 14, 24px side padding, 1px divider but border colour `rgba(255,255,255,.3)`).
- Icons: **white** 52px circle, icon stroke red.
- Paragraphs `rgba(255,255,255,.88)`; h4 white 13px/.07em.
- Items: OUR LOCATION ("12 Via Sole, Sunny Town<br>ST 10101"), OPENING HOURS ("Mon - Sun<br>12:00 PM - 10:30 PM"), CALL US ("+1 555 010 0199<br>+1 555 010 0198"), FAST DELIVERY ("Hot from the oven,<br>at your door in 30 min.").
- Responsive: 2 cols + `row-gap:26px` ≤1024 (with second-item border removed via shared `.f:nth-child(2)`), 1 col ≤640 with borders removed.
- Map: margin-top **26px**, **height 200px**, radius 22, shadow `--sh`, composed background layers: two white "road" bands (vertical at 48–52%, horizontal at 60–64%), 36px grid of `#e6dcc6` lines, base `#efe6d3`; green `#cfe0c3` rounded 14px park at left 8% top 12%, w 22% h 40%. Centered red pill pin, padding 8×16, radius 99, 13px/600, shadow `0 8px 18px rgba(0,0,0,.2)`, text "● Sole Trattoria, 12 Via Sole".

### 3.9 Footer (lines 297–307)

```css
footer{background:#2a2420;color:#d9cfc0;padding:40px 0;font-size:13px}
footer .wrap{display:flex;justify-content:space-between;align-items:center;gap:20px;flex-wrap:wrap}
footer .logo{color:#fff}
.soc{display:flex;gap:10px}
.soc a{width:38px;height:38px;border-radius:50%;border:1px solid #5b5148;display:grid;place-items:center;transition:.2s}
.soc a:hover{background:var(--red);border-color:var(--red)}
.soc svg{width:17px;height:17px;stroke:#fff;fill:none;stroke-width:1.8}
```
- Single row: flex, space-between, centered, gap 20px, wrap; padding **40px 0**; background **`#2a2420`**, text **`#d9cfc0`**, **13px**.
- Logo text only (same `.logo` class → Yellowtail **34px** / 28px ≤640, white, no icon, no anchor target change: `href="#home"`).
- Middle: `© 2026 Sole Trattoria. All rights reserved.`
- Right: 3 social circles **38px**, 1px `#5b5148` border, 17px white 1.8px stroke icons Facebook/Instagram/Pinterest, gap 10px; hover fills red and border red.
- **No footer nav links, no address/phone.**

---

## 4. Interactions & animations

### 4.1 Reveal on scroll (`.rv`)
```css
.rv{opacity:0;transform:translateY(28px);transition:opacity .7s,transform .7s}
.rv.in{opacity:1;transform:none}
```
- Applied to: hero text, hero plate, features strip, each section head, tabs, dish cards, about photo/text, each review, both reservation columns, info wrapper.
- JS: `IntersectionObserver` with `{threshold:.12}`, adds `.in` and unobserves (one-shot). 28px rise over `.7s`.

### 4.2 Header
- Underline grow on link hover/active, `.25s`.
- Sticky with blur; no scroll state change.
- Mobile: burger toggles `.links.open`:
```css
.links.open{display:flex;flex-direction:column;position:absolute;top:74px;left:0;right:0;background:var(--cream);padding:16px 24px 22px;gap:14px;border-bottom:1px solid var(--line)}
```
  Panel drops from 74px, full width, cream, 16px/24px/22px padding, 14px gap; clicking any link closes it.

### 4.3 Buttons / cards
- `.btn` hover: red2 + `translateY(-2px)` + red glow, `.25s`; outline fills.
- `.dish` hover lift −6px; image zoom 1.06 `.5s`; heart scale 1.12 `.2s`; add hover darken + lift.
- `.tab` hover border red; `.mi` hover cream; `.soc a` hover red.

### 4.4 Cart & add-to-cart
- `bump()` increments count, writes to `#cnt`, adds `.pop` (`scale(1.5)`) for **250ms**.
- Each Add click: count +1, label becomes **"Added"** for **900ms**, then back to "Add". No persistence.
- Heart click toggles `.on` per card (filled white), no count/store.

### 4.5 Tabs
- Event delegation on `#tabs`; clicking `[data-c]` re-renders `#mgrid` with `M[c]`; `.on` class moved; no fade transition on the grid (each `.mi` re-runs `animation:fade .4s`).

### 4.6 Reservation form
- `submit` prevented; builds message from `input,select` NodeList indices: `Grazie {name}! Table for {guests} on {date} at {time} is reserved. We'll call {phone} to confirm.`
- Shows `#ok` (`display:block`), then `form.reset()` (resets to the `selected` defaults).

### 4.7 Keyframes
```css
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes float{50%{transform:translateY(-12px) rotate(8deg)}}
@keyframes fade{from{opacity:0;transform:translateY(10px)}}
```
- Plate ring 40s infinite; leaves 5s ease-in-out infinite (delays −2s/−3.5s); menu rows .4s on render.

### 4.8 Reduced motion
```css
@media(prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important;scroll-behavior:auto!important}.rv{opacity:1;transform:none}}
```

### 4.9 Images (exhaustive)
- Hero (900w): `https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=900&q=70&auto=format&fit=crop`
- About (900w): `https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=900&q=70&auto=format&fit=crop`
- All dynamic photos (600w): `https://images.unsplash.com/photo-${id}?w=600&q=70&auto=format&fit=crop` (ids in §3.3/§3.4). Specials/menu images use `loading="lazy"`.

---

# DIFFERENCES vs our rebuild

Our rebuild is the `fast-food` variant (brand **Smash Lab**) rendered by `HomePage` inside `SiteFrame`. Default palette `tomato` is active (`seed/content.ts` sets `palette: "tomato"`), so the token comparison below is apples-to-apples.

## Global tokens / typography / layout

| Topic | Source | Ours | Verdict |
|---|---|---|---|
| Page bg | `#fbf5ec` | `--color-bg #fbf5ec` | ✅ same |
| Primary red | `#d9412b` | `#c93a24` | ❌ darker/less orange |
| Primary hover | `#b9321f` | `#a92f1c` | ❌ |
| Accent / green | `#3f7d3a` | `--sl-accent #2f6b2b` | ❌, and ours uses red `primary` where source uses green (Add buttons, cart badge, avatars, scripts) |
| Card white | `#fff` (`--card`) | no white token; `bg-surface #f6ecdc` used for cards | ❌ cards are beige, not white |
| Muted text | `#6b6459` | `#5f574b` | ❌ |
| Border | `#eadfce` | `#d8c9b3` | ❌ noticeably darker/tanner |
| Surface | only reviews `#f6ecdc` | `#f6ecdc` | ✅ value, but ours applies it to every card/section, source uses it as a section band only |
| Shadow | `0 10px 30px rgba(80,50,20,.10)` warm | `shadow-sm` / `shadow-2xl` neutral defaults | ❌ |
| Radii | 20px cards, 22px feature/photo/form/bar/map, 18px badge, 16px menu row | `rounded-3xl` = 24px everywhere | ❌ |
| Container | 1180px, 24px side padding (16 ≤640) | `max-w-6xl` = 1152px, `px-4` = 16px | ❌ narrower + tighter gutters |
| Body | Poppins, 1.6, 16px, `overflow-x:hidden`; smooth scroll + `scroll-padding-top:80px` | font var `--sl-body` (Poppins), no smooth scroll, no overflow-x hidden | ⚠️ |
| Fonts | **Bebas Neue + Lora + Poppins + Yellowtail** | **Bebas Neue + Poppins** (+ Arabic Lalezar/IBM Plex Sans Arabic) | ❌ **Lora and Yellowtail missing**; all Lora headings become Bebas, all script accents disappear |
| Display styling | h1 Bebas, h2 Lora 600 (title case), h3 Lora 19 | `displayFont` = Bebas + `uppercase tracking-wide`, h2 36→60px, h3 30px | ❌ uppercase + much larger + wrong family |
| Section padding | `80px 0` (56 ≤760) | `py-14 sm:py-20` (56 → 80 at 640) | ⚠️ same desktop, different mobile breakpoint |
| Heading gap | `.head` margin-bottom 44px | `mb-10` = 40px, `max-w-2xl`, `space-y-2` | ❌ |
| Eyebrow rules | 30×2px red lines either side (left only in About) | plain text, no lines | ❌ |
| Reveal animation | `.rv` 28px/.7s IO threshold .12 | none | ❌ |
| Hover lift/zoom | cards −6px + image 1.06, buttons −2px + glow | colour-only transitions | ❌ |
| Focus rings | not specified | `focus-visible:outline-2` added | extra |

## Header / nav (`site-frame.tsx`)

| Item | Source | Ours | Verdict |
|---|---|---|---|
| Brand | "Sole Trattoria", Yellowtail 34px red + 30px green sun SVG | "Smash Lab" (store name), Bebas 36px, uppercase, no icon | ❌ |
| Nav items | 5 same-page anchors: Home/Menu/About/Reviews/Contact | 3 routes: Home/Menu/Contact | ❌ missing About & Reviews |
| Active style | red text + 2px underline animating width 0→100% | red text + static 2px bottom border | ❌ |
| Link metrics | 14px/500, gap 30px, padding 4px 0 | `text-sm`/`font-medium`, gap 20px, `py-2` | ❌ |
| Primary CTA | "ORDER NOW" solid, 9×20 padding | "Order now" solid, `px-6 py-2.5`, `min-h-11` | ⚠️ |
| Secondary CTA | outline "BOOK" | **missing** | ❌ |
| Cart | 42px white circle, green badge, pop animation | 44px circle, red badge, no pop | ❌ |
| Language switch | absent | present | extra |
| Mobile menu | burger + dropdown panel at 74px | none — nav simply wraps | ❌ |
| Sticky bar | 74px fixed height, `z-50`, cream 92% + blur 10 + border | `z-30`, `py-3`, auto height, `bg-bg/95`, wraps to two rows | ❌ |
| Demo banner | absent | `DemoBanner` above header | extra |
| Anchors | `scroll-padding-top:80px` smooth scroll | none | ❌ |

## Hero

| Item | Source | Ours | Verdict |
|---|---|---|---|
| Wrapper | `<header class="hero" id="home">`, padding 50/70 | `<section>`, `py-12 md:py-20` | ❌ |
| Grid | `1.05fr .95fr`, gap 40 (36 ≤1024) | `md:grid-cols-[1.05fr_0.95fr]`, gap 40 | ✅ grid ratios |
| Eyebrow | Yellowtail **54px**, green, rotated −4°, margin-bottom −6 | small 12px uppercase red tracking .15em | ❌ major |
| H1 | "PIZZA & / PASTA", `clamp(78,11vw,148)`, lh .92, tracking .01em, line 2 red | "Smashed fresh, delivered hot", `text-6xl`→`text-8xl` (60/96), lh .95, **all red** | ❌ size, clamp, two-tone |
| Divider | heart + two 70×2 red lines | missing | ❌ |
| Paragraph | max 420px, 16px, mb 26 | max 448px, **18px** | ❌ |
| CTA row | 2 buttons gap 12, 13px/12×26 padding, "VIEW MENU →"/"RESERVE NOW" | 2 buttons gap 12, 14px/`px-6 py-2.5`, no arrow, uppercase only via display font? (buttons plain) | ❌ |
| Plate size | `min(100%,520px)` square | `max-w-md` 448px | ❌ |
| Ring | inset −4%, dashed 2px red, opacity .55, spins 40s | `-inset-3` (12px), dashed `primary/60`, **static** | ❌ |
| Photo | inset 6%, 8px white border, warm shadow | fills container, 8px `border-bg`, `shadow-2xl` | ❌ |
| Leaves | 3 animated SVG leaves (74/90/56px, float 5s) | none | ❌ |
| Image | pizza `photo-1565299624946…w=900` | burger library photo (`burger-hero`, `1568901346375`) | ❌ shape context/image |
| Spacing model | flow with precise margins (−6, 18, 26) | `space-y-5` (20px) | ❌ |

## Feature strip / "Promises"

- ✅ Present as a 4-item trust strip.
- ❌ Not white: `bg-surface` (#f6ecdc) with a `border-border` outline; source is a white card, radius 22px, warm shadow, no border.
- ❌ No vertical dividers between items (`border-r` on `.f`).
- ❌ Icons 48px (source 52px) and 24px glyphs (source 26px).
- ❌ Title `<p className="font-bold">` (~16px default weight 700) vs source h4 **13px, letter-spacing .07em**.
- ❌ Body `text-sm` = 14px vs source **13px**; colour token mismatch.
- ❌ No −10px overlap with hero; separate `<section>` with default spacing.
- ❌ Different icon language (flame/leaf/bike/clock vs oven/pasta/produce/heart).
- ⚠️ Layout 1→2→4 columns vs source 4→2→1 (same idea, different breakpoints: ours sm=640, lg=1024).

## Specials → our "BestSellers"

- ⚠️ Equivalent exists, but under `id="best-title"` with `tone="soft"` → **section background #f6ecdc**, source is cream.
- ❌ Grid `sm:2 lg:4` (4 columns) vs source exactly **3 columns**.
- ❌ Card radius 24px + `border border-border` + `shadow-sm` vs source 20px + `--sh`, no border.
- ❌ Image `aspect-[4/3]` vs source fixed **210px band**.
- ❌ Title Bebas **30px uppercase** vs Lora **19px title case**.
- ❌ No gold star rating or review-count.
- ❌ No 44px red favourite heart button.
- ❌ Price red `formatPrice` (SAR) 20px vs `$12.90`; ok size.
- ❌ Add button uses `pillSolid` (red, px‑6 py‑2.5, 14px) vs source **green**, 8×20, 13px.
- ➕ Extra: description paragraph and tag chips (source dish card has neither).
- ❌ No hover lift/image zoom; source has both.
- ⚠️ Content is burgers, not Margherita/Tagliatelle/Spaghetti; images are library ids, not the source Unsplash ids.
- ❌ Eyebrow has no flanking rules; heading size/family differ.

## Menu section (tabs + price list)

- ❌ **Entirely missing from our home page** — no white menu band, no tab pills (Pizza/Pasta/Antipasti/Dolci/Drinks), no two-column 76px round thumbnails, no dotted leaders, no fade-in rows. Our `/menu` route is a separate page with different UI.
- ❌ Therefore missing: `.menu` white background, tab styles (2px border, 10×24, radius 99, active red), `mgrid` `18px 50px` grid, `.mi` 16px radius hover.

## About

- ❌ **Missing entirely** on our home (our `content.about` exists in seed but is not rendered).
- ❌ Missing: 4/3 photo (radius 22, warm shadow), red 18px-radius badge at `left:-18px; bottom:-22px` with Yellowtail "Since 1998" + "FAMILY OWNED", one-sided eyebrow rule, Yellowtail 38px green signature, "LEARN MORE →" outline-free solid button.
- ❌ No 60px two-column layout.

## Reviews

- ✅ Section exists, 3 columns at lg.
- ❌ Section bg: ours cream; source **#f6ecdc** band.
- ❌ Cards: ours `bg-surface` (#f6ecdc) + 24px radius + border, no shadow; source **white**, 20px radius, 28px padding, `--sh`.
- ❌ Stars colour: ours `text-primary` red; source gold **#e9a21b**, 13px, `letter-spacing:2px`.
- ❌ No 80px Lora quotation mark (red, .18 opacity, top-right).
- ❌ No 42px green avatar circle with initial.
- ❌ Author is `text-sm font-semibold text-muted` only; source has bold name + 12px muted role line.
- ❌ Body 16px vs source **14px `#444`**.
- ⚠️ Copy/roles/ratings differ (ours data-driven, no roles).

## Reservation / booking form

- ❌ **Missing entirely** from our home page. No `.res` section, no "Save your seat" Yellowtail 42px accent, no 2-col white form card, no date/time/guests/name/phone fields, no green `#e8f3e6` success message, no form reset behaviour.
- (Our "BOOK" nav CTA also doesn't exist, so there's no entry point at all.)

## Info strip + map

- ⚠️ Strip exists (`InfoStrip`), but:
  - ❌ Background solid `bg-primary` (#c93a24) instead of `linear-gradient(135deg,#e2503a,#b9321f)`.
  - ❌ No red glow shadow (`0 18px 40px rgba(217,65,43,.3)`), no border dividers between the 4 items (`rgba(255,255,255,.3)`).
  - ❌ Icon circles `bg-bg` (cream) with red icon vs source **white** circles; 48px vs 52px.
  - ⚠️ Title bold 16px vs source h4 13px/.07em; body 14 vs 13px.
  - ❌ **Map is missing** entirely: no 200px map, no white road bands, 36px grid, green park blob, red location pill.
  - ➕ Extra: centered "Order now" solid button below the strip (source has none).
  - ⚠️ Section padding: ours `pb-16` with `px-4`; source `.info` = `padding:0 0 70px` on the container.
  - ⚠️ Content differs (dynamic hours/areas vs "12 Via Sole", "Mon–Sun 12:00 PM–10:30 PM", two phone numbers, 30-min delivery).

## Footer

- ✅ Exists, dark bar.
- ❌ Background `bg-text` = **#222** vs `#2a2420`; text `text-bg` (cream #fbf5ec) vs **#d9cfc0**.
- ❌ Logo: Bebas 36px uppercase vs Yellowtail **34px** white.
- ❌ Adds address and phone (source has neither); adds a **Menu/Contact nav** (source has none).
- ❌ Missing the three **38px social circles** (1px #5b5148 border, 17px white icons, red hover) entirely.
- ❌ Copyright copy differs ("A demo restaurant website" vs "© 2026 Sole Trattoria. All rights reserved."), font size 14 (`text-sm`) vs 13px.
- ❌ Padding `py-10` (40px) matches 40px, but alignment/layout is a 3-block flex (name block, nav, copyright) vs source's 3 inline items (logo, copyright, socials).

## Sections OUR page has that the source does not

1. **Offers** — "Today's offers / Deals made for today", 3-up `OfferCard` grid + outline "See the full menu" button.
2. **How it works** — eyebrow + intro paragraph + 3 numbered cards (Bebas 48px numbers, bordered `bg-surface` cards).
3. **Delivery areas** — 4-up fee/minimum cards under a `tone="soft"` section.
4. **Extra CTA** under the info strip ("Order now").
5. **Header extras**: `DemoBanner`, language switch, cart drawer (`CartDrawer`), multi-page routes (`/menu`, `/contact`, `/order`, `/checkout`, dashboard), focus-visible rings.
6. **Arabic/RTL support**: Lalezar + IBM Plex Sans Arabic, RTL resets in `displayFont`/`eyebrowClass` (source is English-only).

## Sections the source has that we lack (summary)

**Menu (tabs + dotted-leader list)**, **About (photo + badge + signature)**, **Reservation form**, **Map**, **Specials' heart/stars**, **Hero script accent + rotating ring + leaves + divider**, **Cart/BOOK split CTAs + burger menu**, **order-count pop animation**, **scroll reveal**, **footer social icons**.

No files were modified.