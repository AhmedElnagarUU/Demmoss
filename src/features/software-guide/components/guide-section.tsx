import type { ReactNode } from "react";
import { prevNext, type GuideNav } from "../guide-nav";
import type { GuideContent } from "../types";
import { GuideCallout } from "./guide-callout";
import { SectionPager } from "./section-pager";

type Props = {
  id: string;
  title: string;
  lead?: string;
  summary?: string;
  nav: GuideNav;
  menu: GuideContent["menu"];
  children: ReactNode;
};

export function GuideSection({ id, title, lead, summary, nav, menu, children }: Props) {
  const item = nav.items.find((candidate) => candidate.id === id);
  const { previous, next } = prevNext(nav.items, id);

  return (
    <section id={id} aria-labelledby={`${id}-title`} className="guide-anchor border-t border-border py-12">
      <div className="flex flex-col gap-6">
        <header className="flex flex-col gap-3">
          {item ? <p className="text-sm font-semibold text-primary">{item.groupLabel}</p> : null}
          <h2 id={`${id}-title`} className="site-display text-[clamp(1.75rem,4vw,2.25rem)] text-text">
            {title}
          </h2>
          {lead ? <p className="text-lg leading-relaxed text-muted">{lead}</p> : null}
        </header>
        {summary ? <GuideCallout label={menu.inShort} text={summary} /> : null}
        {children}
        <SectionPager previous={previous} next={next} menu={menu} />
      </div>
    </section>
  );
}
