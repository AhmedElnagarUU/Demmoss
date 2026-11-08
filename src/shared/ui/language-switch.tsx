"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { otherLocale, rememberLocale, switchPathLocale, type Locale } from "@/shared/i18n/config";

type Props = {
  locale: Locale;
  label: string;
  onSwitch?: (from: Locale, to: Locale) => void;
  className?: string;
};

export function LanguageSwitch({ locale, label, onSwitch, className = "" }: Props) {
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
      aria-label={label}
      className={`inline-flex h-9 min-w-10 items-center justify-center rounded-control border border-border px-3 text-sm font-semibold uppercase text-text hover:bg-surface focus-visible:outline-2 focus-visible:outline-focus ${className}`}
    >
      {target.toUpperCase()}
    </Link>
  );
}
