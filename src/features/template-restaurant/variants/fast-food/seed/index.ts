import type { FastFoodData } from "../data";
import { seedContent, seedReviews, seedSettings } from "./content";
import { seedMenu } from "./menu";
import { createSampleOrders, seedAreas, seedOffers } from "./sample-data";

// The starting point of the demo: also what "Reset demo" restores (the account is kept by the engine).
export function createFastFoodSeed(now: Date): FastFoodData {
  return {
    account: null,
    settings: seedSettings,
    content: seedContent,
    menu: seedMenu,
    reviews: seedReviews,
    dismissedTips: [],
    cart: [],
    orders: createSampleOrders(now),
    offers: seedOffers,
    areas: seedAreas,
  };
}
