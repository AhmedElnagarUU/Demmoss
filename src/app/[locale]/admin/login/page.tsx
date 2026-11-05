import { notFound } from "next/navigation";
import { LoginPage } from "@/features/admin/components/login-page";
import { isLocale } from "@/shared/i18n/config";

export default async function AdminLoginRoute({ params }: PageProps<"/[locale]/admin/login">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <LoginPage locale={locale} />;
}
