import { notFound } from "next/navigation";
import { SiteFrame } from "@/features/template-restaurant/variants/fast-food/site/site-frame";
import { isLocale } from "@/shared/i18n/config";

export default async function FastFoodSiteLayout({
  children,
  params,
}: LayoutProps<"/[locale]/demos/restaurant/fast-food">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <SiteFrame locale={locale}>{children}</SiteFrame>;
}
