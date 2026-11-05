import { notFound } from "next/navigation";
import { VisitorsPage } from "@/features/admin/components/visitors-page";
import { isLocale } from "@/shared/i18n/config";

export default async function AdminVisitorsRoute({ params }: PageProps<"/[locale]/admin/visitors">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <VisitorsPage locale={locale} />;
}
