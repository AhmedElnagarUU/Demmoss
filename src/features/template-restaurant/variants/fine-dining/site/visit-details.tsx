"use client";

import type { Locale } from "@/shared/i18n/config";
import { whatsappUrl } from "@/shared/ui/whatsapp";
import { businessNameOf } from "@/features/demo-engine/fake-auth/business-name";
import { getFineDiningT } from "../messages";
import { useFineDiningStore } from "../store";
import { HoursList } from "./hours-list";
import { displayFont, labelClass, outlineButton } from "./styles";

// Address, phone, WhatsApp, hours, and a map: everything that removes friction before a visit.
export function VisitDetails({ locale }: { locale: Locale }) {
  const t = getFineDiningT(locale);
  const settings = useFineDiningStore((state) => state.settings);
  const name = useFineDiningStore((state) => businessNameOf(state, locale));

  return (
    <div className="grid gap-10 md:grid-cols-2">
      <div className="space-y-6">
        <h3 className={`${displayFont} text-3xl font-semibold`}>{t("contact.hours")}</h3>
        <HoursList locale={locale} />
      </div>
      <div className="space-y-6">
        <h3 className={`${displayFont} text-3xl font-semibold`}>{t("contact.findUs")}</h3>
        <div
          role="img"
          aria-label={t("contact.mapLabel")}
          className="relative flex min-h-52 flex-col items-center justify-center gap-1 overflow-hidden border border-border bg-bg bg-[linear-gradient(var(--color-border)_1px,transparent_1px),linear-gradient(90deg,var(--color-border)_1px,transparent_1px)] bg-[length:36px_36px] text-center"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" className="size-8 fill-(--fd-accent)">
            <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" />
          </svg>
          <span className="bg-bg px-3 py-1">{settings.address[locale]}</span>
        </div>
        <div className="space-y-1">
          <p className={labelClass}>{t("contact.phone")}</p>
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
          className={outlineButton}
        >
          {t("contact.whatsapp")}
        </a>
      </div>
    </div>
  );
}
