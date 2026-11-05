"use client";

import type { Locale } from "@/shared/i18n/config";
import { whatsappUrl } from "@/shared/ui/whatsapp";
import { buttonClasses } from "@/shared/ui/button-styles";
import { businessNameOf } from "../../../business-name";
import { getFineDiningT } from "../messages";
import { useFineDiningStore } from "../store";
import { HoursList } from "./hours-list";
import { eyebrowClass } from "./section";

// Address, phone, WhatsApp, hours, and a map: everything that removes friction before a visit.
export function VisitDetails({ locale }: { locale: Locale }) {
  const t = getFineDiningT(locale);
  const settings = useFineDiningStore((state) => state.settings);
  const name = useFineDiningStore((state) => businessNameOf(state, locale));

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="space-y-6 font-sans">
        <div className="space-y-1">
          <p className={eyebrowClass}>{t("contact.address")}</p>
          <p>{settings.address[locale]}</p>
        </div>
        <div className="space-y-1">
          <p className={eyebrowClass}>{t("contact.phone")}</p>
          <p dir="ltr" className="text-start">
            <a href={`tel:${settings.phone.replace(/\s/g, "")}`} className="underline">
              {settings.phone}
            </a>
          </p>
        </div>
        <a
          href={whatsappUrl(settings.whatsapp, t("contact.whatsappMessage", { name }))}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClasses("secondary")}
        >
          {t("contact.whatsapp")}
        </a>
        <div className="space-y-2">
          <p className={eyebrowClass}>{t("contact.hours")}</p>
          <HoursList locale={locale} />
        </div>
      </div>
      <div
        role="img"
        aria-label={t("contact.mapLabel")}
        className="relative min-h-64 overflow-hidden rounded-control border border-border bg-surface"
      >
        <svg
          viewBox="0 0 400 300"
          className="size-full"
          aria-hidden="true"
          preserveAspectRatio="xMidYMid slice"
        >
          <rect width="400" height="300" fill="var(--color-surface)" />
          <path
            d="M0 210 L400 120 M120 0 L200 300 M0 80 L400 260 M300 0 L260 300"
            stroke="var(--color-border)"
            strokeWidth="10"
            fill="none"
          />
          <circle cx="200" cy="140" r="14" fill="var(--color-primary)" />
          <circle cx="200" cy="140" r="5" fill="var(--color-on-primary)" />
        </svg>
      </div>
    </div>
  );
}
