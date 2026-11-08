"use client";

import Link from "next/link";
import { useState } from "react";
import type { Locale } from "@/shared/i18n/config";
import type { FreightEstimate } from "../../../types";
import { getFreightT } from "../messages";
import { FREIGHT_ROOT } from "../slug";
import { btnOutline, btnPrimary, container, eyebrow, panel } from "./styles";
import { FreightCalculator } from "./calculator";
import { ArrowIcon } from "./icons";
import { PageHero } from "./section";
import { ContactInfo, QuoteSection } from "./quote-section";
import { QuoteForm } from "./quote-form";
import { ServiceCards } from "./sections";
import { Tracker } from "./tracker";

export function ServicesPage({ locale }: { locale: Locale }) {
  const t = getFreightT(locale);
  const root = `/${locale}${FREIGHT_ROOT}`;

  return (
    <>
      <PageHero
        eyebrow={t("services.eyebrow")}
        title={t("services.pageTitle")}
        intro={t("services.pageIntro")}
      />
      <section className="overflow-x-clip pt-[60px]">
        <div className={container}>
          <ServiceCards locale={locale} />
          <div className="mt-[60px] grid items-center gap-6 rounded-[26px] bg-(--lg-band) p-10 max-[640px]:p-6 md:grid-cols-[1fr_auto]">
            <div>
              <p className={eyebrow}>{t("calculatorSection.eyebrow")}</p>
              <h2 className="mt-2 text-[clamp(26px,3vw,36px)] font-medium leading-[1.08] tracking-[-0.025em] text-text rtl:leading-[1.3] rtl:tracking-normal">
                {t("calculatorPage.title")}
              </h2>
              <p className="mt-2 max-w-xl text-[15px] text-muted">{t("calculatorPage.intro")}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href={`${root}/calculator`} className={btnPrimary}>
                {t("header.cta")}
                <ArrowIcon className="size-[18px] rtl:rotate-180" />
              </Link>
              <Link href={`${root}/quote`} className={btnOutline}>
                {t("quote.eyebrow")}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export function CalculatorPage({ locale }: { locale: Locale }) {
  const t = getFreightT(locale);
  const [estimate, setEstimate] = useState<FreightEstimate | null>(null);

  function requestQuote(next: FreightEstimate) {
    setEstimate(next);
    requestAnimationFrame(() => {
      const target = document.getElementById("contacts");
      if (!target) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    });
  }

  return (
    <>
      <PageHero
        eyebrow={t("calculatorSection.eyebrow")}
        title={t("calculatorPage.title")}
        intro={t("calculatorPage.intro")}
      />
      <section className="overflow-x-clip pt-[60px]">
        <div className={container}>
          <FreightCalculator locale={locale} onQuote={requestQuote} onEstimateChange={setEstimate} />
        </div>
      </section>
      <QuoteSection locale={locale} estimate={estimate} />
    </>
  );
}

export function TrackPage({ locale }: { locale: Locale }) {
  const t = getFreightT(locale);

  return (
    <>
      <PageHero eyebrow={t("nav.track")} title={t("trackPage.title")} intro={t("trackPage.intro")} />
      <section className="overflow-x-clip pt-[60px]">
        <div className={container}>
          <div className={`${panel} p-6 sm:p-[34px]`}>
            <Tracker locale={locale} />
          </div>
        </div>
      </section>
    </>
  );
}

export function QuotePage({ locale }: { locale: Locale }) {
  const t = getFreightT(locale);
  const root = `/${locale}${FREIGHT_ROOT}`;

  return (
    <>
      <PageHero eyebrow={t("quote.eyebrow")} title={t("quotePage.title")} intro={t("quotePage.intro")} />
      <section className="overflow-x-clip pt-[60px]">
        <div className={`${container} grid grid-cols-[1.15fr_1fr] gap-[22px] max-[1024px]:grid-cols-1`}>
          <div className={`${panel} rounded-[28px] p-[42px] max-[640px]:px-5 max-[640px]:py-[26px]`}>
            <h2 className="mb-2 text-[28px] font-semibold tracking-[-0.02em] text-text rtl:tracking-normal">
              {t("quote.formTitle")}
            </h2>
            <p className="mb-[26px] text-[14.5px] text-muted">{t("quote.formText")}</p>
            <QuoteForm locale={locale} dashboardHref={`${root}/dashboard/quotes`} estimate={null} />
          </div>
          <ContactInfo locale={locale} />
        </div>
      </section>
    </>
  );
}
