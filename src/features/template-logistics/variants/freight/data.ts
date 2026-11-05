import type { z } from "zod";
import { ratesShape } from "../../modules/rates/types";
import { shipmentsShape } from "../../modules/shipments/types";
import { logisticsDataSchema } from "../../types";

// The freight forwarder stores the shared logistics data + shipments + calculator rates.
export const freightSchema = logisticsDataSchema.extend({
  ...shipmentsShape,
  ...ratesShape,
});

export type FreightData = z.infer<typeof freightSchema>;
