import { track } from "@/features/tracking/client/track";
import type { Locale } from "@/shared/i18n/config";

// demo_action: a closed-loop action on the public site (a quote request or a tracking lookup).
export function trackAction(kind: "quote" | "tracking", slug: string, locale: Locale): void {
  track("demo_action", { locale, template: slug, meta: { kind } });
}
