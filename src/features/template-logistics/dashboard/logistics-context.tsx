"use client";

import type { Palette } from "@/features/demo-engine/palettes/palette";
import {
  createVariantContext,
  type ActivityItem,
  type DashboardModule,
  type OverviewCard,
} from "@/features/demo-engine/dashboard-shell/dashboard-context";
import type { Locale } from "@/shared/i18n/config";
import type { LogisticsStore } from "../logistics-store";
import type { TipFact } from "../value-tips";

// What a variant shows on the Overview page, built from its own module data.
export type Overview = { cards: OverviewCard[]; activity: ActivityItem[]; tips: TipFact[] };

// Everything the shared dashboard needs to know about a variant.
export type LogisticsConfig = {
  slug: string;
  // the demo's English name, used in the WhatsApp message to the agency
  templateName: string;
  // route of the variant without the locale, e.g. "/demos/logistics/freight"
  basePath: string;
  palettes: readonly Palette[];
  fontClassName: string;
  fontFamily: string;
  // variant modules, listed in the sidebar after Quotes
  modules: readonly DashboardModule[];
  // variant hook: reads the variant's own store (shipments, warehouses…)
  useOverview: (locale: Locale) => Overview;
};

export const { Provider: LogisticsProvider, useVariant: useLogistics } = createVariantContext<
  LogisticsStore,
  LogisticsConfig
>("Logistics");
