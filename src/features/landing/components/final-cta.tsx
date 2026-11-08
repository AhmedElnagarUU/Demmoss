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
    <Section id="cta-title" badge={t("cta.badge")} title={t("cta.title")} intro={t("cta.text")}>
      <div className="site-panel mx-auto flex max-w-3xl flex-col items-center gap-6 px-6 py-10 sm:px-10">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 -bottom-24 mx-auto size-64 rounded-full bg-primary/15 blur-3xl"
        />
        <div className="relative flex flex-wrap justify-center gap-3">
          <LinkButton
            href={`/${locale}/start`}
            className="site-pill gap-2 bg-primary text-on-primary hover:bg-primary-hover"
          >
            {t("cta.start")}
            <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" className="size-3.5 rtl:rotate-180">
              <path
                d="M2 8h11M9 3.5 13.5 8 9 12.5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </LinkButton>
          <TrackedWhatsAppButton
            locale={locale}
            label={common("common.whatsapp")}
            message={common("common.whatsappMessage", { brand: publicEnv.NEXT_PUBLIC_BRAND_NAME })}
            className="site-pill site-btn-ghost"
          />
        </div>
      </div>
    </Section>
  );
}
