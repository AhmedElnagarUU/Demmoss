import type { ReactNode } from "react";

// The thin rule above every section: "—— 01  HOW WE WORK ————————— FOUR STEPS".
export function SectionRule({ index, label, aside }: { index?: string; label: string; aside?: string }) {
  return (
    <div className="flex items-center gap-4 text-faint">
      <span aria-hidden="true" className="h-px w-8 bg-white/15" />
      <p className="font-mono-label flex items-center gap-3 whitespace-nowrap">
        {index ? <span className="text-text">{index}</span> : null}
        <span>{label}</span>
      </p>
      <span aria-hidden="true" className="h-px flex-1 bg-white/[0.08]" />
      {aside ? <p className="font-mono-label whitespace-nowrap">{aside}</p> : null}
    </div>
  );
}

// A heading in two tones: the lead is near-white, the rest continues in grey. Text content is "lead rest".
export function TwoToneHeading({
  id,
  lead,
  rest,
  className = "",
}: {
  id?: string;
  lead: string;
  rest: string;
  className?: string;
}) {
  return (
    <h2 id={id} className={`studio-display text-text ${className}`}>
      {lead} <span className="text-muted">{rest}</span>
    </h2>
  );
}

type Props = {
  id: string;
  anchor?: string;
  index?: string;
  label: string;
  aside?: string;
  lead: string;
  rest: string;
  intro?: ReactNode;
  children: ReactNode;
};

export function Section({ id, anchor, index, label, aside, lead, rest, intro, children }: Props) {
  return (
    <section id={anchor} aria-labelledby={id} className="scroll-mt-20">
      <div className="mx-auto max-w-[1320px] px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
        <SectionRule index={index} label={label} aside={aside} />
        <div className="mt-10 grid items-end gap-6 sm:mt-14 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-16">
          <TwoToneHeading id={id} lead={lead} rest={rest} className="text-[clamp(2.25rem,5vw,4.4rem)]" />
          {intro ? (
            <div className="max-w-md pb-2 text-sm leading-relaxed text-muted lg:justify-self-end">
              {intro}
            </div>
          ) : null}
        </div>
        <div className="mt-10 sm:mt-14">{children}</div>
      </div>
    </section>
  );
}
