"use client";

import type { Palette } from "@/features/demo-engine/palettes/palette";
import {
  createVariantContext,
  type DashboardModule,
  type OverviewCard,
} from "@/features/demo-engine/dashboard-shell/dashboard-context";
import type { LocalizedText } from "@/features/demo-engine/types";
import type { Locale } from "@/shared/i18n/config";
import type { Area, PriceBand } from "./listings";
import type { RealEstateStore } from "./real-estate-store";
import type { Photo } from "./site/photo";
import type { PropertyType, Purpose } from "./types";

// Everything the shared site parts and the shared dashboard need to know about a variant.
export type RealEstateConfig = {
  slug: string;
  // the demo's English name, used in the WhatsApp message to the agency
  templateName: string;
  // route of the variant without the locale, e.g. "/demos/real-estate/agency"
  basePath: string;
  // "listings" (agency) or "residences" (developer): the page that lists properties
  listingsSegment: "listings" | "residences";
  palettes: readonly Palette[];
  photos: readonly Photo[];
  areas: readonly Area[];
  purposes: readonly Purpose[];
  types: readonly PropertyType[];
  priceBands: readonly PriceBand[];
  // developer: the status of a residence comes from its units, so Properties does not ask for it
  unitsDriveStatus: boolean;
  mortgageCalculator: boolean;
  // variant modules, listed in the sidebar after Inquiries
  modules: readonly DashboardModule[];
  // variant hooks: they read the variant's own store
  useHighlightCard: (locale: Locale) => OverviewCard;
  useAgentOptions: () => { id: string; name: LocalizedText }[];
};

export const { Provider: RealEstateProvider, useVariant: useRealEstate } = createVariantContext<
  RealEstateStore,
  RealEstateConfig
>("RealEstate");
