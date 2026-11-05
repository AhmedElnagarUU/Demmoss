"use client";

import type { Locale } from "@/shared/i18n/config";
import { Button } from "@/shared/ui/button";
import { getEngineT } from "../messages";
import { pickValueTip, type ValueTipData } from "./value-tip";

type Props = {
  locale: Locale;
  tips: readonly ValueTipData[];
  dismissedIds: readonly string[];
  onDismiss: (id: string) => void;
};

// Tips are computed by the template from its demo data; the template stores which ones were dismissed.
export function ValueTipBox({ locale, tips, dismissedIds, onDismiss }: Props) {
  const t = getEngineT(locale);
  const tip = pickValueTip(tips, dismissedIds);
  if (!tip) return null;

  return (
    <aside className="flex items-start gap-3 rounded-control border border-border bg-surface p-4">
      <div className="grow">
        <p className="text-sm font-bold text-muted">{t("valueTip.title")}</p>
        <p className="mt-1 text-text">{tip.text}</p>
      </div>
      <Button variant="secondary" aria-label={t("valueTip.dismiss")} onClick={() => onDismiss(tip.id)}>
        ×
      </Button>
    </aside>
  );
}
