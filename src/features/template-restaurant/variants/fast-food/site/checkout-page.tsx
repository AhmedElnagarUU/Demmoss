"use client";

import type { Locale } from "@/shared/i18n/config";
import { CheckoutForm } from "../../../modules/orders/checkout-form";
import { getFastFoodT } from "../messages";
import { FAST_FOOD_SLUG } from "../slug";
import { useFastFoodStore } from "../store";
import { Section, SectionHeading } from "./section";

// Checkout: pickup or delivery in one short form, no sign-up (sales).
export function CheckoutPage({ locale }: { locale: Locale }) {
  const t = getFastFoodT(locale);
  const root = `/${locale}/demos/restaurant/fast-food`;

  return (
    <Section id="checkout-title">
      <SectionHeading
        level={1}
        id="checkout-title"
        eyebrow={t("checkout.eyebrow")}
        title={t("checkout.title")}
      />
      <CheckoutForm
        store={useFastFoodStore}
        slug={FAST_FOOD_SLUG}
        locale={locale}
        menuHref={`${root}/menu`}
        statusHref={(orderId) => `${root}/order?id=${encodeURIComponent(orderId)}`}
      />
    </Section>
  );
}
