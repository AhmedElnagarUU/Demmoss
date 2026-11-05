import type { Area, PriceBand } from "../../listings";

// The projects' locations. A residence stores one of these ids.
export const developerAreas: readonly Area[] = [
  { id: "obhur", name: { ar: "أبحر الشمالية، جدة", en: "Obhur, Jeddah" } },
  { id: "al-hada", name: { ar: "الهدا، الطائف", en: "Al Hada, Taif" } },
  { id: "al-shati", name: { ar: "الشاطئ، جدة", en: "Al Shati, Jeddah" } },
];

// Starting prices in SAR. The labels are in the shared messages (band.<id>).
export const developerPriceBands: readonly PriceBand[] = [
  { id: "dev-1", purpose: "sale", max: 3_000_000 },
  { id: "dev-2", purpose: "sale", min: 3_000_001, max: 4_000_000 },
  { id: "dev-3", purpose: "sale", min: 4_000_001 },
];
