import { notFound } from "next/navigation";
import { NotificationsPage } from "@/features/admin/components/notifications-page";
import { isLocale } from "@/shared/i18n/config";

export default async function AdminNotificationsRoute({
  params,
}: PageProps<"/[locale]/admin/notifications">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <NotificationsPage locale={locale} />;
}
