"use client";

import type { ReactNode } from "react";
import { DemoBanner } from "@/features/demo-engine/banner/demo-banner";
import { DashboardShell } from "@/features/demo-engine/dashboard-shell/dashboard-shell";
import { DashboardGuard } from "@/features/demo-engine/fake-auth/dashboard-guard";
import { getEngineT } from "@/features/demo-engine/messages";
import { HydrationGate } from "@/features/demo-engine/storage/hydration-gate";
import type { Locale } from "@/shared/i18n/config";
import { businessNameOf } from "../business-name";
import type { LogisticsStore } from "../logistics-store";
import { getLogisticsT } from "../messages";
import { PaletteScope } from "../palette-scope";
import { LogisticsProvider, useLogistics, type LogisticsConfig } from "./logistics-context";

type Props = { store: LogisticsStore; config: LogisticsConfig; locale: Locale; children: ReactNode };

// Login/register guard + sidebar shell around every dashboard page of a logistics variant.
export function DashboardFrame({ store, config, locale, children }: Props) {
  return (
    <LogisticsProvider store={store} config={config} locale={locale}>
      <PaletteScope
        store={store}
        palettes={config.palettes}
        fontClassName={config.fontClassName}
        fontFamily={config.fontFamily}
      >
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
    </LogisticsProvider>
  );
}

function Shell({ children }: { children: ReactNode }) {
  const { store, config, locale } = useLogistics();
  const t = getLogisticsT(locale);
  const businessName = store((state) => businessNameOf(state, locale));
  const root = `/${locale}${config.basePath}/dashboard`;
  const navItems = [
    { href: root, label: t("nav.overview") },
    { href: `${root}/quotes`, label: t("nav.quotes") },
    ...config.modules.map((module) => ({ href: `${root}/${module.path}`, label: module.label[locale] })),
    { href: `${root}/clients`, label: t("nav.clients") },
    { href: `${root}/faq`, label: t("nav.faq") },
    { href: `${root}/testimonials`, label: t("nav.testimonials") },
    { href: `${root}/content`, label: t("nav.content") },
    { href: `${root}/settings`, label: t("nav.settings") },
  ];
  return (
    <DashboardShell slug={config.slug} locale={locale} businessName={businessName} navItems={navItems}>
      {children}
    </DashboardShell>
  );
}
