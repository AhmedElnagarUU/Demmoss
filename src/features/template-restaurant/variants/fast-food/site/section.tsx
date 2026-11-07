import type { ReactNode } from "react";
import { Reveal } from "./reveal";
import { container, eyebrowClass, serifFont } from "./styles";

type Tone = "plain" | "white" | "soft" | "band";

// A full-width section band: plain = page background, white = the white menu band,
// soft/band = the tinted section color (the source's reviews band).
export function Section({ id, tone = "plain", children }: { id?: string; tone?: Tone; children: ReactNode }) {
  const background =
    tone === "white" ? "bg-surface" : tone === "soft" || tone === "band" ? "bg-(--sl-band)" : "";
  return (
    <section aria-labelledby={id} className={background}>
      <div className={`${container} py-20 max-sm:py-14`}>{children}</div>
    </section>
  );
}

// The small red label with a 30x2 red rule on each side (one-sided in the about section, like the source).
export function Eyebrow({ children, startRule = true }: { children: ReactNode; startRule?: boolean }) {
  return (
    <span className={`${eyebrowClass} inline-flex items-center gap-3`}>
      {startRule ? <i aria-hidden="true" className="h-[2px] w-[30px] bg-primary" /> : null}
      {children}
      <i aria-hidden="true" className="h-[2px] w-[30px] bg-primary" />
    </span>
  );
}

// A centered heading: eyebrow rules, then the Lora 600 / Lalezar title (clamp like the source h2).
export function SectionHeading({
  id,
  eyebrow,
  title,
  level = 2,
  startRule = true,
}: {
  id: string;
  eyebrow: string;
  title: string;
  level?: 1 | 2;
  startRule?: boolean;
}) {
  const Heading = level === 1 ? "h1" : "h2";
  return (
    <Reveal className="mb-[44px] text-center">
      <Eyebrow startRule={startRule}>{eyebrow}</Eyebrow>
      <Heading id={id} className={`${serifFont} mt-1.5 text-[clamp(30px,4vw,44px)] leading-[1.2]`}>
        {title}
      </Heading>
    </Reveal>
  );
}
