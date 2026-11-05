import { notFound } from "next/navigation";
import { ActivityPage, eventNameFromParam } from "@/features/admin/components/activity-page";
import { isLocale } from "@/shared/i18n/config";

export default async function AdminActivityRoute({
  params,
  searchParams,
}: PageProps<"/[locale]/admin/activity">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const { event } = await searchParams;
  return <ActivityPage locale={locale} name={eventNameFromParam(event)} />;
}
