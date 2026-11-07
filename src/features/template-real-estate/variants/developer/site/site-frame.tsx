"use client";

import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import { DemoBanner } from "@/features/demo-engine/banner/demo-banner";
import { getEngineT } from "@/features/demo-engine/messages";
import { HydrationGate } from "@/features/demo-engine/storage/hydration-gate";
import { track } from "@/features/tracking/client/track";
import { TrackedLanguageSwitch } from "@/features/tracking/components/tracked-language-switch";
import type { Locale } from "@/shared/i18n/config";
import { getT } from "@/shared/i18n/t";
import { businessNameOf } from "@/features/demo-engine/fake-auth/business-name";
import { RealEstateProvider, useRealEstate } from "../../../context";
import { PaletteScope } from "@/features/demo-engine/palettes/palette-scope";
import { developerConfig } from "../dashboard";
import { getDeveloperT } from "../messages";
import { DEVELOPER_SLUG } from "../slug";
import { useDeveloperStore } from "../store";
import { BrandName, logoLinkClass } from "./brand";
import { SiteFooter } from "./site-footer";
import { container, pill, pillNav, rtlSafe } from "./styles";
import "./animations.css";

type Props = { locale: Locale; children: ReactNode };

// Palette + loaded demo data + banner + header and footer around every public page of Solenne Estates.
export function SiteFrame({ locale, children }: Props) {
  return (
    <RealEstateProvider store={useDeveloperStore} config={developerConfig} locale={locale}>
      <PaletteScope store={useDeveloperStore} palettes={developerConfig.palettes}>
        <HydrationGate store={useDeveloperStore} loadingLabel={getEngineT(locale)("loading")}>
          <Chrome>{children}</Chrome>
        </HydrationGate>
      </PaletteScope>
    </RealEstateProvider>
  );
}

const linkClass =
  "relative py-1.5 text-[11px] uppercase tracking-[0.22em] text-text/80 transition-colors duration-300 hover:text-(--re-accent) " +
  "after:absolute after:bottom-0 after:start-0 after:h-px after:w-0 after:bg-(--re-accent) after:transition-[width] after:duration-300 " +
  `hover:after:w-full focus-visible:after:w-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus ${rtlSafe}`;

function Chrome({ children }: { children: ReactNode }) {
  const { store, config, locale } = useRealEstate();
  const t = getDeveloperT(locale);
  const name = store((state) => businessNameOf(state, locale));
  const [menuOpen, setMenuOpen] = useState(false);
  // like the source, the bar turns solid after 60px of scrolling
  const [solid, setSolid] = useState(false);
  const root = `/${locale}${config.basePath}`;

  useEffect(() => {
    track("demo_opened", { locale, template: DEVELOPER_SLUG });
  }, [locale]);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: `${root}#residences`, label: t("nav.residences") },
    { href: `${root}#principles`, label: t("nav.principles") },
    { href: `${root}#collection`, label: t("nav.collection") },
    { href: `${root}#about`, label: t("nav.about") },
    { href: `${root}#contact`, label: t("nav.contact") },
  ];
  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="overflow-x-clip bg-bg font-light leading-[1.7] text-text antialiased">
      <DemoBanner
        store={store}
        slug={DEVELOPER_SLUG}
        templateName={config.templateName}
        locale={locale}
        dashboardHref={`${root}/dashboard`}
      />
      {/* a sticky strip with no height: the bar floats over the hero and does not push the page down when it shrinks */}
      <div className="sticky top-0 z-50 h-0">
        <header
          className={`absolute inset-x-0 top-0 z-20 border-b transition-[padding,background-color,border-color] duration-[400ms] motion-reduce:transition-none ${
            solid || menuOpen
              ? "border-border bg-bg/90 py-3.5 backdrop-blur-[12px]"
              : "border-transparent py-[22px]"
          }`}
        >
          <div className={`${container} flex items-center justify-between gap-6 max-[640px]:gap-3`}>
            <Link href={root} className={`${logoLinkClass} min-w-0 truncate`}>
              <BrandName name={name} />
            </Link>
            <nav aria-label={t("nav.label")} className="max-[1024px]:hidden">
              <ul className="flex items-center gap-9">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={linkClass}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="flex shrink-0 items-center gap-3">
              <TrackedLanguageSwitch locale={locale} label={getT(locale)("common.switchLanguage")} />
              <Link href={`${root}#contact`} className={pillNav}>
                {t("header.book")}
              </Link>
              <button
                type="button"
                aria-label={t("nav.menu")}
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((open) => !open)}
                className="relative hidden h-5 w-8 cursor-pointer max-[1024px]:block focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-focus"
              >
                <i
                  aria-hidden="true"
                  className={`absolute inset-x-0 h-px bg-text transition-all duration-300 ${menuOpen ? "top-2.5 rotate-45" : "top-0.5"}`}
                />
                <i
                  aria-hidden="true"
                  className={`absolute inset-x-0 top-2.5 h-px bg-text transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
                />
                <i
                  aria-hidden="true"
                  className={`absolute inset-x-0 h-px bg-text transition-all duration-300 ${menuOpen ? "top-2.5 -rotate-45" : "top-[18px]"}`}
                />
              </button>
            </div>
          </div>
        </header>
        {/* the full-screen menu of the source (under 1024px): the links centred on the page colour */}
        <div
          className={`fixed inset-0 z-10 hidden flex-col items-center justify-center gap-7 bg-bg transition-[translate,visibility] duration-500 max-[1024px]:flex motion-reduce:transition-none ${menuOpen ? "visible translate-y-0" : "invisible -translate-y-full"}`}
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className={`text-[15px] uppercase tracking-[0.14em] text-text/80 hover:text-(--re-accent) focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus ${rtlSafe}`}
            >
              {link.label}
            </Link>
          ))}
          <Link href={`${root}#contact`} onClick={closeMenu} className={`${pill} text-xs`}>
            {t("header.book")}
          </Link>
        </div>
      </div>
      <main id="main">{children}</main>
      <SiteFooter />
    </div>
  );
}
