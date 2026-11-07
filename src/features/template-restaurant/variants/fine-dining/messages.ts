import type { Locale } from "@/shared/i18n/config";
import { createTranslator, type TranslateFor } from "@/shared/i18n/t";
import ar from "./messages/ar.json";
import en from "./messages/en.json";

// Text of the Verdant Table site and its overview cards. Everything else is in ../../messages.
export type FineDiningMessages = typeof en;
export type FineDiningTranslate = TranslateFor<FineDiningMessages>;

const messages: Record<Locale, FineDiningMessages> = { ar, en };

export function getFineDiningT(locale: Locale): FineDiningTranslate {
  return createTranslator(messages, locale);
}
