import type { EngineActions } from "@/features/demo-engine/storage/create-template-store";
import type { StoreOf } from "@/features/demo-engine/storage/use-hydrated";
import type { SharedActions } from "./shared-slice";
import type { RestaurantData } from "./types";

// What the shared dashboard and the shared site parts need from a variant store.
// Any variant store (it has more data and actions) fits this type.
export type RestaurantState = RestaurantData & SharedActions & EngineActions;

export type RestaurantStore = StoreOf<RestaurantState>;
