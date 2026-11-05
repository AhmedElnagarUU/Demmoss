// Dates are kept as local "YYYY-MM-DD" keys and "HH:MM" times, so a viewing never shifts with time zones.

export function toDateKey(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

export function dateFromKey(dateKey: string): Date {
  const [year = 0, month = 1, day = 1] = dateKey.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function addDays(now: Date, days: number): Date {
  const date = new Date(now);
  date.setDate(date.getDate() + days);
  return date;
}

export function dateKeyFromNow(now: Date, days: number): string {
  return toDateKey(addDays(now, days));
}

export function minutesOf(time: string): number {
  const [hours = 0, minutes = 0] = time.split(":").map(Number);
  return hours * 60 + minutes;
}
