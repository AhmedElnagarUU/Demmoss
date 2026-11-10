import Link from "next/link";
import { TrackedLanguageSwitch } from "@/features/tracking/components/tracked-language-switch";
import type { Locale } from "@/shared/i18n/config";
import { getT } from "@/shared/i18n/t";
import { Logo } from "@/shared/ui/logo";
import { siteShellT } from "../translate";
import { MobileMenu } from "./mobile-menu";
import { NavLinks } from "./nav-links";
import { navItems } from "./nav-items";

export function SiteHeader({ locale }: { locale: Locale }) {
  const t = siteShellT(locale);
  const common = getT(locale);
  const items = navItems(locale);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-on-primary"
      >
        {common("common.skipToContent")}
      </a>
      <header className="sticky top-0 z-30 bg-bg/50 backdrop-blur-xl">
        <div className="mx-auto grid max-w-[1320px] grid-cols-[1fr_auto] items-center gap-4 px-5 py-3 sm:px-8 lg:grid-cols-[1fr_auto_1fr] lg:px-12">
          <div className="justify-self-start">
            <Logo href={`/${locale}`} />
          </div>
          <NavLinks items={items} label={t("nav.label")} />
          <div className="flex items-center justify-end gap-2">
            <TrackedLanguageSwitch
              locale={locale}
              label={common("common.switchLanguage")}
              className="site-pill site-btn-ghost inline-flex items-center"
            />
            <div className="hidden lg:block">
              <Link href={`/${locale}/start`} className="studio-pill">
                {t("nav.start")}
                <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" className="size-3 rtl:-scale-x-100">
                  <path
                    d="M4 12 12 4M5.5 4H12v6.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
            <MobileMenu
              items={items}
              navLabel={t("nav.label")}
              openLabel={t("menu.open")}
              closeLabel={t("menu.close")}
              ctaHref={`/${locale}/start`}
              ctaLabel={t("nav.start")}
            />
          </div>
        </div>
      </header>
    </>
  );
}
