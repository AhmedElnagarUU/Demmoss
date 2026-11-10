import type { Locale } from "@/shared/i18n/config";
import { siteShellT } from "../translate";

export type NavItem = { href: string; label: string };

export function navItems(locale: Locale): NavItem[] {
  const t = siteShellT(locale);
  return [
    { href: `/${locale}`, label: t("nav.home") },
    { href: `/${locale}#how`, label: t("nav.how") },
    { href: `/${locale}#build`, label: t("nav.build") },
    { href: `/${locale}/guide`, label: t("nav.guide") },
    { href: `/${locale}/demos`, label: t("nav.demos") },
  ];
}
