import type { SetData } from "../../shared-slice";
import type { Warehouse, WarehousesData } from "./types";

export type WarehousesActions = {
  updateWarehouse: (id: string, patch: Partial<Omit<Warehouse, "id">>) => void;
};

export function createWarehousesActions(set: SetData<WarehousesData>): WarehousesActions {
  return {
    updateWarehouse: (id, patch) =>
      set((state) => ({
        warehouses: state.warehouses.map((warehouse) =>
          warehouse.id === id ? { ...warehouse, ...patch } : warehouse,
        ),
      })),
  };
}
