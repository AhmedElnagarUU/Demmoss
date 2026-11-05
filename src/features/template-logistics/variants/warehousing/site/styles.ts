const base =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-6 py-2.5 text-base font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus";

// Square-ish buttons of the Makhzan look (Stackwell): solid brand color, or outlined.
export function blockButton(variant: "primary" | "outline"): string {
  return variant === "primary"
    ? `${base} bg-primary text-on-primary hover:bg-primary-hover`
    : `${base} border-2 border-text text-text hover:bg-surface`;
}

export const card = "rounded-2xl border border-border bg-surface";
