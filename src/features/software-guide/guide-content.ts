import type { Locale } from "@/shared/i18n/config";
import ar from "./content/ar.json";
import en from "./content/en.json";
import { guideContentSchema, type GuideContent } from "./types";

// Parsed at build time: a broken content file stops the build with the exact field.
const content: Record<Locale, GuideContent> = {
  ar: guideContentSchema.parse(ar),
  en: guideContentSchema.parse(en),
};

export function getGuideContent(locale: Locale): GuideContent {
  return content[locale];
}
