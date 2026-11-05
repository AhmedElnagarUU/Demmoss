"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import type { Locale } from "@/shared/i18n/config";
import { OrderStatusView } from "../../../modules/orders/order-status-view";
import { useFastFoodStore } from "../store";
import { Section } from "./section";

// Order status: the customer follows the order live (fewer "where is my order?" calls).
// The order is in the address as ?id=..., because the page is built once and orders exist only in the browser.
export function OrderPage({ locale }: { locale: Locale }) {
  return (
    <Suspense fallback={null}>
      <OrderPageContent locale={locale} />
    </Suspense>
  );
}

function OrderPageContent({ locale }: { locale: Locale }) {
  const orderId = useSearchParams().get("id") ?? "";
  const root = `/${locale}/demos/restaurant/fast-food`;

  return (
    <Section>
      <OrderStatusView
        store={useFastFoodStore}
        locale={locale}
        orderId={orderId}
        menuHref={`${root}/menu`}
        dashboardOrdersHref={`${root}/dashboard/orders`}
      />
    </Section>
  );
}
