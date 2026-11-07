"use client";

import type { Locale } from "@/shared/i18n/config";
import { whatsappUrl } from "@/shared/ui/whatsapp";
import { businessNameOf } from "@/features/demo-engine/fake-auth/business-name";
import { formatTime, weekdayName } from "@/features/demo-engine/format/format";
import { getFastFoodT } from "../messages";
import { useFastFoodStore } from "../store";
import { pillOutline, serifFont } from "./styles";

// Address, phone, WhatsApp, hours, and a map: everything that removes friction before a visit.
export function VisitDetails({ locale }: { locale: Locale }) {
  const t = getFastFoodT(locale);
  const settings = useFastFoodStore((state) => state.settings);
  const name = useFastFoodStore((state) => businessNameOf(state, locale));

  return (
    <div className="grid gap-10 md:grid-cols-2">
      <div className="space-y-4">
        <h2 className={`${serifFont} text-[clamp(30px,4vw,44px)] leading-[1.2]`}>{t("contact.hours")}</h2>
        <dl>
          {settings.hours.map((day) => (
            <div
              key={day.day}
              className="flex justify-between gap-6 border-b border-dashed border-border py-2"
            >
              <dt className="font-medium">{weekdayName(day.day, locale)}</dt>
              <dd className="text-muted">
                {day.closed
                  ? t("contact.closed")
                  : `${formatTime(day.open, locale)} – ${formatTime(day.close, locale)}`}
              </dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="space-y-4">
        <h2 className={`${serifFont} text-[clamp(30px,4vw,44px)] leading-[1.2]`}>{t("contact.findUs")}</h2>
        <div
          role="img"
          aria-label={t("contact.mapLabel")}
          className="flex min-h-48 items-center justify-center rounded-3xl border border-border bg-surface bg-[linear-gradient(var(--color-border)_1px,transparent_1px),linear-gradient(90deg,var(--color-border)_1px,transparent_1px)] bg-[length:36px_36px]"
        >
          <span className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-on-primary">
            {settings.address[locale]}
          </span>
        </div>
        <p dir="ltr" className="text-start">
          <a href={`tel:${settings.phone.replace(/\s/g, "")}`} className="underline">
            {settings.phone}
          </a>
        </p>
        <a
          href={whatsappUrl(settings.whatsapp, t("contact.whatsappMessage", { name }))}
          target="_blank"
          rel="noopener noreferrer"
          className={pillOutline}
        >
          {t("contact.whatsapp")}
        </a>
      </div>
    </div>
  );
}
