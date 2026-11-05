import type { Locale } from "@/shared/i18n/config";
import { createTranslator, type TranslateFor } from "@/shared/i18n/t";
import ar from "./messages/ar.json";
import en from "./messages/en.json";

// Text of the shared dashboard, the forms, and the shared site parts. Variant site text is in each variant's messages.
export type ClinicMessages = typeof en;
export type ClinicTranslate = TranslateFor<ClinicMessages>;

const messages: Record<Locale, ClinicMessages> = { ar, en };

export function getClinicT(locale: Locale): ClinicTranslate {
  return createTranslator(messages, locale);
}
