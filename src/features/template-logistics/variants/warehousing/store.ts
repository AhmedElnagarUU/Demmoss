import { createTemplateStore } from "@/features/demo-engine/storage/create-template-store";
import { createCaseStudiesActions } from "../../modules/case-studies/store-slice";
import { createStorageRatesActions } from "../../modules/storage-rates/store-slice";
import { createWarehousesActions } from "../../modules/warehouses/store-slice";
import { createSharedActions } from "../../shared-slice";
import { warehousingSchema } from "./data";
import { createWarehousingSeed } from "./seed";
import { WAREHOUSING_SLUG } from "./slug";

// Saved data with another version is replaced by the new seed (the account is kept). Bump it when the shape changes.
export const WAREHOUSING_VERSION = 1;

export const useWarehousingStore = createTemplateStore({
  slug: WAREHOUSING_SLUG,
  version: WAREHOUSING_VERSION,
  schema: warehousingSchema,
  createSeed: createWarehousingSeed,
  actions: (set) => ({
    ...createSharedActions(set),
    ...createWarehousesActions(set),
    ...createStorageRatesActions(set),
    ...createCaseStudiesActions(set),
  }),
});
