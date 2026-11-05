"use client";

import Link from "next/link";
import { useState } from "react";
import { formatDateKey, formatNumber, formatTime } from "@/features/demo-engine/format/format";
import { nextFreeSlot } from "../../../booking";
import { useClinic } from "../../../context";
import { formatPrice } from "../../../format";
import { getClinicT } from "../../../messages";
import { BeforeAfter } from "../../../site/before-after";
import { BookingForm } from "../../../site/booking-form";
import { findPhoto, SitePhoto } from "../../../site/photo";
import { FaqList, HoursList, PriceTable, Stat, StickyCta, TestimonialCards } from "../../../site/site-parts";
import {
  Block,
  cardClasses,
  GlowDot,
  Pill,
  primaryButton,
  SectionHead,
  SectionTitle,
  softButton,
  wrap,
} from "../../../site/site-ui";
import { TreatmentVisual } from "../../../site/treatment-visual";
import { getSpecialistT } from "../messages";

const techniques = ["immediate", "guided", "allon4", "zygomatic"] as const;
const reasons = ["p1", "p2", "p3", "p4"] as const;

// Home: the whole story on one page, from trust (hero, techniques, results) to action (prices, booking).
export function HomePage() {
  const { store, config, locale } = useClinic();
  const t = getClinicT(locale);
  const st = getSpecialistT(locale);
  const content = store((state) => state.content);
  const settings = store((state) => state.settings);
  const doctor = store((state) => state.doctors[0]);
  const treatments = store((state) => state.treatments);
  const appointments = store((state) => state.appointments);
  const results = store((state) => state.results.filter((item) => item.visible));
  const faqs = store((state) => state.faqs);
  const testimonials = store((state) => state.testimonials.filter((item) => item.visible));
  const [now] = useState(() => new Date());
  const [technique, setTechnique] = useState<(typeof techniques)[number]>("immediate");
  const root = `/${locale}${config.basePath}`;
  const next = doctor ? nextFreeSlot(doctor, appointments, now) : null;

  return (
    <>
      <section id="hero" className={`${wrap} grid items-center gap-10 py-10 lg:grid-cols-2 lg:py-16`}>
        <div className="space-y-6">
          <Pill>{st("home.hero.pill")}</Pill>
          <h1 className="text-4xl font-medium leading-[1.05] tracking-tight sm:text-6xl rtl:leading-snug rtl:tracking-normal">
            {content.hero.title[locale]}
          </h1>
          <p className="max-w-xl text-lg text-muted">{content.hero.subtitle[locale]}</p>
          <div className="flex flex-wrap gap-3">
            <Link href={`${root}/book`} className={primaryButton}>
              {st("home.hero.book")}
            </Link>
            <Link href={`${root}/prices`} className={softButton}>
              {st("home.hero.prices")}
            </Link>
          </div>
          <div className="flex flex-wrap gap-10 pt-4">
            {doctor ? (
              <Stat value={formatNumber(doctor.years, locale)} label={st("home.hero.years")} />
            ) : null}
            <Stat value={formatNumber(treatments.length, locale)} label={st("home.hero.treatments")} />
          </div>
        </div>
        <div className="relative">
          <div className="aspect-[4/5] overflow-hidden rounded-[30px] bg-surface">
            <SitePhoto
              photo={findPhoto(config.photos, doctor?.photo)}
              locale={locale}
              priority
              sizes="(min-width: 1024px) 560px, 100vw"
            />
          </div>
          <div className="absolute bottom-4 start-4 end-4 rounded-3xl bg-text/90 p-4 text-bg backdrop-blur sm:end-auto sm:min-w-64">
            <p className="text-xs text-bg/80">{st("home.hero.nextFree")}</p>
            <p className="text-lg font-medium">
              {next
                ? `${formatDateKey(next.dateKey, locale)} · ${formatTime(next.time, locale)}`
                : st("home.hero.nextFreeNone")}
            </p>
          </div>
        </div>
      </section>

      <Block titleId="services-title" tone="soft">
        <SectionHead
          pill={st("home.services.pill")}
          title={st("home.services.title")}
          titleId="services-title"
        />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {treatments.map((treatment) => (
            <li key={treatment.id}>
              <Link
                href={`${root}/treatments#${treatment.id}`}
                className="group block overflow-hidden rounded-3xl bg-bg ring-1 ring-border focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
              >
                <div className="aspect-[3/2] overflow-hidden">
                  <TreatmentVisual
                    treatment={treatment}
                    photos={config.photos}
                    locale={locale}
                    sizes="(min-width: 1024px) 380px, 100vw"
                  />
                </div>
                <div className="flex items-center justify-between gap-3 p-5">
                  <div>
                    <p className="text-lg font-medium">{treatment.name[locale]}</p>
                    <p className="text-sm text-muted">
                      {treatment.fromPrice ? `${t("common.from")} ` : ""}
                      {formatPrice(treatment.price, locale)}
                    </p>
                  </div>
                  <span className="text-sm font-medium text-(--cl-accent)">
                    {st("home.services.details")}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Block>

      <Block titleId="tech-title">
        <SectionHead
          pill={st("home.techniques.pill")}
          title={st("home.techniques.title")}
          titleId="tech-title"
        />
        <div className="mx-auto max-w-3xl space-y-4">
          <div
            role="group"
            aria-label={st("home.techniques.list")}
            className="flex flex-wrap justify-center gap-2"
          >
            {techniques.map((key) => (
              <button
                key={key}
                type="button"
                aria-pressed={technique === key}
                onClick={() => setTechnique(key)}
                className="min-h-11 rounded-full bg-border px-5 text-sm font-medium text-text aria-pressed:bg-primary aria-pressed:text-on-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
              >
                {st(`home.techniques.${key}.name`)}
              </button>
            ))}
          </div>
          <div aria-live="polite" className="flex gap-4 rounded-3xl bg-text p-6 text-bg">
            <GlowDot />
            <div>
              <h3 className="text-lg font-medium">{st(`home.techniques.${technique}.name`)}</h3>
              <p className="mt-1 text-sm text-bg/80">{st(`home.techniques.${technique}.text`)}</p>
            </div>
          </div>
        </div>
      </Block>

      <Block titleId="best-title" tone="soft">
        <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2 md:items-center">
          <div className="space-y-4">
            <Pill>{st("home.best.pill")}</Pill>
            <SectionTitle id="best-title">{st("home.best.title")}</SectionTitle>
            <Link href={`${root}/book`} className={primaryButton}>
              {st("home.best.cta")}
            </Link>
          </div>
          <ul className="space-y-3">
            {reasons.map((key) => (
              <li key={key} className={`${cardClasses} flex items-start gap-3`}>
                <GlowDot />
                <span>{st(`home.best.${key}`)}</span>
              </li>
            ))}
          </ul>
        </div>
      </Block>

      {results[0] ? (
        <Block titleId="results-title">
          <SectionHead
            pill={st("home.results.pill")}
            title={st("home.results.title")}
            titleId="results-title"
          />
          <BeforeAfter result={results[0]} locale={locale} />
          <p className="mt-6 text-center">
            <Link href={`${root}/results`} className={softButton}>
              {st("home.results.all")}
            </Link>
          </p>
        </Block>
      ) : null}

      <Block titleId="about-title" tone="soft">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div className="aspect-[3/2] overflow-hidden rounded-[30px] bg-bg">
            <SitePhoto
              photo={findPhoto(config.photos, "bone-graft")}
              locale={locale}
              sizes="(min-width: 768px) 560px, 100vw"
            />
          </div>
          <div className="space-y-4">
            <Pill>{st("home.about.pill")}</Pill>
            <SectionTitle id="about-title">{content.about.title[locale]}</SectionTitle>
            <p className="text-muted">{content.about.text[locale]}</p>
            {doctor ? (
              <ul className="space-y-2">
                {doctor.credentials.map((credential) => (
                  <li key={credential.en} className="flex items-start gap-3">
                    <GlowDot />
                    <span>{credential[locale]}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      </Block>

      <Block titleId="prices-title">
        <SectionHead
          pill={st("home.prices.pill")}
          title={st("home.prices.title")}
          titleId="prices-title"
          intro={st("home.prices.intro")}
        />
        <PriceTable treatments={treatments} locale={locale} />
        <p className="mt-6 text-center">
          <Link href={`${root}/prices`} className={softButton}>
            {st("home.prices.all")}
          </Link>
        </p>
      </Block>

      {testimonials.length > 0 ? (
        <Block titleId="reviews-title" tone="soft">
          <SectionHead
            pill={st("home.testimonials.pill")}
            title={st("home.testimonials.title")}
            titleId="reviews-title"
          />
          <TestimonialCards testimonials={testimonials} locale={locale} />
        </Block>
      ) : null}

      <Block titleId="faq-title">
        <SectionHead pill={st("home.faq.pill")} title={st("home.faq.title")} titleId="faq-title" />
        <FaqList faqs={faqs} locale={locale} />
      </Block>

      <section id="book" aria-labelledby="book-title" className="mx-2 rounded-[30px] bg-surface sm:mx-3">
        <div className={`${wrap} grid gap-10 py-16 sm:py-24 lg:grid-cols-[1.2fr_1fr]`}>
          <div className="space-y-5">
            <Pill>{st("home.book.pill")}</Pill>
            <SectionTitle id="book-title">{st("home.book.title")}</SectionTitle>
            <p className="text-muted">{st("home.book.intro")}</p>
            <BookingForm idPrefix="home-book" />
          </div>
          <div className="space-y-6">
            <div className={cardClasses}>
              <h3 className="mb-3 text-lg font-medium">{st("home.book.hours")}</h3>
              {doctor ? <HoursList schedule={doctor.schedule} locale={locale} /> : null}
            </div>
            <div className={cardClasses}>
              <h3 className="mb-2 text-lg font-medium">{st("home.book.address")}</h3>
              <p className="text-muted">{settings.address[locale]}</p>
            </div>
          </div>
        </div>
      </section>

      <StickyCta
        text={st("home.sticky.text")}
        label={st("home.sticky.label")}
        href="#book"
        heroId="hero"
        bookId="book"
      />
    </>
  );
}
