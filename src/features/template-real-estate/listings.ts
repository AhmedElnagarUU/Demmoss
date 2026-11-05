import type { LocalizedText } from "@/features/demo-engine/types";
import { propertyState } from "./availability";
import { purposes, propertyTypes, type Property, type PropertyType, type Purpose } from "./types";

// Search, filter, and sort of properties: pure functions used by the Listings / Residences pages and the home search.

export type Area = { id: string; name: LocalizedText };

// min and max are inclusive; a band without max is open ended
export type PriceBand = { id: string; purpose: Purpose; min?: number; max?: number };

export type SortId = "featured" | "priceAsc" | "priceDesc";
export const sortIds: readonly SortId[] = ["featured", "priceAsc", "priceDesc"];

export type PropertyFilter = {
  purpose?: Purpose;
  type?: PropertyType;
  area?: string;
  minPrice?: number;
  maxPrice?: number;
  minBedrooms?: number;
  query?: string;
  availableOnly?: boolean;
};

export function filterProperties(
  properties: readonly Property[],
  filter: PropertyFilter,
  areas: readonly Area[],
): Property[] {
  const words = (filter.query ?? "").toLowerCase().split(/\s+/).filter(Boolean);
  return properties.filter((property) => {
    if (filter.purpose && property.purpose !== filter.purpose) return false;
    if (filter.type && property.type !== filter.type) return false;
    if (filter.area && property.area !== filter.area) return false;
    if (filter.minPrice !== undefined && property.price < filter.minPrice) return false;
    if (filter.maxPrice !== undefined && property.price > filter.maxPrice) return false;
    if (filter.minBedrooms !== undefined && property.bedrooms < filter.minBedrooms) return false;
    if (filter.availableOnly && propertyState(property) !== "available") return false;
    if (words.length > 0) {
      const area = areas.find((item) => item.id === property.area);
      const text = [property.title.ar, property.title.en, area?.name.ar, area?.name.en]
        .join(" ")
        .toLowerCase();
      return words.every((word) => text.includes(word));
    }
    return true;
  });
}

// "featured" keeps the owner's order with featured properties first.
export function sortProperties(properties: readonly Property[], sort: SortId): Property[] {
  const sorted = [...properties];
  if (sort === "priceAsc") return sorted.sort((a, b) => a.price - b.price);
  if (sort === "priceDesc") return sorted.sort((a, b) => b.price - a.price);
  return sorted.sort((a, b) => Number(b.featured) - Number(a.featured));
}

// What the filter controls hold. "" means "any".
export type FilterState = {
  purpose: Purpose | "";
  type: PropertyType | "";
  area: string;
  band: string;
  bedrooms: string;
  query: string;
  availableOnly: boolean;
  sort: SortId;
};

export function emptyFilterState(purpose: Purpose | ""): FilterState {
  return { purpose, type: "", area: "", band: "", bedrooms: "", query: "", availableOnly: false, sort: "featured" };
}

export function toPropertyFilter(state: FilterState, bands: readonly PriceBand[]): PropertyFilter {
  const band = bands.find((item) => item.id === state.band && item.purpose === state.purpose);
  const bedrooms = Number(state.bedrooms);
  return {
    ...(state.purpose ? { purpose: state.purpose } : {}),
    ...(state.type ? { type: state.type } : {}),
    ...(state.area ? { area: state.area } : {}),
    ...(band?.min !== undefined ? { minPrice: band.min } : {}),
    ...(band?.max !== undefined ? { maxPrice: band.max } : {}),
    ...(bedrooms > 0 ? { minBedrooms: bedrooms } : {}),
    ...(state.query.trim() ? { query: state.query.trim() } : {}),
    ...(state.availableOnly ? { availableOnly: true } : {}),
  };
}

type ParamReader = { get: (name: string) => string | null };
type Allowed = { purposes: readonly Purpose[]; areas: readonly Area[]; bands: readonly PriceBand[] };

// The home search sends its choices in the URL; unknown values are ignored, never trusted.
export function filterStateFromParams(params: ParamReader, allowed: Allowed): FilterState {
  const asked = purposes.find((item) => item === params.get("purpose") && allowed.purposes.includes(item));
  // a variant that sells only has no purpose choice; otherwise "any" until the visitor picks one
  const only = allowed.purposes.length === 1 ? allowed.purposes[0] : undefined;
  const state = emptyFilterState(only ?? asked ?? "");
  const type = propertyTypes.find((item) => item === params.get("type"));
  const area = allowed.areas.find((item) => item.id === params.get("area"));
  const band = allowed.bands.find((item) => item.id === params.get("band") && item.purpose === state.purpose);
  return {
    ...state,
    ...(type ? { type } : {}),
    ...(area ? { area: area.id } : {}),
    ...(band ? { band: band.id } : {}),
    query: (params.get("q") ?? "").slice(0, 60),
  };
}
