# Arabic / English and RTL rules

Everything a visitor or demo user sees exists in **Arabic and English**: landing, guide, wizard, gallery,
every template site, every template dashboard.

## Locale

- Routes are prefixed: `/ar/...` and `/en/...` (next-intl).
- First visit: follow the browser language; fall back to `NEXT_PUBLIC_DEFAULT_LOCALE` (Arabic).
- The visitor's choice is remembered. The language icon is visible on every page, including template sites and dashboards.
- `<html lang dir>` is set from the locale: `ar` → `dir="rtl"`, `en` → `dir="ltr"`.

## Text

- No hardcoded UI text in components. Main-site text lives in message files; template content lives in the template seed.
- Editable demo content is stored as `{ ar: string, en: string }`. The dashboard editor shows both fields;
  the user may edit one or both.
- Arabic is written as real Arabic copy, not a literal translation of the English.

## Layout

- Use logical Tailwind utilities only: `ms-* me-* ps-* pe-* start-* end-* text-start text-end border-s border-e rounded-s rounded-e`.
- Never `ml-* mr-* pl-* pr-* left-* right-* text-left text-right` for layout.
- Directional icons (arrows, chevrons) flip in RTL (`rtl:rotate-180`).
- Numbers, phone numbers, and prices: format with `Intl` using the current locale.

## Fonts

- One Arabic font and one Latin font, chosen in the design phase, loaded with `next/font`.
- Check line height and font size for Arabic separately; Arabic usually needs more line height.

## Review checklist

- [ ] Page looks correct in both `ar` and `en`
- [ ] No physical-direction classes
- [ ] No hardcoded strings
- [ ] Forms, tables, and the dashboard sidebar mirror correctly in RTL
