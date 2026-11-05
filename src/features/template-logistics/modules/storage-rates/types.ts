import { z } from "zod";

// What the owner edits for the storage estimator, in SAR.
export const storageRatesSchema = z.object({
  palletPerMonth: z.number().min(0),
  // discount (0 to 0.5) on storage for contracts of 6 and of 12 months or more
  discount6Months: z.number().min(0).max(0.5),
  discount12Months: z.number().min(0).max(0.5),
  handlingPerMonth: z.number().min(0),
  pickingPerOrder: z.number().min(0),
  // insurance as a percent of the storage cost
  insurancePercent: z.number().min(0).max(20),
  minimumMonthly: z.number().min(0),
});

export const storageRatesShape = { storageRates: storageRatesSchema };

export type StorageRates = z.infer<typeof storageRatesSchema>;
export type StorageRatesData = { storageRates: StorageRates };
