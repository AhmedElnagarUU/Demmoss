import type { ReactNode } from "react";

// Building blocks of both public clinic sites (Dr. Vale look: soft grey panels, round pills, one bright accent).
// Colors come from the palette tokens. Negative letter-spacing breaks Arabic letter joining, so it is off in RTL.

export const wrap = "mx-auto w-full max-w-[1240px] px-4 sm:px-8";

const focus = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus";

export const primaryButton = `inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-[15px] font-medium text-on-primary shadow-lg shadow-primary/50 transition hover:-translate-y-0.5 hover:bg-primary-hover motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${focus}`;

export const softButton = `inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-border px-5 py-2.5 text-sm font-medium text-text transition hover:bg-border/70 ${focus}`;

export const cardClasses = "rounded-3xl bg-bg p-6 shadow-sm ring-1 ring-border";

export function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block rounded-[10px] bg-surface px-3 py-1.5 text-xs font-medium text-muted ring-1 ring-border">
      {children}
    </span>
  );
}

export function SectionTitle({
  id,
  level = 2,
  children,
  className = "",
}: {
  id?: string;
  level?: 1 | 2;
  children: ReactNode;
  className?: string;
}) {
  const Heading = level === 1 ? "h1" : "h2";
  return (
    <Heading
      id={id}
      className={`text-3xl font-medium leading-[1.1] tracking-tight sm:text-4xl rtl:leading-snug rtl:tracking-normal ${className}`}
    >
      {children}
    </Heading>
  );
}

// A centred heading block: pill, title, optional intro.
export function SectionHead({
  pill,
  title,
  titleId,
  intro,
  level = 2,
}: {
  pill: string;
  title: string;
  titleId: string;
  intro?: string;
  level?: 1 | 2;
}) {
  return (
    <div className="mx-auto mb-10 max-w-2xl space-y-4 text-center">
      <Pill>{pill}</Pill>
      <SectionTitle id={titleId} level={level}>
        {title}
      </SectionTitle>
      {intro ? <p className="text-muted">{intro}</p> : null}
    </div>
  );
}

// A rounded soft-grey panel section; plain sections just add vertical space.
export function Block({
  titleId,
  tone = "plain",
  children,
}: {
  titleId: string;
  tone?: "plain" | "soft";
  children: ReactNode;
}) {
  const inner = <div className={`${wrap} py-16 sm:py-24`}>{children}</div>;
  if (tone === "plain") return <section aria-labelledby={titleId}>{inner}</section>;
  return (
    <section aria-labelledby={titleId} className="mx-2 rounded-[30px] bg-surface sm:mx-3">
      {inner}
    </section>
  );
}

// A small dot with a soft glow: the design's list marker.
export function GlowDot() {
  return (
    <span
      aria-hidden="true"
      className="mt-2 size-2.5 shrink-0 rounded-full bg-primary shadow-[0_0_10px] shadow-primary"
    />
  );
}
