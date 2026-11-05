// Smash Lab's look (Sole Trattoria): cream pages, tomato red, basil accents, bold display headings, pill buttons.
// The fonts are CSS variables set on the site wrapper (../fonts.ts). Arabic display text needs more line height.
export const displayFont =
  "font-(family-name:--sl-display) uppercase tracking-wide rtl:normal-case rtl:tracking-normal rtl:leading-[1.4]";

// Letter-spacing breaks Arabic letter joining, so it is switched off in RTL.
export const eyebrowClass =
  "text-xs font-semibold uppercase tracking-[0.15em] text-(--sl-accent) rtl:text-sm rtl:normal-case rtl:tracking-normal";

const pillBase =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full border-2 px-6 py-2.5 text-sm font-semibold " +
  "tracking-wide transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus " +
  "disabled:cursor-not-allowed disabled:opacity-60";

export const pillSolid = `${pillBase} border-primary bg-primary text-on-primary hover:border-primary-hover hover:bg-primary-hover`;

export const pillOutline = `${pillBase} border-primary bg-transparent text-primary hover:bg-primary hover:text-on-primary`;
