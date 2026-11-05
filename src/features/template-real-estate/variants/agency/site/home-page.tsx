"use client";

import Link from "next/link";
import { propertyState } from "../../../availability";
import { useRealEstate } from "../../../context";
import { formatNumber } from "@/features/demo-engine/format/format";
import { sortProperties } from "../../../listings";
import { MortgageCalculator } from "../../../modules/mortgage/mortgage-calculator";
import { findPhoto, SitePhoto } from "../../../site/photo";
import { PropertyCard } from "../../../site/property-card";
import { Eyebrow, pillClasses, Section, SectionTitle } from "../../../site/site-ui";
import { getAgencyT } from "../messages";
import { useAgencyStore } from "../store";
import { AgentsGrid } from "./agents-grid";
import { HeroSearch } from "./hero-search";
import { Principles } from "./principles";

const FEATURED_COUNT = 6;
const stats = ["sold", "years", "recommend"] as const;

export function HomePage() {
  const { config, locale } = useRealEstate();
  const t = getAgencyT(locale);
  const content = useAgencyStore((state) => state.content);
  const properties = useAgencyStore((state) => state.properties);
  const testimonials = useAgencyStore((state) => state.testimonials);
  const root = `/${locale}${config.basePath}`;

  const open = properties.filter((property) => propertyState(property) !== "sold_out");
  const featured = sortProperties(open, "featured").slice(0, FEATURED_COUNT);
  const areaCounts = config.areas.map((area) => ({
    area,
    count: open.filter((property) => property.area === area.id).length,
  }));
  const visibleTestimonials = testimonials.filter((item) => item.visible);

  return (
    <>
      <Section id="hero-title">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="space-y-6">
            <Eyebrow>{t("hero.eyebrow")}</Eyebrow>
            <SectionTitle id="hero-title" level={1} className="sm:text-5xl">
              {content.hero.title[locale]}
            </SectionTitle>
            <p className="max-w-xl text-lg leading-relaxed text-muted">{content.hero.subtitle[locale]}</p>
          </div>
          <div className="aspect-5/4 overflow-hidden rounded-control bg-surface">
            <SitePhoto
              photo={findPhoto(config.photos, "hero-pool")}
              locale={locale}
              sizes="(min-width: 1024px) 50vw, 100vw"
              priority
            />
          </div>
        </div>
        <div className="mt-10">
          <HeroSearch />
        </div>
      </Section>

      <section aria-label={t("stats.label")} className="border-y border-border bg-surface">
        <ul className="mx-auto grid max-w-6xl gap-6 px-4 py-10 text-center sm:grid-cols-3 sm:px-8">
          {stats.map((key) => (
            <li key={key}>
              <p className="text-3xl font-extralight text-text">{t(`stats.${key}.value`)}</p>
              <p className="text-sm text-muted">{t(`stats.${key}.label`)}</p>
            </li>
          ))}
        </ul>
      </section>

      <Section id="featured-title">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <Eyebrow>{t("featured.eyebrow")}</Eyebrow>
            <SectionTitle id="featured-title">{t("featured.title")}</SectionTitle>
          </div>
          <Link href={`${root}/listings`} className={pillClasses.line}>
            {t("featured.all")}
          </Link>
        </div>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((property) => (
            <li key={property.id} className="flex">
              <div className="flex w-full">
                <PropertyCard property={property} />
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <section aria-labelledby="why-title" className="bg-primary text-on-primary">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-8 sm:py-24">
          <p className="mb-5 text-xs font-medium uppercase tracking-[0.28em] rtl:text-sm rtl:tracking-normal">
            {t("principles.eyebrow")}
          </p>
          <SectionTitle id="why-title" className="mb-12">
            {t("principles.title")}
          </SectionTitle>
          <Principles />
        </div>
      </section>

      <Section id="hoods-title">
        <Eyebrow>{t("hoods.eyebrow")}</Eyebrow>
        <SectionTitle id="hoods-title" className="mb-10">
          {t("hoods.title")}
        </SectionTitle>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {areaCounts.map(({ area, count }) => (
            <li key={area.id}>
              <Link
                href={`${root}/listings?area=${area.id}`}
                className="block rounded-control border border-border p-5 transition-colors hover:border-text focus-visible:outline-2 focus-visible:outline-focus"
              >
                <span className="block text-lg font-semibold text-text">{area.name[locale]}</span>
                <span className="text-sm text-muted">
                  {t("hoods.count", { count: formatNumber(count, locale) })}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="mortgage-title" tone="soft">
        <div className="grid items-start gap-10 lg:grid-cols-2">
          <div className="space-y-5">
            <Eyebrow>{t("mortgage.eyebrow")}</Eyebrow>
            <SectionTitle id="mortgage-title">{t("mortgage.title")}</SectionTitle>
            <p className="text-lg leading-relaxed text-muted">{t("mortgage.lead")}</p>
            <Link href={`${root}/contact`} className={pillClasses.line}>
              {t("mortgage.valuation")}
            </Link>
          </div>
          <MortgageCalculator idPrefix="home-mortgage" />
        </div>
      </Section>

      <Section id="agents-title">
        <Eyebrow>{t("agents.eyebrow")}</Eyebrow>
        <SectionTitle id="agents-title" className="mb-10">
          {t("agents.title")}
        </SectionTitle>
        <AgentsGrid />
      </Section>

      {visibleTestimonials.length > 0 ? (
        <Section id="stories-title" tone="soft">
          <Eyebrow>{t("stories.eyebrow")}</Eyebrow>
          <SectionTitle id="stories-title" className="mb-10">
            {t("stories.title")}
          </SectionTitle>
          <ul className="grid gap-6 md:grid-cols-3">
            {visibleTestimonials.map((item) => (
              <li key={item.id}>
                <figure className="h-full space-y-4 rounded-control border border-border bg-bg p-6">
                  <blockquote className="leading-relaxed text-text">“{item.text[locale]}”</blockquote>
                  <figcaption>
                    <span className="block font-semibold text-text">{item.name[locale]}</span>
                    <span className="text-sm text-muted">{item.context[locale]}</span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      <section aria-labelledby="cta-title" className="bg-primary text-on-primary">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 px-4 py-14 sm:px-8">
          <div className="max-w-xl space-y-2">
            <SectionTitle id="cta-title" className="text-2xl sm:text-3xl">
              {t("cta.title")}
            </SectionTitle>
            <p>{t("cta.text")}</p>
          </div>
          <Link
            href={`${root}/contact`}
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-bg px-7 py-3 text-xs font-medium uppercase tracking-[0.2em] text-text hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bg rtl:text-sm rtl:tracking-normal"
          >
            {t("cta.button")}
          </Link>
        </div>
      </section>
    </>
  );
}
