import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteMetadata } from "@/features/template-restaurant/variants/fine-dining/metadata";
import { MenuPage } from "@/features/template-restaurant/variants/fine-dining/site/menu-page";
import { isLocale, locales } from "@/shared/i18n/config";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/demos/restaurant/fine-dining/menu">): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? siteMetadata(locale, "menu") : {};
}

export default async function FineDiningMenuPageRoute({
  params,
}: PageProps<"/[locale]/demos/restaurant/fine-dining/menu">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <MenuPage locale={locale} />;
}
