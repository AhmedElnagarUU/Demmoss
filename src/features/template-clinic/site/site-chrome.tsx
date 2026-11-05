"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { DemoBanner } from "@/features/demo-engine/banner/demo-banner";
import { businessNameOf } from "@/features/demo-engine/fake-auth/business-name";
import { phoneDigits } from "@/features/demo-engine/format/phone";
import { getEngineT } from "@/features/demo-engine/messages";
import { PaletteScope } from "@/features/demo-engine/palettes/palette-scope";
import { HydrationGate } from "@/features/demo-engine/storage/hydration-gate";
import { track } from "@/features/tracking/client/track";
import { TrackedLanguageSwitch } from "@/features/tracking/components/tracked-language-switch";
import type { Locale } from "@/shared/i18n/config";
import { getT } from "@/shared/i18n/t";
import { whatsappUrl } from "@/shared/ui/whatsapp";
import type { ClinicStore } from "../clinic-store";
import { ClinicProvider, useClinic, type ClinicConfig } from "../context";
import { getClinicT } from "../messages";
import { softButton, wrap } from "./site-ui";

export type NavPage = { path: string; label: string };

type Props = {
  store: ClinicStore;
  config: ClinicConfig;
  locale: Locale;
  nav: readonly NavPage[];
  navLabel: string;
  bookLabel: string;
  tagline: string;
  children: ReactNode;
};

// Palette + loaded demo data + banner + header and footer around every public page of a clinic variant.
export function SiteChrome({ store, config, locale, children, ...chrome }: Props) {
  return (
    <ClinicProvider store={store} config={config} locale={locale}>
      <PaletteScope store={store} palettes={config.palettes}>
        <HydrationGate store={store} loadingLabel={getEngineT(locale)("loading")}>
          <Frame {...chrome}>{children}</Frame>
        </HydrationGate>
      </PaletteScope>
    </ClinicProvider>
  );
}

function Frame({
  nav,
  navLabel,
  bookLabel,
  tagline,
  children,
}: Pick<Props, "nav" | "navLabel" | "bookLabel" | "tagline" | "children">) {
  const { store, config, locale } = useClinic();
  const t = getClinicT(locale);
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const name = store((state) => businessNameOf(state, locale));
  const settings = store((state) => state.settings);
  const root = `/${locale}${config.basePath}`;

  useEffect(() => {
    track("demo_opened", { locale, template: config.slug });
  }, [locale, config.slug]);

  return (
    <div className="bg-bg text-text">
      <DemoBanner
        store={store}
        slug={config.slug}
        templateName={config.templateName}
        locale={locale}
        dashboardHref={`${root}/dashboard`}
      />
      <header className="sticky top-0 z-20 bg-surface/90 backdrop-blur">
        <div className={`${wrap} relative flex h-[68px] items-center gap-4`}>
          <Link
            href={root}
            className="text-base font-semibold focus-visible:outline-2 focus-visible:outline-focus"
          >
            {name}
          </Link>
          <nav
            aria-label={navLabel}
            className={`${
              menuOpen
                ? "absolute inset-x-4 top-[68px] flex flex-col gap-4 rounded-3xl bg-bg p-6 text-base shadow-xl"
                : "hidden"
            } md:static md:flex md:flex-row md:gap-6 md:rounded-none md:bg-transparent md:p-0 md:text-sm md:shadow-none md:ms-4`}
          >
            {nav.map((page) => {
              const href = `${root}${page.path}`;
              const current = page.path === "" ? pathname === href : pathname.startsWith(href);
              return (
                <Link
                  key={page.path}
                  href={href}
                  aria-current={current ? "page" : undefined}
                  onClick={() => setMenuOpen(false)}
                  className="py-1 text-muted hover:text-text aria-[current=page]:font-semibold aria-[current=page]:text-text focus-visible:outline-2 focus-visible:outline-focus"
                >
                  {page.label}
                </Link>
              );
            })}
          </nav>
          <span className="grow" />
          <TrackedLanguageSwitch locale={locale} label={getT(locale)("common.switchLanguage")} />
          <Link href={`${root}/book`} className={`${softButton} hidden sm:inline-flex`}>
            {bookLabel}
          </Link>
          <button
            type="button"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex min-h-11 items-center rounded-full bg-border px-4 text-sm font-medium focus-visible:outline-2 focus-visible:outline-focus md:hidden"
          >
            {t("site.header.menu")}
          </button>
        </div>
      </header>
      <main id="main">{children}</main>
      <footer className="mt-3 rounded-t-[30px] bg-text pb-28 pt-16 text-bg/80">
        <div className={`${wrap} flex flex-wrap justify-between gap-10`}>
          <div className="max-w-sm space-y-3">
            <p className="text-2xl font-medium text-bg">{name}</p>
            <p className="text-sm">{tagline}</p>
            <p className="text-sm">{settings.address[locale]}</p>
          </div>
          <div className="flex flex-wrap items-start gap-3">
            <a
              href={`tel:+${phoneDigits(settings.phone)}`}
              dir="ltr"
              className="inline-flex min-h-11 items-center rounded-full bg-bg/10 px-5 text-sm font-medium text-bg hover:bg-bg/20 focus-visible:outline-2 focus-visible:outline-bg"
            >
              {settings.phone}
            </a>
            <a
              href={whatsappUrl(settings.whatsapp, t("site.footer.whatsappMessage"))}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center rounded-full bg-bg/10 px-5 text-sm font-medium text-bg hover:bg-bg/20 focus-visible:outline-2 focus-visible:outline-bg"
            >
              {t("site.footer.whatsapp")}
            </a>
          </div>
        </div>
        <p className={`${wrap} mt-12 text-xs text-bg/70`}>{t("site.footer.credit")}</p>
      </footer>
    </div>
  );
}
