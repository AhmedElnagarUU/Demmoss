import type { ReservationStatus } from "./types";

// new → confirmed → seated · new/confirmed → cancelled · confirmed → no_show
// A status that can be moved to ("new" is only the starting point).
export type ReservationTarget = Exclude<ReservationStatus, "new">;

const transitions: Record<ReservationStatus, readonly ReservationTarget[]> = {
  new: ["confirmed", "cancelled"],
  confirmed: ["seated", "cancelled", "no_show"],
  seated: [],
  cancelled: [],
  no_show: [],
};

export function allowedReservationStatuses(from: ReservationStatus): readonly ReservationTarget[] {
  return transitions[from];
}

export function canMoveReservation(from: ReservationStatus, to: ReservationStatus): boolean {
  return transitions[from].some((target) => target === to);
}
