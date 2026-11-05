import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteMetadata } from "@/features/template-restaurant/variants/fine-dining/metadata";
import { ReservePage } from "@/features/template-restaurant/variants/fine-dining/site/reserve-page";
import { isLocale, locales } from "@/shared/i18n/config";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/demos/restaurant/fine-dining/reserve">): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? siteMetadata(locale, "reserve") : {};
}

export default async function FineDiningReservePageRoute({
  params,
}: PageProps<"/[locale]/demos/restaurant/fine-dining/reserve">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <ReservePage locale={locale} />;
}
