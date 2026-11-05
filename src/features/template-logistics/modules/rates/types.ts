import { z } from "zod";
import { localizedTextSchema } from "@/features/demo-engine/types";
import { transportModeSchema } from "../../types";

// What the owner edits for the freight calculator, in SAR.
export const modeRateSchema = z.object({
  mode: transportModeSchema,
  ratePerKg: z.number().min(0),
  // chargeable weight of one cubic metre: a light, bulky cargo is charged by its volume
  volumetricKgPerCbm: z.number().min(1),
  minimumCharge: z.number().min(0),
  daysMin: z.number().int().min(1),
  daysMax: z.number().int().min(1),
});

export const originSchema = z.object({
  id: z.string().min(1),
  name: localizedTextSchema,
  factor: z.number().min(0.1),
});

export const destinationSchema = originSchema.extend({ extraDays: z.number().int().min(0) });

export const ratesSchema = z.object({
  modes: z.array(modeRateSchema).length(4),
  origins: z.array(originSchema).min(1),
  destinations: z.array(destinationSchema).min(1),
});

export const ratesShape = { rates: ratesSchema };

export type ModeRate = z.infer<typeof modeRateSchema>;
export type Origin = z.infer<typeof originSchema>;
export type Destination = z.infer<typeof destinationSchema>;
export type Rates = z.infer<typeof ratesSchema>;
export type RatesData = { rates: Rates };
