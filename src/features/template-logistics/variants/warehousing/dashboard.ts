import type { DashboardModule, LogisticsConfig } from "../../dashboard/logistics-context";
import { warehousingFontClassName, warehousingFontFamily } from "./fonts";
import { useOverview } from "./overview";
import { warehousingPalettes } from "./palettes";
import { WAREHOUSING_ROOT, WAREHOUSING_SLUG } from "./slug";

// The shared dashboard + these variant modules, and nothing else.
export const warehousingModules: readonly DashboardModule[] = [
  { path: "warehouses", label: { ar: "المستودعات", en: "Warehouses" } },
  { path: "storage-rates", label: { ar: "أسعار التخزين", en: "Storage rates" } },
  { path: "case-studies", label: { ar: "قصص النجاح", en: "Case studies" } },
];

export const warehousingConfig: LogisticsConfig = {
  slug: WAREHOUSING_SLUG,
  templateName: "Makhzan 3PL",
  basePath: WAREHOUSING_ROOT,
  palettes: warehousingPalettes,
  fontClassName: warehousingFontClassName,
  fontFamily: warehousingFontFamily,
  modules: warehousingModules,
  useOverview,
};
