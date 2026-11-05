import type { ReactNode } from "react";

type Props = { id: string; title: string; intro?: string; tone?: "plain" | "soft"; children: ReactNode };

export function Section({ id, title, intro, tone = "plain", children }: Props) {
  return (
    <section aria-labelledby={id} className={tone === "soft" ? "bg-surface" : ""}>
      <div className="mx-auto max-w-5xl px-4 py-12 sm:py-16">
        <h2 id={id} className="text-2xl font-bold text-text sm:text-3xl">
          {title}
        </h2>
        {intro && <p className="mt-3 max-w-2xl text-lg text-muted">{intro}</p>}
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}
