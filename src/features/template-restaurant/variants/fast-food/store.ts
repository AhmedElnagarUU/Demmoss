import { createTemplateStore } from "@/features/demo-engine/storage/create-template-store";
import { createAreasActions } from "../../modules/areas/store-slice";
import { createOffersActions } from "../../modules/offers/store-slice";
import { createOrdersActions } from "../../modules/orders/store-slice";
import { createSharedActions } from "../../shared-slice";
import { fastFoodSchema } from "./data";
import { createFastFoodSeed } from "./seed";
import { FAST_FOOD_SLUG } from "./slug";

// Saved data with another version is replaced by the new seed (the account is kept). Bump it when the shape changes.
export const FAST_FOOD_VERSION = 1;

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
