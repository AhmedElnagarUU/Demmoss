import type { ReactNode } from "react";
import { displayFont, eyebrowClass } from "./styles";

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

// A centered heading: a small colored eyebrow above a big display title.
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
    <div className="mx-auto mb-10 max-w-2xl space-y-2 text-center">
      <p className={eyebrowClass}>{eyebrow}</p>
      <Heading id={id} className={`${displayFont} text-4xl leading-none sm:text-6xl`}>
        {title}
      </Heading>
    </div>
  );
}
