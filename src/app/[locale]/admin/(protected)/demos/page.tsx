import { notFound } from "next/navigation";
import { DemosPage } from "@/features/admin/components/demos-page";
import { isLocale } from "@/shared/i18n/config";

export default async function AdminDemosRoute({ params }: PageProps<"/[locale]/admin/demos">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <DemosPage locale={locale} />;
}
