import type { Locale } from "@/shared/i18n/config";
import { createTranslator, type TranslateFor } from "@/shared/i18n/t";
import ar from "./messages/ar.json";
import en from "./messages/en.json";

export type AdminMessages = typeof en;
export type AdminTranslate = TranslateFor<AdminMessages>;

export function adminT(locale: Locale): AdminTranslate {
  return createTranslator<AdminMessages>({ ar, en }, locale);
}
