import { notFound } from "next/navigation";
import { VisitorJourneyPage } from "@/features/admin/components/visitor-journey-page";
import { isLocale } from "@/shared/i18n/config";

export default async function AdminVisitorJourneyRoute({
  params,
}: PageProps<"/[locale]/admin/visitors/[visitorId]">) {
  const { locale, visitorId } = await params;
  if (!isLocale(locale)) notFound();
  return <VisitorJourneyPage locale={locale} visitorId={visitorId} />;
}
