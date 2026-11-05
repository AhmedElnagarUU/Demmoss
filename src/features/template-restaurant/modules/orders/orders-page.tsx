"use client";

import type { Locale } from "@/shared/i18n/config";
import { Button } from "@/shared/ui/button";
import { buttonClasses } from "@/shared/ui/button-styles";
import { businessNameOf } from "../../business-name";
import { PageHeader, StatusBadge } from "../../dashboard/ui";
import { formatDateTime, formatNumber, formatPrice } from "../../format";
import { getRestaurantT } from "../../messages";
import { customerWhatsAppUrl } from "../../phone";
import type { OrderingStore } from "./orders-store";
import { allowedOrderStatuses } from "./status";
import { describeLines } from "./totals";
import type { Order, OrderStatus } from "./types";

type Props = { store: OrderingStore; locale: Locale };

const columns: { id: "new" | "preparing" | "onTheWay" | "finished"; statuses: readonly OrderStatus[] }[] = [
  { id: "new", statuses: ["new"] },
  { id: "preparing", statuses: ["preparing"] },
  { id: "onTheWay", statuses: ["ready", "out_for_delivery"] },
  { id: "finished", statuses: ["completed", "cancelled"] },
];

// The live board: every order in one place. The owner moves an order forward and the customer's status page follows.
export function OrdersPage({ store, locale }: Props) {
  const t = getRestaurantT(locale);
  const orders = store((state) => state.orders);
  const setStatus = store((state) => state.setOrderStatus);
  const currency = store((state) => state.settings.currency);
  const businessName = store((state) => businessNameOf(state, locale));
  const newestFirst = [...orders].sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  return (
    <div className="space-y-6">
      <PageHeader title={t("orders.title")} intro={t("orders.intro")} />
      <div className="grid gap-4 lg:grid-cols-4">
        {columns.map((column) => {
          const inColumn = newestFirst.filter((order) => column.statuses.includes(order.status));
          return (
            <section key={column.id} aria-labelledby={`orders-${column.id}`} className="space-y-3">
              <h2 id={`orders-${column.id}`} className="text-lg font-bold">
                {t(`orders.columns.${column.id}`)} ({formatNumber(inColumn.length, locale)})
              </h2>
              {inColumn.length === 0 ? <p className="text-muted">{t("orders.emptyColumn")}</p> : null}
              <ul className="space-y-3">
                {inColumn.map((order) => (
                  <OrderCard
                    key={order.id}
                    order={order}
                    locale={locale}
                    currency={currency}
                    businessName={businessName}
                    onStatus={(status) => setStatus(order.id, status)}
                  />
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}

type CardProps = {
  order: Order;
  locale: Locale;
  currency: string;
  businessName: string;
  onStatus: (status: OrderStatus) => void;
};

function OrderCard({ order, locale, currency, businessName, onStatus }: CardProps) {
  const t = getRestaurantT(locale);
  const number = formatNumber(order.number, locale);
  const message = t("orders.whatsappMessage", { name: order.name, business: businessName, number });

  return (
    <li className="space-y-2 rounded-control border border-border bg-bg p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-lg font-bold">#{number}</p>
        <StatusBadge label={t(`statuses.${order.status}`)} />
      </div>
      <p className="font-semibold">{order.name}</p>
      <p className="text-sm">{describeLines(order.lines, locale)}</p>
      <p className="font-semibold">{formatPrice(order.total, currency, locale)}</p>
      <p className="text-sm text-muted">
        {t(`orderTypes.${order.type}`)}
        {order.areaName ? ` · ${order.areaName[locale]}` : ""} · {t(`payments.${order.payment}`)}
      </p>
      {order.address ? <p className="text-sm">{order.address}</p> : null}
      {order.note ? <p className="text-sm">{t("orders.note", { note: order.note })}</p> : null}
      <p className="text-sm text-muted" dir="ltr">
        {order.phone}
      </p>
      <p className="text-sm text-muted">
        {t("orders.received", { when: formatDateTime(order.createdAt, locale) })}
      </p>
      <div className="flex flex-wrap gap-2">
        {allowedOrderStatuses(order.status, order.type).map((status) => {
          const label = status === "cancelled" ? t("orders.cancelOrder") : t(`statusActions.${status}`);
          return (
            <Button
              key={status}
              variant="secondary"
              aria-label={`${label}: ${order.name}`}
              onClick={() => onStatus(status)}
            >
              {label}
            </Button>
          );
        })}
        <a
          href={customerWhatsAppUrl(order.phone, message)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${t("common.whatsappReply")}: ${order.name}`}
          className={buttonClasses("whatsapp")}
        >
          {t("common.whatsappReply")}
        </a>
      </div>
    </li>
  );
}
