const base =
  "inline-flex min-h-11 items-center justify-center gap-2.5 rounded-full px-5 py-3 text-[11.5px] font-bold uppercase tracking-[0.06em] transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus rtl:normal-case rtl:tracking-normal";

// Pill buttons of the Stackwell look: solid red, or a quiet outline.
export function blockButton(variant: "primary" | "outline" | "ghost"): string {
  if (variant === "primary") {
    return `${base} bg-primary text-on-primary shadow-[0_8px_20px_-8px_var(--color-primary)] hover:-translate-y-0.5 hover:bg-primary-hover`;
  }
  if (variant === "ghost") {
    return `${base} bg-bg text-text hover:text-primary`;
  }
  return `${base} border border-border text-text hover:border-primary hover:text-primary`;
}

export const card = "rounded-2xl border border-border bg-surface";

export const cardWhite = "rounded-2xl border border-border bg-bg";

export const eyebrow =
  "text-[11px] font-bold uppercase tracking-[0.08em] text-(--lg-accent) rtl:normal-case rtl:tracking-normal";

export const sectionTitle =
  "text-[clamp(28px,3.6vw,42px)] font-semibold leading-[1.1] tracking-[-0.02em] rtl:tracking-normal";
