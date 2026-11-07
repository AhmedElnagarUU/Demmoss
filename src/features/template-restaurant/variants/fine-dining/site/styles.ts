// Verdant Table look, quoted from the source design: Cormorant Garamond 600 headings (line-height 1.15), Jost 300 text,
// Pinyon Script gold script headings, 1px cream outline buttons with wide letter-spacing, 1200px container.
// The fonts are CSS variables set on the site wrapper (../fonts.ts). Letter-spacing and uppercase are switched off
// in RTL because they break Arabic letter joining; Arabic also gets more line height.
const rtlSafe = "rtl:normal-case rtl:tracking-normal";

// The page container: 1200px with 16px gutters, like the source .wrap.
export const container = "mx-auto w-full max-w-[1200px] px-4";

export const displayFont = "font-(family-name:--fd-display) font-semibold leading-[1.15] rtl:leading-[1.5]";

// The gold script heading (source .script). Arabic falls through to Aref Ruqaa.
export const scriptFont =
  "font-(family-name:--fd-script) font-normal leading-[1.1] text-(--fd-accent) rtl:leading-[1.6]";

// Small uppercase label (source label: 11px, .2em).
export const labelClass = `text-[11px] font-normal uppercase tracking-[0.2em] ${rtlSafe} rtl:text-sm`;

// The source .btn: transparent, 1px cream border, 12px uppercase with .22em spacing; gold fill on hover.
export const btn =
  "inline-flex items-center justify-center border border-text bg-transparent px-[30px] py-[13px] text-xs font-normal " +
  "uppercase tracking-[0.22em] text-text transition-colors duration-300 hover:border-primary hover:bg-primary " +
  "hover:text-on-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus " +
  `${rtlSafe} rtl:text-sm`;

// The Reserve button of the header (source .links .reserve): gold outline, 9px 20px.
export const reserveButton =
  "inline-flex items-center justify-center border border-primary px-5 py-[9px] text-[11px] font-normal uppercase " +
  "tracking-[0.2em] text-(--fd-accent) transition-colors duration-300 hover:bg-primary hover:text-on-primary " +
  `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus ${rtlSafe} rtl:text-sm`;

// Gives the shared reservation and event forms the source form look (square fields, outline submit button).
export const formSkin =
  "[&_input]:rounded-none [&_select]:rounded-none [&_textarea]:rounded-none " +
  "[&_button[type=submit]]:rounded-none [&_button[type=submit]]:border " +
  "[&_button[type=submit]]:border-text [&_button[type=submit]]:bg-transparent " +
  "[&_button[type=submit]]:text-xs [&_button[type=submit]]:font-normal " +
  "[&_button[type=submit]]:uppercase [&_button[type=submit]]:tracking-[0.22em] " +
  "[&_button[type=submit]]:text-text [&_button[type=submit]]:hover:border-primary " +
  "[&_button[type=submit]]:hover:bg-primary [&_button[type=submit]]:hover:text-on-primary " +
  "rtl:[&_button[type=submit]]:normal-case rtl:[&_button[type=submit]]:tracking-normal " +
  "rtl:[&_button[type=submit]]:text-sm";

// The bordered card of the source form: 1px line, dark translucent fill, 34px padding (22px on phones).
export const formCard = "border border-text/35 bg-(--fd-deep)/45 p-[34px] max-[640px]:p-[22px]";
