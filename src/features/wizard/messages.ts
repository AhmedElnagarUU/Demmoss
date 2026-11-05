import type { Locale } from "@/shared/i18n/config";
import { createTranslator, type TranslateFor } from "@/shared/i18n/t";
import ar from "./messages/ar.json";
import en from "./messages/en.json";

export type WizardMessages = typeof en;
export type WizardTranslate = TranslateFor<WizardMessages>;

const messages: Record<Locale, WizardMessages> = { ar, en };

export function getWizardT(locale: Locale): WizardTranslate {
  return createTranslator(messages, locale);
}
