"use client";

import Link from "next/link";
import { formatNumber } from "@/features/demo-engine/format/format";
import { useClinic } from "../../../context";
import { formatPrice } from "../../../format";
import { getClinicT } from "../../../messages";
import { Block, GlowDot, primaryButton, SectionHead, wrap } from "../../../site/site-ui";
import { TreatmentVisual } from "../../../site/treatment-visual";
import { getSpecialistT } from "../messages";

// Treatments: one section per treatment (who it is for, steps, time, price), so a patient can decide without calling.
export function TreatmentsPage() {
  const { store, config, locale } = useClinic();
  const t = getClinicT(locale);
  const st = getSpecialistT(locale);
  const treatments = store((state) => state.treatments);
  const root = `/${locale}${config.basePath}`;

  return (
    <>
      <div className={`${wrap} pt-12`}>
        <SectionHead level={1} pill={st("nav.treatments")} title={st("treatments.title")} titleId="treatments-title" intro={st("treatments.intro")} />
      </div>
      {treatments.map((treatment, index) => (
        <Block key={treatment.id} titleId={`treatment-${treatment.id}`} tone={index % 2 === 0 ? "soft" : "plain"}>
          <div id={treatment.id} className="grid scroll-mt-24 items-center gap-8 md:grid-cols-2">
            <div className={`aspect-[3/2] overflow-hidden rounded-[30px] bg-bg ${index % 2 === 1 ? "md:order-2" : ""}`}>
              <TreatmentVisual treatment={treatment} photos={config.photos} locale={locale} sizes="(min-width: 768px) 560px, 100vw" />
            </div>
            <div className="space-y-4">
              <h2 id={`treatment-${treatment.id}`} className="text-3xl font-medium rtl:leading-snug">
                {treatment.name[locale]}
              </h2>
              <p className="text-sm font-semibold uppercase text-muted rtl:normal-case">{st("treatments.forWhom")}</p>
              <p>{treatment.description[locale]}</p>
              {treatment.steps.length > 0 ? (
                <>
                  <p className="text-sm font-semibold uppercase text-muted rtl:normal-case">{st("treatments.steps")}</p>
                  <ol className="space-y-2">
                    {treatment.steps.map((step) => (
                      <li key={step.en} className="flex items-start gap-3">
                        <GlowDot />
                        <span>{step[locale]}</span>
                      </li>
                    ))}
                  </ol>
                </>
              ) : null}
              <p className="text-muted">
                {st("treatments.duration")}: {t("common.minutes", { minutes: formatNumber(treatment.durationMinutes, locale) })}
              </p>
              <p className="text-xl font-medium text-(--cl-accent)">
                {st("treatments.price")}: {treatment.fromPrice ? `${t("common.from")} ` : ""}
                {formatPrice(treatment.price, locale)}
              </p>
              <Link href={`${root}/book?treatment=${treatment.id}`} className={primaryButton}>
                {st("treatments.book")}
              </Link>
            </div>
          </div>
        </Block>
      ))}
    </>
  );
}
