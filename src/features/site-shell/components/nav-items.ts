import type { Locale } from "@/shared/i18n/config";
import { siteShellT } from "../translate";

export type NavItem = { href: string; label: string };

export function navItems(locale: Locale): NavItem[] {
  const t = siteShellT(locale);
  return [
    { href: `/${locale}/guide`, label: t("nav.guide") },
    { href: `/${locale}/demos`, label: t("nav.demos") },
    { href: `/${locale}/start`, label: t("nav.start") },
  ];
}
