import type { HydratableStore } from "@/features/demo-engine/storage/use-hydrated";
import type { RestaurantState } from "../../restaurant-store";
import type { EventRequestsActions } from "./store-slice";
import type { EventRequestsData } from "./types";

// What the event-requests module needs from a variant store.
export type EventRequestsState = RestaurantState & EventRequestsData & EventRequestsActions;

export type EventRequestsStore = HydratableStore & (<T>(selector: (state: EventRequestsState) => T) => T);
