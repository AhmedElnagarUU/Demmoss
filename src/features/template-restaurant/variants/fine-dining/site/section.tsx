import type { ReactNode } from "react";
import { Reveal } from "./reveal";
import { container, scriptFont } from "./styles";

// A full-width section band on inner pages: plain = page color, soft = the second green of the source.
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
    <section aria-labelledby={id} className={`relative ${tone === "soft" ? "bg-surface" : ""}`}>
      <div className={`${container} py-[90px] max-[640px]:py-16`}>{children}</div>
    </section>
  );
}

// The source section head (.sec-head): a centered gold script title and a short line under it.
export function SectionHeading({
  id,
  title,
  intro,
  level = 2,
}: {
  id: string;
  title: string;
  intro?: string;
  level?: 1 | 2;
}) {
  const Heading = level === 1 ? "h1" : "h2";
  return (
    <Reveal className="mb-10 text-center">
      <Heading id={id} className={`${scriptFont} text-[clamp(44px,6vw,64px)]`}>
        {title}
      </Heading>
      {intro ? <p className="mx-auto mt-2 max-w-[520px] opacity-75">{intro}</p> : null}
    </Reveal>
  );
}
