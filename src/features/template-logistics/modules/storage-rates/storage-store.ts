import type { StoreWith } from "../../logistics-store";
import type { StorageRatesActions } from "./store-slice";
import type { StorageRatesData } from "./types";

export type StorageRatesStore = StoreWith<StorageRatesData & StorageRatesActions>;
export type EstimatorStore = StoreWith<StorageRatesData>;
