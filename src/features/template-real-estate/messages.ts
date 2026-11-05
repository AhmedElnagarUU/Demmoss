import type { Locale } from "@/shared/i18n/config";
import { createTranslator, type TranslateFor } from "@/shared/i18n/t";
import ar from "./messages/ar.json";
import en from "./messages/en.json";

// Text of the shared dashboard, the forms, and the shared site parts. Variant site text is in each variant's messages.
export type RealEstateMessages = typeof en;
export type RealEstateTranslate = TranslateFor<RealEstateMessages>;

const messages: Record<Locale, RealEstateMessages> = { ar, en };

export function getRealEstateT(locale: Locale): RealEstateTranslate {
  return createTranslator(messages, locale);
}
