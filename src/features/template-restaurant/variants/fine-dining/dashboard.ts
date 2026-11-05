import type { DashboardModule, RestaurantConfig } from "../../dashboard/restaurant-context";
import { fineDiningPalettes } from "./palettes";
import { useCustomers, useOverview } from "./overview";
import { FINE_DINING_SLUG } from "./slug";

// The shared dashboard + these variant modules, and nothing else.
export const fineDiningModules: readonly DashboardModule[] = [
  { path: "reservations", label: { ar: "الحجوزات", en: "Reservations" } },
  { path: "events", label: { ar: "طلبات المناسبات", en: "Event requests" } },
];

export const fineDiningConfig: RestaurantConfig = {
  slug: FINE_DINING_SLUG,
  templateName: "Zaytouna",
  basePath: "/demos/restaurant/fine-dining",
  palettes: fineDiningPalettes,
  modules: fineDiningModules,
  useOverview,
  useCustomers,
};
