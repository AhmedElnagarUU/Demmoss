import type { Locale } from "@/shared/i18n/config";
import type { LocalizedText } from "../types";
import type { Account } from "./types";

// The name shown on the site and in the dashboard.
// The business name given at register replaces the seed name in both languages,
// until the owner edits the name in Settings (then Settings wins).
export function businessNameOf(
  state: { account: Account | null; settings: { businessName: LocalizedText; nameEdited: boolean } },
  locale: Locale,
): string {
  const registered = state.account?.businessName;
  if (registered && !state.settings.nameEdited) return registered;
  return state.settings.businessName[locale];
}
