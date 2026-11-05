"use client";

import type { Locale } from "@/shared/i18n/config";
import { Button } from "@/shared/ui/button";
import { buttonClasses } from "@/shared/ui/button-styles";
import { businessNameOf } from "@/features/demo-engine/fake-auth/business-name";
import { PageHeader, StatusBadge } from "@/features/demo-engine/ui";
import { formatDateKey, formatDateTime, formatNumber } from "@/features/demo-engine/format/format";
import { getRestaurantT } from "../../messages";
import { phoneWhatsAppUrl } from "@/features/demo-engine/format/phone";
import type { EventRequestsStore } from "./event-requests-store";
import { allowedEventStatuses } from "./status";

type Props = { store: EventRequestsStore; locale: Locale };

export function EventRequestsPage({ store, locale }: Props) {
  const t = getRestaurantT(locale);
  const requests = store((state) => state.eventRequests);
  const setStatus = store((state) => state.setEventRequestStatus);
  const businessName = store((state) => businessNameOf(state, locale));
  const sorted = [...requests].sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  return (
    <div className="space-y-6">
      <PageHeader title={t("eventRequests.title")} intro={t("eventRequests.intro")} />
      {sorted.length === 0 ? <p className="text-muted">{t("eventRequests.empty")}</p> : null}
      <ul className="space-y-3">
        {sorted.map((request) => {
          const date = formatDateKey(request.date, locale);
          const message = t("eventRequests.whatsappMessage", {
            name: request.name,
            business: businessName,
            date,
          });
          return (
            <li key={request.id} className="space-y-3 rounded-control border border-border bg-bg p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-lg font-bold text-text">
                  {request.name} · {t(`eventTypes.${request.type}`)}
                </p>
                <StatusBadge label={t(`statuses.${request.status}`)} />
              </div>
              <p className="text-text">
                {t("eventRequests.eventDate", { date })} ·{" "}
                {t("eventRequests.guests", { count: formatNumber(request.guests, locale) })}
              </p>
              {request.budget ? (
                <p className="text-sm text-text">
                  {t("eventRequests.budget", { budget: t(`budgets.${request.budget}`) })}
                </p>
              ) : null}
              {request.details ? (
                <p className="text-sm text-text">
                  {t("eventRequests.details", { details: request.details })}
                </p>
              ) : null}
              <p className="text-sm text-muted" dir="ltr">
                {request.phone}
              </p>
              <p className="text-sm text-muted">
                {t("reservations.received", { when: formatDateTime(request.createdAt, locale) })}
              </p>
              <div className="flex flex-wrap gap-2">
                {allowedEventStatuses(request.status).map((status) => (
                  <Button
                    key={status}
                    variant="secondary"
                    aria-label={`${t(`statusActions.${status}`)}: ${request.name}`}
                    onClick={() => setStatus(request.id, status)}
                  >
                    {t(`statusActions.${status}`)}
                  </Button>
                ))}
                <a
                  href={phoneWhatsAppUrl(request.phone, message)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${t("common.whatsappReply")}: ${request.name}`}
                  className={buttonClasses("whatsapp")}
                >
                  {t("common.whatsappReply")}
                </a>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
