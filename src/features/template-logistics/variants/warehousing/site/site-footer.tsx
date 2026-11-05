"use client";

import Link from "next/link";
import type { Locale } from "@/shared/i18n/config";
import { businessNameOf } from "@/features/demo-engine/fake-auth/business-name";
import { getWarehousingT } from "../messages";
import { WAREHOUSING_ROOT } from "../slug";
import { useWarehousingStore } from "../store";

export function SiteFooter({ locale }: { locale: Locale }) {
  const t = getWarehousingT(locale);
  const name = useWarehousingStore((state) => businessNameOf(state, locale));
  const settings = useWarehousingStore((state) => state.settings);
  const root = `/${locale}${WAREHOUSING_ROOT}`;
  const link = "inline-block py-1 hover:underline focus-visible:outline-2 focus-visible:outline-focus";

  return (
    <footer className="bg-surface">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-4">
        <div className="space-y-2 md:col-span-2">
          <p className="text-xl font-extrabold">{name}</p>
          <p className="max-w-md text-muted">{t("footer.tagline")}</p>
        </div>
        <div>
          <p className="font-bold">{t("footer.company")}</p>
          <ul>
            <li>
              <Link href={`${root}/services`} className={link}>
                {t("nav.services")}
              </Link>
            </li>
            <li>
              <Link href={`${root}/warehouses`} className={link}>
                {t("nav.warehouses")}
              </Link>
            </li>
            <li>
              <Link href={`${root}/case-studies`} className={link}>
                {t("nav.caseStudies")}
              </Link>
            </li>
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
