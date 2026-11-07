import type { Locale } from "@/shared/i18n/config";
import { createTranslator, type TranslateFor } from "@/shared/i18n/t";
import ar from "./messages/ar.json";
import en from "./messages/en.json";

// Text of the Sole Trattoria site and its overview cards. Everything else is in ../../messages.
export type FastFoodMessages = typeof en;
export type FastFoodTranslate = TranslateFor<FastFoodMessages>;

const messages: Record<Locale, FastFoodMessages> = { ar, en };

export function getFastFoodT(locale: Locale): FastFoodTranslate {
  return createTranslator(messages, locale);
}
