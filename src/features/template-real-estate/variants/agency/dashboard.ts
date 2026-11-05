import { propertyState } from "../../availability";
import type { DashboardModule, RealEstateConfig } from "../../context";
import { formatNumber } from "../../format";
import { getRealEstateT } from "../../messages";
import { agencyAreas, agencyPriceBands } from "./areas";
import { agencyPhotos } from "./photos";
import { agencyPalettes } from "./palettes";
import { AGENCY_SLUG } from "./slug";
import { useAgencyStore } from "./store";

// The shared dashboard + these variant modules, and nothing else.
export const agencyModules: readonly DashboardModule[] = [{ path: "agents", label: { ar: "الوكلاء", en: "Agents" } }];

export const agencyConfig: RealEstateConfig = {
  slug: AGENCY_SLUG,
  templateName: "Dar Al Manzil",
  basePath: "/demos/real-estate/agency",
  listingsSegment: "listings",
  palettes: agencyPalettes,
  photos: agencyPhotos,
  areas: agencyAreas,
  purposes: ["sale", "rent"],
  types: ["apartment", "villa", "townhouse"],
  priceBands: agencyPriceBands,
  unitsDriveStatus: false,
  mortgageCalculator: true,
  modules: agencyModules,
  useHighlightCard: (locale) => {
    const properties = useAgencyStore((state) => state.properties);
    const active = properties.filter((property) => propertyState(property) !== "sold_out").length;
    return {
      id: "activeListings",
      label: getRealEstateT(locale)("overview.activeListings"),
      value: formatNumber(active, locale),
    };
  },
  useExtraTips: () => [],
  useAgentOptions: () => {
    const agents = useAgencyStore((state) => state.agents);
    return agents.map((agent) => ({ id: agent.id, name: agent.name }));
  },
};
