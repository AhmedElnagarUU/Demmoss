import { notFound } from "next/navigation";
import { OverviewPage } from "@/features/admin/components/overview-page";
import { isLocale } from "@/shared/i18n/config";

export default async function AdminOverviewRoute({ params }: PageProps<"/[locale]/admin">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <OverviewPage locale={locale} />;
}
