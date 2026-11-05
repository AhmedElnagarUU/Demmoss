"use client";

import Link from "next/link";
import type { Locale } from "@/shared/i18n/config";
import { buttonClasses } from "@/shared/ui/button-styles";
import { formatDateTime, formatNumber, formatPrice } from "../../format";
import { getRestaurantT } from "../../messages";
import type { OrderingStore } from "./orders-store";
import { statusSteps } from "./status";

type Props = {
  store: OrderingStore;
  locale: Locale;
  orderId: string;
  menuHref: string;
  dashboardOrdersHref: string;
};

// The customer's live view of one order. It reads the same store as the dashboard, so when the owner changes the
// status (even in another tab) this page changes too: fewer "where is my order?" calls.
export function OrderStatusView({ store, locale, orderId, menuHref, dashboardOrdersHref }: Props) {
  const t = getRestaurantT(locale);
  const order = store((state) => state.orders.find((candidate) => candidate.id === orderId));
  const currency = store((state) => state.settings.currency);

  if (!order) {
    return (
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">{t("orderStatus.notFoundTitle")}</h1>
        <p className="text-muted">{t("orderStatus.notFoundText")}</p>
        <Link href={menuHref} className={buttonClasses("primary")}>
          {t("cart.goMenu")}
        </Link>
      </div>
    );
  }

  const steps = statusSteps(order.type);
  const currentIndex = steps.indexOf(order.status);
  const number = formatNumber(order.number, locale);

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold sm:text-4xl">{t("orderStatus.title", { number })}</h1>
        <p className="text-muted">
          {t("orderStatus.placed", { when: formatDateTime(order.createdAt, locale), name: order.name })}
        </p>
      </header>

      <section
        aria-labelledby="status-now"
        className="space-y-4 rounded-control border border-border bg-surface p-5"
      >
        <h2 id="status-now" className="sr-only">
          {t("orderStatus.stateTitle")}
        </h2>
        <p role="status" className="text-2xl font-bold">
          {t(`orderStatus.state.${order.status}`)}
        </p>
        {order.status === "cancelled" ? null : (
          <ol className="grid gap-2 sm:grid-cols-4">
            {steps.map((step, index) => (
              <li
                key={step}
                aria-current={index === currentIndex ? "step" : undefined}
                className={`rounded-control border p-3 text-sm font-semibold ${
                  index <= currentIndex
                    ? "border-primary bg-primary text-on-primary"
                    : "border-border bg-bg text-muted"
                }`}
              >
                <span className="block text-xs opacity-80">{formatNumber(index + 1, locale)}</span>
                {t(`orderStatus.steps.${step}`)}
              </li>
            ))}
          </ol>
        )}
      </section>

      <section aria-labelledby="status-details" className="space-y-3">
        <h2 id="status-details" className="text-xl font-bold">
          {t("orderStatus.detailsTitle")}
        </h2>
        <ul className="divide-y divide-border rounded-control border border-border bg-bg">
          {order.lines.map((line, index) => (
            <li key={index} className="flex justify-between gap-3 p-3">
              <span>
                {formatNumber(line.qty, locale)} × {line.name[locale]}
              </span>
              <span>{formatPrice(line.price * line.qty, currency, locale)}</span>
            </li>
          ))}
        </ul>
        <dl className="space-y-1">
          <div className="flex justify-between">
            <dt>{t("checkout.deliveryFee")}</dt>
            <dd>
              {order.type === "delivery"
                ? formatPrice(order.deliveryFee, currency, locale)
                : t("checkout.noFee")}
            </dd>
          </div>
          <div className="flex justify-between text-lg font-bold">
            <dt>{t("checkout.total")}</dt>
            <dd>{formatPrice(order.total, currency, locale)}</dd>
          </div>
        </dl>
        <p className="text-muted">
          {t(`orderTypes.${order.type}`)}
          {order.areaName ? ` · ${order.areaName[locale]}` : ""} · {t(`payments.${order.payment}`)}
        </p>
      </section>

      <aside className="space-y-3 rounded-control border border-border bg-surface p-5">
        <p>{t("orderStatus.liveHint")}</p>
        <a
          href={dashboardOrdersHref}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClasses("secondary")}
        >
          {t("orderStatus.openDashboard")}
        </a>
      </aside>

      <Link href={menuHref} className={buttonClasses("primary")}>
        {t("orderStatus.orderAgain")}
      </Link>
    </div>
  );
}
