"use client";

import Link from "next/link";
import { useRealEstate } from "../../../context";
import { businessNameOf } from "@/features/demo-engine/fake-auth/business-name";
import { getAgencyT } from "../messages";

export function SiteFooter() {
  const { store, config, locale } = useRealEstate();
  const t = getAgencyT(locale);
  const name = store((state) => businessNameOf(state, locale));
  const settings = store((state) => state.settings);
  const root = `/${locale}${config.basePath}`;

  return (
    <footer className="bg-primary text-on-primary">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-8 md:grid-cols-3">
        <div className="space-y-3">
          <p className="text-lg font-semibold">{name}</p>
          <p>{t("footer.tagline")}</p>
        </div>
        <nav aria-label={t("footer.explore")}>
          <p className="mb-3 font-semibold">{t("footer.explore")}</p>
          <ul className="space-y-1">
            <li>
              <Link href={`${root}/listings?purpose=sale`} className="underline">
                {t("footer.buy")}
              </Link>
            </li>
            <li>
              <Link href={`${root}/listings?purpose=rent`} className="underline">
                {t("footer.rent")}
              </Link>
            </li>
            <li>
              <Link href={`${root}/about`} className="underline">
                {t("nav.about")}
              </Link>
            </li>
            <li>
              <Link href={`${root}/contact`} className="underline">
                {t("nav.contact")}
              </Link>
            </li>
          </ul>
        </nav>
        <address className="space-y-1 not-italic">
          <p className="mb-3 font-semibold">{t("footer.visit")}</p>
          <p>{settings.address[locale]}</p>
          <p dir="ltr" className="text-start">
            {settings.phone}
          </p>
          <p>{settings.hours[locale]}</p>
        </address>
      </div>
      <p className="border-t border-on-primary/30 px-4 py-4 text-center text-sm">
        {t("footer.demoNote", { name })}
      </p>
    </footer>
  );
}
