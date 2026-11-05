import { z } from "zod";
import { localizedTextSchema } from "@/features/demo-engine/types";

export const warehouseSchema = z.object({
  id: z.string().min(1),
  name: localizedTextSchema,
  address: localizedTextSchema,
  areaM2: z.number().int().min(1),
  rackHeightM: z.number().min(1),
  dockDoors: z.number().int().min(1),
  capacityPallets: z.number().int().min(1),
  occupiedPallets: z.number().int().min(0),
});

export const warehousesShape = { warehouses: z.array(warehouseSchema).min(1) };

export type Warehouse = z.infer<typeof warehouseSchema>;
export type WarehousesData = { warehouses: Warehouse[] };
