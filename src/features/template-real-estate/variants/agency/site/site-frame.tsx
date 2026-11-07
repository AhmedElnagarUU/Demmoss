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
import { agencyConfig } from "../dashboard";
import { getAgencyT } from "../messages";
import { AGENCY_SLUG } from "../slug";
import { useAgencyStore } from "../store";
import { BrandName, logoLinkClass } from "./brand";
import { SiteFooter } from "./site-footer";
import { container, pillDark, pillDarkNav, rtlSafe } from "./styles";
import "./animations.css";

type Props = { locale: Locale; children: ReactNode };

// Palette + loaded demo data + banner + header and footer around every public page of Hartwell & Co. Realty.
export function SiteFrame({ locale, children }: Props) {
  return (
    <RealEstateProvider store={useAgencyStore} config={agencyConfig} locale={locale}>
      <PaletteScope store={useAgencyStore} palettes={agencyConfig.palettes}>
        <HydrationGate store={useAgencyStore} loadingLabel={getEngineT(locale)("loading")}>
          <Chrome>{children}</Chrome>
        </HydrationGate>
      </PaletteScope>
    </RealEstateProvider>
  );
}

const linkClass =
  "relative py-1.5 text-[11px] uppercase tracking-[0.22em] after:absolute after:bottom-0 after:start-0 after:h-px after:w-0 " +
  "after:bg-(--re-gold) after:transition-[width] after:duration-300 hover:after:w-full focus-visible:after:w-full " +
  `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus ${rtlSafe}`;

function Chrome({ children }: { children: ReactNode }) {
  const { store, config, locale } = useRealEstate();
  const t = getAgencyT(locale);
  const name = store((state) => businessNameOf(state, locale));
  const [menuOpen, setMenuOpen] = useState(false);
  const root = `/${locale}${config.basePath}`;

  useEffect(() => {
    track("demo_opened", { locale, template: AGENCY_SLUG });
  }, [locale]);

  // Buy and Rent open the listings; Sell, Agents and Contact are sections of the home page (the source's anchors).
  const links = [
    { href: `${root}/listings?purpose=sale`, label: t("nav.buy") },
    { href: `${root}/listings?purpose=rent`, label: t("nav.rent") },
    { href: `${root}#mortgage`, label: t("nav.sell") },
    { href: `${root}#agents`, label: t("nav.agents") },
    { href: `${root}#contact`, label: t("nav.contact") },
  ];
  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="overflow-x-clip bg-bg font-light leading-[1.7] text-text antialiased">
      <DemoBanner
        store={store}
        slug={AGENCY_SLUG}
        templateName={config.templateName}
        locale={locale}
        dashboardHref={`${root}/dashboard`}
      />
      <header className="sticky top-0 z-50 border-b border-border bg-bg/90 backdrop-blur-[14px]">
        <div className={`${container} flex h-[76px] items-center justify-between gap-3`}>
          <Link href={root} className={`${logoLinkClass} min-w-0 truncate`}>
            <BrandName name={name} />
          </Link>
          <nav aria-label={t("nav.label")} className="max-[1024px]:hidden">
            <ul className="flex gap-[38px]">
              {links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex shrink-0 items-center gap-2">
            <TrackedLanguageSwitch locale={locale} label={getT(locale)("common.switchLanguage")} />
            <Link href={`${root}#contact`} className={pillDarkNav}>
              {t("header.schedule")}
            </Link>
            <button
              type="button"
              aria-label={t("nav.menu")}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
              className="relative hidden size-10 cursor-pointer max-[1024px]:block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
            >
              <i
                aria-hidden="true"
                className={`absolute inset-x-[9px] h-px bg-text transition-all duration-300 ${menuOpen ? "top-5 rotate-45" : "top-3.5"}`}
              />
              <i
                aria-hidden="true"
                className={`absolute inset-x-[9px] top-5 h-px bg-text transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
              />
              <i
                aria-hidden="true"
                className={`absolute inset-x-[9px] h-px bg-text transition-all duration-300 ${menuOpen ? "top-5 -rotate-45" : "top-[26px]"}`}
              />
            </button>
          </div>
        </div>
        <div
          className={`absolute inset-x-0 top-[76px] -z-10 hidden border-b border-border bg-bg px-4 pb-[26px] pt-2.5 transition-[translate,visibility] duration-[400ms] max-[1024px]:block motion-reduce:transition-none ${menuOpen ? "visible translate-y-0" : "invisible -translate-y-[120%]"}`}
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className={`block border-b border-border py-4 text-xs uppercase tracking-[0.22em] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus ${rtlSafe}`}
            >
              {link.label}
            </Link>
          ))}
          <Link href={`${root}#contact`} onClick={closeMenu} className={`${pillDark} mt-5 flex`}>
            {t("header.schedule")}
          </Link>
        </div>
      </header>
      <main id="main">{children}</main>
      <SiteFooter />
    </div>
  );
}
