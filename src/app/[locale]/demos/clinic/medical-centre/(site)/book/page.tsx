import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteMetadata } from "@/features/template-clinic/variants/medical-centre/metadata";
import { BookPage } from "@/features/template-clinic/variants/medical-centre/site/book-page";
import { isLocale, locales } from "@/shared/i18n/config";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/demos/clinic/medical-centre/book">): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? siteMetadata(locale, "book") : {};
}

export default async function MedicalCentreBookRoute({
  params,
}: PageProps<"/[locale]/demos/clinic/medical-centre/book">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <BookPage />;
}
