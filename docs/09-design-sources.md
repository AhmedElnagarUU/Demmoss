# 09 · Design sources: analysis and site structure

Status: **agreed** (categories, variants, fonts, Middle-East content, CDN photos). Each category gets its plan doc before building.

The owner uploaded 15 single-file designs (HTML + CSS + a small script) to `theme-sources/`. They are **inspiration**:
each one is a rich landing page. We use them as the **home page** of a variant, and design the other pages in the
same visual language. We do not copy them line by line; we rebuild in React + Tailwind, bilingual and RTL.

## 1. What each design is

| File | Business | Look (tokens / fonts) | Strong sections to keep | Interactions in the file |
|---|---|---|---|---|
| `03-verdant-table` | Farm-to-table Mediterranean restaurant | deep green, cream, gold · Cormorant Garamond, Jost, Pinyon Script | story, signature dishes, gallery band, menu tabs, reserve + hours + map | menu tabs, reserve form |
| `02-ironhorn-steakhouse` | Premium steakhouse | black, gold · Playfair, Montserrat, Lato | 4-point feature strip, story, "cuts above the rest" signature grid, menu tabs incl. wine, reserve band, rich footer | menu tabs, reserve form |
| `06-sole-trattoria` | Pizza & pasta, casual | cream, tomato red, basil green · Bebas Neue, Yellowtail, Poppins | bold hero + "Order now / Book", 4 promises, chef's specials, menu grid tabs, reviews, info strip (location, hours, call, delivery) | tabs, booking form |
| `01-hearthbean-cafe` | Café & eatery | cream, espresso, caramel · DM Serif Display, Caveat, Inter | specials carousel, menu tabs, about, hours + book band, reservation form, reviews, Instagram strip, newsletter, **order drawer** | carousel, tabs, reservation, cart drawer + checkout |
| `03-leaf-and-grain` (Sage & Grain) | Specialty coffee shop | sage, cream, orange · Nunito | 4 reasons, popular drinks (+ add), pastries, full menu tabs, bean selector, reviews, delivery panel | add to order, tabs, bean selector |
| `02-ember-roast-co` (Ember & Oak) | Coffee roaster **online shop** | dark, cream, orange, olive · Libre Caslon, Montserrat | shop by roast, featured products + tabs, **subscription plan**, reviews slider, cafés + newsletter | search, tabs, plan toggle, cart drawer |
| `05-minimal-decor` (Solène) | Home décor **online shop** | sand, cream, ink · Cormorant Garamond, Inter | collection categories, about, best sellers + add to cart, quote, Instagram, newsletter footer | cart drawer |
| `02-hartwell-realty` | Real estate **agency** (buy / rent) | warm white, black, bronze · Montserrat | hero with **Buy/Rent search**, listings + filters, 3 principles, neighbourhoods, **mortgage calculator**, agents, testimonials, schedule a visit | search tabs, filters, calculator, slider, form |
| `01-solenne-estates` | Villa / home **developer** | black, sand accent · Montserrat | hero hotspots, principles, residence types panorama, residences + filters, team, **4-step process**, testimonials, book a viewing | hotspots, filters, slider, form |
| `02-dr-adrian-vale` | Dental implant **surgeon** (single doctor) | light grey, ink, lime · Onest | services stage, implant techniques panel, "when restoration is best", **before/after slider**, about, **transparent prices**, testimonials, **FAQ**, booking + hours, sticky mobile CTA bar | before/after, FAQ accordion, booking |
| `01-orbis-cargo` | Freight forwarding from Asia | light grey, ink · Manrope | about panel, 4 services, **cost calculator** (air/sea/road/rail), stats, 5 steps, **pricing plans**, testimonials, FAQ, quote form | calculator, FAQ, modal |
| `02-meridian-route` | Freight forwarding (same business) | red, blue, dark · Inter | transport chips, 4 promises, steps, **popular routes**, **shipment tracker** + timeline, testimonials, FAQ, quote | tracker, chips, dropdown nav |
| `03-stackwell-3pl` | Warehousing & 3PL fulfilment | white, red, black · Plus Jakarta Sans | standards steps, partners, smart storage, 3PL process, stats, **storage cost estimator**, warehouses, **case studies**, FAQ, quote | estimator, FAQ |
| `04-marketing-agency` (KZ Digital) | Full-service marketing agency | red, black · Montserrat, Inter | **8 services** (exactly the owner's list), about, latest work, testimonials, **pricing plans**, CTA band + form | slider |
| `03-organic-studio` (Olivine) | Brand + interior design studio | cream, olive, terracotta · Cormorant Garamond, Jost | story, 4 services, recent work, **5-step process**, founder, why us, testimonials, contact | — |

Common to all files: Google Fonts, Unsplash images (hotlinked), English only, LTR, physical CSS. None of that is kept as is:
fonts are self-hosted with `next/font`, images are downloaded and optimized into the repo, all text moves to `{ ar, en }`
seeds, and layout uses logical properties for RTL.

## 2. Proposed categories and variants

The designs cover **7 business categories**. Two of them are new (logistics, online stores) and one splits off (cafés).

| Category | Variant A (inspiration) | Variant B (inspiration) | Notes |
|---|---|---|---|
| Restaurants | **Verdant Table**, fine dining (mirrors `03-verdant-table`) | **Sole Trattoria**, pizza & pasta ordering (Sole Trattoria + Hearthbean order drawer) | Built: the home page, header and footer mirror the source (`docs/design-specs/03-verdant-table.md`) |
| Cafés | **Café & eatery**: table booking + pickup orders (Hearthbean) | **Specialty coffee**: order for pickup/delivery + beans (Sage & Grain) | Same dashboard as Restaurants (menu, orders, reservations) |
| Real estate | **Agency**: buy/rent listings (Hartwell & Co. Realty, mirrors `02-hartwell-realty`) | **Developer**: projects and units (Solenne Estates, mirrors `01-solenne-estates`) | Built: both real estate homes, headers and footers mirror their sources (`docs/design-specs/02-hartwell-realty.md`, `docs/design-specs/01-solenne-estates.md`) |
| Clinics | **Specialist doctor**: dental implants (Dr. Vale) | **Medical centre**: several doctors (derived from Dr. Vale's design language) | No design for B yet |
| Logistics *(new)* | **Freight forwarder**: Orbis Cargo, exact mirror of `01-orbis-cargo.html`; the tracker loop comes from Meridian | **Warehousing & 3PL** (Stackwell), exact mirror of `03-stackwell-3pl.html` | Built: the home page, header and footer mirror the source (`docs/design-specs/03-stackwell-3pl.md`); freight spec: `docs/design-specs/01-orbis-cargo.md` |
| Marketing & creative *(updated)* | **Full-service marketing agency** (KZ Digital, owner's 8 services) | **Brand & interior design studio** (Olivine) | Replaces the earlier "performance agency" idea |
| Online stores *(new)* | **Home décor shop** (Solène) | **Coffee roaster shop with subscriptions** (Ember & Oak) | |

Categories already in the list without a design (gyms, education, service companies) stay in the wizard
("we build for your field too") and appear in the gallery only when built.

## 3. Site structure per variant

Rules used: the design becomes the **home page**; other pages exist only when they serve a business goal
(decide, trust, act). Every variant has register/login and the shared category dashboard (not repeated below).
Section names are short; each will get its business goal in the category plan doc (rule: `templates.md`).

### Restaurants

**A · Verdant Table (fine dining)** · pages: Home, Menu, About, Private events, Reserve, Contact (built)
- Home (mirrors the source): hero + Book a table · Our Story · signature dishes · gallery band (two plates and a fork) · menu tabs · Reserve a Table (form, hours, map) · footer
- Look: exactly the Verdant Table source (green/cream/gold, serif + script accents, round plates, torn edges). Inner pages reuse its components.

**B · Sole Trattoria (fast food)** · pages: Home, Menu (order), Checkout, Order status, Contact
- Home: script "Fresh from the oven" + PIZZA & PASTA · 4 promises · Chef's Specials + today's offers · menu preview · about (Since 1998) · reviews · delivery areas · info strip + map
- Menu: category tabs, add to cart, cart drawer · Checkout: pickup/delivery, area, address, payment on delivery · Order status: live steps

### Cafés (shared dashboard with Restaurants)

**A · Café & eatery** · pages: Home, Menu (order), Reserve, Checkout, Order status, Contact
- Home (Hearthbean): hero + Explore menu / Book · specials carousel · menu preview · about · hours + book band · reviews · Instagram strip · newsletter footer

**B · Specialty coffee** · pages: Home, Menu (order), Checkout, Order status, Beans, Contact
- Home (Sage & Grain): hero · 4 reasons · popular drinks (+ add) · pastries · bean selector teaser · reviews · delivery / pickup panel
- Beans: origins and roast profiles, add bags to the order

### Real estate

**A · Agency (buy / rent)** · pages: Home, Listings, Property detail, About & team, Contact
- Home (Hartwell): hero with Buy/Rent search · featured listings + filters · 3 principles · neighbourhoods · mortgage calculator · agents · testimonials · schedule a visit
- Listings: search + filters (buy/rent, type, area, price, bedrooms) · Property detail: gallery, key facts, description, location, mortgage calculator, agent card, **schedule a viewing** form
- Loops: viewing request → Viewings · property inquiry → Inquiries

**B · Developer (projects)** · pages: Home, Residences, Residence detail, Process & studio, Contact
- Home (Solenne): hero with hotspots · principles · residence types · available residences + filters · team · 4-step process · testimonials · book a viewing
- Residence detail: gallery, features, unit availability table, **request a viewing / brochure** form
- Loops: viewing request → Viewings · unit inquiry → Inquiries (owner marks units available / reserved / sold → site updates)

### Clinics

**A · Specialist doctor (dental implants)** · pages: Home, Treatments, Results, Prices & FAQ, Book
- Home (Dr. Vale): hero portrait + Book · services stage · techniques panel · "when restoration is best" · before/after · about · prices · testimonials · FAQ · booking + hours · sticky mobile CTA
- Treatments: one section per treatment (who it's for, steps, duration, price from) · Results: before/after gallery · Book: date, time slot, treatment, name, phone, notes
- Loop: appointment request → Appointments (new → confirmed → done / cancelled / no-show)

**B · Medical centre (several doctors)** · pages: Home, Departments, Doctors, Doctor profile, Book, Contact
- Same design language; adds departments grid, doctor directory with filters, booking by doctor and slot
- Loop: appointment by doctor → Appointments (filter by doctor)

### Logistics

**A · Freight forwarder** · pages: Home, Services, Calculator, Track shipment, Get a quote (built)
- Home (mirrors Orbis exactly): hero + Calculate / Watch our story · about panel with 4 services (air, sea, road, customs) · ink cost calculator (air/sea/road/rail tabs) · stats strip · 5 steps · pricing plans · testimonials slider · FAQ · quote form + info card + map · dark footer
- Track shipment: tracking number → status timeline · Loops: quote request → Quotes; **shipment status updated in the dashboard → shown on the tracker** (two-way, like Sole Trattoria); rates edited in the dashboard → calculator changes

**B · Warehousing & 3PL** · pages: Home, Services (storage, fulfilment), Warehouses, Case studies, Get a quote
- Home (Stackwell): hero with standards · partners · smart storage · 3PL process · stats · storage cost estimator · warehouses · case studies · FAQ · quote
- Loop: quote request with estimator values → Quotes (new → quoted → won / lost)

### Marketing & creative

**A · Full-service marketing agency** · pages: Home, Services, Service detail, Work, Case study, Pricing, About, Contact
- Home (KZ Digital): hero · 8 services (social media, branding, web development, media, media buying, SEO, influencer marketing, advertising) · about · latest work · testimonials · pricing · CTA band + form
- Loop: proposal request (services, budget, goals) → Leads pipeline (new → meeting → proposal sent → won / lost)

**B · Brand & interior design studio** · pages: Home, Services, Work, Project detail, Process & studio, Contact
- Home (Olivine): hero · story · 4 services · recent work · 5-step process · founder · why us · testimonials · contact
- Loop: project inquiry → Inquiries pipeline

### Online stores

**A · Home décor shop** · pages: Home, Shop, Product, Cart + Checkout, Order confirmation, About, Contact
- Home (Solène): hero · collections · about · best sellers · quote · Instagram · newsletter footer
- Loop: order → Orders (new → preparing → shipped → delivered / cancelled); stock shown on the product page

**B · Coffee roaster shop** · pages: Home, Shop, Product, Subscriptions, Cart + Checkout, Order confirmation, Our cafés
- Home (Ember & Oak): hero · shop by roast · featured products · subscription plan · reviews · cafés + newsletter
- Loops: order → Orders · subscription → Subscriptions (active / paused / cancelled)

## 4. Shared dashboards (one per category)

| Category | Shared modules | Variant A modules | Variant B modules |
|---|---|---|---|
| Restaurants & cafés | Overview, Menu, Content, Customers, Reviews, Settings | Reservations, Event requests (Verdant Table) · Orders, Offers, Delivery areas (Sole Trattoria) · Café A: Reservations + Orders · Café B: Orders + Beans | |
| Real estate | Overview, Properties, Viewings, Inquiries, Content, Testimonials, Settings | Agents | Projects & unit availability |
| Clinics | Overview, Appointments, Treatments & prices, Patients, Results gallery, FAQ, Content, Settings | — | Doctors & departments, schedules |
| Logistics | Overview, Quotes, Clients, FAQ, Testimonials, Content, Settings | Shipments & tracking, Rates for calculator | Warehouses, Storage rates for estimator, Case studies |
| Marketing & creative | Overview, Leads pipeline, Services, Portfolio, Testimonials, Content, Settings | Pricing plans | Process steps |
| Online stores | Overview, Products, Orders, Customers, Reviews, Content, Settings | Collections | Subscriptions |

## 5. Technical decisions this needs

- **Fonts:** self-hosted with `next/font/google` (downloaded at build time). Each Latin font gets an Arabic pair (proposal):
  elegant serifs (Cormorant, Playfair, Caslon, DM Serif) → **Amiri** or **El Messiri** · modern sans (Montserrat, Inter,
  Manrope, Jakarta, Onest, Jost, Poppins, Nunito) → **IBM Plex Sans Arabic** or **Tajawal** · bold display (Bebas Neue) → **Lalezar** ·
  script accents (Caveat, Pinyon, Yellowtail) → **Aref Ruqaa** or no script in Arabic.
- **Images:** decided: use the designs' Unsplash URLs (and Pexels if wanted) through `photoUrl()` / `photoSrcSet()`
  (`src/shared/ui/photo.ts`), sized per slot. Uploads later via Cloudflare R2 with a 10-hour life (`docs/03-architecture.md`).
- **Content:** the designs use Western names and places. Every variant gets its own Middle-East-ready business (names, Arabic copy,
  SAR prices, local areas), written as real Arabic, keeping the design's tone.
- **Code reuse:** Restaurants and Cafés share one feature (`template-restaurant`) and dashboard; other categories are one feature each.
- **Order of work:** finish Restaurants (Verdant Table mirrored, Sole Trattoria built), then one category at a time, each with its plan doc first.
