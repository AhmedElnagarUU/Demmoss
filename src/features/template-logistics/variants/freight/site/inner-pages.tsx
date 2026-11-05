"use client";

import type { Locale } from "@/shared/i18n/config";
import { QuoteForm } from "../../../components/quote-form";
import { getLogisticsT } from "../../../messages";
import { CalculatorWidget } from "../../../modules/rates/calculator-widget";
import { Tracker } from "../../../modules/shipments/tracker";
import { getFreightT } from "../messages";
import { FREIGHT_ROOT, FREIGHT_SLUG } from "../slug";
import { useFreightStore } from "../store";
import { Section } from "./section";
import { QuoteBand, ServiceCards } from "./sections";
import { card } from "./styles";

const allServices = ["air", "sea", "road", "rail", "customs", "not_sure"] as const;

export function ServicesPage({ locale }: { locale: Locale }) {
  const t = getFreightT(locale);
  return (
    <>
      <Section level={1} title={t("services.pageTitle")} intro={t("services.pageIntro")}>
        <ServiceCards locale={locale} />
      </Section>
      <QuoteBand locale={locale} />
    </>
  );
}

export function CalculatorPage({ locale }: { locale: Locale }) {
  const t = getFreightT(locale);
  const shared = getLogisticsT(locale);
  const dashboardHref = `/${locale}${FREIGHT_ROOT}/dashboard/quotes`;
  return (
    <Section level={1} title={t("calculatorPage.title")} intro={t("calculatorPage.intro")}>
      <CalculatorWidget
        store={useFreightStore}
        locale={locale}
        renderAction={(estimate) => (
          <section aria-labelledby="calc-quote-title" className={`${card} space-y-4 p-5 sm:p-6`}>
            <h2 id="calc-quote-title" className="text-2xl font-extrabold">
              {shared("calculator.quoteTitle")}
            </h2>
            <QuoteForm
              store={useFreightStore}
              slug={FREIGHT_SLUG}
              locale={locale}
              dashboardHref={dashboardHref}
              services={allServices}
              defaultService={estimate ? estimate.mode : "not_sure"}
              estimate={estimate}
            />
          </section>
        )}
      />
    </Section>
  );
}

export function TrackPage({ locale }: { locale: Locale }) {
  const t = getFreightT(locale);
  return (
    <Section level={1} title={t("trackerSection.pageTitle")} intro={t("trackerSection.pageIntro")}>
      <Tracker store={useFreightStore} slug={FREIGHT_SLUG} locale={locale} />
    </Section>
  );
}

export function QuotePage({ locale }: { locale: Locale }) {
  const t = getFreightT(locale);
  const settings = useFreightStore((state) => state.settings);
  const dashboardHref = `/${locale}${FREIGHT_ROOT}/dashboard/quotes`;
  return (
    <Section level={1} title={t("quotePage.title")} intro={t("quotePage.intro")}>
      <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
        <div className={`${card} p-5 sm:p-6`}>
          <QuoteForm
            store={useFreightStore}
            slug={FREIGHT_SLUG}
            locale={locale}
            dashboardHref={dashboardHref}
            services={allServices}
            defaultService="not_sure"
            estimate={null}
          />
        </div>
        <aside className={`${card} space-y-3 p-5`}>
          <h2 className="text-xl font-extrabold">{t("quotePage.contact")}</h2>
          <dl className="space-y-2">
            <div>
              <dt className="text-sm font-semibold text-muted">{t("quotePage.phone")}</dt>
              <dd dir="ltr" className="text-start">
                {settings.phone}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-muted">{t("quotePage.address")}</dt>
              <dd>{settings.address[locale]}</dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-muted">{t("quotePage.hours")}</dt>
              <dd>{t("quotePage.hoursText", { open: settings.officeOpen, close: settings.officeClose })}</dd>
            </div>
          </dl>
        </aside>
      </div>
    </Section>
  );
}
