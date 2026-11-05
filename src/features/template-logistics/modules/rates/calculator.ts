import type { TransportMode } from "../../types";
import type { Rates } from "./types";

export const PRICE_RANGE_UPLIFT = 0.15;

export type FreightInput = {
  mode: TransportMode;
  originId: string;
  destinationId: string;
  weightKg: number;
  volumeCbm: number;
};

export type FreightQuote = {
  chargeableKg: number;
  minCost: number;
  maxCost: number;
  daysMin: number;
  daysMax: number;
  minimumApplied: boolean;
};

// Chargeable weight = the larger of the real weight and the volume weight of the mode.
// Cost = chargeable kg × rate per kg × origin factor × destination factor, never below the minimum charge.
// The estimate runs from that cost up to 15% more. No weight and no volume: no estimate.
export function calculateFreight(rates: Rates, input: FreightInput): FreightQuote | null {
  const weight = Math.max(input.weightKg || 0, 0);
  const volume = Math.max(input.volumeCbm || 0, 0);
  if (weight === 0 && volume === 0) return null;

  const mode = rates.modes.find((item) => item.mode === input.mode);
  const origin = rates.origins.find((item) => item.id === input.originId);
  const destination = rates.destinations.find((item) => item.id === input.destinationId);
  if (!mode || !origin || !destination) return null;

  const chargeableKg = Math.max(weight, volume * mode.volumetricKgPerCbm);
  const raw = chargeableKg * mode.ratePerKg * origin.factor * destination.factor;
  const minimumApplied = raw < mode.minimumCharge;
  const base = Math.max(raw, mode.minimumCharge);

  return {
    chargeableKg: Math.round(chargeableKg),
    minCost: Math.round(base),
    maxCost: Math.round(base * (1 + PRICE_RANGE_UPLIFT)),
    daysMin: mode.daysMin + destination.extraDays,
    daysMax: mode.daysMax + destination.extraDays,
    minimumApplied,
  };
}
