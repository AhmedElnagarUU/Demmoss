const base =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 py-2.5 text-base font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus";

// Pill buttons of the Jisr Cargo look (Orbis): ink-filled, or outlined.
export function pillButton(variant: "primary" | "outline"): string {
  return variant === "primary"
    ? `${base} bg-primary text-on-primary hover:bg-primary-hover`
    : `${base} border-2 border-primary text-text hover:bg-surface`;
}

export const card = "rounded-[22px] border border-border bg-surface";
