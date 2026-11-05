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
import { RealEstateProvider, useRealEstate } from "../../../context";
import { PaletteScope } from "../../../palette-scope";
import { pillClasses } from "../../../site/site-ui";
import { developerConfig } from "../dashboard";
import { getDeveloperT } from "../messages";
import { DEVELOPER_SLUG } from "../slug";
import { useDeveloperStore } from "../store";

type Props = { locale: Locale; children: ReactNode };

// Palette + loaded demo data + banner + header and footer around every public page of the developer.
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

const pages = [
  { path: "", key: "nav.home" },
  { path: "/residences", key: "nav.residences" },
  { path: "/process", key: "nav.process" },
  { path: "/contact", key: "nav.contact" },
] as const;

function Chrome({ children }: { children: ReactNode }) {
  const { store, config, locale } = useRealEstate();
  const t = getDeveloperT(locale);
  const pathname = usePathname();
  const name = store((state) => businessNameOf(state, locale));
  const settings = store((state) => state.settings);
  const root = `/${locale}${config.basePath}`;

  useEffect(() => {
    track("demo_opened", { locale, template: DEVELOPER_SLUG });
  }, [locale]);

  return (
    <div className="bg-bg font-light text-text">
      <DemoBanner
        store={store}
        slug={DEVELOPER_SLUG}
        templateName={config.templateName}
        locale={locale}
        dashboardHref={`${root}/dashboard`}
      />
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-3 px-4 py-4 sm:px-8">
          <Link
            href={root}
            className="text-lg font-extralight uppercase tracking-[0.35em] focus-visible:outline-2 focus-visible:outline-focus rtl:font-medium rtl:normal-case rtl:tracking-normal"
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
                      className="inline-block py-2 text-text hover:text-(--re-accent) aria-[current=page]:border-b aria-[current=page]:border-(--re-accent) focus-visible:outline-2 focus-visible:outline-focus"
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
              {t("header.book")}
            </Link>
          </div>
        </div>
      </header>
      <main id="main">{children}</main>
      <footer className="border-t border-border bg-surface">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-8 md:grid-cols-3">
          <div className="space-y-3">
            <p className="text-lg font-semibold">{name}</p>
            <p className="text-muted">{t("footer.tagline")}</p>
          </div>
          <nav aria-label={t("footer.explore")}>
            <p className="mb-3 font-semibold">{t("footer.explore")}</p>
            <ul className="space-y-1">
              {pages.map((page) => (
                <li key={page.path}>
                  <Link href={`${root}${page.path}`} className="underline">
                    {t(page.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <address className="space-y-1 not-italic">
            <p className="mb-3 font-semibold">{t("footer.visit")}</p>
            <p>{settings.address[locale]}</p>
            <p dir="ltr" className="text-start">
              {settings.phone}
            </p>
            <p>{settings.hours[locale]}</p>
          </address>
        </div>
        <p className="border-t border-border px-4 py-4 text-center text-sm text-muted">
          {t("footer.demoNote", { name })}
        </p>
      </footer>
    </div>
  );
}
