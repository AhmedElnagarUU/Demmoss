import { createTranslator } from "@/shared/i18n/t";
import type { Locale } from "@/shared/i18n/config";
import ar from "./messages/ar.json";
import en from "./messages/en.json";

export function getEngineT(locale: Locale) {
  return createTranslator({ ar, en }, locale);
}
