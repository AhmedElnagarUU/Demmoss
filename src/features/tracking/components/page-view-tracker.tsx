"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import type { Locale } from "@/shared/i18n/config";
import { track } from "../client/track";

export function PageViewTracker({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  useEffect(() => {
    track("page_view", { locale, page: pathname });
  }, [locale, pathname]);
  return null;
}
