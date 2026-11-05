# Design and UI rules

## Principles

- **Sell value.** Headlines speak about the business result (more bookings, fewer calls, more trust),
  then explain the feature that delivers it.
- **Full control.** Tailwind CSS only, no component library. Generic primitives live in `src/shared/ui`;
  feature-specific components live in the feature.
- **Mobile-first.** Design for phones first; most visitors arrive from social media and WhatsApp.

## Tokens

- Colors, fonts, radii, and spacing are defined once in the Tailwind theme (CSS variables). No random hex values in components.
- Brand identity is not decided yet: use neutral placeholder tokens; brand name comes from `NEXT_PUBLIC_BRAND_NAME`.
- Templates may define their own tokens inside their feature; they do not change the main site tokens.

## Quality bar

- Clear hierarchy: one main message and one main action per section.
- Consistent spacing scale; generous whitespace.
- Accessible: color contrast AA, visible focus states, labels on every input, alt text on meaningful images.
- Images: stock photos come from an approved photo CDN (Unsplash, Pexels) through `photoUrl()` / `photoSrcSet()` in
  `src/shared/ui/photo.ts`, sized for their slot; local files (WebP, sized) are also fine. Always `width`, `height`, `alt`,
  and `loading="lazy"` below the fold. Each template keeps all its photo URLs in one list. Photo credit on the demo's About page.
- Performance: no heavy animation libraries without a reason.
- Works in both RTL and LTR (see `i18n-rtl.md`).

## Shared UI primitives (`src/shared/ui`)

Only generic building blocks: button, link-button, field (input/textarea/select), card, badge, modal, table, icon, logo,
language switch, whatsapp button. Each primitive is created when a feature first needs it. If a component knows about leads, templates, or bookings, it belongs in a feature.
