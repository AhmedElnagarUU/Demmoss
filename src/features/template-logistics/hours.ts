import { timeSchema } from "./types";

// Saudi work week: Sunday to Thursday. Friday (5) and Saturday (6) are the weekend.
const WEEKEND_DAYS = [5, 6];

function minutesOf(time: string): number {
  const [hours = 0, minutes = 0] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

export function isOfficeOpenAt(date: Date, open: string, close: string): boolean {
  if (!timeSchema.safeParse(open).success || !timeSchema.safeParse(close).success) return true;
  if (WEEKEND_DAYS.includes(date.getDay())) return false;
  const minutes = date.getHours() * 60 + date.getMinutes();
  return minutes >= minutesOf(open) && minutes < minutesOf(close);
}
