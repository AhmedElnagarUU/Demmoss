import type { ReactNode } from "react";

type Props = {
  id: string;
  title: string;
  tone?: "plain" | "soft";
  children: ReactNode;
};

export function GuideSection({ id, title, tone = "plain", children }: Props) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={`scroll-mt-16 ${tone === "soft" ? "bg-surface" : ""}`}
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-12 sm:py-16">
        <h2 id={`${id}-title`} className="text-2xl font-bold sm:text-3xl">
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
}
