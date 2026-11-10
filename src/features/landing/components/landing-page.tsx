import type { Locale } from "@/shared/i18n/config";
import { DashboardPreview } from "./dashboard-preview";
import { Deliver } from "./deliver";
import { DemoHighlights } from "./demo-highlights";
import { Faq } from "./faq";
import { FinalCta } from "./final-cta";
import { GuideTeaser } from "./guide-teaser";
import { Hero } from "./hero";
import { HowWeWork } from "./how-we-work";
import { Industries } from "./industries";
import { Principle } from "./principle";
import { Problem } from "./problem";
import { Statement } from "./statement";
import { Stats } from "./stats";
import { Value } from "./value";

export function LandingPage({ locale }: { locale: Locale }) {
  return (
    <main id="main">
      <Hero locale={locale} />
      <DashboardPreview locale={locale} />
      <Industries locale={locale} />
      <Statement locale={locale} />
      <Problem locale={locale} />
      <HowWeWork locale={locale} />
      <Value locale={locale} />
      <Deliver locale={locale} />
      <Stats locale={locale} />
      <GuideTeaser locale={locale} />
      <DemoHighlights locale={locale} />
      <Principle locale={locale} />
      <Faq locale={locale} />
      <FinalCta locale={locale} />
    </main>
  );
}
