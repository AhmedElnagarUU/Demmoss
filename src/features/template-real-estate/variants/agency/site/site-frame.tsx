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
import { RealEstateProvider, useRealEstate } from "../../../context";
import { PaletteScope } from "@/features/demo-engine/palettes/palette-scope";
import { pillClasses } from "../../../site/site-ui";
import { agencyConfig } from "../dashboard";
import { getAgencyT } from "../messages";
import { AGENCY_SLUG } from "../slug";
import { useAgencyStore } from "../store";
import { SiteFooter } from "./site-footer";

type Props = { locale: Locale; children: ReactNode };

// Palette + loaded demo data + banner + header and footer around every public page of the agency.
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

const pages = [
  { path: "", key: "nav.home" },
  { path: "/listings", key: "nav.listings" },
  { path: "/about", key: "nav.about" },
  { path: "/contact", key: "nav.contact" },
] as const;

function Chrome({ children }: { children: ReactNode }) {
  const { store, config, locale } = useRealEstate();
  const t = getAgencyT(locale);
  const pathname = usePathname();
  const name = store((state) => businessNameOf(state, locale));
  const root = `/${locale}${config.basePath}`;

  useEffect(() => {
    track("demo_opened", { locale, template: AGENCY_SLUG });
  }, [locale]);

  return (
    <div className="bg-bg font-light text-text">
      <DemoBanner
        store={store}
        slug={AGENCY_SLUG}
        templateName={config.templateName}
        locale={locale}
        dashboardHref={`${root}/dashboard`}
      />
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-3 px-4 py-4 sm:px-8">
          <Link
            href={root}
            className="text-lg font-light uppercase tracking-[0.18em] focus-visible:outline-2 focus-visible:outline-focus rtl:font-semibold rtl:normal-case rtl:tracking-normal"
          >
            {name}
          </Link>
          <nav aria-label={t("nav.label")}>
            <ul className="flex flex-wrap gap-x-6 gap-y-1 text-sm font-medium">
              {pages.map((page) => {
                const href = `${root}${page.path}`;
                const current = page.path === "" ? pathname === href : pathname.startsWith(href);
                return (
                  <li key={page.path}>
                    <Link
                      href={href}
                      aria-current={current ? "page" : undefined}
                      className="inline-block py-2 text-text hover:text-(--re-accent) aria-[current=page]:border-b-2 aria-[current=page]:border-primary focus-visible:outline-2 focus-visible:outline-focus"
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
            <Link href={`${root}/contact`} className={pillClasses.solid}>
              {t("header.schedule")}
            </Link>
          </div>
        </div>
      </header>
      <main id="main">{children}</main>
      <SiteFooter />
    </div>
  );
}
