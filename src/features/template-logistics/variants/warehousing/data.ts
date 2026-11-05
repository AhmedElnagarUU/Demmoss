import type { z } from "zod";
import { caseStudiesShape } from "../../modules/case-studies/types";
import { storageRatesShape } from "../../modules/storage-rates/types";
import { warehousesShape } from "../../modules/warehouses/types";
import { logisticsDataSchema } from "../../types";

// The warehousing company stores the shared logistics data + warehouses + storage rates + case studies.
export const warehousingSchema = logisticsDataSchema.extend({
  ...warehousesShape,
  ...storageRatesShape,
  ...caseStudiesShape,
});

export type WarehousingData = z.infer<typeof warehousingSchema>;
