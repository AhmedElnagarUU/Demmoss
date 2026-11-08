import type { Locale } from "@/shared/i18n/config";
import { getGuideContent } from "../guide-content";
import { buildGuideNav } from "../guide-nav";
import { readingMinutes } from "../reading-time";
import type { GuideType } from "../types";
import { ComparisonTable } from "./comparison-table";
import { Glossary } from "./glossary";
import { GuideCta } from "./guide-cta";
import { GuideFacts } from "./guide-facts";
import { GuideHero } from "./guide-hero";
import { GuideMobileNav } from "./guide-mobile-nav";
import { GuideSection } from "./guide-section";
import { GuideSidebar } from "./guide-sidebar";
import { HowItsBuilt } from "./how-its-built";
import { Myths } from "./myths";
import { OnThisPage } from "./on-this-page";
import { Quiz } from "./quiz";
import { RentOrBuild } from "./rent-or-build";
import { TypeCards } from "./type-cards";

export function GuidePage({ locale }: { locale: Locale }) {
  const content = getGuideContent(locale);
  const nav = buildGuideNav(content);
  const typeNames = Object.fromEntries(
    content.types.items.map((type) => [type.id, type.shortName]),
  ) as Record<GuideType, string>;
  const minutes = new Intl.NumberFormat(locale).format(readingMinutes(content));
  const readTime = content.hero.readTime.replace("{minutes}", minutes);
  const startHref = `/${locale}/start`;
  const { menu } = content;
  const section = { nav, menu };

  return (
    <div className="guide-docs">
      <GuideMobileNav nav={nav} menu={menu} startHref={startHref} startLabel={content.cta.startProject} />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:grid lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-10 xl:grid-cols-[260px_minmax(0,1fr)_220px]">
        <GuideSidebar nav={nav} menu={menu} startHref={startHref} startLabel={content.cta.startProject} />
        <main id="main" className="mx-auto w-full min-w-0 max-w-3xl">
          <GuideHero locale={locale} content={content.hero} menu={menu} nav={nav} readTime={readTime} />
          <GuideSection id="why" title={content.facts.title} {...section}>
            <GuideFacts content={content.facts} />
          </GuideSection>
          <GuideSection
            id="types"
            title={content.types.title}
            lead={content.types.intro}
            summary={content.types.summary}
            {...section}
          >
            <TypeCards content={content.types} quizLink={content.quizLink} />
          </GuideSection>
          <GuideSection
            id="compare"
            title={content.comparison.title}
            summary={content.comparison.summary}
            {...section}
          >
            <ComparisonTable content={content.comparison} quizLink={content.quizLink} />
          </GuideSection>
          <GuideSection id="how-built" title={content.howBuilt.title} {...section}>
            <HowItsBuilt content={content.howBuilt} quizLink={content.quizLink} />
          </GuideSection>
          <GuideSection
            id="rent-or-build"
            title={content.rentOrBuild.title}
            lead={content.rentOrBuild.text}
            summary={content.rentOrBuild.summary}
            {...section}
          >
            <RentOrBuild content={content.rentOrBuild} quizLink={content.quizLink} />
          </GuideSection>
          <GuideSection id="myths" title={content.myths.title} summary={content.myths.summary} {...section}>
            <Myths content={content.myths} quizLink={content.quizLink} />
          </GuideSection>
          <GuideSection id="quiz" title={content.quiz.title} lead={content.quiz.intro} {...section}>
            <Quiz locale={locale} content={content.quiz} typeNames={typeNames} />
          </GuideSection>
          <GuideSection id="glossary" title={content.glossary.title} {...section}>
            <Glossary content={content.glossary} />
          </GuideSection>
          <GuideCta locale={locale} content={content.cta} />
        </main>
        <OnThisPage nav={nav} menu={menu} />
      </div>
    </div>
  );
}
