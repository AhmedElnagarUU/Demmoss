"use client";

import Link from "next/link";
import { useState } from "react";
import { propertyState } from "../../../availability";
import { useRealEstate } from "../../../context";
import { formatNumber } from "@/features/demo-engine/format/format";
import { getRealEstateT } from "../../../messages";
import { findPhoto, SitePhoto } from "../../../site/photo";
import { PropertyCard } from "../../../site/property-card";
import { Eyebrow, pillClasses, Section, SectionTitle } from "../../../site/site-ui";
import { ViewingForm } from "../../../site/viewing-form";
import type { PropertyType } from "../../../types";
import { getDeveloperT } from "../messages";
import { useDeveloperStore } from "../store";
import { TeamGrid } from "./team-grid";

const hotspots = [
  { key: "glazing", position: "start-[16%] top-[30%]" },
  { key: "cedar", position: "start-[52%] top-[44%]" },
  { key: "terrace", position: "start-[76%] top-[62%]" },
] as const;
const principles = ["site", "materials", "quiet"] as const;
const steps = ["consult", "design", "build", "handover"] as const;
const stats = ["delivered", "awards", "referral"] as const;
const AVAILABLE_COUNT = 6;
const residenceTypes = ["villa", "coastal", "penthouse"] as const;

export function HomePage() {
  const { config, locale } = useRealEstate();
  const t = getDeveloperT(locale);
  const rt = getRealEstateT(locale);
  const content = useDeveloperStore((state) => state.content);
  const properties = useDeveloperStore((state) => state.properties);
  const testimonials = useDeveloperStore((state) => state.testimonials);
  const [openSpot, setOpenSpot] = useState<string | null>(null);
  const [type, setType] = useState<PropertyType | "">("");
  const root = `/${locale}${config.basePath}`;

  const open = properties.filter((property) => propertyState(property) !== "sold_out");
  const shown = open.filter((property) => !type || property.type === type).slice(0, AVAILABLE_COUNT);
  const visibleTestimonials = testimonials.filter((item) => item.visible);

  return (
    <>
      <section aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-surface">
        <div className="absolute inset-0 -z-10">
          <SitePhoto
            photo={findPhoto(config.photos, "hero-landscape")}
            locale={locale}
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-b from-bg/70 via-bg/30 to-bg" />
        </div>
        {hotspots.map((spot) => (
          <div key={spot.key} className={`absolute ${spot.position} z-10 hidden sm:block`}>
            <button
              type="button"
              aria-expanded={openSpot === spot.key}
              aria-label={t(`hero.hotspots.${spot.key}`)}
              onClick={() => setOpenSpot(openSpot === spot.key ? null : spot.key)}
              className="size-6 rounded-full border-2 border-primary bg-primary/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
            />
            {openSpot === spot.key ? (
              <p className="absolute start-8 top-0 w-48 rounded-control bg-bg p-3 text-sm font-medium text-text shadow">
                {t(`hero.hotspots.${spot.key}`)}
              </p>
            ) : null}
          </div>
        ))}
        <div className="mx-auto flex min-h-[34rem] max-w-6xl flex-col justify-end gap-6 px-4 pb-14 pt-32 sm:px-8">
          <h1
            id="hero-title"
            className="max-w-3xl text-4xl font-extralight uppercase leading-tight tracking-[0.1em] sm:text-6xl rtl:font-light rtl:normal-case rtl:tracking-normal rtl:leading-snug"
          >
            {content.hero.title[locale]}
          </h1>
          <p className="max-w-xl text-lg leading-relaxed">{content.hero.subtitle[locale]}</p>
          <div>
            <Link href={`${root}/residences`} className={pillClasses.solid}>
              {t("hero.explore")}
            </Link>
          </div>
          <ul className="mt-6 grid grid-cols-3 gap-4 border-t border-border pt-6">
            {stats.map((key) => (
              <li key={key}>
                <p className="text-3xl font-extralight">{t(`stats.${key}.value`)}</p>
                <p className="text-sm text-muted">{t(`stats.${key}.label`)}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Section id="principles-title">
        <Eyebrow>{t("principles.eyebrow")}</Eyebrow>
        <SectionTitle id="principles-title" className="mb-12">
          {t("principles.title")}
        </SectionTitle>
        <ol className="grid gap-8 md:grid-cols-3">
          {principles.map((key, index) => (
            <li key={key} className="space-y-3 border-t border-border pt-5">
              <p aria-hidden="true" className="text-sm text-(--re-accent)">
                0{index + 1}
              </p>
              <h3 className="text-xl font-semibold">{t(`principles.${key}.title`)}</h3>
              <p className="leading-relaxed text-muted">{t(`principles.${key}.text`)}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="types-title" tone="soft">
        <Eyebrow>{t("types.eyebrow")}</Eyebrow>
        <SectionTitle id="types-title" className="mb-10">
          {t("types.title")}
        </SectionTitle>
        <ul className="grid gap-6 md:grid-cols-3">
          {residenceTypes.map((item) => {
            const count = open.filter((property) => property.type === item).length;
            return (
              <li key={item}>
                <Link
                  href={`${root}/residences?type=${item}`}
                  className="block h-full space-y-2 rounded-control border border-border bg-bg p-6 transition-colors hover:border-text focus-visible:outline-2 focus-visible:outline-focus"
                >
                  <span className="block text-xl font-semibold text-text">{rt(`type.${item}`)}</span>
                  <span className="block text-muted">{t(`types.${item}`)}</span>
                  <span className="block text-sm font-semibold text-(--re-accent)">
                    {t("types.count", { count: formatNumber(count, locale) })}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </Section>

      <Section id="available-title">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <Eyebrow>{t("available.eyebrow")}</Eyebrow>
            <SectionTitle id="available-title">{t("available.title")}</SectionTitle>
          </div>
          <Link href={`${root}/residences`} className={pillClasses.line}>
            {t("available.all")}
          </Link>
        </div>
        <div role="group" aria-label={rt("filters.type")} className="mb-8 flex flex-wrap gap-2">
          {(["", ...config.types] as const).map((item) => (
            <button
              key={item || "all"}
              type="button"
              aria-pressed={type === item}
              onClick={() => setType(item)}
              className="min-h-11 rounded-full border border-border px-5 font-semibold text-text aria-pressed:border-primary aria-pressed:bg-primary aria-pressed:text-on-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
            >
              {item ? rt(`type.${item}`) : rt("filters.anyType")}
            </button>
          ))}
        </div>
        {shown.length === 0 ? (
          <p className="text-muted">{t("available.none")}</p>
        ) : (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((property) => (
              <li key={property.id} className="flex">
                <div className="flex w-full">
                  <PropertyCard property={property} layout="tall" />
                </div>
              </li>
            ))}
          </ul>
        )}
      </Section>

      <Section id="team-title" tone="soft">
        <Eyebrow>{t("team.eyebrow")}</Eyebrow>
        <SectionTitle id="team-title" className="mb-10">
          {t("team.title")}
        </SectionTitle>
        <TeamGrid />
      </Section>

      <Section id="steps-title">
        <Eyebrow>{t("steps.eyebrow")}</Eyebrow>
        <SectionTitle id="steps-title" className="mb-12">
          {t("steps.title")}
        </SectionTitle>
        <ol className="grid gap-8 md:grid-cols-4">
          {steps.map((key, index) => (
            <li key={key} className="space-y-2 border-t border-border pt-5">
              <p aria-hidden="true" className="text-sm text-(--re-accent)">
                0{index + 1}
              </p>
              <h3 className="text-lg font-semibold">{t(`steps.${key}.title`)}</h3>
              <p className="text-muted">{t(`steps.${key}.text`)}</p>
            </li>
          ))}
        </ol>
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

      <Section id="book-title">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-4">
            <Eyebrow>{t("book.eyebrow")}</Eyebrow>
            <SectionTitle id="book-title">{t("book.title")}</SectionTitle>
            <p className="text-lg leading-relaxed text-muted">{t("book.text")}</p>
          </div>
          <ViewingForm idPrefix="home-viewing" titleId="book-title" />
        </div>
      </Section>
    </>
  );
}
