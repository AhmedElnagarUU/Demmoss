import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteMetadata } from "@/features/template-real-estate/variants/developer/metadata";
import { ProcessPage } from "@/features/template-real-estate/variants/developer/site/process-page";
import { isLocale, locales } from "@/shared/i18n/config";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/demos/real-estate/developer/process">): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? siteMetadata(locale, "process") : {};
}

export default async function DeveloperProcessRoute({
  params,
}: PageProps<"/[locale]/demos/real-estate/developer/process">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <ProcessPage />;
}
