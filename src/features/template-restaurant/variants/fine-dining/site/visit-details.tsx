"use client";

import type { Locale } from "@/shared/i18n/config";
import { whatsappUrl } from "@/shared/ui/whatsapp";
import { businessNameOf } from "@/features/demo-engine/fake-auth/business-name";
import { weekdayName } from "@/features/demo-engine/format/format";
import { getFineDiningT, type FineDiningTranslate } from "../messages";
import { useFineDiningStore } from "../store";
import { MapPin } from "./icons";
import { formatClock, groupHours, type HoursRow } from "./hours-rows";
import { btn, displayFont, labelClass } from "./styles";

function rowLabel(row: HoursRow, locale: Locale, t: FineDiningTranslate): string {
  const first = weekdayName(row.days[0] ?? 0, locale);
  const last = weekdayName(row.days[row.days.length - 1] ?? 0, locale);
  if (row.days.length === 1) {
    // a single day that opens before noon is the source "Sunday brunch"
    return !row.closed && row.open < "12:00" ? t("contact.brunch", { day: first }) : first;
  }
  if (row.days.length === 2) return t("contact.daysAnd", { from: first, to: last });
  return t("contact.daysTo", { from: first, to: last });
}

// The source info column: opening hours as dashed rows, then the map block with the address.
export function HoursAndMap({ locale }: { locale: Locale }) {
  const t = getFineDiningT(locale);
  const hours = useFineDiningStore((state) => state.settings.hours);
  const address = useFineDiningStore((state) => state.settings.address[locale]);
  const mapLine = "color-mix(in srgb, var(--color-text) 8%, transparent)";

  return (
    <>
      <h3 className={`${displayFont} mb-3 text-[28px]`}>{t("contact.hours")}</h3>
      <ul className="mb-[26px]">
        {groupHours(hours).map((row) => (
          <li
            key={row.days.join("-")}
            className="flex justify-between gap-6 border-b border-dashed border-text/35 py-2 text-[15px]"
          >
            <span>{rowLabel(row, locale, t)}</span>
            <span>
              {row.closed
                ? t("contact.closed")
                : `${formatClock(row.open, locale)} – ${formatClock(row.close, locale)}`}
            </span>
          </li>
        ))}
      </ul>
      <h3 className={`${displayFont} mb-3 text-[28px]`}>{t("contact.findUs")}</h3>
      <div
        role="img"
        aria-label={t("contact.mapLabel")}
        className="flex h-[200px] flex-col items-center justify-center gap-1 border border-text/35 bg-bg text-center text-sm"
        style={{
          backgroundImage: `linear-gradient(${mapLine} 1px, transparent 1px), linear-gradient(90deg, ${mapLine} 1px, transparent 1px)`,
          backgroundSize: "36px 36px",
        }}
      >
        <MapPin />
        <span>{address}</span>
      </div>
    </>
  );
}

// Contact page: hours and map next to the phone and WhatsApp, everything that removes friction before a visit.
export function VisitDetails({ locale }: { locale: Locale }) {
  const t = getFineDiningT(locale);
  const settings = useFineDiningStore((state) => state.settings);
  const name = useFineDiningStore((state) => businessNameOf(state, locale));

  return (
    <div className="mx-auto grid max-w-[1000px] gap-[50px] min-[1025px]:grid-cols-2">
      <div>
        <HoursAndMap locale={locale} />
      </div>
      <div className="space-y-6">
        <div className="space-y-1">
          <p className={`${labelClass} text-(--fd-accent)`}>{t("contact.phone")}</p>
          <p dir="ltr" className="text-start text-[15px]">
            <a href={`tel:${settings.phone.replace(/[^\d+]/g, "")}`} className="underline">
              {settings.phone}
            </a>
          </p>
        </div>
        <a
          href={whatsappUrl(settings.whatsapp, t("contact.whatsappMessage", { name }))}
          target="_blank"
          rel="noopener noreferrer"
          className={btn}
        >
          {t("contact.whatsapp")}
        </a>
      </div>
    </div>
  );
}
