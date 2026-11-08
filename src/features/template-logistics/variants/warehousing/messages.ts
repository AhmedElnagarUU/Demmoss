import type { Locale } from "@/shared/i18n/config";
import { createTranslator, type TranslateFor } from "@/shared/i18n/t";
import ar from "./messages/ar.json";
import en from "./messages/en.json";

// Text of the Stackwell site and its overview cards. Everything else is in ../../messages.
export type WarehousingMessages = typeof en;
export type WarehousingTranslate = TranslateFor<WarehousingMessages>;

const messages: Record<Locale, WarehousingMessages> = { ar, en };

export function getWarehousingT(locale: Locale): WarehousingTranslate {
  return createTranslator(messages, locale);
}
