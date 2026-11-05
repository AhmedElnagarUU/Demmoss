import type { StoreWith } from "../../logistics-store";
import type { RatesActions } from "./store-slice";
import type { RatesData } from "./types";

export type RatesStore = StoreWith<RatesData & RatesActions>;
export type CalculatorStore = StoreWith<RatesData>;
