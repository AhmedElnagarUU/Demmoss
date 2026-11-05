import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteMetadata } from "@/features/template-restaurant/variants/fine-dining/metadata";
import { ContactPage } from "@/features/template-restaurant/variants/fine-dining/site/contact-page";
import { isLocale, locales } from "@/shared/i18n/config";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/demos/restaurant/fine-dining/contact">): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? siteMetadata(locale, "contact") : {};
}

export default async function FineDiningContactPageRoute({
  params,
}: PageProps<"/[locale]/demos/restaurant/fine-dining/contact">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <ContactPage locale={locale} />;
}
