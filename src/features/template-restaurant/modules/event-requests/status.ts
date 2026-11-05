import type { EventRequestStatus } from "./types";

// new → replied → booked or closed
// A status that can be moved to ("new" is only the starting point).
export type EventTarget = Exclude<EventRequestStatus, "new">;

const transitions: Record<EventRequestStatus, readonly EventTarget[]> = {
  new: ["replied"],
  replied: ["booked", "closed"],
  booked: [],
  closed: [],
};

export function allowedEventStatuses(from: EventRequestStatus): readonly EventTarget[] {
  return transitions[from];
}

export function canMoveEventRequest(from: EventRequestStatus, to: EventRequestStatus): boolean {
  return transitions[from].some((target) => target === to);
}
