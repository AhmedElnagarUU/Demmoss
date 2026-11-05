"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, type ReactNode } from "react";
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
import { SiteFooter } from "./site-footer";
import { scriptAccent, solidButton } from "./styles";

type Props = { locale: Locale; children: ReactNode };

// Fonts + palette + loaded demo data + banner + header and footer around every public page of Zaytouna.
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

const pages = [
  { path: "", key: "nav.home" },
  { path: "/menu", key: "nav.menu" },
  { path: "/about", key: "nav.about" },
  { path: "/events", key: "nav.events" },
  { path: "/contact", key: "nav.contact" },
] as const;

function Chrome({ locale, children }: Props) {
  const t = getFineDiningT(locale);
  const pathname = usePathname();
  const name = useFineDiningStore((state) => businessNameOf(state, locale));
  const root = `/${locale}/demos/restaurant/fine-dining`;

  useEffect(() => {
    track("demo_opened", { locale, template: FINE_DINING_SLUG });
  }, [locale]);

  return (
    <div className="bg-bg font-(family-name:--fd-body) text-text">
      <DemoBanner
        store={useFineDiningStore}
        slug={FINE_DINING_SLUG}
        templateName="Zaytouna"
        locale={locale}
        dashboardHref={`${root}/dashboard`}
      />
      <header className="sticky top-0 z-30 border-b border-border bg-bg/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-3">
          <Link
            href={root}
            className={`${scriptAccent(locale)} leading-none focus-visible:outline-2 focus-visible:outline-focus`}
          >
            {name}
          </Link>
          <nav aria-label={t("nav.label")}>
            <ul className="flex flex-wrap gap-x-5 gap-y-1 text-xs font-medium uppercase tracking-[0.18em] rtl:text-base rtl:normal-case rtl:tracking-normal">
              {pages.map((page) => {
                const href = `${root}${page.path}`;
                return (
                  <li key={page.path}>
                    <Link
                      href={href}
                      aria-current={pathname === href ? "page" : undefined}
                      className="inline-block py-2 text-text hover:text-primary aria-[current=page]:border-b aria-[current=page]:border-primary focus-visible:outline-2 focus-visible:outline-focus"
                    >
                      {t(page.key)}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="flex items-center gap-2">
            <TrackedLanguageSwitch locale={locale} label={getT(locale)("common.switchLanguage")} />
            <Link href={`${root}/reserve`} className={solidButton}>
              {t("header.reserve")}
            </Link>
          </div>
        </div>
      </header>
      <main id="main">{children}</main>
      <SiteFooter locale={locale} />
    </div>
  );
}
