// Sole Trattoria's look follows the source design: cream page, tomato red, basil green accents, script
// flourishes, warm shadows (`--sl-shadow`, set in ../fonts.ts) and pill buttons. Letter-spacing and uppercase
// are switched off in RTL because they break Arabic letter joining.
const rtlSafe = "rtl:normal-case rtl:tracking-normal";

// The page container: 1180px like the source, 24px gutters (16px on small phones).
export const container = "mx-auto w-full max-w-[1180px] px-6 max-sm:px-4";

// The Bebas/Lalezar display font: only the hero heading uses it (the source h1 is the one Bebas heading).
export const displayFont = `font-(family-name:--sl-display) uppercase tracking-[0.01em] ${rtlSafe}`;

// Lora 600 for section titles and dish names (the source h2/h3), with Lalezar for Arabic.
export const serifFont = "font-(family-name:--sl-serif) font-semibold";

// Yellowtail for the logo and the green script accents, with Aref Ruqaa for Arabic.
export const scriptFont = "font-(family-name:--sl-script) font-normal";

export const eyebrowClass = `text-xs font-semibold uppercase tracking-[0.15em] text-(--sl-primary-text) ${rtlSafe}`;

const pillBase =
  "inline-flex items-center justify-center gap-2 rounded-full border-2 px-[26px] py-3 text-[13px] font-semibold " +
  "uppercase tracking-[0.06em] transition-[background-color,border-color,color,transform,translate,box-shadow] " +
  "duration-[250ms] hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 " +
  "focus-visible:outline-focus disabled:cursor-not-allowed disabled:opacity-60";

export const pillSolid = `${pillBase} ${rtlSafe} border-primary bg-primary text-on-primary hover:border-primary-hover hover:bg-primary-hover hover:shadow-[0_8px_18px_rgba(217,65,43,0.3)]`;

export const pillOutline = `${pillBase} ${rtlSafe} border-primary bg-transparent text-(--sl-primary-text) hover:border-primary hover:bg-primary hover:text-on-primary hover:shadow-[0_8px_18px_rgba(217,65,43,0.3)]`;

// The compact nav button (source: 9px 20px).
// Below 760px the source shrinks it to 8px 14px, 12px, so the header fits on phones.
export const pillSolidCompact = `${pillSolid} px-5! py-[9px]! min-h-0! max-[760px]:px-3.5! max-[760px]:py-2! max-[760px]:text-xs!`;

// The green add pill of the dish cards (source .add; hover darkens by brightness so every palette works).
export const addClass =
  "inline-flex items-center justify-center rounded-full bg-(--sl-accent) px-5 py-2 text-[13px] font-semibold " +
  "text-(--sl-on-accent) transition-[background-color,transform,translate,filter] duration-200 " +
  "hover:-translate-y-0.5 hover:brightness-90 focus-visible:outline-2 focus-visible:outline-offset-2 " +
  "focus-visible:outline-focus disabled:cursor-not-allowed disabled:opacity-60";
