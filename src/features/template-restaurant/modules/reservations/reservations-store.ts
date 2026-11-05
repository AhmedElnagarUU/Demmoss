import type { HydratableStore } from "@/features/demo-engine/storage/use-hydrated";
import type { RestaurantState } from "../../restaurant-store";
import type { ReservationsActions } from "./store-slice";
import type { ReservationsData } from "./types";

// What the reservations module needs from a variant store.
export type ReservationsState = RestaurantState & ReservationsData & ReservationsActions;

export type ReservationsStore = HydratableStore & (<T>(selector: (state: ReservationsState) => T) => T);
