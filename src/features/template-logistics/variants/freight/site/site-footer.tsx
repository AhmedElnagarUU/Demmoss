"use client";

import Link from "next/link";
import type { Locale } from "@/shared/i18n/config";
import { businessNameOf } from "../../../business-name";
import { getLogisticsT } from "../../../messages";
import { getFreightT } from "../messages";
import { FREIGHT_ROOT } from "../slug";
import { useFreightStore } from "../store";

export function SiteFooter({ locale }: { locale: Locale }) {
  const t = getFreightT(locale);
  const shared = getLogisticsT(locale);
  const name = useFreightStore((state) => businessNameOf(state, locale));
  const settings = useFreightStore((state) => state.settings);
  const root = `/${locale}${FREIGHT_ROOT}`;
  const link = "inline-block py-1 hover:underline focus-visible:outline-2 focus-visible:outline-focus";

  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-4">
        <div className="space-y-2 md:col-span-2">
          <p className="text-xl font-extrabold">{name}</p>
          <p className="max-w-md text-muted">{t("footer.tagline")}</p>
        </div>
        <div>
          <p className="font-bold">{t("footer.services")}</p>
          <ul>
            {(["air", "sea", "road", "rail"] as const).map((mode) => (
              <li key={mode}>
                <Link href={`${root}/services`} className={link}>
                  {shared(`services.${mode}`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-bold">{t("footer.contact")}</p>
          <ul className="text-muted">
            <li dir="ltr" className="text-start">
              {settings.phone}
            </li>
            <li>{settings.address[locale]}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <p className="mx-auto flex max-w-6xl flex-wrap justify-between gap-2 px-4 py-4 text-sm text-muted">
          <span>{t("footer.rights", { name })}</span>
          <span>{t("footer.credit")}</span>
        </p>
      </div>
    </footer>
  );
}
