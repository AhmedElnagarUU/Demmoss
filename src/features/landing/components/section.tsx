import type { ReactNode } from "react";

type Props = {
  id: string;
  title: ReactNode;
  intro?: string;
  badge?: string;
  tone?: "plain" | "soft";
  children: ReactNode;
};

export function Section({ id, title, intro, badge, tone = "plain", children }: Props) {
  return (
    <section
      aria-labelledby={id}
      className={tone === "soft" ? "border-y border-white/5 bg-white/[0.015]" : ""}
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto mb-10 flex max-w-2xl flex-col items-center text-center sm:mb-14">
          {badge ? <p className="site-badge mb-5">{badge}</p> : null}
          <h2 id={id} className="site-display text-3xl text-text sm:text-[2.6rem]">
            {title}
          </h2>
          {intro ? (
            <p className="mt-4 text-pretty text-base leading-relaxed text-muted sm:text-lg">{intro}</p>
          ) : null}
        </div>
        {children}
      </div>
    </section>
  );
}
