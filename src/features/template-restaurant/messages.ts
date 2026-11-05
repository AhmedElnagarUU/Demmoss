import type { Locale } from "@/shared/i18n/config";
import { createTranslator, type TranslateFor } from "@/shared/i18n/t";
import ar from "./messages/ar.json";
import en from "./messages/en.json";

// Text of the shared restaurant dashboard, forms, and modules. Variant site text is in each variant's messages.
export type RestaurantMessages = typeof en;
export type RestaurantTranslate = TranslateFor<RestaurantMessages>;

const messages: Record<Locale, RestaurantMessages> = { ar, en };

export function getRestaurantT(locale: Locale): RestaurantTranslate {
  return createTranslator(messages, locale);
}
