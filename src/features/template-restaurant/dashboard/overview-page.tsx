"use client";

import { ValueTipBox } from "@/features/demo-engine/dashboard-shell/value-tip-box";
import { formatDateTime } from "@/features/demo-engine/format/format";
import { getRestaurantT } from "../messages";
import { tipTexts } from "./tip-texts";
import { useRestaurant } from "./restaurant-context";
import { PageHeader, Panel } from "@/features/demo-engine/ui";

const LATEST_ACTIVITY = 6;

export function OverviewPage() {
  const { store, config, locale } = useRestaurant();
  const t = getRestaurantT(locale);
  const overview = config.useOverview(locale);
  const dismissedTips = store((state) => state.dismissedTips);
  const dismissTip = store((state) => state.dismissTip);

  const activity = [...overview.activity].sort((a, b) => b.at.localeCompare(a.at)).slice(0, LATEST_ACTIVITY);

  return (
    <div className="space-y-6">
      <PageHeader title={t("overview.title")} intro={t("overview.intro")} />

      <ValueTipBox
        locale={locale}
        tips={tipTexts(overview.tips, locale, t)}
        dismissedIds={dismissedTips}
        onDismiss={dismissTip}
      />

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {overview.cards.map((card) => (
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
