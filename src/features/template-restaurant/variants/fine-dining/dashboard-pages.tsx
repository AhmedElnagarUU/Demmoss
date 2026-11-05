"use client";

import type { ReactNode } from "react";
import type { Locale } from "@/shared/i18n/config";
import { DashboardFrame } from "../../dashboard/dashboard-frame";
import { EventRequestsPage } from "../../modules/event-requests/event-requests-page";
import { ReservationsPage } from "../../modules/reservations/reservations-page";
import { fineDiningConfig } from "./dashboard";
import { FINE_DINING_SLUG } from "./slug";
import { useFineDiningStore } from "./store";

// Binds the shared dashboard and the variant modules to the Zaytouna store.

export function FineDiningDashboard({ locale, children }: { locale: Locale; children: ReactNode }) {
  return (
    <DashboardFrame store={useFineDiningStore} config={fineDiningConfig} locale={locale}>
      {children}
    </DashboardFrame>
  );
}

export function FineDiningReservations({ locale }: { locale: Locale }) {
  return <ReservationsPage store={useFineDiningStore} slug={FINE_DINING_SLUG} locale={locale} />;
}

export function FineDiningEventRequests({ locale }: { locale: Locale }) {
  return <EventRequestsPage store={useFineDiningStore} locale={locale} />;
}
