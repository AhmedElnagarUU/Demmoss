import { track } from "@/features/tracking/client/track";
import type { Locale } from "@/shared/i18n/config";

// content_edited: only the section name is sent, never what was typed.
export function trackEdit(section: string, slug: string, locale: Locale): void {
  track("content_edited", { locale, template: slug, meta: { section } });
}
