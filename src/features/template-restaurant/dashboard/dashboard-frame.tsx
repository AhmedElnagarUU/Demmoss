"use client";

import type { ReactNode } from "react";
import { DemoBanner } from "@/features/demo-engine/banner/demo-banner";
import { DashboardShell } from "@/features/demo-engine/dashboard-shell/dashboard-shell";
import { DashboardGuard } from "@/features/demo-engine/fake-auth/dashboard-guard";
import { getEngineT } from "@/features/demo-engine/messages";
import { HydrationGate } from "@/features/demo-engine/storage/hydration-gate";
import type { Locale } from "@/shared/i18n/config";
import { businessNameOf } from "../business-name";
import { getRestaurantT } from "../messages";
import { PaletteScope } from "../palette-scope";
import type { RestaurantStore } from "../restaurant-store";
import { RestaurantProvider, useRestaurant, type RestaurantConfig } from "./restaurant-context";

type Props = { store: RestaurantStore; config: RestaurantConfig; locale: Locale; children: ReactNode };

// Login/register guard + sidebar shell around every dashboard page of a restaurant variant.
export function DashboardFrame({ store, config, locale, children }: Props) {
  return (
    <RestaurantProvider store={store} config={config} locale={locale}>
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
    </RestaurantProvider>
  );
}

function Shell({ children }: { children: ReactNode }) {
  const { store, config, locale } = useRestaurant();
  const t = getRestaurantT(locale);
  const businessName = store((state) => businessNameOf(state, locale));
  const root = `/${locale}${config.basePath}/dashboard`;

  const navItems = [
    { href: root, label: t("nav.overview") },
    ...config.modules.map((module) => ({ href: `${root}/${module.path}`, label: module.label[locale] })),
    { href: `${root}/menu`, label: t("nav.menu") },
    { href: `${root}/content`, label: t("nav.content") },
    { href: `${root}/customers`, label: t("nav.customers") },
    { href: `${root}/reviews`, label: t("nav.reviews") },
    { href: `${root}/settings`, label: t("nav.settings") },
  ];

  return (
    <DashboardShell slug={config.slug} locale={locale} businessName={businessName} navItems={navItems}>
      {children}
    </DashboardShell>
  );
}
