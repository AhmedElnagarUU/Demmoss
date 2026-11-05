"use client";

import type { ReactNode } from "react";
import type { Locale } from "@/shared/i18n/config";
import { DashboardFrame } from "../../dashboard/dashboard-frame";
import { AgentsPage } from "../../modules/agents/agents-page";
import { agencyConfig } from "./dashboard";
import { useAgencyStore } from "./store";

// Binds the shared dashboard and the agency module to the agency store.

export function AgencyDashboard({ locale, children }: { locale: Locale; children: ReactNode }) {
  return (
    <DashboardFrame store={useAgencyStore} config={agencyConfig} locale={locale}>
      {children}
    </DashboardFrame>
  );
}

export function AgencyAgents() {
  return <AgentsPage store={useAgencyStore} />;
}
