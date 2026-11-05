import type { Locale } from "@/shared/i18n/config";
import { createTranslator, type TranslateFor } from "@/shared/i18n/t";
import ar from "./messages/ar.json";
import en from "./messages/en.json";

// Text of the Rawasi site. Everything else is in ../../messages.
export type DeveloperMessages = typeof en;
export type DeveloperTranslate = TranslateFor<DeveloperMessages>;

const messages: Record<Locale, DeveloperMessages> = { ar, en };

export function getDeveloperT(locale: Locale): DeveloperTranslate {
  return createTranslator(messages, locale);
}
