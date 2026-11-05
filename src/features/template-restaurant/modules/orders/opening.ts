import { addDays, minutesOf, timeKey } from "../../dates";
import { isOpenAt, openingOn } from "../../hours";
import type { OpeningDay } from "../../types";

export type NextOpening = { time: string; inDays: number };

// When the shop opens next, or null when it is open now (or never opens).
// A shop that opens later today says "today" (inDays 0); otherwise the next open day is used.
export function nextOpening(hours: readonly OpeningDay[], now: Date): NextOpening | null {
  if (isOpenAt(hours, now)) return null;
  for (let inDays = 0; inDays <= 7; inDays += 1) {
    const day = openingOn(hours, addDays(now, inDays));
    if (!day || day.closed) continue;
    if (inDays === 0 && minutesOf(timeKey(now)) >= minutesOf(day.open)) continue;
    return { time: day.open, inDays };
  }
  return null;
}
