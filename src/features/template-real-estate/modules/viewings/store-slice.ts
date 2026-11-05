import type { SetData } from "../../shared-slice";
import type { RealEstateData, Viewing, ViewingStatus } from "../../types";
import { canMoveViewing } from "./status";

export type NewViewing = {
  propertyId?: string;
  unitId?: string;
  name: string;
  phone: string;
  date: string;
  time: string;
  note?: string;
};

export type ViewingsActions = {
  addViewing: (input: NewViewing, now?: Date) => string;
  setViewingStatus: (id: string, status: ViewingStatus) => void;
};

export function createViewingsActions(set: SetData<RealEstateData>): ViewingsActions {
  return {
    addViewing: (input, now = new Date()) => {
      const viewing: Viewing = {
        ...input,
        id: crypto.randomUUID(),
        name: input.name.trim(),
        phone: input.phone.trim(),
        status: "new",
        createdAt: now.toISOString(),
      };
      set((state) => ({ viewings: [viewing, ...state.viewings] }));
      return viewing.id;
    },

    // Only the allowed paths change a status; anything else is ignored.
    setViewingStatus: (id, status) =>
      set((state) => ({
        viewings: state.viewings.map((viewing) =>
          viewing.id === id && canMoveViewing(viewing.status, status) ? { ...viewing, status } : viewing,
        ),
      })),
  };
}
