import type { ReactNode } from "react";
import type { Locale } from "@/shared/i18n/config";
import { displayFont, scriptAccent } from "./styles";

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
      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-24">{children}</div>
    </section>
  );
}

// A centered heading: a script accent (the eyebrow), the title, and a thin gold rule.
export function SectionHeading({
  id,
  locale,
  eyebrow,
  title,
  level = 2,
}: {
  id: string;
  locale: Locale;
  eyebrow: string;
  title: string;
  level?: 1 | 2;
}) {
  const Heading = level === 1 ? "h1" : "h2";
  return (
    <div className="mx-auto mb-10 max-w-2xl space-y-2 text-center">
      <p className={scriptAccent(locale)}>{eyebrow}</p>
      <Heading id={id} className={`${displayFont} text-3xl font-semibold leading-tight sm:text-5xl`}>
        {title}
      </Heading>
      <div aria-hidden="true" className="mx-auto h-px w-16 bg-(--fd-accent)" />
    </div>
  );
}
