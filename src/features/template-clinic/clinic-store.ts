import type { EngineActions } from "@/features/demo-engine/storage/create-template-store";
import type { StoreOf } from "@/features/demo-engine/storage/use-hydrated";
import type { AppointmentsActions } from "./modules/appointments/store-slice";
import type { SharedActions } from "./shared-slice";
import type { ClinicData } from "./types";

// What the shared dashboard and the shared site parts need from a variant store.
// Any variant store (it has more data and actions) fits this type.
export type ClinicState = ClinicData & SharedActions & AppointmentsActions & EngineActions;

export type ClinicStore = StoreOf<ClinicState>;
