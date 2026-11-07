// Hartwell & Co. Realty follows the source design: warm paper page, white cards, ink buttons, thin uppercase
// Montserrat headings with wide letter-spacing, a bronze accent. Letter-spacing and uppercase are switched off in RTL
// because they break Arabic letter joining; the very thin weights become Light (300) for Arabic readability.
export const rtlSafe = "rtl:normal-case rtl:tracking-normal";

// The page container: 1320px, 32px gutters (16px on phones, like the source).
export const container = "mx-auto w-full max-w-[1320px] px-8 max-[640px]:px-4";

// Section padding: 110px, 80px under 1024px, 64px under 640px.
export const sectionPad = "py-[110px] max-[1024px]:py-20 max-[640px]:py-16";

// The source h1/h2/h3: weight 200, uppercase, 0.14em tracking, line-height 1.2.
const headingBase = `font-extralight uppercase tracking-[0.14em] leading-[1.2] ${rtlSafe} rtl:font-light rtl:leading-[1.5]`;
export const h2Class = `${headingBase} text-[clamp(26px,3.4vw,44px)]`;
export const h2Small = `${headingBase} text-[clamp(22px,2.6vw,32px)]`;
export const h1Class = `${headingBase} tracking-[0.12em] leading-[1.12] text-[clamp(34px,5vw,76px)]`;

// The label: 11px, weight 500, 0.28em tracking, a 44px rule before it.
export const labelClass = `flex items-center gap-3.5 text-[11px] font-medium uppercase tracking-[0.28em] before:h-px before:w-11 before:bg-current ${rtlSafe}`;

// The pill button: 11px, weight 500, 0.2em tracking, 14px 30px, fully round, 0.3s transition.
const pillBase =
  "inline-flex cursor-pointer items-center justify-center gap-2.5 rounded-full border border-transparent px-[30px] py-3.5 " +
  "text-[11px] font-medium uppercase tracking-[0.2em] transition-[background-color,border-color,color] duration-300 " +
  `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus disabled:cursor-not-allowed disabled:opacity-60 ${rtlSafe}`;
export const pillDark = `${pillBase} bg-primary text-on-primary hover:bg-primary-hover`;
export const pillLine = `${pillBase} border-border text-text hover:border-text`;
// the header button: the source hides it under 1024px (it moves into the mobile menu)
export const pillDarkNav = `${pillDark} max-[1024px]:hidden`;

// Form fields of the source: no box, only a line under the text that turns bronze on focus.
export const fieldLabel = `mb-1 block text-[9px] uppercase tracking-[0.22em] text-muted ${rtlSafe}`;
export const fieldClass =
  "w-full rounded-none border-0 border-b border-border bg-transparent px-0.5 py-[9px] text-[13px] text-text outline-0 " +
  "transition-colors duration-300 focus:border-(--re-gold) focus-visible:outline-0";
