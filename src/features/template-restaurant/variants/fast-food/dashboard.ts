import type { DashboardModule } from "@/features/demo-engine/dashboard-shell/dashboard-context";
import type { RestaurantConfig } from "../../dashboard/restaurant-context";
import { fastFoodPalettes } from "./palettes";
import { fastFoodPhotos } from "./photos";
import { useCustomers, useOverview } from "./overview";
import { FAST_FOOD_SLUG } from "./slug";

// The shared dashboard + these variant modules, and nothing else.
export const fastFoodModules: readonly DashboardModule[] = [
  { path: "orders", label: { ar: "الطلبات", en: "Orders" } },
  { path: "offers", label: { ar: "العروض", en: "Offers" } },
  { path: "areas", label: { ar: "مناطق التوصيل", en: "Delivery areas" } },
];

export const fastFoodConfig: RestaurantConfig = {
  slug: FAST_FOOD_SLUG,
  templateName: "Smash Lab",
  basePath: "/demos/restaurant/fast-food",
  palettes: fastFoodPalettes,
  photos: fastFoodPhotos,
  modules: fastFoodModules,
  useOverview,
  useCustomers,
};
