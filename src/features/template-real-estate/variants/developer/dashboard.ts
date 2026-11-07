import { unitCounts } from "../../availability";
import type { DashboardModule } from "@/features/demo-engine/dashboard-shell/dashboard-context";
import type { RealEstateConfig } from "../../context";
import { formatNumber } from "@/features/demo-engine/format/format";
import { getRealEstateT } from "../../messages";
import { developerAreas, developerPriceBands } from "./areas";
import { developerPalettes } from "./palettes";
import { developerPhotos } from "./photos";
import { DEVELOPER_SLUG } from "./slug";
import { useDeveloperStore } from "./store";

// The shared dashboard + these variant modules, and nothing else.
export const developerModules: readonly DashboardModule[] = [
  { path: "projects", label: { ar: "المشاريع والوحدات", en: "Projects & units" } },
];

export const developerConfig: RealEstateConfig = {
  slug: DEVELOPER_SLUG,
  templateName: "Solenne Estates",
  basePath: "/demos/real-estate/developer",
  listingsSegment: "residences",
  palettes: developerPalettes,
  photos: developerPhotos,
  areas: developerAreas,
  purposes: ["sale"],
  types: ["villa", "coastal", "penthouse"],
  priceBands: developerPriceBands,
  unitsDriveStatus: true,
  mortgageCalculator: false,
  modules: developerModules,
  useHighlightCard: (locale) => {
    const properties = useDeveloperStore((state) => state.properties);
    const available = properties.reduce((sum, property) => sum + unitCounts(property.units).available, 0);
    return {
      id: "availableUnits",
      label: getRealEstateT(locale)("overview.availableUnits"),
      value: formatNumber(available, locale),
    };
  },
  useAgentOptions: () => [],
};
