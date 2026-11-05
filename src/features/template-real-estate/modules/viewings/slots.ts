import { addDays, dateFromKey, minutesOf, toDateKey } from "@/features/demo-engine/format/dates";
import { isValidPhone } from "../../phone";
import type { Viewing } from "../../types";
import { isActiveViewing } from "./status";

// Viewing slots: six fixed times, the next 14 days, Friday closed.
export const VIEWING_TIMES = ["09:00", "10:30", "12:00", "16:00", "17:30", "19:00"] as const;
export const BOOKABLE_DAYS = 14;
const CLOSED_WEEKDAY = 5;
// How many viewings the team can run at the same time.
export const VIEWING_CAPACITY = 2;

export function bookableDates(now: Date): string[] {
  return Array.from({ length: BOOKABLE_DAYS }, (_, index) => addDays(now, index))
    .filter((date) => date.getDay() !== CLOSED_WEEKDAY)
    .map(toDateKey);
}

type SlotQuery = { dateKey: string; propertyId?: string; viewings: readonly Viewing[]; now: Date };

// A time is free when it is still ahead today, the team is not full, and the property is not already being shown then.
export function freeViewingTimes({ dateKey, propertyId, viewings, now }: SlotQuery): string[] {
  if (!bookableDates(now).includes(dateKey)) return [];
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  const isToday = dateKey === toDateKey(now);
  const active = viewings.filter((viewing) => viewing.date === dateKey && isActiveViewing(viewing.status));

  return VIEWING_TIMES.filter((time) => {
    if (isToday && minutesOf(time) <= nowMinutes) return false;
    const atThatTime = active.filter((viewing) => viewing.time === time);
    if (atThatTime.length >= VIEWING_CAPACITY) return false;
    return !(propertyId && atThatTime.some((viewing) => viewing.propertyId === propertyId));
  });
}

export type ViewingErrors = { date?: true; time?: true; name?: true; phone?: true };

export function validateViewing(
  input: { dateKey: string; time: string; name: string; phone: string; propertyId?: string },
  context: { viewings: readonly Viewing[]; now: Date },
): ViewingErrors {
  const errors: ViewingErrors = {};
  if (
    !bookableDates(context.now).includes(input.dateKey) ||
    Number.isNaN(dateFromKey(input.dateKey).getTime())
  ) {
    errors.date = true;
  }
  const free = freeViewingTimes({
    dateKey: input.dateKey,
    viewings: context.viewings,
    now: context.now,
    ...(input.propertyId ? { propertyId: input.propertyId } : {}),
  });
  if (!free.includes(input.time)) errors.time = true;
  if (!input.name.trim()) errors.name = true;
  if (!isValidPhone(input.phone)) errors.phone = true;
  return errors;
}
