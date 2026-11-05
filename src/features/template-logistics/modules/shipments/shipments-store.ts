import type { StoreWith } from "../../logistics-store";
import type { RatesData } from "../rates/types";
import type { ShipmentsActions } from "./store-slice";
import type { ShipmentsData } from "./types";

// What the shipments module needs from a variant store (it also reads the rates to offer routes).
export type ShipmentsStore = StoreWith<ShipmentsData & ShipmentsActions & RatesData>;
export type TrackerStore = StoreWith<ShipmentsData>;
