"use client";

import type { Locale } from "@/shared/i18n/config";
import { formatTime, weekdayName } from "../../../format";
import { getFineDiningT } from "../messages";
import { useFineDiningStore } from "../store";

export function HoursList({ locale }: { locale: Locale }) {
  const t = getFineDiningT(locale);
  const hours = useFineDiningStore((state) => state.settings.hours);

  return (
    <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-1 font-sans">
      {hours.map((day) => (
        <div key={day.day} className="contents">
          <dt className="font-semibold">{weekdayName(day.day, locale)}</dt>
          <dd className="text-muted">
            {day.closed
              ? t("contact.closed")
              : `${formatTime(day.open, locale)} – ${formatTime(day.close, locale)}`}
          </dd>
        </div>
      ))}
    </dl>
  );
}
