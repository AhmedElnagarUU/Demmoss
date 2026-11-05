import type { Locale } from "@/shared/i18n/config";
import { LinkButton } from "@/shared/ui/link-button";
import { landingT } from "../translate";
import { Section } from "./section";

export function DemoHighlights({ locale }: { locale: Locale }) {
  const t = landingT(locale);

  return (
    <Section id="demos-title" title={t("demos.title")} intro={t("demos.text")}>
      <LinkButton href={`/${locale}/demos`} variant="secondary">
        {t("demos.cta")}
      </LinkButton>
    </Section>
  );
}
