import { notFound } from "next/navigation";
import { SiteFrame } from "@/features/template-logistics/variants/warehousing/site/site-frame";
import { isLocale } from "@/shared/i18n/config";

export default async function WarehousingSiteLayout({
  children,
  params,
}: LayoutProps<"/[locale]/demos/logistics/warehousing">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <SiteFrame locale={locale}>{children}</SiteFrame>;
}
