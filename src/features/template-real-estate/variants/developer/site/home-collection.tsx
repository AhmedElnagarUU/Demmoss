"use client";

import { useState } from "react";
import { propertyState } from "../../../availability";
import { useRealEstate } from "../../../context";
import { getRealEstateT } from "../../../messages";
import type { PropertyType } from "../../../types";
import { getDeveloperT } from "../messages";
import { useDeveloperStore } from "../store";
import { ResidenceCard } from "./residence-card";
import { Reveal } from "./reveal";
import { container, h2Big, labelClass, rtlSafe, sectionPad } from "./styles";

const AVAILABLE_COUNT = 6;
const tabs = ["all", "villa", "penthouse", "coastal"] as const;

// The residences still for sale, with the source's filter tabs. Goal: sales (browse, then open a residence and ask for a viewing).
export function Collection() {
  const { locale } = useRealEstate();
  const t = getDeveloperT(locale);
  const shared = getRealEstateT(locale);
  const properties = useDeveloperStore((state) => state.properties);
  const [type, setType] = useState<PropertyType | "">("");

  const open = properties.filter((property) => propertyState(property) !== "sold_out");
  const shown = open.filter((property) => !type || property.type === type).slice(0, AVAILABLE_COUNT);

  return (
    <section
      id="collection"
      aria-labelledby="collection-title"
      className={`${sectionPad} relative overflow-x-clip bg-bg`}
    >
      <div className={container}>
        <Reveal className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <p className={`${labelClass} text-muted`}>{t("collection.eyebrow")}</p>
            <h2 id="collection-title" className={h2Big}>
              {t("collection.title")}
            </h2>
          </div>
          <div role="group" aria-label={shared("filters.type")} className="flex flex-wrap gap-2">
            {tabs.map((key) => {
              const item = key === "all" ? "" : key;
              return (
                <button
                  key={key}
                  type="button"
                  aria-pressed={type === item}
                  onClick={() => setType(item)}
                  className={`cursor-pointer rounded-full border border-border px-[22px] py-2.5 text-[11px] uppercase tracking-[0.2em] text-muted transition-[background-color,border-color,color] duration-300 hover:border-text/40 hover:text-text aria-pressed:border-primary aria-pressed:bg-primary aria-pressed:font-medium aria-pressed:text-on-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus motion-reduce:transition-none ${rtlSafe}`}
                >
                  {t(`collection.tabs.${key}`)}
                </button>
              );
            })}
          </div>
        </Reveal>
        {shown.length === 0 ? (
          <p role="status" className="mt-16 text-muted">
            {t("collection.none")}
          </p>
        ) : (
          <ul className="mt-16 grid grid-cols-3 gap-7 max-[1024px]:grid-cols-2 max-[640px]:grid-cols-1">
            {shown.map((property) => (
              <li key={property.id}>
                <Reveal className="h-full">
                  <ResidenceCard property={property} />
                </Reveal>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
