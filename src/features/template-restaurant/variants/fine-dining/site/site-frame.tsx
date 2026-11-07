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
import { fineDiningFonts } from "../fonts";
import { fineDiningPalettes } from "../palettes";
import { getFineDiningT } from "../messages";
import { FINE_DINING_SLUG } from "../slug";
import { useFineDiningStore } from "../store";
import { BurgerIcon } from "./icons";
import { SiteFooter } from "./site-footer";
import { container, reserveButton, scriptFont } from "./styles";
import "./animations.css";

type Props = { locale: Locale; children: ReactNode };

// Fonts + palette + loaded demo data + banner + header and footer around every public page of Verdant Table.
export function SiteFrame({ locale, children }: Props) {
  return (
    <div className={fineDiningFonts.className} style={fineDiningFonts.style}>
      <PaletteScope store={useFineDiningStore} palettes={fineDiningPalettes}>
        <HydrationGate store={useFineDiningStore} loadingLabel={getEngineT(locale)("loading")}>
          <Chrome locale={locale}>{children}</Chrome>
        </HydrationGate>
      </PaletteScope>
    </div>
  );
}

// The source links: Story, Signature, Menu, Gallery, Visit. Our site has real pages, so the gallery link is the events page.
const pages = [
  { path: "/about", key: "nav.about" },
  { path: "#signature", key: "nav.signature" },
  { path: "/menu", key: "nav.menu" },
  { path: "/events", key: "nav.events" },
  { path: "/contact", key: "nav.contact" },
] as const;

function Chrome({ locale, children }: Props) {
  const t = getFineDiningT(locale);
  const pathname = usePathname();
  const name = useFineDiningStore((state) => businessNameOf(state, locale));
  const [menuOpen, setMenuOpen] = useState(false);
  const root = `/${locale}/demos/restaurant/fine-dining`;

  useEffect(() => {
    track("demo_opened", { locale, template: FINE_DINING_SLUG });
  }, [locale]);

  // source .links: a row of 11px uppercase links; below 820px a dropdown panel under the header
  const linksClass =
    (menuOpen ? "max-[820px]:flex" : "max-[820px]:hidden") +
    " flex items-center gap-[26px] max-[1024px]:gap-4 max-[820px]:absolute max-[820px]:inset-x-0 max-[820px]:top-[68px]" +
    " max-[820px]:flex-col max-[820px]:gap-[18px] max-[820px]:border-b max-[820px]:border-text/35 max-[820px]:bg-bg" +
    " max-[820px]:px-4 max-[820px]:pb-[26px] max-[820px]:pt-5";
  const linkClass =
    "text-[11px] uppercase tracking-[0.2em] transition-colors duration-300 hover:text-(--fd-accent) " +
    "aria-[current=page]:text-(--fd-accent) rtl:text-sm rtl:normal-case rtl:tracking-normal " +
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus";

  return (
    <div className="overflow-x-clip bg-bg font-(family-name:--fd-body) text-base font-light leading-[1.7] text-text">
      <DemoBanner
        store={useFineDiningStore}
        slug={FINE_DINING_SLUG}
        templateName="Verdant Table"
        locale={locale}
        dashboardHref={`${root}/dashboard`}
      />
      <header className="sticky top-0 z-50 border-b border-text/12 bg-bg/92 backdrop-blur-sm">
        <div className={`${container} flex h-[68px] items-center justify-between gap-4`}>
          <Link
            href={root}
            className={`${scriptFont} text-[34px] leading-none! text-text! focus-visible:outline-2 focus-visible:outline-focus`}
          >
            {name}
          </Link>
          <div className="flex items-center gap-4">
            <nav aria-label={t("nav.label")} className={linksClass}>
              {pages.map((page) => {
                const href = `${root}${page.path}`;
                return (
                  <Link
                    key={page.path}
                    href={href}
                    aria-current={pathname === href ? "page" : undefined}
                    onClick={() => setMenuOpen(false)}
                    className={linkClass}
                  >
                    {t(page.key)}
                  </Link>
                );
              })}
              <Link href={`${root}/reserve`} onClick={() => setMenuOpen(false)} className={reserveButton}>
                {t("nav.reserve")}
              </Link>
            </nav>
            <TrackedLanguageSwitch locale={locale} label={getT(locale)("common.switchLanguage")} />
            <button
              type="button"
              aria-label={t("nav.label")}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
              className="hidden size-[42px] cursor-pointer place-items-center border border-text/35 text-text focus-visible:outline-2 focus-visible:outline-focus max-[820px]:grid"
            >
              <BurgerIcon />
            </button>
          </div>
        </div>
      </header>
      <main id="main">{children}</main>
      <SiteFooter locale={locale} />
    </div>
  );
}
