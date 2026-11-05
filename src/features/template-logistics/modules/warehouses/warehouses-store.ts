import type { StoreWith } from "../../logistics-store";
import type { WarehousesActions } from "./store-slice";
import type { WarehousesData } from "./types";

export type WarehousesStore = StoreWith<WarehousesData & WarehousesActions>;
export type WarehouseListStore = StoreWith<WarehousesData>;
