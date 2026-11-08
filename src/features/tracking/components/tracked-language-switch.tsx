"use client";

import type { Locale } from "@/shared/i18n/config";
import { LanguageSwitch } from "@/shared/ui/language-switch";
import { track } from "../client/track";

type Props = { locale: Locale; label: string; className?: string };

export function TrackedLanguageSwitch(props: Props) {
  return (
    <LanguageSwitch
      {...props}
      onSwitch={(from, to) => track("language_switched", { locale: from, meta: { from, to } })}
    />
  );
}
