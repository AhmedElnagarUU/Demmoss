import { TrackedWhatsAppButton } from "@/features/tracking/components/tracked-whatsapp-button";
import { publicEnv } from "@/shared/env";
import type { Locale } from "@/shared/i18n/config";
import { getT } from "@/shared/i18n/t";
import { LinkButton } from "@/shared/ui/link-button";
import { landingT } from "../translate";
import { Section } from "./section";

export function FinalCta({ locale }: { locale: Locale }) {
  const t = landingT(locale);
  const common = getT(locale);

  return (
    <Section id="cta-title" title={t("cta.title")} intro={t("cta.text")}>
      <div className="flex flex-wrap gap-3">
        <LinkButton href={`/${locale}/start`}>{t("cta.start")}</LinkButton>
        <TrackedWhatsAppButton
          locale={locale}
          label={common("common.whatsapp")}
          message={common("common.whatsappMessage", { brand: publicEnv.NEXT_PUBLIC_BRAND_NAME })}
        />
      </div>
    </Section>
  );
}
