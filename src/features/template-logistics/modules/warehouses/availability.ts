import type { TipFact } from "../../value-tips";
import type { Warehouse } from "./types";

export const FULL_WAREHOUSE_PERCENT = 90;

// Occupied pallets never go above the capacity.
export function freePallets(warehouse: Pick<Warehouse, "capacityPallets" | "occupiedPallets">): number {
  return Math.max(warehouse.capacityPallets - warehouse.occupiedPallets, 0);
}

export function occupancyPercent(warehouse: Pick<Warehouse, "capacityPallets" | "occupiedPallets">): number {
  return Math.min(Math.round((warehouse.occupiedPallets / warehouse.capacityPallets) * 100), 100);
}

// A warehouse that is almost full: a good moment to raise prices or open more space. Fullest first.
export function fullWarehouseFacts(warehouses: readonly Warehouse[]): TipFact[] {
  return [...warehouses]
    .filter((warehouse) => occupancyPercent(warehouse) >= FULL_WAREHOUSE_PERCENT)
    .sort((a, b) => occupancyPercent(b) - occupancyPercent(a))
    .map((warehouse) => ({
      id: `fullWarehouse:${warehouse.id}`,
      key: "fullWarehouse",
      label: warehouse.name,
      amount: occupancyPercent(warehouse),
    }));
}

// Pallets for the whole network.
export function totalOccupancy(warehouses: readonly Warehouse[]): { occupied: number; capacity: number } {
  return warehouses.reduce(
    (total, warehouse) => ({
      occupied: total.occupied + Math.min(warehouse.occupiedPallets, warehouse.capacityPallets),
      capacity: total.capacity + warehouse.capacityPallets,
    }),
    { occupied: 0, capacity: 0 },
  );
}
