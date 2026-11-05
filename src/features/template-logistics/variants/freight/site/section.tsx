import type { ReactNode } from "react";

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
      className="mx-auto max-w-6xl px-4 py-12 md:py-16"
    >
      <div className="mb-8 max-w-2xl space-y-2">
        {eyebrow ? (
          <p className="text-sm font-bold uppercase tracking-wide text-(--lg-accent)">{eyebrow}</p>
        ) : null}
        <Heading
          id={id ? `${id}-title` : undefined}
          className="text-3xl font-extrabold tracking-tight md:text-4xl"
        >
          {title}
        </Heading>
        {intro ? <p className="text-lg text-muted">{intro}</p> : null}
      </div>
      {children}
    </section>
  );
}
