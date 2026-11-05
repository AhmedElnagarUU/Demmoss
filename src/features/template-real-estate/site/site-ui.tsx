import type { ReactNode } from "react";

// Building blocks of both public sites. Colors come from the palette tokens, so each variant keeps its own look.
// Letter-spacing breaks Arabic letter joining, so it is switched off in RTL, and uppercase has no effect there.

export const pillClasses = {
  solid:
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-primary px-7 py-3 text-xs font-medium uppercase tracking-[0.2em] text-on-primary transition-colors hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus rtl:text-sm rtl:tracking-normal",
  line: "inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-text/30 px-7 py-3 text-xs font-medium uppercase tracking-[0.2em] text-text transition-colors hover:border-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus rtl:text-sm rtl:tracking-normal",
} as const;

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="mb-5 flex items-center gap-4 text-xs font-medium uppercase tracking-[0.28em] text-(--re-accent) rtl:text-sm rtl:tracking-normal">
      <span aria-hidden="true" className="h-px w-10 bg-current" />
      {children}
    </p>
  );
}

export function SectionTitle({
  id,
  level = 2,
  children,
  className = "",
}: {
  id?: string;
  level?: 1 | 2;
  children: ReactNode;
  className?: string;
}) {
  const Heading = level === 1 ? "h1" : "h2";
  return (
    <Heading
      id={id}
      className={`text-3xl font-extralight uppercase leading-tight tracking-[0.12em] sm:text-4xl rtl:font-light rtl:normal-case rtl:tracking-normal rtl:leading-snug ${className}`}
    >
      {children}
    </Heading>
  );
}

export function Section({
  id,
  tone = "plain",
  children,
}: {
  id?: string;
  tone?: "plain" | "soft";
  children: ReactNode;
}) {
  return (
    <section aria-labelledby={id} className={tone === "soft" ? "bg-surface" : ""}>
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-8 sm:py-24">{children}</div>
    </section>
  );
}

export const cardClasses = "rounded-control border border-border bg-bg";
