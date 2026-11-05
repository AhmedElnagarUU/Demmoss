"use client";

import { useSyncExternalStore } from "react";
import { TrackedWhatsAppButton } from "@/features/tracking/components/tracked-whatsapp-button";
import { publicEnv } from "@/shared/env";
import type { Locale } from "@/shared/i18n/config";
import { LEAD_SUMMARY_KEY, parseLeadSummary } from "../lead-summary";
import { getWizardT } from "../messages";
import type { LeadType } from "../types";
import { buildWhatsAppMessage } from "../whatsapp-message";

type Props = { locale: Locale; type: LeadType; fieldName?: string };

function subscribe(): () => void {
  return () => undefined;
}

function readSummary(): string {
  try {
    return window.sessionStorage.getItem(LEAD_SUMMARY_KEY) ?? "";
  } catch {
    return "";
  }
}

export function ResultWhatsApp({ locale, type, fieldName }: Props) {
  const t = getWizardT(locale);
  const saved = useSyncExternalStore(subscribe, readSummary, () => "");
  const summary = saved ? parseLeadSummary(saved) : null;

  return (
    <TrackedWhatsAppButton
      locale={locale}
      label={t("result.whatsapp")}
      message={buildWhatsAppMessage({
        t,
        brand: publicEnv.NEXT_PUBLIC_BRAND_NAME,
        type,
        fieldName,
        idea: summary?.idea,
        name: summary?.name,
      })}
    />
  );
}
