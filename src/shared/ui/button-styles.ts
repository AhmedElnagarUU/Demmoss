export type ButtonVariant = "primary" | "secondary" | "whatsapp";

const base =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-control px-5 py-2.5 text-base font-semibold " +
  "transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus " +
  "disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-primary text-on-primary hover:bg-primary-hover",
  secondary: "border border-border bg-surface text-text hover:bg-border",
  whatsapp: "bg-whatsapp text-on-primary hover:bg-whatsapp-hover",
};

export function buttonClasses(variant: ButtonVariant = "primary"): string {
  return `${base} ${variants[variant]}`;
}
