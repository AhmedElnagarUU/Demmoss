"use client";

import type { Locale } from "@/shared/i18n/config";
import { businessNameOf } from "../../../business-name";
import { getFineDiningT } from "../messages";
import { useFineDiningStore } from "../store";
import { HoursList } from "./hours-list";
import { eyebrowClass } from "./section";

export function SiteFooter({ locale }: { locale: Locale }) {
  const t = getFineDiningT(locale);
  const name = useFineDiningStore((state) => businessNameOf(state, locale));
  const tagline = useFineDiningStore((state) => state.content.hero.title[locale]);
  const address = useFineDiningStore((state) => state.settings.address[locale]);
  const phone = useFineDiningStore((state) => state.settings.phone);

  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-3">
        <div className="space-y-2">
          <p className="text-2xl font-bold text-(--fd-accent)">{name}</p>
          <p className="text-muted">{tagline}</p>
        </div>
        <div className="space-y-2 font-sans">
          <p>{address}</p>
          <p dir="ltr" className="text-start">
            {phone}
          </p>
          <p className="text-sm text-muted">{t("footer.rights")}</p>
        </div>
        <div className="space-y-2">
          <h2 className={eyebrowClass}>{t("footer.hours")}</h2>
          <HoursList locale={locale} />
        </div>
      </div>
    </footer>
  );
}
