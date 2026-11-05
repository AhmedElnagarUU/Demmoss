import { notFound, redirect } from "next/navigation";
import { getAdminSession } from "@/features/admin/auth/admin-session";
import { AdminShell } from "@/features/admin/components/admin-shell";
import { adminPath } from "@/features/admin/paths";
import { getUnreadNotificationCount } from "@/features/admin/service";
import { isLocale } from "@/shared/i18n/config";

export default async function ProtectedAdminLayout({ children, params }: LayoutProps<"/[locale]/admin">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  if (!(await getAdminSession())) redirect(adminPath(locale, "login"));

  return (
    <AdminShell locale={locale} unreadNotifications={await getUnreadNotificationCount()}>
      {children}
    </AdminShell>
  );
}
