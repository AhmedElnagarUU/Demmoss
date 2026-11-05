import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DeveloperDashboard } from "@/features/template-real-estate/variants/developer/dashboard-pages";
import { dashboardMetadata } from "@/features/template-real-estate/variants/developer/metadata";
import { isLocale } from "@/shared/i18n/config";

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]/demos/real-estate/developer/dashboard">): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? dashboardMetadata(locale) : {};
}

export default async function DeveloperDashboardLayout({
  children,
  params,
}: LayoutProps<"/[locale]/demos/real-estate/developer/dashboard">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <DeveloperDashboard locale={locale}>{children}</DeveloperDashboard>;
}
