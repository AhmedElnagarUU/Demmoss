import { createTemplateStore } from "@/features/demo-engine/storage/create-template-store";
import { createAgentsActions } from "../../modules/agents/store-slice";
import { createInquiriesActions } from "../../modules/inquiries/store-slice";
import { createViewingsActions } from "../../modules/viewings/store-slice";
import { createSharedActions } from "../../shared-slice";
import { agencySchema } from "./data";
import { createAgencySeed } from "./seed";
import { AGENCY_SLUG } from "./slug";

// Saved data with another version is replaced by the new seed (the account is kept). Bump it when the shape changes.
export const AGENCY_VERSION = 1;

export const useAgencyStore = createTemplateStore({
  slug: AGENCY_SLUG,
  version: AGENCY_VERSION,
  schema: agencySchema,
  createSeed: createAgencySeed,
  actions: (set) => ({
    ...createSharedActions(set),
    ...createViewingsActions(set),
    ...createInquiriesActions(set),
    ...createAgentsActions(set),
  }),
});
