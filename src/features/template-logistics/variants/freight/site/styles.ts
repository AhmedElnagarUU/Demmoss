// Orbis Cargo follows the source design: Manrope on white, ink text, grey hairlines, 22px cards and pill buttons.
// Letter-spacing and uppercase are switched off in RTL because they break Arabic letter joining.
export const rtlSafe = "rtl:normal-case rtl:tracking-normal";

// The page container of the source: at most 1240px wide, 32px side padding (24 at 1024, 16 at 640).
export const container = "mx-auto w-full max-w-[1240px] px-8 max-[1024px]:px-6 max-[640px]:px-4";

// The source's small label: 11.5px, weight 500, 0.14em tracking, uppercase, muted.
export const eyebrow = `text-[11.5px] font-medium uppercase tracking-[0.14em] text-muted ${rtlSafe}`;

// The source's h2: weight 500, -0.025em, line-height 1.08, clamp(28px, 3.4vw, 44px).
export const h2 = `font-medium leading-[1.08] tracking-[-0.025em] text-[clamp(28px,3.4vw,44px)] ${rtlSafe} rtl:leading-[1.35]`;

// The card of the source: white, 1px line, 22px radius, padding 20, soft shadow that deepens on hover.
export const card =
  "rounded-[22px] border border-border bg-surface shadow-[0_10px_40px_rgba(17,17,17,0.06)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1.5 hover:shadow-[0_18px_50px_rgba(17,17,17,0.10)] motion-reduce:transition-none motion-reduce:hover:translate-y-0";

// The same card without the lift: forms, result panels and the quote info card sit still.
export const panel =
  "rounded-[22px] border border-border bg-surface shadow-[0_10px_40px_rgba(17,17,17,0.06)]";

const btnBase =
  "inline-flex cursor-pointer items-center justify-center gap-3 rounded-full border px-[26px] py-[15px] " +
  "text-[14.5px] font-semibold transition-[transform,box-shadow,background-color,color] duration-[250ms] " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus disabled:cursor-not-allowed disabled:opacity-60 " +
  "motion-reduce:transition-none";

// .btn: ink fill, white text; hover lifts 2px with a shadow.
export const btnPrimary = `${btnBase} border-primary bg-primary text-on-primary hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(0,0,0,0.22)]`;

// .btn.out: transparent with a light grey border; hover turns ink.
export const btnOutline = `${btnBase} border-border bg-transparent text-(--lg-primary-text) hover:bg-primary hover:text-on-primary hover:shadow-none ${rtlSafe}`;

// .btn.w: white on the dark calculator and highlighted plan.
export const btnWhite = `${btnBase} border-surface bg-surface text-text hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(0,0,0,0.22)]`;

// The source's 44px round icon button.
export const roundButton =
  "grid size-11 cursor-pointer place-items-center rounded-full border-0 bg-[color-mix(in_srgb,var(--color-text)_6%,var(--color-surface))] text-text transition-[background-color,color,transform] duration-[250ms] hover:bg-primary hover:text-on-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus motion-reduce:transition-none";

// Source field: 12px muted label, 14px input padding, 14px radius, light grey fill that turns white on focus.
export const fieldLabel = `mb-1.5 block text-xs font-medium text-muted ${rtlSafe}`;
export const fieldClass =
  "w-full appearance-none rounded-[14px] border border-border bg-[color-mix(in_srgb,var(--color-text)_3%,var(--color-surface))] " +
  "px-4 py-3.5 text-base text-text outline-0 transition-colors duration-200 focus:border-primary focus:bg-surface " +
  "focus-visible:outline-0 [&_option]:bg-surface [&_option]:text-text";

// The fields inside the ink calculator card: white marks on the dark surface, exactly like the source.
export const fieldLabelDark = `mb-1.5 block text-[11.5px] font-normal uppercase tracking-[0.06em] text-bg/60 ${rtlSafe}`;
export const fieldDark =
  "w-full appearance-none rounded-[14px] border border-bg/[0.15] bg-bg/[0.07] px-4 py-3.5 text-base text-bg outline-0 " +
  "transition-colors duration-200 placeholder:text-bg/50 focus:border-bg focus:bg-bg/[0.12] focus-visible:outline-0 " +
  "[&_option]:bg-surface [&_option]:text-text";
