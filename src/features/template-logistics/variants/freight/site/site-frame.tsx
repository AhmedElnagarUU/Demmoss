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
import { businessNameOf } from "../../../business-name";
import { PaletteScope } from "../../../palette-scope";
import { freightFontClassName, freightFontFamily } from "../fonts";
import { getFreightT } from "../messages";
import { freightPalettes } from "../palettes";
import { FREIGHT_ROOT, FREIGHT_SLUG } from "../slug";
import { useFreightStore } from "../store";
import { SiteFooter } from "./site-footer";
import { pillButton } from "./styles";

type Props = { locale: Locale; children: ReactNode };

// Palette + fonts + loaded demo data + banner + header and footer around every public page of Jisr Cargo.
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

const pages = [
  { path: "", key: "nav.home" },
  { path: "/services", key: "nav.services" },
  { path: "/calculator", key: "nav.calculator" },
  { path: "/track", key: "nav.track" },
] as const;

function Chrome({ locale, children }: Props) {
  const t = getFreightT(locale);
  const pathname = usePathname();
  const name = useFreightStore((state) => businessNameOf(state, locale));
  const root = `/${locale}${FREIGHT_ROOT}`;

  useEffect(() => {
    track("demo_opened", { locale, template: FREIGHT_SLUG });
  }, [locale]);

  return (
    <div className="min-h-screen bg-bg text-text">
      <DemoBanner
        store={useFreightStore}
        slug={FREIGHT_SLUG}
        templateName="Jisr Cargo"
        locale={locale}
        dashboardHref={`${root}/dashboard`}
      />
      <header className="border-b border-border bg-surface">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-3">
          <Link
            href={root}
            className="text-2xl font-extrabold tracking-tight text-text focus-visible:outline-2 focus-visible:outline-focus"
          >
            {name}
          </Link>
          <nav aria-label={t("nav.label")}>
            <ul className="flex flex-wrap gap-x-5 text-base font-semibold">
              {pages.map((page) => {
                const href = `${root}${page.path}`;
                return (
                  <li key={page.path}>
                    <Link
                      href={href}
                      aria-current={pathname === href ? "page" : undefined}
                      className="inline-block py-2 text-text hover:text-(--lg-accent) aria-[current=page]:border-b-2 aria-[current=page]:border-primary focus-visible:outline-2 focus-visible:outline-focus"
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
            <Link href={`${root}/quote`} className={pillButton("primary")}>
              {t("header.cta")}
            </Link>
          </div>
        </div>
      </header>
      <main id="main">{children}</main>
      <SiteFooter locale={locale} />
    </div>
  );
}
