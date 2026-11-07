import type { Area, PriceBand } from "../../listings";

// The four neighbourhoods of the source design ("Where we work"). The ids are stored in each property.
export const agencyAreas: readonly Area[] = [
  { id: "riverside", name: { ar: "ريفرسايد", en: "Riverside" } },
  { id: "old-town", name: { ar: "المدينة القديمة", en: "Old Town" } },
  { id: "hillcrest", name: { ar: "هيلكريست", en: "Hillcrest" } },
  { id: "harbour", name: { ar: "حي الميناء", en: "Harbour District" } },
];

// Sale prices are in SAR; rent prices are SAR per year. The labels are in the shared messages (band.<id>).
// The source's dollar bands (up to $500k, $500k-1M, $1M-2M, $2M+) in rounded riyals.
export const agencyPriceBands: readonly PriceBand[] = [
  { id: "sale-1", purpose: "sale", max: 2_000_000 },
  { id: "sale-2", purpose: "sale", min: 2_000_001, max: 4_000_000 },
  { id: "sale-3", purpose: "sale", min: 4_000_001, max: 8_000_000 },
  { id: "sale-4", purpose: "sale", min: 8_000_001 },
  { id: "rent-1", purpose: "rent", max: 140_000 },
  { id: "rent-2", purpose: "rent", min: 140_001, max: 180_000 },
  { id: "rent-3", purpose: "rent", min: 180_001 },
];
