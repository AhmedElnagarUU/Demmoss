"use client";

import type { ReactNode } from "react";
import type { Locale } from "@/shared/i18n/config";
import { DashboardFrame } from "../../dashboard/dashboard-frame";
import { UnitsPage } from "../../modules/units/units-page";
import { developerConfig } from "./dashboard";
import { useDeveloperStore } from "./store";

// Binds the shared dashboard and the developer module to the developer store.

export function DeveloperDashboard({ locale, children }: { locale: Locale; children: ReactNode }) {
  return (
    <DashboardFrame store={useDeveloperStore} config={developerConfig} locale={locale}>
      {children}
    </DashboardFrame>
  );
}

export function DeveloperProjects() {
  return <UnitsPage store={useDeveloperStore} />;
}
