import type { Locale } from "@/shared/i18n/config";
import { createTranslator, type TranslateFor } from "@/shared/i18n/t";
import ar from "./messages/ar.json";
import en from "./messages/en.json";

// Text of the Noor Medical Centre site. Everything else is in ../../messages.
export type MedicalCentreMessages = typeof en;
export type MedicalCentreTranslate = TranslateFor<MedicalCentreMessages>;

const messages: Record<Locale, MedicalCentreMessages> = { ar, en };

export function getCentreT(locale: Locale): MedicalCentreTranslate {
  return createTranslator(messages, locale);
}
