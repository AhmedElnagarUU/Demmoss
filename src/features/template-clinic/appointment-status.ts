import type { AppointmentStatus } from "./types";

// new → confirmed → done · new/confirmed → cancelled · confirmed → no_show
export type AppointmentTarget = Exclude<AppointmentStatus, "new">;

const transitions: Record<AppointmentStatus, readonly AppointmentTarget[]> = {
  new: ["confirmed", "cancelled"],
  confirmed: ["done", "cancelled", "no_show"],
  done: [],
  cancelled: [],
  no_show: [],
};

export function allowedAppointmentStatuses(from: AppointmentStatus): readonly AppointmentTarget[] {
  return transitions[from];
}

export function canMoveAppointment(from: AppointmentStatus, to: AppointmentStatus): boolean {
  return transitions[from].some((target) => target === to);
}

// An appointment that still holds its time slot.
export function isActiveAppointment(status: AppointmentStatus): boolean {
  return status === "new" || status === "confirmed";
}
