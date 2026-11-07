import type { Locale } from "@/shared/i18n/config";
import { intlLocale } from "@/features/demo-engine/format/format";
import type { OpeningDay } from "../../../types";

// The source lists hours as rows of days that share the same hours, starting on Tuesday:
// "Tuesday to Thursday", "Friday and Saturday", "Sunday brunch", "Monday".
const weekOrder = [2, 3, 4, 5, 6, 0, 1] as const;

export type HoursRow = { days: number[]; closed: boolean; open: string; close: string };

export function groupHours(hours: readonly OpeningDay[]): HoursRow[] {
  const rows: HoursRow[] = [];
  for (const day of weekOrder) {
    const entry = hours.find((candidate) => candidate.day === day);
    if (!entry) continue;
    const last = rows[rows.length - 1];
    const same =
      last &&
      last.closed === entry.closed &&
      (entry.closed || (last.open === entry.open && last.close === entry.close));
    if (last && same) last.days.push(day);
    else rows.push({ days: [day], closed: entry.closed, open: entry.open, close: entry.close });
  }
  return rows;
}

// A 24-hour clock like the source ("17:00"), with Arabic digits in Arabic.
export function formatClock(time: string, locale: Locale): string {
  const [hours = 0, minutes = 0] = time.split(":").map(Number);
  return new Intl.DateTimeFormat(intlLocale(locale), {
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).format(new Date(2000, 0, 1, hours, minutes));
}
