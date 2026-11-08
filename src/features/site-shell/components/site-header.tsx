import Link from "next/link";
import { TrackedLanguageSwitch } from "@/features/tracking/components/tracked-language-switch";
import type { Locale } from "@/shared/i18n/config";
import { getT } from "@/shared/i18n/t";
import { LinkButton } from "@/shared/ui/link-button";
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
        className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-on-primary"
      >
        {common("common.skipToContent")}
      </a>
      <header className="sticky top-0 z-30 border-b border-white/5 bg-black/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Logo href={`/${locale}`} />
          <nav aria-label={t("nav.label")} className="hidden md:block">
            <ul className="flex items-center gap-7">
              {items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="rounded-lg text-[13px] font-medium text-muted transition-colors hover:text-text focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center justify-end gap-2">
            <TrackedLanguageSwitch
              locale={locale}
              label={common("common.switchLanguage")}
              className="site-pill site-btn-ghost inline-flex items-center"
            />
            <div className="hidden md:block">
              <LinkButton
                href={`/${locale}/start`}
                className="site-pill bg-primary text-on-primary hover:bg-primary-hover"
              >
                {t("nav.start")}
              </LinkButton>
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
