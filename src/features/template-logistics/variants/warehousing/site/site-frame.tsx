"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { DemoBanner } from "@/features/demo-engine/banner/demo-banner";
import { getEngineT } from "@/features/demo-engine/messages";
import { HydrationGate } from "@/features/demo-engine/storage/hydration-gate";
import { track } from "@/features/tracking/client/track";
import { TrackedLanguageSwitch } from "@/features/tracking/components/tracked-language-switch";
import type { Locale } from "@/shared/i18n/config";
import { getT } from "@/shared/i18n/t";
import { businessNameOf } from "@/features/demo-engine/fake-auth/business-name";
import { PaletteScope } from "@/features/demo-engine/palettes/palette-scope";
import { warehousingFontClassName, warehousingFontFamily } from "../fonts";
import { getWarehousingT } from "../messages";
import { warehousingPalettes } from "../palettes";
import { WAREHOUSING_ROOT, WAREHOUSING_SLUG } from "../slug";
import { useWarehousingStore } from "../store";
import { BrandMark } from "./brand";
import { SiteFooter } from "./site-footer";
import { blockButton } from "./styles";
import "./animations.css";

type Props = { locale: Locale; children: ReactNode };

// Palette + fonts + loaded demo data + banner + the source's sticky header and dark footer around every public page.
export function SiteFrame({ locale, children }: Props) {
  return (
    <PaletteScope
      store={useWarehousingStore}
      palettes={warehousingPalettes}
      fontClassName={warehousingFontClassName}
      fontFamily={warehousingFontFamily}
    >
      <HydrationGate store={useWarehousingStore} loadingLabel={getEngineT(locale)("loading")}>
        <Chrome locale={locale}>{children}</Chrome>
      </HydrationGate>
    </PaletteScope>
  );
}

const linkClass =
  "relative py-1 text-[11px] font-semibold uppercase tracking-[0.05em] text-text/85 after:absolute after:-bottom-0.5 after:start-0 after:h-[1.5px] after:w-0 after:bg-primary after:transition-all hover:after:w-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus rtl:normal-case rtl:tracking-normal";

function Chrome({ locale, children }: Props) {
  const t = getWarehousingT(locale);
  const pathname = usePathname();
  const name = useWarehousingStore((state) => businessNameOf(state, locale));
  const root = `/${locale}${WAREHOUSING_ROOT}`;
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    track("demo_opened", { locale, template: WAREHOUSING_SLUG });
  }, [locale]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const [menuPath, setMenuPath] = useState(pathname);
  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setMenuOpen(false);
  }

  const links = [
    { href: `${root}#storage`, label: t("nav.about"), page: "" },
    { href: `${root}/services`, label: t("nav.services"), page: "/services" },
    { href: `${root}#estimator`, label: t("nav.pricing"), page: "" },
    { href: `${root}#tpl`, label: t("nav.tpl"), page: "" },
    { href: `${root}/warehouses`, label: t("nav.warehouses"), page: "/warehouses" },
    { href: `${root}/case-studies`, label: t("nav.caseStudies"), page: "/case-studies" },
  ];

  return (
    <div className="min-h-screen overflow-x-clip bg-bg leading-normal text-text antialiased">
      <DemoBanner
        store={useWarehousingStore}
        slug={WAREHOUSING_SLUG}
        templateName="Stackwell"
        locale={locale}
        dashboardHref={`${root}/dashboard`}
      />
      <header
        className={`sticky top-0 z-50 border-b bg-bg/95 backdrop-blur-[12px] transition-colors duration-300 ${
          scrolled || menuOpen ? "border-border" : "border-transparent"
        }`}
      >
        <div className="mx-auto flex h-[68px] max-w-[1200px] items-center gap-7 px-4 sm:px-6">
          <Link
            href={root}
            className="flex items-center gap-[9px] text-[17px] font-bold uppercase tracking-[0.02em] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus rtl:normal-case rtl:tracking-normal"
          >
            <BrandMark />
            {name}
          </Link>
          <nav aria-label={t("nav.label")} className="ms-auto max-[1024px]:hidden">
            <ul className="flex gap-[26px]">
              {links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    aria-current={link.page && pathname === `${root}${link.page}` ? "page" : undefined}
                    className={linkClass}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center gap-3 max-[1024px]:ms-auto">
            <TrackedLanguageSwitch locale={locale} label={getT(locale)("common.switchLanguage")} />
            <Link href={`${root}/quote`} className={`${blockButton("primary")} max-[1024px]:hidden`}>
              {t("header.cta")}
            </Link>
            <button
              type="button"
              aria-label={t("nav.menu")}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
              className="grid size-[38px] place-items-center rounded-full bg-surface text-primary focus-visible:outline-2 focus-visible:outline-focus min-[1025px]:hidden"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                className="size-4"
              >
                <path d="M2 4h12M2 8h12M2 12h12" />
              </svg>
            </button>
          </div>
        </div>
        {menuOpen ? (
          <nav
            aria-label={t("nav.label")}
            className="flex flex-col gap-1 border-t border-border bg-bg px-4 pb-5 pt-2.5 sm:px-6 min-[1025px]:hidden"
          >
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="border-b border-border py-3 text-[13px] font-semibold uppercase tracking-[0.05em] rtl:normal-case rtl:tracking-normal"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={`${root}/quote`}
              onClick={() => setMenuOpen(false)}
              className="py-3 text-[13px] font-semibold uppercase tracking-[0.05em] text-(--lg-accent) rtl:normal-case rtl:tracking-normal"
            >
              {t("header.cta")}
            </Link>
          </nav>
        ) : null}
      </header>
      <main id="main">{children}</main>
      <SiteFooter locale={locale} />
    </div>
  );
}
