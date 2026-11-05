import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { dashboardMetadata } from "@/features/template-logistics/variants/warehousing/metadata";
import { WarehousingDashboard } from "@/features/template-logistics/variants/warehousing/dashboard-pages";
import { isLocale } from "@/shared/i18n/config";

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]/demos/logistics/warehousing/dashboard">): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? dashboardMetadata(locale) : {};
}

export default async function WarehousingDashboardLayout({
  children,
  params,
}: LayoutProps<"/[locale]/demos/logistics/warehousing/dashboard">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <WarehousingDashboard locale={locale}>{children}</WarehousingDashboard>;
}
