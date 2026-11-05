import { notFound } from "next/navigation";
import { SiteFrame } from "@/features/template-logistics/variants/freight/site/site-frame";
import { isLocale } from "@/shared/i18n/config";

export default async function FreightSiteLayout({
  children,
  params,
}: LayoutProps<"/[locale]/demos/logistics/freight">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <SiteFrame locale={locale}>{children}</SiteFrame>;
}
