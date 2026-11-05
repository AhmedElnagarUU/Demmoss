import type { Locale } from "@/shared/i18n/config";
import { createTranslator, type TranslateFor } from "@/shared/i18n/t";
import ar from "./messages/ar.json";
import en from "./messages/en.json";

// Text of the Dr. Al Harthi site. Everything else is in ../../messages.
export type SpecialistMessages = typeof en;
export type SpecialistTranslate = TranslateFor<SpecialistMessages>;

const messages: Record<Locale, SpecialistMessages> = { ar, en };

export function getSpecialistT(locale: Locale): SpecialistTranslate {
  return createTranslator(messages, locale);
}
