import { notFound } from "next/navigation";
import { FeedbackButton } from "@/features/feedback/components/feedback-button";
import { SiteFooter } from "@/features/site-shell/components/site-footer";
import { SiteHeader } from "@/features/site-shell/components/site-header";
import { PageViewTracker } from "@/features/tracking/components/page-view-tracker";
import { isLocale } from "@/shared/i18n/config";

export default async function SiteLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <>
      <SiteHeader locale={locale} />
      {children}
      <SiteFooter locale={locale} />
      <FeedbackButton locale={locale} />
      <PageViewTracker locale={locale} />
    </>
  );
}
