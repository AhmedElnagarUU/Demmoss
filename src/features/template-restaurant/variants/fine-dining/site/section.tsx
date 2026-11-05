import type { ReactNode } from "react";

// Letter-spacing breaks Arabic letter joining, so it is switched off in RTL.
export const eyebrowClass =
  "font-sans text-sm font-bold uppercase tracking-widest text-(--fd-accent) rtl:tracking-normal";

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
      <div className="mx-auto max-w-6xl px-4 py-14 sm:py-20">{children}</div>
    </section>
  );
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  level = 2,
}: {
  id: string;
  eyebrow: string;
  title: string;
  level?: 1 | 2;
}) {
  const Heading = level === 1 ? "h1" : "h2";
  return (
    <div className="mb-8 max-w-2xl space-y-3">
      <p className={eyebrowClass}>{eyebrow}</p>
      <Heading id={id} className="text-3xl font-bold leading-tight sm:text-4xl">
        {title}
      </Heading>
      <div aria-hidden="true" className="h-0.5 w-16 bg-(--fd-accent)" />
    </div>
  );
}
