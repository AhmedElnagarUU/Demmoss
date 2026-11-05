import { z } from "zod";
import { localizedTextSchema } from "@/features/demo-engine/types";

// A delivery area: the fee is added to a delivery order, and the order must reach the minimum.
export const areaSchema = z.object({
  id: z.string().min(1),
  name: localizedTextSchema,
  fee: z.number().min(0),
  minOrder: z.number().min(0),
});

export const areasShape = { areas: z.array(areaSchema) };

export type Area = z.infer<typeof areaSchema>;
export type AreasData = { areas: Area[] };
