"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { Locale } from "@/shared/i18n/config";
import type { LocalizedText } from "../types";

// Types every category dashboard uses for its sidebar and Overview page.
export type DashboardModule = { path: string; label: LocalizedText };
export type OverviewCard = { id: string; label: string; value: string };
export type ActivityItem = { id: string; text: string; at: string };

// Gives a category's dashboard pages their variant's store, config, and locale without passing props down.
// Each category calls this once, e.g. `createVariantContext<RestaurantStore, RestaurantConfig>("Restaurant")`.
export function createVariantContext<Store, Config>(name: string) {
  type Value = { store: Store; config: Config; locale: Locale };
  const Context = createContext<Value | null>(null);

  function Provider({ store, config, locale, children }: Value & { children: ReactNode }) {
    return <Context value={{ store, config, locale }}>{children}</Context>;
  }

  function useVariant(): Value {
    const value = useContext(Context);
    if (!value) throw new Error(`use${name} must be used inside ${name}Provider`);
    return value;
  }

  return { Provider, useVariant };
}
