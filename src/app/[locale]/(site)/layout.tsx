import { notFound } from "next/navigation";
import { FeedbackButton } from "@/features/feedback/components/feedback-button";
import { SiteFooter } from "@/features/site-shell/components/site-footer";
import { SiteHeader } from "@/features/site-shell/components/site-header";
import { siteFontClass, siteFonts } from "@/features/site-shell/fonts";
import { PageViewTracker } from "@/features/tracking/components/page-view-tracker";
import { isLocale } from "@/shared/i18n/config";

export default async function SiteLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <div
      className={`brand-site ${siteFontClass} min-h-screen overflow-x-clip bg-bg text-text`}
      style={siteFonts}
    >
      <SiteHeader locale={locale} />
      {children}
      <SiteFooter locale={locale} />
      <FeedbackButton locale={locale} tone="brand" />
      <PageViewTracker locale={locale} />
    </div>
  );
}
