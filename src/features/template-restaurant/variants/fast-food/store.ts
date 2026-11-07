import { createTemplateStore } from "@/features/demo-engine/storage/create-template-store";
import { createAreasActions } from "../../modules/areas/store-slice";
import { createOffersActions } from "../../modules/offers/store-slice";
import { createOrdersActions } from "../../modules/orders/store-slice";
import { createSharedActions } from "../../shared-slice";
import { fastFoodSchema } from "./data";
import { createFastFoodSeed } from "./seed";
import { FAST_FOOD_SLUG } from "./slug";

// Saved data with another version is replaced by the new seed (the account is kept). Bump it when the shape changes.
// Version 2: the business and content changed from Smash Lab burgers to Sole Trattoria pizza & pasta.
export const FAST_FOOD_VERSION = 2;

export const useFastFoodStore = createTemplateStore({
  slug: FAST_FOOD_SLUG,
  version: FAST_FOOD_VERSION,
  schema: fastFoodSchema,
  createSeed: createFastFoodSeed,
  actions: (set, get) => ({
    ...createSharedActions(set),
    ...createOrdersActions(set, get),
    ...createOffersActions(set),
    ...createAreasActions(set),
  }),
});
