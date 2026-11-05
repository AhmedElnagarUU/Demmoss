"use client";

import Link from "next/link";
import type { Locale } from "@/shared/i18n/config";
import { businessNameOf } from "../../../business-name";
import { getFineDiningT } from "../messages";
import { useFineDiningStore } from "../store";
import { HoursList } from "./hours-list";
import { displayFont, labelClass, scriptAccent } from "./styles";

const links = [
  { path: "/menu", key: "nav.menu" },
  { path: "/about", key: "nav.about" },
  { path: "/events", key: "nav.events" },
  { path: "/reserve", key: "nav.reserve" },
] as const;

// The footer repeats what a guest needs to decide: where, when, how to call, and where to go next.
export function SiteFooter({ locale }: { locale: Locale }) {
  const t = getFineDiningT(locale);
  const name = useFineDiningStore((state) => businessNameOf(state, locale));
  const tagline = useFineDiningStore((state) => state.content.hero.title[locale]);
  const address = useFineDiningStore((state) => state.settings.address[locale]);
  const phone = useFineDiningStore((state) => state.settings.phone);
  const root = `/${locale}/demos/restaurant/fine-dining`;

  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-4">
        <div className="space-y-3">
          <p className={scriptAccent(locale)}>{name}</p>
          <p className="text-muted">{tagline}</p>
        </div>
        <div className="space-y-3">
          <h2 className={labelClass}>{t("footer.visit")}</h2>
          <p>{address}</p>
          <p dir="ltr" className="text-start">
            {phone}
          </p>
        </div>
        <div className="space-y-3">
          <h2 className={labelClass}>{t("footer.hours")}</h2>
          <HoursList locale={locale} />
        </div>
        <nav aria-label={t("footer.links")} className="space-y-3">
          <h2 className={labelClass}>{t("footer.links")}</h2>
          <ul className="space-y-1">
            {links.map((link) => (
              <li key={link.path}>
                <Link href={`${root}${link.path}`} className="inline-block py-1 hover:text-primary">
                  {t(link.key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <p className={`${displayFont} border-t border-border py-5 text-center text-sm text-muted`}>
        {t("footer.rights")}
      </p>
    </footer>
  );
}
