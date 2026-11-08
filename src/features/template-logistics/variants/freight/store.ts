import { createTemplateStore } from "@/features/demo-engine/storage/create-template-store";
import { createRatesActions } from "../../modules/rates/store-slice";
import { createShipmentsActions } from "../../modules/shipments/store-slice";
import { createSharedActions } from "../../shared-slice";
import { freightSchema } from "./data";
import { createFreightSeed } from "./seed";
import { FREIGHT_SLUG } from "./slug";

// Saved data with another version is replaced by the new seed (the account is kept). Bump it when the shape changes.
export const FREIGHT_VERSION = 2;

export const useFreightStore = createTemplateStore({
  slug: FREIGHT_SLUG,
  version: FREIGHT_VERSION,
  schema: freightSchema,
  createSeed: createFreightSeed,
  actions: (set) => ({
    ...createSharedActions(set),
    ...createShipmentsActions(set),
    ...createRatesActions(set),
  }),
});
