import { track } from "@/features/tracking/client/track";
import type { Locale } from "@/shared/i18n/config";

// content_edited: only the section name is sent, never what was typed.
export function trackEdit(section: string, slug: string, locale: Locale): void {
  track("content_edited", { locale, template: slug, meta: { section } });
}

// demo_action: a closed-loop action on the public site (a quote request or a tracking lookup).
export function trackAction(kind: "quote" | "tracking", slug: string, locale: Locale): void {
  track("demo_action", { locale, template: slug, meta: { kind } });
}
