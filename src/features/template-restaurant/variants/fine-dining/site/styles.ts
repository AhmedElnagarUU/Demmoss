import type { Locale } from "@/shared/i18n/config";

// Zaytouna's look (Verdant Table): serif headings, light sans text, gold outlines, script accents in English only.
// The fonts are CSS variables set on the site wrapper (../fonts.ts). Arabic needs more line height than Latin.
export const displayFont = "font-(family-name:--fd-display) rtl:leading-[1.5]";

// Letter-spacing breaks Arabic letter joining, so it is switched off in RTL.
export const labelClass =
  "text-xs font-medium uppercase tracking-[0.2em] text-(--fd-accent) rtl:text-sm rtl:normal-case rtl:tracking-normal";

const buttonBase =
  "inline-flex min-h-11 items-center justify-center border px-7 py-3 text-xs font-medium uppercase tracking-[0.2em] " +
  "transition-colors rtl:text-sm rtl:normal-case rtl:tracking-normal " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus";

export const solidButton = `${buttonBase} border-primary bg-primary text-on-primary hover:bg-primary-hover`;

export const outlineButton = `${buttonBase} border-text bg-transparent text-text hover:border-primary hover:bg-primary hover:text-on-primary`;

// The script accent above a heading. Pinyon Script has no Arabic letters, so Arabic uses the heading font.
export function scriptAccent(locale: Locale): string {
  return locale === "en"
    ? "font-(family-name:--fd-script) text-4xl text-(--fd-accent) sm:text-5xl"
    : `${displayFont} text-2xl font-bold text-(--fd-accent)`;
}
