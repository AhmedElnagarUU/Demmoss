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
import { freightFontClassName, freightFontFamily } from "../fonts";
import { getFreightT } from "../messages";
import { freightPalettes } from "../palettes";
import { FREIGHT_ROOT, FREIGHT_SLUG } from "../slug";
import { useFreightStore } from "../store";
import { BrandLogo } from "./brand";
import { ArrowIcon } from "./icons";
import { SiteFooter } from "./site-footer";
import { btnPrimary, container } from "./styles";
import "./animations.css";

type Props = { locale: Locale; children: ReactNode };

// Palette + fonts + loaded demo data + banner + the source's fixed header and dark footer around every page.
export function SiteFrame({ locale, children }: Props) {
  return (
    <PaletteScope
      store={useFreightStore}
      palettes={freightPalettes}
      fontClassName={freightFontClassName}
      fontFamily={freightFontFamily}
    >
      <HydrationGate store={useFreightStore} loadingLabel={getEngineT(locale)("loading")}>
        <Chrome locale={locale}>{children}</Chrome>
      </HydrationGate>
    </PaletteScope>
  );
}

const navLink =
  "relative py-1.5 text-[13.5px] font-medium text-text/80 transition-colors duration-300 hover:text-text " +
  "after:absolute after:-bottom-1 after:start-0 after:end-0 after:mx-auto after:size-1 after:rounded-full after:bg-text " +
  "after:transition-transform after:duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus";

function Chrome({ locale, children }: Props) {
  const t = getFreightT(locale);
  const pathname = usePathname();
  const name = useFreightStore((state) => businessNameOf(state, locale));
  const settings = useFreightStore((state) => state.settings);
  const [menuOpen, setMenuOpen] = useState(false);
  // like the source, the bar turns white and blurred after 20px of scrolling
  const [solid, setSolid] = useState(false);
  const root = `/${locale}${FREIGHT_ROOT}`;

  useEffect(() => {
    track("demo_opened", { locale, template: FREIGHT_SLUG });
  }, [locale]);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 20);
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
    { href: root, label: t("nav.home"), active: pathname === root },
    { href: `${root}/services`, label: t("nav.services"), active: pathname === `${root}/services` },
    { href: `${root}#about`, label: t("nav.about"), active: false },
    { href: `${root}#pricing`, label: t("nav.pricing"), active: false },
    { href: `${root}#faq`, label: t("nav.faq"), active: false },
    { href: `${root}/track`, label: t("nav.track"), active: pathname === `${root}/track` },
    { href: `${root}#contacts`, label: t("nav.contacts"), active: false },
  ];
  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="min-h-screen overflow-x-clip bg-bg font-normal leading-[1.55] text-text antialiased">
      <DemoBanner
        store={useFreightStore}
        slug={FREIGHT_SLUG}
        templateName="Orbis Cargo"
        locale={locale}
        dashboardHref={`${root}/dashboard`}
      />

      {/* a sticky strip with no height: the bar floats over the hero and does not push the page down */}
      <div className="sticky top-0 z-50 h-0">
        <header
          className={`absolute start-0 end-0 top-0 z-20 transition-[background-color,box-shadow] duration-300 motion-reduce:transition-none ${
            solid || menuOpen
              ? "bg-surface/85 shadow-[0_1px_0_rgba(0,0,0,0.06)] backdrop-blur-[14px]"
              : "bg-transparent"
          }`}
        >
          <div
            className={`${container} flex h-[78px] items-center justify-between gap-5 max-[640px]:h-[68px]`}
          >
            <Link
              href={root}
              className="flex min-w-0 items-center rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus"
            >
              <BrandLogo locale={locale} name={name} />
            </Link>

            <nav aria-label={t("nav.label")} className="max-[1024px]:hidden">
              <ul className="flex items-center gap-[30px]">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      aria-current={link.active ? "page" : undefined}
                      className={`${navLink} ${link.active ? "after:scale-100" : "after:scale-0 hover:after:scale-100"}`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex shrink-0 items-center gap-[22px] max-[1024px]:gap-3">
              <div className="max-[1024px]:hidden">
                <span dir="ltr" className="block text-start text-[13px] font-semibold leading-[1.35]">
                  {settings.phone}
                </span>
                <small className="block text-[11.5px] font-normal leading-[1.35] text-muted">
                  {t("header.hours", { open: settings.officeOpen, close: settings.officeClose })}
                </small>
              </div>

              <TrackedLanguageSwitch locale={locale} label={getT(locale)("common.switchLanguage")} />

              <Link
                href={`${root}#calculator`}
                className={`${btnPrimary} px-[22px] py-3 text-[13.5px] max-[640px]:hidden`}
              >
                {t("header.cta")}
                <ArrowIcon className="size-[18px] rtl:rotate-180" />
              </Link>

              <button
                type="button"
                aria-label={t("nav.menu")}
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((open) => !open)}
                className="hidden size-11 cursor-pointer place-items-center rounded-full border border-border bg-surface text-text transition-colors duration-200 hover:bg-(--lg-band) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus max-[1024px]:grid"
              >
                <span aria-hidden="true" className="relative block h-3.5 w-[18px]">
                  <i
                    className={`absolute start-0 h-[1.5px] w-full bg-current transition-[transform,top] duration-200 ${
                      menuOpen ? "top-[6px] rotate-45" : "top-0"
                    }`}
                  />
                  <i
                    className={`absolute start-0 top-[6px] h-[1.5px] w-full bg-current transition-opacity duration-200 ${
                      menuOpen ? "opacity-0" : "opacity-100"
                    }`}
                  />
                  <i
                    className={`absolute start-0 h-[1.5px] w-full bg-current transition-[transform,top] duration-200 ${
                      menuOpen ? "top-[6px] -rotate-45" : "top-[12px]"
                    }`}
                  />
                </span>
              </button>
            </div>
          </div>
        </header>

        {menuOpen ? (
          <div className="absolute start-0 end-0 top-[78px] z-10 hidden flex-col bg-surface px-6 pb-6 pt-3 shadow-[0_20px_40px_rgba(0,0,0,0.1)] max-[1024px]:flex max-[640px]:top-[68px] max-[640px]:px-4">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={closeMenu}
                className="border-b border-border py-[15px] text-[17px] font-medium text-text focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={`${root}#calculator`}
              onClick={closeMenu}
              className={`${btnPrimary} mt-[18px] justify-center`}
            >
              {t("header.cta")}
              <ArrowIcon className="size-[18px] rtl:rotate-180" />
            </Link>
          </div>
        ) : null}
      </div>

      <main id="main">{children}</main>
      <SiteFooter locale={locale} />
    </div>
  );
}
