import type { Locale } from "@/shared/i18n/config";
import { LinkButton } from "@/shared/ui/link-button";
import { prevNext, type GuideNav } from "../guide-nav";
import type { GuideContent } from "../types";
import { SectionPager } from "./section-pager";

type Props = {
  locale: Locale;
  content: GuideContent["hero"];
  menu: GuideContent["menu"];
  nav: GuideNav;
  readTime: string;
};

export function GuideHero({ locale, content, menu, nav, readTime }: Props) {
  const { previous, next } = prevNext(nav.items, "overview");

  return (
    <section id="overview" aria-labelledby="guide-title" className="guide-anchor pb-12 pt-8 lg:pt-12">
      <div className="flex flex-col items-start gap-6">
        <p className="site-badge">
          <span aria-hidden="true" className="size-1.5 rounded-full bg-primary" />
          {content.badge}
        </p>
        <h1 id="guide-title" className="site-display text-4xl text-text sm:text-5xl">
          {content.title}
        </h1>
        <p className="text-lg leading-relaxed text-muted">{content.subtitle}</p>
        <p className="text-sm text-muted">{readTime}</p>
        <div className="flex flex-wrap gap-3">
          <LinkButton href="#quiz" className="site-pill bg-primary text-on-primary hover:bg-primary-hover">
            {content.findCta}
          </LinkButton>
          <LinkButton href={`/${locale}/demos`} variant="secondary" className="site-pill site-btn-ghost">
            {content.demosCta}
          </LinkButton>
        </div>
        <div className="flex w-full flex-col gap-3 pt-4">
          <h2 className="text-sm font-semibold text-text">{content.groupsTitle}</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {nav.groups.map((group) => (
              <li key={group.id}>
                <a
                  href={`#${group.items[0]?.id ?? ""}`}
                  className="guide-card flex h-full min-h-11 flex-col gap-1 p-4 transition-colors hover:border-primary/40 hover:bg-primary/5 focus-visible:outline-2 focus-visible:outline-focus"
                >
                  <span className="font-semibold text-text">{group.label}</span>
                  <span className="text-sm leading-relaxed text-muted">{group.description}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full">
          <SectionPager previous={previous} next={next} menu={menu} />
        </div>
      </div>
    </section>
  );
}
