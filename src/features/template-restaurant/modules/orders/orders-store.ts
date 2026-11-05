import type { HydratableStore } from "@/features/demo-engine/storage/use-hydrated";
import type { RestaurantState } from "../../restaurant-store";
import type { AreasActions } from "../areas/store-slice";
import type { AreasData } from "../areas/types";
import type { OffersActions } from "../offers/store-slice";
import type { OffersData } from "../offers/types";
import type { OrdersActions } from "./store-slice";
import type { OrdersData } from "./types";

// What the ordering modules (orders, offers, areas) need from a variant store.
export type OrderingState = RestaurantState &
  OrdersData &
  OffersData &
  AreasData &
  OrdersActions &
  OffersActions &
  AreasActions;

export type OrderingStore = HydratableStore & (<T>(selector: (state: OrderingState) => T) => T);
