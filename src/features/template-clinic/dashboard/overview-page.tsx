"use client";

import { useState } from "react";
import { ValueTipBox } from "@/features/demo-engine/dashboard-shell/value-tip-box";
import { toDateKey } from "@/features/demo-engine/format/dates";
import { formatDateTime, formatNumber } from "@/features/demo-engine/format/format";
import { PageHeader, Panel } from "@/features/demo-engine/ui";
import { useClinic } from "../context";
import { getClinicT } from "../messages";
import { groupPatients } from "../patients";
import { allTipFacts } from "../value-tips";
import { tipTexts } from "./tip-texts";

const LATEST_ACTIVITY = 6;

export function OverviewPage() {
  const { store, locale } = useClinic();
  const t = getClinicT(locale);
  const appointments = store((state) => state.appointments);
  const treatments = store((state) => state.treatments);
  const doctors = store((state) => state.doctors);
  const dismissedTips = store((state) => state.dismissedTips);
  const dismissTip = store((state) => state.dismissTip);
  const [now] = useState(() => new Date());

  const today = toDateKey(now);
  const count = (value: number) => formatNumber(value, locale);
  const cards = [
    {
      id: "new",
      label: t("overview.newRequests"),
      value: count(appointments.filter((item) => item.status === "new").length),
    },
    {
      id: "upcoming",
      label: t("overview.upcoming"),
      value: count(appointments.filter((item) => item.status === "confirmed" && item.date >= today).length),
    },
    {
      id: "patients",
      label: t("overview.patients"),
      value: count(groupPatients(appointments, today).length),
    },
    {
      id: "done",
      label: t("overview.completed"),
      value: count(appointments.filter((item) => item.status === "done").length),
    },
  ];

  const activity = [...appointments]
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, LATEST_ACTIVITY)
    .map((item) => ({
      id: item.id,
      at: item.createdAt,
      text: t("overview.activity", {
        name: item.name,
        treatment:
          treatments.find((treatment) => treatment.id === item.treatmentId)?.name[locale] ??
          t("common.generalTreatment"),
      }),
    }));

  const facts = allTipFacts({ appointments, treatments, doctors }, now);

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
