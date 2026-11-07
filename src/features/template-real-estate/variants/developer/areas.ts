import type { Area, PriceBand } from "../../listings";

// The residences' locations (the source's). A residence stores one of these ids.
export const developerAreas: readonly Area[] = [
  { id: "hallmark-ridge", name: { ar: "هالمارك ريدج", en: "Hallmark Ridge" } },
  { id: "aurelia-tower", name: { ar: "برج أوريليا، وسط المدينة", en: "Aurelia Tower, Downtown" } },
  { id: "cape-linden", name: { ar: "كيب ليندن", en: "Cape Linden" } },
  { id: "pinewood-reserve", name: { ar: "محمية باينوود", en: "Pinewood Reserve" } },
  { id: "marlowe-heights", name: { ar: "مارلو هايتس", en: "Marlowe Heights" } },
  { id: "harbour-point", name: { ar: "هاربر بوينت", en: "Harbour Point" } },
];

// Starting prices in SAR. The labels are in the shared messages (band.<id>).
export const developerPriceBands: readonly PriceBand[] = [
  { id: "dev-1", purpose: "sale", max: 12_000_000 },
  { id: "dev-2", purpose: "sale", min: 12_000_001, max: 14_000_000 },
  { id: "dev-3", purpose: "sale", min: 14_000_001 },
];
