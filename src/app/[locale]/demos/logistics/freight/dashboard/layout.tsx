import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { dashboardMetadata } from "@/features/template-logistics/variants/freight/metadata";
import { FreightDashboard } from "@/features/template-logistics/variants/freight/dashboard-pages";
import { isLocale } from "@/shared/i18n/config";

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]/demos/logistics/freight/dashboard">): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? dashboardMetadata(locale) : {};
}

export default async function FreightDashboardLayout({
  children,
  params,
}: LayoutProps<"/[locale]/demos/logistics/freight/dashboard">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <FreightDashboard locale={locale}>{children}</FreightDashboard>;
}
