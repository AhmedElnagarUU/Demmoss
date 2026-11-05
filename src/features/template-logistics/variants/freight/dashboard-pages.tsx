"use client";

import type { ReactNode } from "react";
import type { Locale } from "@/shared/i18n/config";
import { DashboardFrame } from "../../dashboard/dashboard-frame";
import { RatesPage } from "../../modules/rates/rates-page";
import { ShipmentsPage } from "../../modules/shipments/shipments-page";
import { freightConfig } from "./dashboard";
import { FREIGHT_SLUG } from "./slug";
import { useFreightStore } from "./store";

// Binds the shared dashboard and the variant modules to the Jisr Cargo store.
export function FreightDashboard({ locale, children }: { locale: Locale; children: ReactNode }) {
  return (
    <DashboardFrame store={useFreightStore} config={freightConfig} locale={locale}>
      {children}
    </DashboardFrame>
  );
}

export function FreightShipments({ locale }: { locale: Locale }) {
  return <ShipmentsPage store={useFreightStore} slug={FREIGHT_SLUG} locale={locale} />;
}

export function FreightRates({ locale }: { locale: Locale }) {
  return <RatesPage store={useFreightStore} slug={FREIGHT_SLUG} locale={locale} />;
}
