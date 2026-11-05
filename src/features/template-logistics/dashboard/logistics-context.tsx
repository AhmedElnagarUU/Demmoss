"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { Palette } from "@/features/demo-engine/palettes/palette";
import type { LocalizedText } from "@/features/demo-engine/types";
import type { Locale } from "@/shared/i18n/config";
import type { LogisticsStore } from "../logistics-store";
import type { TipFact } from "../value-tips";

export type OverviewCard = { id: string; label: string; value: string };
export type ActivityItem = { id: string; text: string; at: string };
// What a variant shows on the Overview page, built from its own module data.
export type Overview = { cards: OverviewCard[]; activity: ActivityItem[]; tips: TipFact[] };

export type DashboardModule = { path: string; label: LocalizedText };

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

type LogisticsContextValue = { store: LogisticsStore; config: LogisticsConfig; locale: Locale };

const LogisticsContext = createContext<LogisticsContextValue | null>(null);

export function LogisticsProvider({
  store,
  config,
  locale,
  children,
}: LogisticsContextValue & { children: ReactNode }) {
  return <LogisticsContext value={{ store, config, locale }}>{children}</LogisticsContext>;
}

export function useLogistics(): LogisticsContextValue {
  const value = useContext(LogisticsContext);
  if (!value) throw new Error("useLogistics must be used inside LogisticsProvider");
  return value;
}
