import type { EngineActions } from "@/features/demo-engine/storage/create-template-store";
import type { HydratableStore } from "@/features/demo-engine/storage/use-hydrated";
import type { InquiriesActions } from "./modules/inquiries/store-slice";
import type { ViewingsActions } from "./modules/viewings/store-slice";
import type { SharedActions } from "./shared-slice";
import type { RealEstateData } from "./types";

// What the shared dashboard and the shared site parts need from a variant store.
// Any variant store (it has more data and actions) fits this type.
export type RealEstateState = RealEstateData &
  SharedActions &
  ViewingsActions &
  InquiriesActions &
  EngineActions;

export type RealEstateStore = HydratableStore & (<T>(selector: (state: RealEstateState) => T) => T);
