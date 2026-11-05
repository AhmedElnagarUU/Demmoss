"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { useRealEstate } from "../../../context";
import { formatNumber } from "@/features/demo-engine/format/format";
import {
  filterProperties,
  filterStateFromParams,
  sortProperties,
  toPropertyFilter,
  type FilterState,
} from "../../../listings";
import { FilterBar } from "../../../site/filter-bar";
import { PropertyCard } from "../../../site/property-card";
import { Eyebrow, Section, SectionTitle } from "../../../site/site-ui";
import { getDeveloperT } from "../messages";
import { useDeveloperStore } from "../store";

// Residences: only what is for sale, with live availability. The home type links arrive here with their choice in the URL.
export function ResidencesPage() {
  return (
    <Suspense fallback={null}>
      <Residences />
    </Suspense>
  );
}

function Residences() {
  const { config } = useRealEstate();
  const params = useSearchParams();
  const initial = filterStateFromParams(params, {
    purposes: config.purposes,
    areas: config.areas,
    bands: config.priceBands,
  });
  return <ResidencesView key={params.toString()} initial={initial} />;
}

function ResidencesView({ initial }: { initial: FilterState }) {
  const { config, locale } = useRealEstate();
  const t = getDeveloperT(locale);
  const properties = useDeveloperStore((state) => state.properties);
  const [state, setState] = useState(initial);

  const results = sortProperties(
    filterProperties(properties, toPropertyFilter(state, config.priceBands), config.areas),
    state.sort,
  );

  return (
    <Section id="residences-title">
      <Eyebrow>{t("residences.eyebrow")}</Eyebrow>
      <SectionTitle id="residences-title" level={1} className="mb-4">
        {t("residences.title")}
      </SectionTitle>
      <p className="mb-8 max-w-2xl text-lg text-muted">{t("residences.intro")}</p>

      <FilterBar
        idPrefix="residences"
        state={state}
        onChange={setState}
        fields={["type", "area", "price", "sort", "availableOnly"]}
      />

      <p role="status" className="mb-6 mt-8 font-semibold text-text">
        {t("residences.results", { count: formatNumber(results.length, locale) })}
      </p>
      {results.length === 0 ? (
        <p className="text-muted">{t("residences.none")}</p>
      ) : (
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((property) => (
            <li key={property.id} className="flex">
              <div className="flex w-full">
                <PropertyCard property={property} layout="tall" />
              </div>
            </li>
          ))}
        </ul>
      )}
    </Section>
  );
}
