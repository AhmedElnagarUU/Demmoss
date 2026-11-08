import type { ReactNode } from "react";
import { eyebrow as eyebrowClass, sectionTitle } from "./styles";

type Props = {
  id?: string;
  eyebrow?: string;
  title: string;
  intro?: string;
  children: ReactNode;
  level?: 1 | 2;
};

// One section of the site: eyebrow, headline, intro, content. The headline states the business result.
export function Section({ id, eyebrow, title, intro, children, level = 2 }: Props) {
  const Heading = level === 1 ? "h1" : "h2";
  return (
    <section
      id={id}
      aria-labelledby={id ? `${id}-title` : undefined}
      className="mx-auto max-w-[1200px] px-4 py-14 md:py-20"
    >
      <div className="mb-8 max-w-2xl space-y-3">
        {eyebrow ? <p className={eyebrowClass}>{eyebrow}</p> : null}
        <Heading id={id ? `${id}-title` : undefined} className={sectionTitle}>
          {title}
        </Heading>
        {intro ? <p className="text-base leading-relaxed text-muted md:text-lg">{intro}</p> : null}
      </div>
      {children}
    </section>
  );
}
