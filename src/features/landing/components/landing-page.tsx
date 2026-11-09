import type { Locale } from "@/shared/i18n/config";
import { Deliver } from "./deliver";
import { DemoHighlights } from "./demo-highlights";
import { Faq } from "./faq";
import { FinalCta } from "./final-cta";
import { GuideTeaser } from "./guide-teaser";
import { Hero } from "./hero";
import { HowWeWork } from "./how-we-work";
import { Problem } from "./problem";
import { Value } from "./value";

export function LandingPage({ locale }: { locale: Locale }) {
  return (
    <main id="main">
      <Hero locale={locale} />
      <Problem locale={locale} />
      <Value locale={locale} />
      <Deliver locale={locale} />
      <GuideTeaser locale={locale} />
      <DemoHighlights locale={locale} />
      <HowWeWork locale={locale} />
      <Faq locale={locale} />
      <FinalCta locale={locale} />
    </main>
  );
}
