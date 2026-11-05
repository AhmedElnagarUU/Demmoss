"use client";

import { Button } from "@/shared/ui/button";
import { useRealEstate } from "../../context";
import { PageHeader, StatusBadge } from "../../dashboard/ui";
import { formatDateKey, formatTime } from "../../format";
import { getRealEstateT } from "../../messages";
import { allowedViewingStatuses } from "./status";

// Dashboard: every viewing request from the site, with the next steps allowed by its status.
export function ViewingsPage() {
  const { store, locale } = useRealEstate();
  const t = getRealEstateT(locale);
  const viewings = store((state) => state.viewings);
  const properties = store((state) => state.properties);
  const setStatus = store((state) => state.setViewingStatus);

  const sorted = [...viewings].sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  return (
    <div>
      <PageHeader title={t("viewings.title")} intro={t("viewings.intro")} />
      {sorted.length === 0 ? (
        <p className="text-muted">{t("viewings.empty")}</p>
      ) : (
        <ul className="space-y-3">
          {sorted.map((viewing) => {
            const property = properties.find((item) => item.id === viewing.propertyId);
            const unit = property?.units.find((item) => item.id === viewing.unitId);
            return (
              <li key={viewing.id} className="space-y-2 rounded-control border border-border bg-bg p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-lg font-bold text-text">{viewing.name}</p>
                  <StatusBadge label={t(`viewingStatus.${viewing.status}`)} />
                </div>
                <p className="text-text">
                  {property ? property.title[locale] : t("common.generalVisit")}
                  {unit ? ` · ${unit.label}` : ""}
                </p>
                <p className="text-muted">
                  {formatDateKey(viewing.date, locale)} · {formatTime(viewing.time, locale)} ·{" "}
                  <span dir="ltr">{viewing.phone}</span>
                </p>
                {viewing.note ? <p className="text-text">{viewing.note}</p> : null}
                <div className="flex flex-wrap gap-2">
                  {allowedViewingStatuses(viewing.status).map((status) => (
                    <Button key={status} variant="secondary" onClick={() => setStatus(viewing.id, status)}>
                      {t(`viewings.action.${status}`)}: {viewing.name}
                    </Button>
                  ))}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
