import type { ViewingStatus } from "../../types";

// new → confirmed → done · new/confirmed → cancelled · confirmed → no_show
export type ViewingTarget = Exclude<ViewingStatus, "new">;

const transitions: Record<ViewingStatus, readonly ViewingTarget[]> = {
  new: ["confirmed", "cancelled"],
  confirmed: ["done", "cancelled", "no_show"],
  done: [],
  cancelled: [],
  no_show: [],
};

export function allowedViewingStatuses(from: ViewingStatus): readonly ViewingTarget[] {
  return transitions[from];
}

export function canMoveViewing(from: ViewingStatus, to: ViewingStatus): boolean {
  return transitions[from].some((target) => target === to);
}

// A viewing that still holds its time slot.
export function isActiveViewing(status: ViewingStatus): boolean {
  return status === "new" || status === "confirmed";
}
