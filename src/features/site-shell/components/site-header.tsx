import Link from "next/link";
import { TrackedLanguageSwitch } from "@/features/tracking/components/tracked-language-switch";
import type { Locale } from "@/shared/i18n/config";
import { getT } from "@/shared/i18n/t";
import { Logo } from "@/shared/ui/logo";
import { siteShellT } from "../translate";
import { MobileMenu } from "./mobile-menu";
import { navItems } from "./nav-items";

export function SiteHeader({ locale }: { locale: Locale }) {
  const t = siteShellT(locale);
  const common = getT(locale);
  const items = navItems(locale);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-50 focus:rounded-control focus:bg-bg focus:px-4 focus:py-2 focus:text-text"
      >
        {common("common.skipToContent")}
      </a>
      <header className="relative border-b border-border bg-bg">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3">
          <Logo href={`/${locale}`} />
          <nav aria-label={t("nav.label")} className="hidden md:block">
            <ul className="flex items-center gap-6">
              {items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-base font-semibold text-text hover:text-primary focus-visible:outline-2 focus-visible:outline-focus"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center gap-2">
            <TrackedLanguageSwitch locale={locale} label={common("common.switchLanguage")} />
            <MobileMenu
              items={items}
              navLabel={t("nav.label")}
              openLabel={t("menu.open")}
              closeLabel={t("menu.close")}
            />
          </div>
        </div>
      </header>
    </>
  );
}
