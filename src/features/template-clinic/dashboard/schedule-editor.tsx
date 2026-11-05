"use client";

import { weekdayName } from "@/features/demo-engine/format/format";
import type { Locale } from "@/shared/i18n/config";
import { inputClass } from "@/features/demo-engine/ui";
import { getClinicT } from "../messages";
import type { Schedule } from "../types";

type Props = { schedule: Schedule; onChange: (schedule: Schedule) => void; locale: Locale; idPrefix: string };

// Seven rows (Sunday first): open or closed, and the opening and closing time.
export function ScheduleEditor({ schedule, onChange, locale, idPrefix }: Props) {
  const t = getClinicT(locale);
  const setDay = (day: number, hours: Schedule[number]) =>
    onChange(schedule.map((entry, index) => (index === day ? hours : entry)));

  return (
    <div className="divide-y divide-border">
      {schedule.map((hours, day) => {
        const name = weekdayName(day, locale);
        return (
          <div key={day} className="flex flex-wrap items-center gap-3 py-2">
            <label className="flex min-h-11 w-40 items-center gap-2 font-semibold text-text">
              <input
                type="checkbox"
                className="size-5"
                checked={hours !== null}
                onChange={(event) => setDay(day, event.target.checked ? { from: "09:00", to: "17:00" } : null)}
              />
              {name}
              <span className="sr-only"> · {t("schedule.open")}</span>
            </label>
            {hours ? (
              <>
                <label htmlFor={`${idPrefix}-${day}-from`} className="sr-only">
                  {t("schedule.from", { day: name })}
                </label>
                <input
                  id={`${idPrefix}-${day}-from`}
                  type="time"
                  dir="ltr"
                  className={`${inputClass} w-auto`}
                  value={hours.from}
                  onChange={(event) => event.target.value && setDay(day, { ...hours, from: event.target.value })}
                />
                <label htmlFor={`${idPrefix}-${day}-to`} className="sr-only">
                  {t("schedule.to", { day: name })}
                </label>
                <input
                  id={`${idPrefix}-${day}-to`}
                  type="time"
                  dir="ltr"
                  className={`${inputClass} w-auto`}
                  value={hours.to}
                  onChange={(event) => event.target.value && setDay(day, { ...hours, to: event.target.value })}
                />
              </>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
