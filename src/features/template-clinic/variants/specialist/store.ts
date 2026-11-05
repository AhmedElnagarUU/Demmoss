import { createTemplateStore } from "@/features/demo-engine/storage/create-template-store";
import { createAppointmentsActions } from "../../modules/appointments/store-slice";
import { createSharedActions } from "../../shared-slice";
import { clinicDataSchema } from "../../types";
import { createSpecialistSeed } from "./seed";
import { SPECIALIST_SLUG } from "./slug";

// Saved data with another version is replaced by the new seed (the account is kept). Bump it when the shape changes.
export const SPECIALIST_VERSION = 1;

export const useSpecialistStore = createTemplateStore({
  slug: SPECIALIST_SLUG,
  version: SPECIALIST_VERSION,
  schema: clinicDataSchema,
  createSeed: createSpecialistSeed,
  actions: (set) => ({
    ...createSharedActions(set),
    ...createAppointmentsActions(set),
  }),
});
