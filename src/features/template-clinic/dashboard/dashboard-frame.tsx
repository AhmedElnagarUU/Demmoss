"use client";

import type { ReactNode } from "react";
import { DemoBanner } from "@/features/demo-engine/banner/demo-banner";
import { DashboardShell } from "@/features/demo-engine/dashboard-shell/dashboard-shell";
import { DashboardGuard } from "@/features/demo-engine/fake-auth/dashboard-guard";
import { businessNameOf } from "@/features/demo-engine/fake-auth/business-name";
import { getEngineT } from "@/features/demo-engine/messages";
import { PaletteScope } from "@/features/demo-engine/palettes/palette-scope";
import { HydrationGate } from "@/features/demo-engine/storage/hydration-gate";
import type { Locale } from "@/shared/i18n/config";
import type { ClinicStore } from "../clinic-store";
import { ClinicProvider, useClinic, type ClinicConfig } from "../context";
import { getClinicT } from "../messages";

type Props = { store: ClinicStore; config: ClinicConfig; locale: Locale; children: ReactNode };

// Login/register guard + sidebar shell around every dashboard page of a clinic variant.
export function DashboardFrame({ store, config, locale, children }: Props) {
  return (
    <ClinicProvider store={store} config={config} locale={locale}>
      <PaletteScope store={store} palettes={config.palettes}>
        <HydrationGate store={store} loadingLabel={getEngineT(locale)("loading")}>
          <DemoBanner
            store={store}
            slug={config.slug}
            templateName={config.templateName}
            locale={locale}
            dashboardHref={`/${locale}${config.basePath}/dashboard`}
          />
          <DashboardGuard store={store} slug={config.slug} locale={locale}>
            <Shell>{children}</Shell>
          </DashboardGuard>
        </HydrationGate>
      </PaletteScope>
    </ClinicProvider>
  );
}

function Shell({ children }: { children: ReactNode }) {
  const { store, config, locale } = useClinic();
  const t = getClinicT(locale);
  const businessName = store((state) => businessNameOf(state, locale));
  const root = `/${locale}${config.basePath}/dashboard`;

  const navItems = [
    { href: root, label: t("nav.overview") },
    { href: `${root}/appointments`, label: t("nav.appointments") },
    { href: `${root}/treatments`, label: t("nav.treatments") },
    { href: `${root}/patients`, label: t("nav.patients") },
    ...config.modules.map((module) => ({ href: `${root}/${module.path}`, label: module.label[locale] })),
    { href: `${root}/results`, label: t("nav.results") },
    { href: `${root}/faq`, label: t("nav.faq") },
    { href: `${root}/content`, label: t("nav.content") },
    { href: `${root}/testimonials`, label: t("nav.testimonials") },
    { href: `${root}/settings`, label: t("nav.settings") },
  ];

  return (
    <DashboardShell slug={config.slug} locale={locale} businessName={businessName} navItems={navItems}>
      {children}
    </DashboardShell>
  );
}
