"use client";

import Link from "next/link";
import { formatNumber } from "@/features/demo-engine/format/format";
import { useClinic } from "../../../context";
import { BeforeAfter } from "../../../site/before-after";
import { findPhoto, SitePhoto } from "../../../site/photo";
import { Stat, TestimonialCards } from "../../../site/site-parts";
import {
  Block,
  cardClasses,
  Pill,
  primaryButton,
  SectionHead,
  SectionTitle,
  softButton,
  wrap,
} from "../../../site/site-ui";
import { getCentreT } from "../messages";
import { DoctorCard } from "./doctor-card";

const promises = ["p1", "p2", "p3"] as const;

// Home: pick a department or a doctor and book. Trust sections (promises, results, reviews) sit between.
export function HomePage() {
  const { store, config, locale } = useClinic();
  const t = getCentreT(locale);
  const content = store((state) => state.content);
  const departments = store((state) => state.departments);
  const doctors = store((state) => state.doctors);
  const allResults = store((state) => state.results);
  const allTestimonials = store((state) => state.testimonials);
  const results = allResults.filter((item) => item.visible);
  const testimonials = allTestimonials.filter((item) => item.visible);
  const root = `/${locale}${config.basePath}`;

  return (
    <>
      <section className={`${wrap} grid items-center gap-10 py-10 lg:grid-cols-2 lg:py-16`}>
        <div className="space-y-6">
          <Pill>{t("home.hero.pill")}</Pill>
          <h1 className="text-4xl font-medium leading-[1.05] tracking-tight sm:text-6xl rtl:leading-snug rtl:tracking-normal">
            {content.hero.title[locale]}
          </h1>
          <p className="max-w-xl text-lg text-muted">{content.hero.subtitle[locale]}</p>
          <div className="flex flex-wrap gap-3">
            <Link href={`${root}/book`} className={primaryButton}>
              {t("home.hero.book")}
            </Link>
            <Link href={`${root}/doctors`} className={softButton}>
              {t("home.hero.doctors")}
            </Link>
          </div>
          <div className="flex flex-wrap gap-10 pt-4">
            <Stat value={formatNumber(doctors.length, locale)} label={t("home.hero.doctorsStat")} />
            <Stat value={formatNumber(departments.length, locale)} label={t("home.hero.departmentsStat")} />
          </div>
        </div>
        <div className="aspect-[4/3] overflow-hidden rounded-[30px] bg-surface">
          <SitePhoto
            photo={findPhoto(config.photos, "centre")}
            locale={locale}
            priority
            sizes="(min-width: 1024px) 600px, 100vw"
          />
        </div>
      </section>

      <Block titleId="departments-title" tone="soft">
        <SectionHead
          pill={t("home.departments.pill")}
          title={t("home.departments.title")}
          titleId="departments-title"
          intro={t("home.departments.intro")}
        />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {departments.map((department) => (
            <li key={department.id}>
              <Link
                href={`${root}/departments#${department.id}`}
                className={`${cardClasses} block h-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus`}
              >
                <p className="text-xl font-medium">{department.name[locale]}</p>
                <p className="mt-2 text-muted">{department.description[locale]}</p>
                <p className="mt-4 text-sm font-medium text-(--cl-accent)">{t("home.departments.view")}</p>
              </Link>
            </li>
          ))}
        </ul>
      </Block>

      <Block titleId="doctors-title">
        <SectionHead pill={t("home.doctors.pill")} title={t("home.doctors.title")} titleId="doctors-title" />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {doctors.slice(0, 3).map((doctor) => (
            <li key={doctor.id}>
              <DoctorCard doctor={doctor} />
            </li>
          ))}
        </ul>
        <p className="mt-6 text-center">
          <Link href={`${root}/doctors`} className={softButton}>
            {t("home.doctors.all")}
          </Link>
        </p>
      </Block>

      <Block titleId="promises-title" tone="soft">
        <SectionHead
          pill={t("home.promises.pill")}
          title={t("home.promises.title")}
          titleId="promises-title"
        />
        <ul className="grid gap-4 md:grid-cols-3">
          {promises.map((key) => (
            <li key={key} className={cardClasses}>
              <h3 className="text-lg font-medium">{t(`home.promises.${key}Title`)}</h3>
              <p className="mt-2 text-muted">{t(`home.promises.${key}Text`)}</p>
            </li>
          ))}
        </ul>
      </Block>

      {results[0] ? (
        <Block titleId="results-title">
          <SectionHead
            pill={t("home.results.pill")}
            title={t("home.results.title")}
            titleId="results-title"
            intro={t("home.results.intro")}
          />
          <BeforeAfter result={results[0]} locale={locale} />
        </Block>
      ) : null}

      {testimonials.length > 0 ? (
        <Block titleId="reviews-title" tone="soft">
          <SectionHead
            pill={t("home.testimonials.pill")}
            title={t("home.testimonials.title")}
            titleId="reviews-title"
          />
          <TestimonialCards testimonials={testimonials} locale={locale} />
        </Block>
      ) : null}

      <Block titleId="band-title">
        <div className="mx-auto max-w-2xl space-y-4 rounded-[30px] bg-text p-8 text-center text-bg">
          <SectionTitle id="band-title">{t("home.band.title")}</SectionTitle>
          <p className="text-bg/80">{t("home.band.text")}</p>
          <Link href={`${root}/book`} className={primaryButton}>
            {t("home.band.cta")}
          </Link>
        </div>
      </Block>
    </>
  );
}
