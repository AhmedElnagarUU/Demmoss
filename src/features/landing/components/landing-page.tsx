import type { Locale } from "@/shared/i18n/config";
import { Deliver } from "./deliver";
import { DemoHighlights } from "./demo-highlights";
import { FinalCta } from "./final-cta";
import { GuideTeaser } from "./guide-teaser";
import { Hero } from "./hero";
import { HowWeWork } from "./how-we-work";
import { Value } from "./value";

export function LandingPage({ locale }: { locale: Locale }) {
  return (
    <main id="main">
      <Hero locale={locale} />
      <Value locale={locale} />
      <Deliver locale={locale} />
      <GuideTeaser locale={locale} />
      <DemoHighlights locale={locale} />
      <HowWeWork locale={locale} />
      <FinalCta locale={locale} />
    </main>
  );
}
