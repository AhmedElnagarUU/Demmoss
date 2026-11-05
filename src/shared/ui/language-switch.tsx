"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { otherLocale, rememberLocale, switchPathLocale, type Locale } from "@/shared/i18n/config";

type Props = {
  locale: Locale;
  label: string;
  onSwitch?: (from: Locale, to: Locale) => void;
};

export function LanguageSwitch({ locale, label, onSwitch }: Props) {
  const pathname = usePathname();
  const target = otherLocale(locale);

  function rememberChoice() {
    rememberLocale(target);
    onSwitch?.(locale, target);
  }

  return (
    <Link
      href={switchPathLocale(pathname, target)}
      hrefLang={target}
      lang={target}
      onClick={rememberChoice}
      className="rounded-control border border-border px-3 py-1.5 text-sm font-semibold text-text hover:bg-surface focus-visible:outline-2 focus-visible:outline-focus"
    >
      {label}
    </Link>
  );
}
