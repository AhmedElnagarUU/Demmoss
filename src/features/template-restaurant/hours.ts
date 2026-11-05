import { dateFromKey, minutesOf, timeKey } from "./dates";
import type { OpeningDay } from "./types";

export function openingOn(hours: readonly OpeningDay[], date: Date): OpeningDay | undefined {
  return hours.find((entry) => entry.day === date.getDay());
}

export function isOpenAt(hours: readonly OpeningDay[], date: Date): boolean {
  const entry = openingOn(hours, date);
  if (!entry || entry.closed) return false;
  const minutes = minutesOf(timeKey(date));
  return minutes >= minutesOf(entry.open) && minutes < minutesOf(entry.close);
}

export function openingOnDateKey(hours: readonly OpeningDay[], dateKey: string): OpeningDay | undefined {
  return openingOn(hours, dateFromKey(dateKey));
}
