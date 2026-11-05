"use client";

import type { ReactNode } from "react";
import type { Locale } from "@/shared/i18n/config";
import { DashboardFrame } from "../../dashboard/dashboard-frame";
import { specialistConfig } from "./dashboard";
import { useSpecialistStore } from "./store";

// Binds the shared dashboard to the specialist store.
export function SpecialistDashboard({ locale, children }: { locale: Locale; children: ReactNode }) {
  return (
    <DashboardFrame store={useSpecialistStore} config={specialistConfig} locale={locale}>
      {children}
    </DashboardFrame>
  );
}
