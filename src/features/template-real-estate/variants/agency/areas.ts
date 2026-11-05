import type { Area, PriceBand } from "../../listings";

// Districts of north Riyadh where the agency works. The ids are stored in each property.
export const agencyAreas: readonly Area[] = [
  { id: "al-malqa", name: { ar: "الملقا", en: "Al Malqa" } },
  { id: "hittin", name: { ar: "حطين", en: "Hittin" } },
  { id: "al-yasmin", name: { ar: "الياسمين", en: "Al Yasmin" } },
  { id: "al-narjis", name: { ar: "النرجس", en: "Al Narjis" } },
  { id: "al-olaya", name: { ar: "العليا", en: "Al Olaya" } },
];

// Sale prices are in SAR; rent prices are SAR per year. The labels are in the shared messages (band.<id>).
export const agencyPriceBands: readonly PriceBand[] = [
  { id: "sale-1", purpose: "sale", max: 1_500_000 },
  { id: "sale-2", purpose: "sale", min: 1_500_001, max: 3_000_000 },
  { id: "sale-3", purpose: "sale", min: 3_000_001, max: 5_000_000 },
  { id: "sale-4", purpose: "sale", min: 5_000_001 },
  { id: "rent-1", purpose: "rent", max: 60_000 },
  { id: "rent-2", purpose: "rent", min: 60_001, max: 100_000 },
  { id: "rent-3", purpose: "rent", min: 100_001 },
];
