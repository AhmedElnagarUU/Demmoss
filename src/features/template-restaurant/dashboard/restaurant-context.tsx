"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { LocalizedText } from "@/features/demo-engine/types";
import type { Palette } from "@/features/demo-engine/palettes/palette";
import type { Locale } from "@/shared/i18n/config";
import type { Customer } from "../customers";
import type { RestaurantStore } from "../restaurant-store";
import type { TipFact } from "../value-tips";

export type OverviewCard = { id: string; label: string; value: string };
export type ActivityItem = { id: string; text: string; at: string };

// What a variant shows on the Overview page, built from its own module data.
export type Overview = { cards: OverviewCard[]; activity: ActivityItem[]; tips: TipFact[] };

export type DashboardModule = { path: string; label: LocalizedText };

// Everything the shared dashboard needs to know about a variant.
export type RestaurantConfig = {
  slug: string;
  // the demo's English name, used in the WhatsApp message to the agency
  templateName: string;
  // route of the variant without the locale, e.g. "/demos/restaurant/fine-dining"
  basePath: string;
  palettes: readonly Palette[];
  // variant modules, listed in the sidebar between Overview and Menu
  modules: readonly DashboardModule[];
  // variant hooks: they read the variant's own store (reservations, orders…)
  useOverview: (locale: Locale) => Overview;
  useCustomers: () => Customer[];
};

type RestaurantContextValue = { store: RestaurantStore; config: RestaurantConfig; locale: Locale };

const RestaurantContext = createContext<RestaurantContextValue | null>(null);

export function RestaurantProvider({
  store,
  config,
  locale,
  children,
}: RestaurantContextValue & { children: ReactNode }) {
  return <RestaurantContext value={{ store, config, locale }}>{children}</RestaurantContext>;
}

export function useRestaurant(): RestaurantContextValue {
  const value = useContext(RestaurantContext);
  if (!value) throw new Error("useRestaurant must be used inside RestaurantProvider");
  return value;
}
