import { createTemplateStore } from "@/features/demo-engine/storage/create-template-store";
import { createAppointmentsActions } from "../../modules/appointments/store-slice";
import { createSharedActions } from "../../shared-slice";
import { clinicDataSchema } from "../../types";
import { createMedicalCentreSeed } from "./seed";
import { MEDICAL_CENTRE_SLUG } from "./slug";

// Saved data with another version is replaced by the new seed (the account is kept). Bump it when the shape changes.
export const MEDICAL_CENTRE_VERSION = 2;

export const useMedicalCentreStore = createTemplateStore({
  slug: MEDICAL_CENTRE_SLUG,
  version: MEDICAL_CENTRE_VERSION,
  schema: clinicDataSchema,
  createSeed: createMedicalCentreSeed,
  actions: (set) => ({
    ...createSharedActions(set),
    ...createAppointmentsActions(set),
  }),
});
