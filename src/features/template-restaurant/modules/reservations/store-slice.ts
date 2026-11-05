import type { SetData } from "../../shared-slice";
import { canMoveReservation } from "./status";
import type {
  Occasion,
  Reservation,
  ReservationSettings,
  ReservationsData,
  ReservationStatus,
} from "./types";

export type NewReservation = {
  date: string;
  time: string;
  guests: number;
  name: string;
  phone: string;
  occasion?: Occasion;
  note?: string;
};

export type ReservationsActions = {
  addReservation: (input: NewReservation, now?: Date) => string;
  setReservationStatus: (id: string, status: ReservationStatus) => void;
  updateReservationSettings: (settings: ReservationSettings) => void;
};

export function createReservationsActions(set: SetData<ReservationsData>): ReservationsActions {
  return {
    addReservation: (input, now = new Date()) => {
      const reservation: Reservation = {
        id: crypto.randomUUID(),
        ...input,
        name: input.name.trim(),
        phone: input.phone.trim(),
        status: "new",
        createdAt: now.toISOString(),
      };
      set((state) => ({ reservations: [reservation, ...state.reservations] }));
      return reservation.id;
    },

    // Only the allowed paths change a status; anything else is ignored.
    setReservationStatus: (id, status) =>
      set((state) => ({
        reservations: state.reservations.map((reservation) =>
          reservation.id === id && canMoveReservation(reservation.status, status)
            ? { ...reservation, status }
            : reservation,
        ),
      })),

    updateReservationSettings: (reservationSettings) => set({ reservationSettings }),
  };
}
