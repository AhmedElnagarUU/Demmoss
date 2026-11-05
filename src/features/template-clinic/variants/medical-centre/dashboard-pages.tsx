"use client";

import type { ReactNode } from "react";
import type { Locale } from "@/shared/i18n/config";
import { DashboardFrame } from "../../dashboard/dashboard-frame";
import { medicalCentreConfig } from "./dashboard";
import { useMedicalCentreStore } from "./store";

// Binds the shared dashboard and the doctors module to the medical centre store.
export function MedicalCentreDashboard({ locale, children }: { locale: Locale; children: ReactNode }) {
  return (
    <DashboardFrame store={useMedicalCentreStore} config={medicalCentreConfig} locale={locale}>
      {children}
    </DashboardFrame>
  );
}
