import { notFound } from "next/navigation";
import { SiteFrame } from "@/features/template-restaurant/variants/fine-dining/site/site-frame";
import { isLocale } from "@/shared/i18n/config";

export default async function FineDiningSiteLayout({
  children,
  params,
}: LayoutProps<"/[locale]/demos/restaurant/fine-dining">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <SiteFrame locale={locale}>{children}</SiteFrame>;
}
