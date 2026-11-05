"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { propertyState } from "../../../availability";
import { useRealEstate } from "../../../context";
import { formatNumber, formatPrice } from "../../../format";
import { getRealEstateT } from "../../../messages";
import { MortgageCalculator } from "../../../modules/mortgage/mortgage-calculator";
import { findPhoto, SitePhoto } from "../../../site/photo";
import { InquiryForm } from "../../../site/inquiry-form";
import { PropertyGallery } from "../../../site/property-gallery";
import { Eyebrow, pillClasses, Section, SectionTitle } from "../../../site/site-ui";
import { ViewingForm } from "../../../site/viewing-form";
import { getAgencyT } from "../messages";
import { useAgencyStore } from "../store";

// Property detail: everything needed to decide, then two ways to act (schedule a viewing, ask a question).
// The property is chosen by ?id= in the address, so properties added in the dashboard open without a build step.
export function PropertyPage() {
  return (
    <Suspense fallback={null}>
      <PropertyPageContent />
    </Suspense>
  );
}

function PropertyPageContent() {
  const id = useSearchParams().get("id") ?? "";
  const { config, locale } = useRealEstate();
  const t = getRealEstateT(locale);
  const at = getAgencyT(locale);
  const property = useAgencyStore((state) => state.properties.find((item) => item.id === id));
  const agent = useAgencyStore((state) => state.agents.find((item) => item.id === property?.agentId));
  const root = `/${locale}${config.basePath}`;

  if (!property) {
    return (
      <Section>
        <h1 className="mb-4 text-2xl font-semibold">{at("property.notFound")}</h1>
        <Link href={`${root}/listings`} className={pillClasses.solid}>
          {at("property.backToListings")}
        </Link>
      </Section>
    );
  }

  const state = propertyState(property);
  const area = config.areas.find((item) => item.id === property.area);
  const facts = [
    { key: "bedrooms", value: formatNumber(property.bedrooms, locale) },
    { key: "bathrooms", value: formatNumber(property.bathrooms, locale) },
    { key: "size", value: t("card.size", { size: formatNumber(property.size, locale) }) },
    { key: "type", value: t(`type.${property.type}`) },
  ] as const;

  return (
    <Section id="property-title">
      <Link
        href={`${root}/listings`}
        className="mb-6 inline-block text-sm font-semibold text-(--re-accent) underline focus-visible:outline-2 focus-visible:outline-focus"
      >
        {at("property.backToListings")}
      </Link>
      <div className="grid gap-10 lg:grid-cols-[3fr_2fr]">
        <div className="space-y-10">
          <PropertyGallery property={property} />
          <div className="space-y-4">
            <Eyebrow>
              {area?.name[locale]} · {t(`purpose.${property.purpose}`)}
            </Eyebrow>
            <SectionTitle id="property-title" level={1} className="sm:text-4xl">
              {property.title[locale]}
            </SectionTitle>
            <dl className="grid grid-cols-2 gap-4 rounded-control border border-border p-5 sm:grid-cols-4">
              {facts.map((fact) => (
                <div key={fact.key}>
                  <dt className="text-sm text-muted">{at(`property.facts.${fact.key}`)}</dt>
                  <dd className="font-semibold text-text">{fact.value}</dd>
                </div>
              ))}
            </dl>
            <h2 className="pt-4 text-xl font-semibold">{at("property.description")}</h2>
            <p className="leading-relaxed text-text">{property.description[locale]}</p>
            {property.features.length > 0 ? (
              <>
                <h2 className="pt-4 text-xl font-semibold">{at("property.features")}</h2>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {property.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-text">
                      <span aria-hidden="true" className="size-2 rounded-full bg-(--re-accent)" />
                      {t(`feature.${feature}`)}
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
          </div>
          {property.purpose === "sale" ? (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">{at("property.mortgage")}</h2>
              <MortgageCalculator price={property.price} idPrefix="property-mortgage" />
            </div>
          ) : null}
        </div>

        <aside className="space-y-8 lg:sticky lg:top-6 lg:self-start">
          <div className="space-y-2 rounded-control border border-border bg-surface p-6">
            <p className="text-3xl font-semibold text-text">
              {formatPrice(property.price, locale)}
              {property.purpose === "rent" ? (
                <span className="text-base font-normal text-muted"> {t("common.perYear")}</span>
              ) : null}
            </p>
            <p className="font-semibold text-text">
              {state === "available"
                ? t("state.available")
                : state === "reserved"
                  ? t("state.reserved")
                  : t(property.purpose === "rent" ? "state.rented" : "state.sold")}
            </p>
          </div>

          {agent ? (
            <div className="flex items-center gap-4 rounded-control border border-border p-4">
              <div className="size-20 shrink-0 overflow-hidden rounded-full bg-surface">
                <SitePhoto photo={findPhoto(config.photos, agent.photo)} locale={locale} sizes="80px" />
              </div>
              <div>
                <p className="text-sm text-muted">{at("property.agent")}</p>
                <p className="font-semibold text-text">{agent.name[locale]}</p>
                <a
                  href={`tel:${agent.phone.replace(/\s/g, "")}`}
                  dir="ltr"
                  className="text-start text-sm font-semibold underline focus-visible:outline-2 focus-visible:outline-focus"
                >
                  {agent.phone}
                </a>
              </div>
            </div>
          ) : null}

          {state === "sold_out" ? (
            <p role="note" className="rounded-control border border-border p-4 text-text">
              {at("property.unavailable")}
            </p>
          ) : (
            <section className="space-y-4">
              <h2 id="viewing-title" className="text-xl font-semibold">
                {at("property.viewingTitle")}
              </h2>
              <ViewingForm propertyId={property.id} idPrefix="viewing" titleId="viewing-title" />
            </section>
          )}

          <section className="space-y-4">
            <h2 id="inquiry-title" className="text-xl font-semibold">
              {at("property.inquiryTitle")}
            </h2>
            <InquiryForm
              kinds={["question"]}
              propertyId={property.id}
              idPrefix="inquiry"
              titleId="inquiry-title"
            />
          </section>
        </aside>
      </div>
    </Section>
  );
}
