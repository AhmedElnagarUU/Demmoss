"use client";

import Link from "next/link";
import type { Locale } from "@/shared/i18n/config";
import { businessNameOf } from "@/features/demo-engine/fake-auth/business-name";
import { getFastFoodT } from "../messages";
import { useFastFoodStore } from "../store";
import { displayFont } from "./styles";

const links = [
  { path: "/menu", key: "nav.menu" },
  { path: "/contact", key: "nav.contact" },
] as const;

export function SiteFooter({ locale }: { locale: Locale }) {
  const t = getFastFoodT(locale);
  const name = useFastFoodStore((state) => businessNameOf(state, locale));
  const phone = useFastFoodStore((state) => state.settings.phone);
  const address = useFastFoodStore((state) => state.settings.address[locale]);
  const root = `/${locale}/demos/restaurant/fast-food`;

  return (
    <footer className="bg-text text-bg">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 px-4 py-10">
        <div className="space-y-1">
          <p className={`${displayFont} text-4xl leading-none`}>{name}</p>
          <p className="text-sm opacity-90">{address}</p>
          <p dir="ltr" className="text-start text-sm opacity-90">
            {phone}
          </p>
        </div>
        <nav aria-label={t("footer.links")}>
          <ul className="flex gap-5">
            {links.map((link) => (
              <li key={link.path}>
                <Link href={`${root}${link.path}`} className="inline-block py-2 underline">
                  {t(link.key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <p className="text-sm opacity-90">{t("footer.rights")}</p>
      </div>
    </footer>
  );
}
