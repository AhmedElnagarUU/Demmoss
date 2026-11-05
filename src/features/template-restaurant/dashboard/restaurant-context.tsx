"use client";

import type { Palette } from "@/features/demo-engine/palettes/palette";
import {
  createVariantContext,
  type ActivityItem,
  type DashboardModule,
  type OverviewCard,
} from "@/features/demo-engine/dashboard-shell/dashboard-context";
import type { Locale } from "@/shared/i18n/config";
import type { Customer } from "../customers";
import type { LibraryPhoto } from "../images";
import type { RestaurantStore } from "../restaurant-store";
import type { TipFact } from "../value-tips";

// What a variant shows on the Overview page, built from its own module data.
export type Overview = { cards: OverviewCard[]; activity: ActivityItem[]; tips: TipFact[] };

// Everything the shared dashboard needs to know about a variant.
export type RestaurantConfig = {
  slug: string;
  // the demo's English name, used in the WhatsApp message to the agency
  templateName: string;
  // route of the variant without the locale, e.g. "/demos/restaurant/fine-dining"
  basePath: string;
  palettes: readonly Palette[];
  // the variant's photo library: what the Menu and Content pickers offer
  photos: readonly LibraryPhoto[];
  // variant modules, listed in the sidebar between Overview and Menu
  modules: readonly DashboardModule[];
  // variant hooks: they read the variant's own store (reservations, orders…)
  useOverview: (locale: Locale) => Overview;
  useCustomers: () => Customer[];
};

export const { Provider: RestaurantProvider, useVariant: useRestaurant } = createVariantContext<
  RestaurantStore,
  RestaurantConfig
>("Restaurant");
