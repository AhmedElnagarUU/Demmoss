import { notFound } from "next/navigation";
import { FeedbackPage } from "@/features/admin/components/feedback-page";
import { isLocale } from "@/shared/i18n/config";

export default async function AdminFeedbackRoute({ params }: PageProps<"/[locale]/admin/feedback">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <FeedbackPage locale={locale} />;
}
