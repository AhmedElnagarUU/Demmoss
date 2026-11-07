import type { Locale } from "@/shared/i18n/config";
import { createTranslator, type TranslateFor } from "@/shared/i18n/t";
import ar from "./messages/ar.json";
import en from "./messages/en.json";

// Text of the Hartwell & Co. Realty site. Everything else is in ../../messages.
export type AgencyMessages = typeof en;
export type AgencyTranslate = TranslateFor<AgencyMessages>;

const messages: Record<Locale, AgencyMessages> = { ar, en };

export function getAgencyT(locale: Locale): AgencyTranslate {
  return createTranslator(messages, locale);
}
