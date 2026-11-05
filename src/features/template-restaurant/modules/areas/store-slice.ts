import type { SetData } from "../../shared-slice";
import type { Area, AreasData } from "./types";

export type NewArea = Omit<Area, "id">;

export type AreasActions = {
  addArea: (area: NewArea) => string;
  updateArea: (id: string, patch: Partial<NewArea>) => void;
  removeArea: (id: string) => void;
};

export function createAreasActions(set: SetData<AreasData>): AreasActions {
  return {
    addArea: (area) => {
      const created: Area = { ...area, id: crypto.randomUUID() };
      set((state) => ({ areas: [...state.areas, created] }));
      return created.id;
    },

    updateArea: (id, patch) =>
      set((state) => ({ areas: state.areas.map((area) => (area.id === id ? { ...area, ...patch } : area)) })),

    removeArea: (id) => set((state) => ({ areas: state.areas.filter((area) => area.id !== id) })),
  };
}
