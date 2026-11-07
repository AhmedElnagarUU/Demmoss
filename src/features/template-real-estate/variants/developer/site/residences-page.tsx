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
import { getDeveloperT } from "../messages";
import { useDeveloperStore } from "../store";
import { ResidenceCard } from "./residence-card";
import { container, h2Big, labelClass } from "./styles";

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
    <section
      aria-labelledby="residences-title"
      className="relative overflow-x-clip bg-bg pb-[140px] pt-[150px] max-[640px]:pb-[90px]"
    >
      <div className={container}>
        <p className={`${labelClass} text-muted`}>{t("residences.eyebrow")}</p>
        <h1 id="residences-title" className={h2Big}>
          {t("residences.title")}
        </h1>
        <p className="mb-10 mt-6 max-w-2xl text-sm leading-[1.9] text-muted">{t("residences.intro")}</p>

        <FilterBar
          idPrefix="residences"
          state={state}
          onChange={setState}
          fields={["type", "area", "price", "sort", "availableOnly"]}
        />

        <p role="status" className="mb-6 mt-10 text-sm font-medium text-text">
          {t("residences.results", { count: formatNumber(results.length, locale) })}
        </p>
        {results.length === 0 ? (
          <p className="text-muted">{t("residences.none")}</p>
        ) : (
          <ul className="grid grid-cols-3 gap-7 max-[1024px]:grid-cols-2 max-[640px]:grid-cols-1">
            {results.map((property) => (
              <li key={property.id}>
                <ResidenceCard property={property} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
