import type { Locale } from "@/shared/i18n/config";
import { LinkButton } from "@/shared/ui/link-button";
import { landingT } from "../translate";
import { Section } from "./section";

export function GuideTeaser({ locale }: { locale: Locale }) {
  const t = landingT(locale);

  return (
    <Section id="guide-title" title={t("guide.title")} intro={t("guide.text")} tone="soft">
      <LinkButton href={`/${locale}/guide`}>{t("guide.cta")}</LinkButton>
    </Section>
  );
}
