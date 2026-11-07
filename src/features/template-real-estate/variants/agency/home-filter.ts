import { filterProperties, type Area, type PriceBand } from "../../listings";
import type { Property, PropertyType, Purpose } from "../../types";

// The home page shows the listings with the source design's filter tabs (All / Houses / Apartments / Villas / For rent)
// and the hero search (Buy or Rent, location, type, price). Both end in the same filter, kept here as plain functions.

export type HomeTab = "all" | "house" | "apartment" | "villa" | "rent";
export const homeTabs: readonly HomeTab[] = ["all", "house", "apartment", "villa", "rent"];

// "house" in the design is the townhouse type of the shared real estate data.
export const homeTypes = ["townhouse", "apartment", "villa"] as const satisfies readonly PropertyType[];
export type HomeType = (typeof homeTypes)[number];

export type HomeFilter = { purpose: Purpose | ""; type: HomeType | ""; area: string; band: string };

export const noFilter: HomeFilter = { purpose: "", type: "", area: "", band: "" };

// A house, apartment or villa tab shows what is for sale; the rent tab shows every rental.
export function filterForTab(tab: HomeTab): HomeFilter {
  if (tab === "rent") return { ...noFilter, purpose: "rent" };
  if (tab === "house") return { ...noFilter, purpose: "sale", type: "townhouse" };
  if (tab === "apartment" || tab === "villa") return { ...noFilter, purpose: "sale", type: tab };
  return noFilter;
}

export function tabOf(filter: HomeFilter): HomeTab {
  if (filter.purpose === "rent") return "rent";
  if (filter.type === "townhouse") return "house";
  if (filter.type === "apartment" || filter.type === "villa") return filter.type;
  return "all";
}

export function homeProperties(
  properties: readonly Property[],
  filter: HomeFilter,
  areas: readonly Area[],
  bands: readonly PriceBand[],
): Property[] {
  const band = bands.find((item) => item.id === filter.band && item.purpose === filter.purpose);
  return filterProperties(
    properties,
    {
      ...(filter.purpose ? { purpose: filter.purpose } : {}),
      ...(filter.type ? { type: filter.type } : {}),
      ...(filter.area ? { area: filter.area } : {}),
      ...(band?.min !== undefined ? { minPrice: band.min } : {}),
      ...(band?.max !== undefined ? { maxPrice: band.max } : {}),
    },
    areas,
  );
}
