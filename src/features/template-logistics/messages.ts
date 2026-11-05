import type { Locale } from "@/shared/i18n/config";
import { createTranslator, type TranslateFor } from "@/shared/i18n/t";
import ar from "./messages/ar.json";
import en from "./messages/en.json";

// Text of the shared logistics dashboard, forms, and modules. Variant site text is in each variant's messages.
export type LogisticsMessages = typeof en;
export type LogisticsTranslate = TranslateFor<LogisticsMessages>;

const messages: Record<Locale, LogisticsMessages> = { ar, en };

export function getLogisticsT(locale: Locale): LogisticsTranslate {
  return createTranslator(messages, locale);
}
