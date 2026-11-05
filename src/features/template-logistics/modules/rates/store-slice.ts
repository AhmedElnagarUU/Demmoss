import type { SetData } from "../../shared-slice";
import type { TransportMode } from "../../types";
import type { ModeRate, RatesData } from "./types";

export type RatesActions = {
  updateModeRate: (mode: TransportMode, patch: Partial<Omit<ModeRate, "mode">>) => void;
};

export function createRatesActions(set: SetData<RatesData>): RatesActions {
  return {
    updateModeRate: (mode, patch) =>
      set((state) => ({
        rates: {
          ...state.rates,
          modes: state.rates.modes.map((item) => (item.mode === mode ? { ...item, ...patch } : item)),
        },
      })),
  };
}
