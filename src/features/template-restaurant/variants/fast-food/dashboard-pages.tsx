"use client";

import type { ReactNode } from "react";
import type { Locale } from "@/shared/i18n/config";
import { DashboardFrame } from "../../dashboard/dashboard-frame";
import { AreasPage } from "../../modules/areas/areas-page";
import { OffersPage } from "../../modules/offers/offers-page";
import { OrdersPage } from "../../modules/orders/orders-page";
import { fastFoodConfig } from "./dashboard";
import { fastFoodPhotos } from "./photos";
import { FAST_FOOD_SLUG } from "./slug";
import { useFastFoodStore } from "./store";

// Binds the shared dashboard and the variant modules to the Sole Trattoria store.

export function FastFoodDashboard({ locale, children }: { locale: Locale; children: ReactNode }) {
  return (
    <DashboardFrame store={useFastFoodStore} config={fastFoodConfig} locale={locale}>
      {children}
    </DashboardFrame>
  );
}

export function FastFoodOrders({ locale }: { locale: Locale }) {
  return <OrdersPage store={useFastFoodStore} locale={locale} />;
}

export function FastFoodOffers({ locale }: { locale: Locale }) {
  return (
    <OffersPage store={useFastFoodStore} slug={FAST_FOOD_SLUG} locale={locale} photos={fastFoodPhotos} />
  );
}

export function FastFoodAreas({ locale }: { locale: Locale }) {
  return <AreasPage store={useFastFoodStore} slug={FAST_FOOD_SLUG} locale={locale} />;
}
