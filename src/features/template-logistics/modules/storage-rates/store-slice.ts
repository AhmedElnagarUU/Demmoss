import type { SetData } from "../../shared-slice";
import type { StorageRates, StorageRatesData } from "./types";

export type StorageRatesActions = {
  updateStorageRates: (patch: Partial<StorageRates>) => void;
};

export function createStorageRatesActions(set: SetData<StorageRatesData>): StorageRatesActions {
  return {
    updateStorageRates: (patch) => set((state) => ({ storageRates: { ...state.storageRates, ...patch } })),
  };
}
