"use client";

import Link from "next/link";
import type { Locale } from "@/shared/i18n/config";
import { Photo } from "@/features/demo-engine/photo/photo";
import { EstimatorWidget } from "../../../modules/storage-rates/estimator-widget";
import { getWarehousingT } from "../messages";
import { warehousingPhotos } from "../photos";
import { WAREHOUSING_ROOT } from "../slug";
import { useWarehousingStore } from "../store";
import { Section } from "./section";
import { CaseStudyCards, FaqSection, QuoteBand, TestimonialsSection, WarehouseCards } from "./sections";
import { blockButton, card } from "./styles";

const storagePoints = ["p1", "p2", "p3", "p4"] as const;
const extras = ["extra1", "extra2", "extra3", "extra4", "extra5"] as const;
const processSteps = ["s1", "s2", "s3", "s4"] as const;
const statKeys = ["accuracy", "support", "space", "clients"] as const;

export function HomePage({ locale }: { locale: Locale }) {
  const t = getWarehousingT(locale);
  const content = useWarehousingStore((state) => state.content);
  const root = `/${locale}${WAREHOUSING_ROOT}`;

  return (
    <>
      <section
        aria-labelledby="hero-title"
        className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-10 md:grid-cols-2 md:py-16"
      >
        <div className="space-y-5">
          <h1 id="hero-title" className="text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">
            {content.hero.title[locale]}
          </h1>
          <p className="text-lg text-muted">{content.hero.subtitle[locale]}</p>
          <div className="flex flex-wrap gap-3">
            <Link href={`${root}/quote`} className={blockButton("primary")}>
              {t("hero.cta")}
            </Link>
            <a href="#estimator" className={blockButton("outline")}>
              {t("hero.estimate")}
            </a>
          </div>
          <dl className="grid grid-cols-2 gap-3 pt-2">
            <div className={`${card} p-4`}>
              <dt className="order-2 text-sm text-muted">{t("hero.sitesText")}</dt>
              <dd className="text-2xl font-extrabold">{t("hero.sites")}</dd>
            </div>
            <div className={`${card} p-4`}>
              <dt className="order-2 text-sm text-muted">{t("hero.yearsText")}</dt>
              <dd className="text-2xl font-extrabold">{t("hero.years")}</dd>
            </div>
          </dl>
        </div>
        <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-surface">
          <Photo
            photo={warehousingPhotos.exterior}
            locale={locale}
            priority
            widths={[480, 800, 1200]}
            sizes="(min-width: 768px) 50vw, 100vw"
          />
        </div>
      </section>

      <section aria-label={t("standards.title")} className="bg-text text-bg">
        <p className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-1 px-4 py-4 font-bold">
          <span>{t("standards.title")}</span>
          <span dir="ltr">{t("standards.list")}</span>
        </p>
      </section>

      <Section id="storage" eyebrow={t("storage.eyebrow")} title={t("storage.title")}>
        <div className="grid items-start gap-8 md:grid-cols-2">
          <div className="space-y-5">
            <ul className="space-y-3">
              {storagePoints.map((key) => (
                <li key={key} className="flex items-start gap-3 text-lg font-semibold">
                  <span aria-hidden="true" className="mt-1 inline-block size-3 shrink-0 bg-primary" />
                  {t(`storage.${key}`)}
                </li>
              ))}
            </ul>
            <p className="text-muted">{t("storage.appointment")}</p>
            <div>
              <p className="font-bold">{t("storage.extras")}</p>
              <ul className="mt-2 flex flex-wrap gap-2">
                {extras.map((key) => (
                  <li
                    key={key}
                    className="rounded-full border border-border bg-surface px-3 py-1 text-sm font-semibold"
                  >
                    {t(`storage.${key}`)}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="aspect-[3/2] overflow-hidden rounded-2xl bg-surface">
            <Photo
              photo={warehousingPhotos.boxes}
              locale={locale}
              widths={[400, 700]}
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </div>
        </div>
      </Section>

      <section aria-labelledby="process-title" className="bg-surface">
        <div className="mx-auto grid max-w-6xl items-start gap-8 px-4 py-12 md:grid-cols-2 md:py-16">
          <div className="aspect-[3/2] overflow-hidden rounded-2xl bg-bg">
            <Photo
              photo={warehousingPhotos.docks}
              locale={locale}
              widths={[480, 800]}
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </div>
          <div className="space-y-4">
            <p className="inline-block border-s-4 border-primary ps-2 text-sm font-bold uppercase tracking-wide text-(--lg-accent)">
              {t("process.eyebrow")}
            </p>
            <h2 id="process-title" className="text-3xl font-extrabold tracking-tight md:text-4xl">
              {t("process.title")}
            </h2>
            <p className="text-lg text-muted">{t("process.intro")}</p>
            <ol className="space-y-3">
              {processSteps.map((key, index) => (
                <li key={key} className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="flex size-8 shrink-0 items-center justify-center bg-primary font-bold text-on-primary"
                  >
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="font-extrabold">{t(`process.${key}.title`)}</h3>
                    <p className="text-muted">{t(`process.${key}.text`)}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section aria-label={t("hero.yearsText")} className="mx-auto max-w-6xl px-4 py-12">
        <dl className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {statKeys.map((key) => (
            <div key={key} className={`${card} p-5`}>
              <dt className="order-2 text-muted">{t(`stats.${key}.label`)}</dt>
              <dd className="text-3xl font-extrabold">{t(`stats.${key}.value`)}</dd>
            </div>
          ))}
        </dl>
      </section>

      <Section
        id="estimator"
        eyebrow={t("estimatorSection.eyebrow")}
        title={t("estimatorSection.title")}
        intro={t("estimatorSection.text")}
      >
        <EstimatorWidget
          store={useWarehousingStore}
          locale={locale}
          renderAction={() => (
            <Link href={`${root}/quote`} className={blockButton("primary")}>
              {t("estimatorSection.open")}
            </Link>
          )}
        />
      </Section>

      <Section id="warehouses" eyebrow={t("warehousesSection.eyebrow")} title={t("warehousesSection.title")}>
        <WarehouseCards locale={locale} />
        <p className="mt-6">
          <Link href={`${root}/warehouses`} className={blockButton("outline")}>
            {t("warehousesSection.all")}
          </Link>
        </p>
      </Section>

      <Section id="cases" eyebrow={t("caseStudiesSection.eyebrow")} title={t("caseStudiesSection.title")}>
        <CaseStudyCards locale={locale} limit={3} />
      </Section>

      <TestimonialsSection locale={locale} />
      <FaqSection locale={locale} />
      <QuoteBand locale={locale} />
    </>
  );
}
