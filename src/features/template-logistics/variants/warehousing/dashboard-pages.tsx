"use client";

import type { ReactNode } from "react";
import type { Locale } from "@/shared/i18n/config";
import { DashboardFrame } from "../../dashboard/dashboard-frame";
import { CaseStudiesPage } from "../../modules/case-studies/case-studies-page";
import { StorageRatesPage } from "../../modules/storage-rates/storage-rates-page";
import { WarehousesPage } from "../../modules/warehouses/warehouses-page";
import { warehousingConfig } from "./dashboard";
import { WAREHOUSING_SLUG } from "./slug";
import { useWarehousingStore } from "./store";

// Binds the shared dashboard and the variant modules to the Stackwell store.
export function WarehousingDashboard({ locale, children }: { locale: Locale; children: ReactNode }) {
  return (
    <DashboardFrame store={useWarehousingStore} config={warehousingConfig} locale={locale}>
      {children}
    </DashboardFrame>
  );
}

export function WarehousingWarehouses({ locale }: { locale: Locale }) {
  return <WarehousesPage store={useWarehousingStore} slug={WAREHOUSING_SLUG} locale={locale} />;
}

export function WarehousingStorageRates({ locale }: { locale: Locale }) {
  return <StorageRatesPage store={useWarehousingStore} slug={WAREHOUSING_SLUG} locale={locale} />;
}

export function WarehousingCaseStudies({ locale }: { locale: Locale }) {
  return <CaseStudiesPage store={useWarehousingStore} slug={WAREHOUSING_SLUG} locale={locale} />;
}
