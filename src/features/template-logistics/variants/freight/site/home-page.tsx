"use client";

import Link from "next/link";
import type { Locale } from "@/shared/i18n/config";
import { Photo } from "@/features/demo-engine/photo/photo";
import { CalculatorWidget } from "../../../modules/rates/calculator-widget";
import { Tracker } from "../../../modules/shipments/tracker";
import { getFreightT } from "../messages";
import { freightPhotos } from "../photos";
import { FREIGHT_ROOT, FREIGHT_SLUG } from "../slug";
import { useFreightStore } from "../store";
import { Section } from "./section";
import {
  FaqSection,
  PricingSection,
  QuoteBand,
  RoutesSection,
  ServiceCards,
  TestimonialsSection,
} from "./sections";
import { card, pillButton } from "./styles";

const trustKeys = ["insured", "fast", "customs", "manager"] as const;
const statKeys = ["years", "clients", "countries", "ontime"] as const;
const stepKeys = ["s1", "s2", "s3", "s4", "s5"] as const;

export function HomePage({ locale }: { locale: Locale }) {
  const t = getFreightT(locale);
  const content = useFreightStore((state) => state.content);
  const root = `/${locale}${FREIGHT_ROOT}`;

  return (
    <>
      <section
        aria-labelledby="hero-title"
        className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-10 md:grid-cols-2 md:py-16"
      >
        <div className="space-y-5">
          <p className="text-sm font-bold uppercase tracking-wide text-(--lg-accent)">{t("hero.eyebrow")}</p>
          <h1 id="hero-title" className="text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">
            {content.hero.title[locale]}
          </h1>
          <p className="text-lg text-muted">{content.hero.subtitle[locale]}</p>
          <div className="flex flex-wrap gap-3">
            <Link href={`${root}/calculator`} className={pillButton("primary")}>
              {t("hero.calculate")}
            </Link>
            <Link href={`${root}/track`} className={pillButton("outline")}>
              {t("hero.track")}
            </Link>
          </div>
          <ul className="grid gap-2 pt-2 sm:grid-cols-2">
            {trustKeys.map((key) => (
              <li key={key} className="flex items-start gap-2 font-semibold">
                <span aria-hidden="true" className="text-(--lg-accent)">
                  ✓
                </span>
                {t(`hero.${key}`)}
              </li>
            ))}
          </ul>
        </div>
        <div className="grid grid-cols-3 grid-rows-2 gap-3">
          <div className="col-span-3 aspect-[16/9] overflow-hidden rounded-[22px] bg-surface">
            <Photo
              photo={freightPhotos.airplane}
              locale={locale}
              priority
              widths={[480, 800, 1200]}
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </div>
          <div className="col-span-2 aspect-[16/9] overflow-hidden rounded-[22px] bg-surface">
            <Photo
              photo={freightPhotos.ship}
              locale={locale}
              widths={[320, 640]}
              sizes="(min-width: 768px) 33vw, 66vw"
            />
          </div>
          <div className="aspect-square overflow-hidden rounded-[22px] bg-surface">
            <Photo photo={freightPhotos.port} locale={locale} widths={[200, 400]} sizes="25vw" />
          </div>
        </div>
      </section>

      <section aria-label={t("hero.eyebrow")} className="mx-auto max-w-6xl px-4">
        <dl className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {statKeys.map((key) => (
            <div key={key} className={`${card} p-5`}>
              <dt className="order-2 text-muted">{t(`stats.${key}.label`)}</dt>
              <dd className="text-3xl font-extrabold">{t(`stats.${key}.value`)}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section
        aria-labelledby="about-title"
        className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-12 md:grid-cols-2 md:py-16"
      >
        <div className="aspect-[3/2] overflow-hidden rounded-[22px] bg-surface">
          <Photo
            photo={freightPhotos.warehouse}
            locale={locale}
            widths={[480, 800]}
            sizes="(min-width: 768px) 50vw, 100vw"
          />
        </div>
        <div className="space-y-4">
          <p className="text-sm font-bold uppercase tracking-wide text-(--lg-accent)">{t("about.eyebrow")}</p>
          <h2 id="about-title" className="text-3xl font-extrabold tracking-tight md:text-4xl">
            {content.about.title[locale]}
          </h2>
          <p className="text-lg text-muted">{content.about.text[locale]}</p>
          <Link href={`${root}/services`} className={pillButton("outline")}>
            {t("about.link")}
          </Link>
        </div>
      </section>

      <Section id="services" eyebrow={t("services.eyebrow")} title={t("services.title")}>
        <ServiceCards locale={locale} />
      </Section>

      <Section
        id="calculator"
        eyebrow={t("calculatorSection.eyebrow")}
        title={t("calculatorSection.title")}
        intro={t("calculatorSection.text")}
      >
        <CalculatorWidget
          store={useFreightStore}
          locale={locale}
          renderAction={() => (
            <Link href={`${root}/calculator`} className={pillButton("primary")}>
              {t("calculatorSection.open")}
            </Link>
          )}
        />
      </Section>

      <Section id="steps" eyebrow={t("steps.eyebrow")} title={t("steps.title")}>
        <ol className="grid gap-4 md:grid-cols-5">
          {stepKeys.map((key, index) => (
            <li key={key} className={`${card} space-y-2 p-5`}>
              <p aria-hidden="true" className="text-3xl font-extrabold text-(--lg-accent)">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="text-lg font-extrabold">{t(`steps.${key}.title`)}</h3>
              <p className="text-muted">{t(`steps.${key}.text`)}</p>
            </li>
          ))}
        </ol>
      </Section>

      <RoutesSection locale={locale} />

      <Section
        id="tracking"
        eyebrow={t("trackerSection.eyebrow")}
        title={t("trackerSection.title")}
        intro={t("trackerSection.text")}
      >
        <Tracker store={useFreightStore} slug={FREIGHT_SLUG} locale={locale} />
      </Section>

      <PricingSection locale={locale} />
      <TestimonialsSection locale={locale} />
      <FaqSection locale={locale} />
      <QuoteBand locale={locale} />
    </>
  );
}
