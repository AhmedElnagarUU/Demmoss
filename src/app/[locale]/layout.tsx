import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FeedbackButton } from "@/features/feedback/components/feedback-button";
import { SiteFooter } from "@/features/site-shell/components/site-footer";
import { SiteHeader } from "@/features/site-shell/components/site-header";
import { PageViewTracker } from "@/features/tracking/components/page-view-tracker";
import { publicEnv } from "@/shared/env";
import { directionOf, isLocale, locales } from "@/shared/i18n/config";
import { getT } from "@/shared/i18n/t";
import "../globals.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getT(locale);
  return {
    metadataBase: new URL(publicEnv.NEXT_PUBLIC_SITE_URL),
    title: t("meta.title", { brand: publicEnv.NEXT_PUBLIC_BRAND_NAME }),
    description: t("meta.description"),
    alternates: { languages: { ar: "/ar", en: "/en" } },
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <html lang={locale} dir={directionOf(locale)}>
      <body className="min-h-screen bg-bg font-sans text-text antialiased">
        <SiteHeader locale={locale} />
        {children}
        <SiteFooter locale={locale} />
        <FeedbackButton locale={locale} />
        <PageViewTracker locale={locale} />
      </body>
    </html>
  );
}
