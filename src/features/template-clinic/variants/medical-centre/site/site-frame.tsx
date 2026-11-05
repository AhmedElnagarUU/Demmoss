"use client";

import type { ReactNode } from "react";
import type { Locale } from "@/shared/i18n/config";
import { SiteChrome } from "../../../site/site-chrome";
import { medicalCentreConfig } from "../dashboard";
import { getCentreT } from "../messages";
import { useMedicalCentreStore } from "../store";

// Palette + loaded demo data + banner + header and footer around every public page of Noor Medical Centre.
export function SiteFrame({ locale, children }: { locale: Locale; children: ReactNode }) {
  const t = getCentreT(locale);
  const nav = [
    { path: "", label: t("nav.home") },
    { path: "/departments", label: t("nav.departments") },
    { path: "/doctors", label: t("nav.doctors") },
    { path: "/book", label: t("nav.book") },
    { path: "/contact", label: t("nav.contact") },
  ];
  return (
    <SiteChrome
      store={useMedicalCentreStore}
      config={medicalCentreConfig}
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
