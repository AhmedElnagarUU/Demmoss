"use client";

import type { Locale } from "@/shared/i18n/config";
import { formatTime, weekdayName } from "@/features/demo-engine/format/format";
import { getFineDiningT } from "../messages";
import { useFineDiningStore } from "../store";

export function HoursList({ locale }: { locale: Locale }) {
  const t = getFineDiningT(locale);
  const hours = useFineDiningStore((state) => state.settings.hours);

  return (
    <dl className="space-y-0">
      {hours.map((day) => (
        <div key={day.day} className="flex justify-between gap-6 border-b border-dashed border-border py-2">
          <dt>{weekdayName(day.day, locale)}</dt>
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
