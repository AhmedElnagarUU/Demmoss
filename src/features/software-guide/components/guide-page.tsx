import type { Locale } from "@/shared/i18n/config";
import { getGuideContent } from "../guide-content";
import type { GuideType } from "../types";
import { ComparisonTable } from "./comparison-table";
import { Glossary } from "./glossary";
import { GuideCta } from "./guide-cta";
import { GuideFacts } from "./guide-facts";
import { GuideHero } from "./guide-hero";
import { HowItsBuilt } from "./how-its-built";
import { Myths } from "./myths";
import { Quiz } from "./quiz";
import { RentOrBuild } from "./rent-or-build";
import { SectionMenu } from "./section-menu";
import { TypeCards } from "./type-cards";

export function GuidePage({ locale }: { locale: Locale }) {
  const content = getGuideContent(locale);
  const typeNames = Object.fromEntries(
    content.types.items.map((type) => [type.id, type.shortName]),
  ) as Record<GuideType, string>;

  return (
    <>
      <SectionMenu content={content.menu} />
      <main id="main">
        <GuideHero locale={locale} content={content.hero} />
        <GuideFacts content={content.facts} />
        <TypeCards content={content.types} quizLink={content.quizLink} />
        <ComparisonTable content={content.comparison} quizLink={content.quizLink} />
        <RentOrBuild content={content.rentOrBuild} quizLink={content.quizLink} />
        <HowItsBuilt content={content.howBuilt} quizLink={content.quizLink} />
        <Myths content={content.myths} quizLink={content.quizLink} />
        <Quiz locale={locale} content={content.quiz} typeNames={typeNames} />
        <Glossary content={content.glossary} />
        <GuideCta locale={locale} content={content.cta} />
      </main>
    </>
  );
}
