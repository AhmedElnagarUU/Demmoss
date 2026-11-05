import { createTemplateStore } from "@/features/demo-engine/storage/create-template-store";
import { createEventRequestsActions } from "../../modules/event-requests/store-slice";
import { createReservationsActions } from "../../modules/reservations/store-slice";
import { createSharedActions } from "../../shared-slice";
import { fineDiningSchema } from "./data";
import { FINE_DINING_SLUG } from "./slug";
import { createFineDiningSeed } from "./seed";

// Saved data with another version is replaced by the new seed (the account is kept). Bump it when the shape changes.
export const FINE_DINING_VERSION = 1;

export const useFineDiningStore = createTemplateStore({
  slug: FINE_DINING_SLUG,
  version: FINE_DINING_VERSION,
  schema: fineDiningSchema,
  createSeed: createFineDiningSeed,
  actions: (set) => ({
    ...createSharedActions(set),
    ...createReservationsActions(set),
    ...createEventRequestsActions(set),
  }),
});
