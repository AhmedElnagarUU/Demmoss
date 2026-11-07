// Solenne Estates follows the source design: near-black page, thin uppercase Montserrat headings with wide letter-spacing,
// a sand accent. Letter-spacing and uppercase are switched off in RTL because they break Arabic letter joining;
// the very thin weights become Light (300) for Arabic readability.
export const rtlSafe = "rtl:normal-case rtl:tracking-normal";

// The page container of the source: padding clamp(16px, 5vw, 72px), at most 1600px wide.
export const container = "mx-auto w-full max-w-[1600px] px-[clamp(16px,5vw,72px)]";

// Section padding: 140px, 90px under 640px.
export const sectionPad = "py-[140px] max-[640px]:py-[90px]";

// The label: 11px, weight 400, 0.3em tracking, a 48px rule before it. The color is set where it is used.
export const labelClass = `flex items-center gap-4 text-[11px] font-normal uppercase tracking-[0.3em] before:h-px before:w-12 before:bg-current ${rtlSafe}`;

// The h2 of the source: weight 200, uppercase, 0.14em tracking, clamp(28px, 4.4vw, 64px), line-height 1.2, 28px above.
export const h2Big = `mt-7 font-extralight uppercase tracking-[0.14em] leading-[1.2] text-[clamp(28px,4.4vw,64px)] ${rtlSafe} rtl:font-light rtl:leading-[1.5]`;

// The pill button: 11px, weight 500, 0.2em tracking, 14px 30px, fully round; hover lifts 2px with a soft glow.
export const pill =
  "inline-flex cursor-pointer items-center justify-center gap-2.5 rounded-full border-0 bg-primary px-[30px] py-3.5 " +
  "text-[11px] font-medium uppercase tracking-[0.2em] text-on-primary transition-[background-color,translate,box-shadow] duration-300 " +
  "hover:-translate-y-0.5 hover:bg-primary-hover hover:shadow-[0_10px_30px_color-mix(in_srgb,var(--color-primary)_25%,transparent)] " +
  `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus disabled:cursor-not-allowed disabled:opacity-60 motion-reduce:transition-none ${rtlSafe}`;
export const pillNav = `${pill} px-[22px] py-[11px] max-[1024px]:hidden`;

// Form fields of the source: no box, only a line under the text that turns accent on focus.
export const fieldLabel = `mb-2 block text-[10px] uppercase tracking-[0.24em] text-muted ${rtlSafe}`;
export const fieldClass =
  "w-full rounded-none border-0 border-b border-border bg-transparent py-2.5 text-sm text-text outline-0 [color-scheme:dark] " +
  "transition-colors duration-300 focus:border-(--re-accent) focus-visible:outline-0 [&_option]:bg-surface";
