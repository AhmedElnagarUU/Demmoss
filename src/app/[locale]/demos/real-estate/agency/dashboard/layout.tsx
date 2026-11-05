import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AgencyDashboard } from "@/features/template-real-estate/variants/agency/dashboard-pages";
import { dashboardMetadata } from "@/features/template-real-estate/variants/agency/metadata";
import { isLocale } from "@/shared/i18n/config";

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]/demos/real-estate/agency/dashboard">): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? dashboardMetadata(locale) : {};
}

export default async function AgencyDashboardLayout({
  children,
  params,
}: LayoutProps<"/[locale]/demos/real-estate/agency/dashboard">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <AgencyDashboard locale={locale}>{children}</AgencyDashboard>;
}
