"use client";

import Link from "next/link";
import type { Locale } from "@/shared/i18n/config";
import { QuoteForm } from "../../../components/quote-form";
import { Photo } from "../../../components/photo";
import { formatPrice } from "../../../format";
import { getLogisticsT } from "../../../messages";
import { EstimatorWidget } from "../../../modules/storage-rates/estimator-widget";
import { getWarehousingT } from "../messages";
import { warehousingPhotos } from "../photos";
import { WAREHOUSING_ROOT, WAREHOUSING_SLUG } from "../slug";
import { useWarehousingStore } from "../store";
import { Section } from "./section";
import { CaseStudyCards, QuoteBand, WarehouseCards } from "./sections";
import { blockButton, card } from "./styles";

const storageServices = ["storage", "storage_picking", "full_3pl", "returns"] as const;

export function ServicesPage({ locale }: { locale: Locale }) {
  const t = getWarehousingT(locale);
  const rates = useWarehousingStore((state) => state.storageRates);
  const currency = useWarehousingStore((state) => state.settings.currency);
  const root = `/${locale}${WAREHOUSING_ROOT}`;
  const price = (amount: number) => formatPrice(amount, currency, locale);

  return (
    <>
      <Section level={1} title={t("services.pageTitle")} intro={t("services.pageIntro")}>
        <div className="grid gap-5 md:grid-cols-2">
          <article className={`${card} space-y-3 p-6`} aria-labelledby="svc-storage">
            <div className="aspect-[3/2] overflow-hidden rounded-xl bg-bg">
              <Photo
                photo={warehousingPhotos.riyadh}
                locale={locale}
                widths={[400, 700]}
                sizes="(min-width: 768px) 50vw, 100vw"
              />
            </div>
            <h2 id="svc-storage" className="text-2xl font-extrabold">
              {t("services.storageTitle")}
            </h2>
            <p className="text-muted">{t("services.storageText")}</p>
            <p className="font-bold text-(--lg-accent)">
              {t("services.palletFrom", { price: price(rates.palletPerMonth) })}
            </p>
            <p className="text-sm text-muted">
              {t("services.minimum", { price: price(rates.minimumMonthly) })}
            </p>
          </article>
          <article className={`${card} space-y-3 p-6`} aria-labelledby="svc-fulfilment">
            <div className="aspect-[3/2] overflow-hidden rounded-xl bg-bg">
              <Photo
                photo={warehousingPhotos.docks}
                locale={locale}
                widths={[400, 700]}
                sizes="(min-width: 768px) 50vw, 100vw"
              />
            </div>
            <h2 id="svc-fulfilment" className="text-2xl font-extrabold">
              {t("services.fulfilmentTitle")}
            </h2>
            <p className="text-muted">{t("services.fulfilmentText")}</p>
            <ul className="list-disc space-y-1 ps-5">
              <li>{t("services.f1")}</li>
              <li>{t("services.f2")}</li>
              <li>{t("services.f3")}</li>
              <li>{t("services.f4")}</li>
            </ul>
            <p className="font-bold text-(--lg-accent)">
              {t("services.pickingFrom", { price: price(rates.pickingPerOrder) })}
            </p>
          </article>
        </div>
        <p className="mt-8">
          <Link href={`${root}/quote`} className={blockButton("primary")}>
            {t("services.quote")}
          </Link>
        </p>
      </Section>
      <QuoteBand locale={locale} />
    </>
  );
}

export function WarehousesPage({ locale }: { locale: Locale }) {
  const t = getWarehousingT(locale);
  return (
    <>
      <Section level={1} title={t("warehousesSection.pageTitle")} intro={t("warehousesSection.pageIntro")}>
        <WarehouseCards locale={locale} />
      </Section>
      <QuoteBand locale={locale} />
    </>
  );
}

export function CaseStudiesPage({ locale }: { locale: Locale }) {
  const t = getWarehousingT(locale);
  return (
    <>
      <Section level={1} title={t("caseStudiesSection.pageTitle")} intro={t("caseStudiesSection.pageIntro")}>
        <CaseStudyCards locale={locale} />
      </Section>
      <QuoteBand locale={locale} />
    </>
  );
}

export function QuotePage({ locale }: { locale: Locale }) {
  const t = getWarehousingT(locale);
  const shared = getLogisticsT(locale);
  const settings = useWarehousingStore((state) => state.settings);
  const dashboardHref = `/${locale}${WAREHOUSING_ROOT}/dashboard/quotes`;

  return (
    <Section level={1} title={t("quotePage.title")} intro={t("quotePage.intro")}>
      <EstimatorWidget
        store={useWarehousingStore}
        locale={locale}
        renderAction={(estimate) => (
          <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
            <section aria-labelledby="quote-form-title" className={`${card} space-y-4 p-5 sm:p-6`}>
              <h2 id="quote-form-title" className="text-2xl font-extrabold">
                {t("quotePage.formTitle")}
              </h2>
              <p className="sr-only">{shared("estimator.quoteTitle")}</p>
              <QuoteForm
                store={useWarehousingStore}
                slug={WAREHOUSING_SLUG}
                locale={locale}
                dashboardHref={dashboardHref}
                services={storageServices}
                defaultService={estimate && estimate.ordersPerMonth > 0 ? "storage_picking" : "storage"}
                estimate={estimate}
              />
            </section>
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
                  <dd>
                    {t("quotePage.hoursText", { open: settings.officeOpen, close: settings.officeClose })}
                  </dd>
                </div>
              </dl>
            </aside>
          </div>
        )}
      />
    </Section>
  );
}
