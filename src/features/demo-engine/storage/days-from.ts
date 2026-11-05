// Sample data dates are relative to "today", so the dashboard never looks old.
export function daysFrom(now: Date, days: number, time = "12:00"): string {
  const [hours = 0, minutes = 0] = time.split(":").map(Number);
  const date = new Date(now);
  date.setDate(date.getDate() + days);
  date.setHours(hours, minutes, 0, 0);
  return date.toISOString();
}
