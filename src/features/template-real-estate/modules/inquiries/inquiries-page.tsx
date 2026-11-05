"use client";

import { Button } from "@/shared/ui/button";
import { useRealEstate } from "../../context";
import { PageHeader, StatusBadge } from "../../dashboard/ui";
import { formatDateTime } from "../../format";
import { getRealEstateT } from "../../messages";
import { allowedInquiryStatuses } from "./status";

// Dashboard: questions, valuation and brochure requests from the site.
export function InquiriesPage() {
  const { store, locale } = useRealEstate();
  const t = getRealEstateT(locale);
  const inquiries = store((state) => state.inquiries);
  const properties = store((state) => state.properties);
  const setStatus = store((state) => state.setInquiryStatus);

  const sorted = [...inquiries].sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  return (
    <div>
      <PageHeader title={t("inquiries.title")} intro={t("inquiries.intro")} />
      {sorted.length === 0 ? (
        <p className="text-muted">{t("inquiries.empty")}</p>
      ) : (
        <ul className="space-y-3">
          {sorted.map((inquiry) => {
            const property = properties.find((item) => item.id === inquiry.propertyId);
            const unit = property?.units.find((item) => item.id === inquiry.unitId);
            return (
              <li key={inquiry.id} className="space-y-2 rounded-control border border-border bg-bg p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-lg font-bold text-text">{inquiry.name}</p>
                  <StatusBadge label={t(`inquiryStatus.${inquiry.status}`)} />
                </div>
                <p className="text-sm font-semibold text-muted">
                  {t(`inquiryKind.${inquiry.kind}`)}
                  {property ? ` · ${property.title[locale]}` : ""}
                  {unit ? ` · ${unit.label}` : ""}
                </p>
                {inquiry.message ? <p className="text-text">{inquiry.message}</p> : null}
                <p className="text-muted">
                  <span dir="ltr">{inquiry.phone}</span> · {formatDateTime(inquiry.createdAt, locale)}
                </p>
                <div className="flex flex-wrap gap-2">
                  {allowedInquiryStatuses(inquiry.status).map((status) => (
                    <Button key={status} variant="secondary" onClick={() => setStatus(inquiry.id, status)}>
                      {t(`inquiries.action.${status}`)}: {inquiry.name}
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
