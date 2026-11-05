"use client";

import { useState } from "react";
import { ValueTipBox } from "@/features/demo-engine/dashboard-shell/value-tip-box";
import { useRealEstate } from "../context";
import { toDateKey } from "@/features/demo-engine/format/dates";
import { formatDateTime, formatNumber } from "@/features/demo-engine/format/format";
import { getRealEstateT } from "../messages";
import { allTipFacts } from "../value-tips";
import { tipTexts } from "./tip-texts";
import { PageHeader, Panel } from "@/features/demo-engine/ui";

const LATEST_ACTIVITY = 6;

export function OverviewPage() {
  const { store, config, locale } = useRealEstate();
  const t = getRealEstateT(locale);
  const viewings = store((state) => state.viewings);
  const inquiries = store((state) => state.inquiries);
  const properties = store((state) => state.properties);
  const dismissedTips = store((state) => state.dismissedTips);
  const dismissTip = store((state) => state.dismissTip);
  const highlight = config.useHighlightCard(locale);
  const [now] = useState(() => new Date());

  const today = toDateKey(now);
  const cards = [
    {
      id: "newViewings",
      label: t("overview.newViewings"),
      value: formatNumber(viewings.filter((viewing) => viewing.status === "new").length, locale),
    },
    {
      id: "upcomingViewings",
      label: t("overview.upcomingViewings"),
      value: formatNumber(
        viewings.filter((viewing) => viewing.status === "confirmed" && viewing.date >= today).length,
        locale,
      ),
    },
    {
      id: "newInquiries",
      label: t("overview.newInquiries"),
      value: formatNumber(inquiries.filter((inquiry) => inquiry.status === "new").length, locale),
    },
    highlight,
  ];

  const titleOf = (propertyId: string | undefined) => {
    const property = properties.find((item) => item.id === propertyId);
    return property ? property.title[locale] : t("common.generalVisit");
  };
  const activity = [
    ...viewings.map((viewing) => ({
      id: viewing.id,
      at: viewing.createdAt,
      text: t("overview.activityViewing", { name: viewing.name, property: titleOf(viewing.propertyId) }),
    })),
    ...inquiries.map((inquiry) => ({
      id: inquiry.id,
      at: inquiry.createdAt,
      text: t("overview.activityInquiry", { name: inquiry.name, property: titleOf(inquiry.propertyId) }),
    })),
  ]
    .sort((a, b) => b.at.localeCompare(a.at))
    .slice(0, LATEST_ACTIVITY);

  const facts = allTipFacts({ viewings, inquiries, properties }, now);

  return (
    <div className="space-y-6">
      <PageHeader title={t("overview.title")} intro={t("overview.intro")} />

      <ValueTipBox
        locale={locale}
        tips={tipTexts(facts, locale, t)}
        dismissedIds={dismissedTips}
        onDismiss={dismissTip}
      />

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <li key={card.id} className="rounded-control border border-border bg-surface p-4">
            <p className="text-sm font-semibold text-muted">{card.label}</p>
            <p className="mt-1 text-3xl font-bold text-text">{card.value}</p>
          </li>
        ))}
      </ul>

      <Panel title={t("overview.activityTitle")}>
        {activity.length === 0 ? (
          <p className="text-muted">{t("overview.noActivity")}</p>
        ) : (
          <ul className="divide-y divide-border">
            {activity.map((item) => (
              <li key={item.id} className="flex flex-wrap items-baseline justify-between gap-2 py-2">
                <span className="text-text">{item.text}</span>
                <span className="text-sm text-muted">{formatDateTime(item.at, locale)}</span>
              </li>
            ))}
          </ul>
        )}
      </Panel>
    </div>
  );
}
