import Link from "next/link";
import { TrackedWhatsAppButton } from "@/features/tracking/components/tracked-whatsapp-button";
import { publicEnv } from "@/shared/env";
import type { Locale } from "@/shared/i18n/config";
import { getT } from "@/shared/i18n/t";
import { landingT } from "../translate";
import { ArrowRightIcon } from "./icons";
import { SectionRule, TwoToneHeading } from "./section";

export function FinalCta({ locale }: { locale: Locale }) {
  const t = landingT(locale);
  const common = getT(locale);

  return (
    <section
      aria-labelledby="cta-title"
      className="mx-auto max-w-[1320px] px-5 py-12 sm:px-8 sm:py-16 lg:px-12"
    >
      <div className="studio-card rounded-[1.75rem] px-6 pb-20 pt-8 sm:px-12 sm:pb-28 sm:pt-12">
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-3/4">
          <div className="absolute inset-x-[10%] top-[10%] bottom-[-60%] rounded-full border border-white/[0.08]" />
          <div className="absolute inset-x-[24%] top-[38%] bottom-[-80%] rounded-full border border-white/[0.07]" />
          <div className="absolute inset-x-[20%] bottom-0 h-1/2 bg-[radial-gradient(ellipse_at_50%_100%,var(--color-site-glow),transparent_70%)]" />
        </div>

        <div className="relative">
          <SectionRule label={t("cta.badge")} aside={t("cta.aside")} />
          <div className="mx-auto mt-14 flex max-w-3xl flex-col items-center text-center sm:mt-20">
            <TwoToneHeading
              id="cta-title"
              lead={t("cta.titleLead")}
              rest={t("cta.titleRest")}
              className="text-[clamp(2.2rem,5.4vw,4.6rem)]"
            />
            <p className="mt-6 max-w-lg text-sm leading-relaxed text-muted">{t("cta.text")}</p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Link
                href={`/${locale}/start`}
                className="studio-pill-primary min-h-[3.25rem] px-7 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus"
              >
                {t("cta.start")}
                <ArrowRightIcon className="size-4" />
              </Link>
              <Link
                href={`/${locale}/demos`}
                className="studio-pill min-h-[3.25rem] px-7 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus"
              >
                {t("cta.demos")}
              </Link>
              <TrackedWhatsAppButton
                locale={locale}
                label={common("common.whatsapp")}
                message={common("common.whatsappMessage", { brand: publicEnv.NEXT_PUBLIC_BRAND_NAME })}
                className="studio-pill min-h-[3.25rem] px-7"
              />
            </div>
            <p className="font-mono-label mt-8 text-faint">{t("cta.finePrint")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
