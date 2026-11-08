import type { Locale } from "@/shared/i18n/config";
import { createTranslator, type TranslateFor } from "@/shared/i18n/t";
import ar from "./messages/ar.json";
import en from "./messages/en.json";

// Text of the Orbis Cargo site and its overview cards. Everything else is in ../../messages.
export type FreightMessages = typeof en;
export type FreightTranslate = TranslateFor<FreightMessages>;

const messages: Record<Locale, FreightMessages> = { ar, en };

export function getFreightT(locale: Locale): FreightTranslate {
  return createTranslator(messages, locale);
}
