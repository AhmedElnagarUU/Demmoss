import { notFound } from "next/navigation";
import { FeedbackButton } from "@/features/feedback/components/feedback-button";
import { GoogleTagManager } from "@/features/tracking/components/google-tag-manager";
import { PageViewTracker } from "@/features/tracking/components/page-view-tracker";
import { isLocale } from "@/shared/i18n/config";

// Demo templates are full business websites: no agency header/footer, but feedback and tracking stay.
export default async function DemoTemplatesLayout({ children, params }: LayoutProps<"/[locale]/demos">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <>
      {children}
      <FeedbackButton locale={locale} />
      <PageViewTracker locale={locale} />
      <GoogleTagManager />
    </>
  );
}
