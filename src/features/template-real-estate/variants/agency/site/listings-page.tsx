"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { useRealEstate } from "../../../context";
import { formatNumber } from "@/features/demo-engine/format/format";
import {
  filterProperties,
  filterStateFromParams,
  type FilterState,
  sortProperties,
  toPropertyFilter,
} from "../../../listings";
import { FilterBar } from "../../../site/filter-bar";
import { PropertyCard } from "../../../site/property-card";
import { Eyebrow, Section, SectionTitle } from "../../../site/site-ui";
import { getAgencyT } from "../messages";
import { useAgencyStore } from "../store";

// Listings: search and filter. The home search and the neighbourhood links arrive here with their choices in the URL.
export function ListingsPage() {
  return (
    <Suspense fallback={null}>
      <Listings />
    </Suspense>
  );
}

function Listings() {
  const { config } = useRealEstate();
  const params = useSearchParams();
  const initial = filterStateFromParams(params, {
    purposes: config.purposes,
    areas: config.areas,
    bands: config.priceBands,
  });
  // a new URL (a footer or neighbourhood link) starts the page again with those choices
  return <ListingsView key={params.toString()} initial={initial} />;
}

function ListingsView({ initial }: { initial: FilterState }) {
  const { config, locale } = useRealEstate();
  const t = getAgencyT(locale);
  const properties = useAgencyStore((state) => state.properties);
  const [state, setState] = useState(initial);

  const results = sortProperties(
    filterProperties(properties, toPropertyFilter(state, config.priceBands), config.areas),
    state.sort,
  );

  return (
    <Section id="listings-title">
      <Eyebrow>{t("listings.eyebrow")}</Eyebrow>
      <SectionTitle id="listings-title" level={1} className="mb-4">
        {t("listings.title")}
      </SectionTitle>
      <p className="mb-8 max-w-2xl text-lg text-muted">{t("listings.intro")}</p>

      <FilterBar
        idPrefix="listings"
        state={state}
        onChange={setState}
        fields={["purpose", "query", "type", "area", "price", "bedrooms", "sort"]}
      />

      <p role="status" className="mb-6 mt-8 font-semibold text-text">
        {t("listings.results", { count: formatNumber(results.length, locale) })}
      </p>
      {results.length === 0 ? (
        <p className="text-muted">{t("listings.none")}</p>
      ) : (
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((property) => (
            <li key={property.id} className="flex">
              <div className="flex w-full">
                <PropertyCard property={property} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </Section>
  );
}
