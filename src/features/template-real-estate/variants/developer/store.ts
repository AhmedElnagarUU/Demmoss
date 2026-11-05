import { createTemplateStore } from "@/features/demo-engine/storage/create-template-store";
import { createInquiriesActions } from "../../modules/inquiries/store-slice";
import { createUnitsActions } from "../../modules/units/store-slice";
import { createViewingsActions } from "../../modules/viewings/store-slice";
import { createSharedActions } from "../../shared-slice";
import { realEstateDataSchema } from "../../types";
import { createDeveloperSeed } from "./seed";
import { DEVELOPER_SLUG } from "./slug";

// Saved data with another version is replaced by the new seed (the account is kept). Bump it when the shape changes.
export const DEVELOPER_VERSION = 1;

// The developer stores the shared real estate data; its units live inside each residence.
export const useDeveloperStore = createTemplateStore({
  slug: DEVELOPER_SLUG,
  version: DEVELOPER_VERSION,
  schema: realEstateDataSchema,
  createSeed: createDeveloperSeed,
  actions: (set) => ({
    ...createSharedActions(set),
    ...createViewingsActions(set),
    ...createInquiriesActions(set),
    ...createUnitsActions(set),
  }),
});
