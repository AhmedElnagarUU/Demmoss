import type { DashboardModule } from "@/features/demo-engine/dashboard-shell/dashboard-context";
import type { LogisticsConfig } from "../../dashboard/logistics-context";
import { freightFontClassName, freightFontFamily } from "./fonts";
import { useOverview } from "./overview";
import { freightPalettes } from "./palettes";
import { FREIGHT_ROOT, FREIGHT_SLUG } from "./slug";

// The shared dashboard + these variant modules, and nothing else.
export const freightModules: readonly DashboardModule[] = [
  { path: "shipments", label: { ar: "الشحنات والتتبع", en: "Shipments & tracking" } },
  { path: "rates", label: { ar: "أسعار الحاسبة", en: "Calculator rates" } },
];

export const freightConfig: LogisticsConfig = {
  slug: FREIGHT_SLUG,
  templateName: "Orbis Cargo",
  basePath: FREIGHT_ROOT,
  palettes: freightPalettes,
  fontClassName: freightFontClassName,
  fontFamily: freightFontFamily,
  modules: freightModules,
  useOverview,
};
