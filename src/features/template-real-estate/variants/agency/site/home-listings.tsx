"use client";

import { propertyState } from "../../../availability";
import { useRealEstate } from "../../../context";
import { filterForTab, homeProperties, homeTabs, tabOf, type HomeFilter } from "../home-filter";
import { getAgencyT } from "../messages";
import { useAgencyStore } from "../store";
import { ListingCard } from "./listing-card";
import { Reveal } from "./reveal";
import { container, h2Class, labelClass, rtlSafe, sectionPad } from "./styles";

// The current listings with the source's filter tabs. Goal: sales (browse, then open a property and ask for a viewing).
export function HomeListings({
  filter,
  onFilter,
}: {
  filter: HomeFilter;
  onFilter: (filter: HomeFilter) => void;
}) {
  const { config, locale } = useRealEstate();
  const t = getAgencyT(locale);
  const properties = useAgencyStore((state) => state.properties);

  const open = properties.filter((property) => propertyState(property) !== "sold_out");
  const shown = homeProperties(open, filter, config.areas, config.priceBands);
  const active = tabOf(filter);

  return (
    <section
      id="listings"
      aria-labelledby="listings-title"
      className={`${sectionPad} scroll-mt-20 overflow-x-clip`}
    >
      <div className={container}>
        <Reveal className="mb-[46px] flex flex-wrap items-end justify-between gap-[30px] max-[640px]:mb-[30px]">
          <div>
            <p className={`${labelClass} mb-[22px] text-(--re-accent)`}>{t("featured.eyebrow")}</p>
            <h2 id="listings-title" className={h2Class}>
              {t("featured.title")}
            </h2>
          </div>
          <div role="group" aria-label={t("featured.filterLabel")} className="flex flex-wrap gap-2">
            {homeTabs.map((tab) => (
              <button
                key={tab}
                type="button"
                aria-pressed={active === tab}
                onClick={() => onFilter(filterForTab(tab))}
                className={`cursor-pointer rounded-full border border-border px-[22px] py-2.5 text-[10px] uppercase tracking-[0.2em] text-text transition-[background-color,border-color,color] duration-300 hover:border-text aria-pressed:border-primary aria-pressed:bg-primary aria-pressed:text-on-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus ${rtlSafe}`}
              >
                {t(`featured.tabs.${tab}`)}
              </button>
            ))}
          </div>
        </Reveal>
        {shown.length > 0 ? (
          <ul className="grid grid-cols-4 gap-6 max-[1024px]:grid-cols-2 max-[640px]:grid-cols-1">
            {shown.map((property) => (
              <li key={property.id}>
                <Reveal className="h-full">
                  <ListingCard property={property} />
                </Reveal>
              </li>
            ))}
          </ul>
        ) : (
          <p role="status" className="py-[30px] text-muted">
            {t("featured.none")}
          </p>
        )}
      </div>
    </section>
  );
}
