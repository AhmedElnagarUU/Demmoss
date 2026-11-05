"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { propertyState, unitCounts } from "../../../availability";
import { useRealEstate } from "../../../context";
import { formatNumber, formatPrice } from "../../../format";
import { getRealEstateT } from "../../../messages";
import { InquiryForm } from "../../../site/inquiry-form";
import { PropertyGallery } from "../../../site/property-gallery";
import { Eyebrow, pillClasses, Section, SectionTitle } from "../../../site/site-ui";
import { ViewingForm } from "../../../site/viewing-form";
import { getDeveloperT } from "../messages";
import { useDeveloperStore } from "../store";

// Residence detail: facts, then the live unit table, then two ways to act (private viewing, brochure / question).
// The property is chosen by ?id= in the address, so properties added in the dashboard open without a build step.
export function ResidencePage() {
  return (
    <Suspense fallback={null}>
      <ResidencePageContent />
    </Suspense>
  );
}

function ResidencePageContent() {
  const id = useSearchParams().get("id") ?? "";
  const { config, locale } = useRealEstate();
  const t = getRealEstateT(locale);
  const dt = getDeveloperT(locale);
  const property = useDeveloperStore((state) => state.properties.find((item) => item.id === id));
  // choosing a unit in the table preselects it in both forms
  const [unitId, setUnitId] = useState("");
  const root = `/${locale}${config.basePath}`;

  if (!property) {
    return (
      <Section>
        <h1 className="mb-4 text-2xl font-semibold">{dt("residence.notFound")}</h1>
        <Link href={`${root}/residences`} className={pillClasses.solid}>
          {dt("residence.back")}
        </Link>
      </Section>
    );
  }

  const state = propertyState(property);
  const counts = unitCounts(property.units);
  const area = config.areas.find((item) => item.id === property.area);
  const facts = [
    { key: "bedrooms", value: formatNumber(property.bedrooms, locale) },
    { key: "bathrooms", value: formatNumber(property.bathrooms, locale) },
    { key: "size", value: t("card.size", { size: formatNumber(property.size, locale) }) },
    { key: "from", value: formatPrice(property.price, locale) },
  ] as const;

  return (
    <Section id="residence-title">
      <Link
        href={`${root}/residences`}
        className="mb-6 inline-block text-sm font-semibold text-(--re-accent) underline focus-visible:outline-2 focus-visible:outline-focus"
      >
        {dt("residence.back")}
      </Link>
      <div className="grid gap-10 lg:grid-cols-[3fr_2fr]">
        <div className="space-y-10">
          <PropertyGallery property={property} />
          <div className="space-y-4">
            <Eyebrow>
              {area?.name[locale]} · {t(`type.${property.type}`)}
            </Eyebrow>
            <SectionTitle id="residence-title" level={1} className="sm:text-4xl">
              {property.title[locale]}
            </SectionTitle>
            <dl className="grid grid-cols-2 gap-4 rounded-control border border-border p-5 sm:grid-cols-4">
              {facts.map((fact) => (
                <div key={fact.key}>
                  <dt className="text-sm text-muted">{dt(`residence.facts.${fact.key}`)}</dt>
                  <dd className="font-semibold text-text">{fact.value}</dd>
                </div>
              ))}
            </dl>
            <p className="leading-relaxed text-text">{property.description[locale]}</p>
            {property.features.length > 0 ? (
              <ul className="grid gap-2 sm:grid-cols-2">
                {property.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-text">
                    <span aria-hidden="true" className="size-2 rounded-full bg-(--re-accent)" />
                    {t(`feature.${feature}`)}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <section aria-labelledby="units-title" className="space-y-4">
            <h2 id="units-title" className="text-2xl font-semibold">
              {dt("residence.unitsTitle")}
            </h2>
            <p className="text-muted">
              {t("units.summary", {
                available: formatNumber(counts.available, locale),
                reserved: formatNumber(counts.reserved, locale),
                sold: formatNumber(counts.sold, locale),
              })}
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-start">
                <caption className="sr-only">{dt("residence.unitsTitle")}</caption>
                <thead>
                  <tr className="border-b border-border text-sm text-muted">
                    <th scope="col" className="py-2 pe-3 text-start font-semibold">
                      {t("units.label")}
                    </th>
                    <th scope="col" className="py-2 pe-3 text-start font-semibold">
                      {t("units.floor")}
                    </th>
                    <th scope="col" className="py-2 pe-3 text-start font-semibold">
                      {t("units.size")}
                    </th>
                    <th scope="col" className="py-2 pe-3 text-start font-semibold">
                      {t("units.price")}
                    </th>
                    <th scope="col" className="py-2 text-start font-semibold">
                      {dt("residence.availability")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {property.units.map((unit) => (
                    <tr key={unit.id} className="border-b border-border">
                      <th scope="row" className="py-3 pe-3 text-start font-semibold text-text">
                        {unit.label}
                      </th>
                      <td className="py-3 pe-3">{formatNumber(unit.floor, locale)}</td>
                      <td className="py-3 pe-3">{formatNumber(unit.size, locale)}</td>
                      <td className="py-3 pe-3">{formatPrice(unit.price, locale)}</td>
                      <td className="py-3">
                        {unit.status === "available" ? (
                          <button
                            type="button"
                            onClick={() => setUnitId(unit.id)}
                            aria-pressed={unitId === unit.id}
                            aria-label={dt("residence.requestUnit", { unit: unit.label })}
                            className="min-h-11 rounded-full border border-primary px-4 font-semibold text-text aria-pressed:bg-primary aria-pressed:text-on-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
                          >
                            {t("unitStatus.available")}
                          </button>
                        ) : (
                          <span className="font-semibold text-muted">{t(`unitStatus.${unit.status}`)}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        <aside className="space-y-8 lg:sticky lg:top-6 lg:self-start">
          {state === "sold_out" ? (
            <p role="note" className="rounded-control border border-border p-4 text-text">
              {dt("residence.soldOut")}
            </p>
          ) : (
            <section className="space-y-4">
              <h2 id="viewing-title" className="text-xl font-semibold">
                {dt("residence.viewingTitle")}
              </h2>
              <ViewingForm
                key={`viewing-${unitId}`}
                propertyId={property.id}
                defaultUnitId={unitId}
                idPrefix="viewing"
                titleId="viewing-title"
              />
            </section>
          )}
          <section className="space-y-4">
            <h2 id="inquiry-title" className="text-xl font-semibold">
              {dt("residence.inquiryTitle")}
            </h2>
            <InquiryForm
              key={`inquiry-${unitId}`}
              kinds={["brochure", "question"]}
              propertyId={property.id}
              defaultUnitId={unitId}
              idPrefix="inquiry"
              titleId="inquiry-title"
            />
          </section>
        </aside>
      </div>
    </Section>
  );
}
