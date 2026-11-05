"use client";

import type { ReactNode } from "react";
import type { Locale } from "@/shared/i18n/config";
import { SiteChrome } from "../../../site/site-chrome";
import { specialistConfig } from "../dashboard";
import { getSpecialistT } from "../messages";
import { useSpecialistStore } from "../store";

// Palette + loaded demo data + banner + header and footer around every public page of Dr. Al Harthi's site.
export function SiteFrame({ locale, children }: { locale: Locale; children: ReactNode }) {
  const t = getSpecialistT(locale);
  const nav = [
    { path: "", label: t("nav.home") },
    { path: "/treatments", label: t("nav.treatments") },
    { path: "/results", label: t("nav.results") },
    { path: "/prices", label: t("nav.prices") },
    { path: "/book", label: t("nav.book") },
  ];
  return (
    <SiteChrome
      store={useSpecialistStore}
      config={specialistConfig}
      locale={locale}
      nav={nav}
      navLabel={t("nav.label")}
      bookLabel={t("header.book")}
      tagline={t("tagline")}
    >
      {children}
    </SiteChrome>
  );
}
