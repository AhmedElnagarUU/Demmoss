import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteMetadata } from "@/features/template-restaurant/variants/fine-dining/metadata";
import { EventsPage } from "@/features/template-restaurant/variants/fine-dining/site/events-page";
import { isLocale, locales } from "@/shared/i18n/config";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/demos/restaurant/fine-dining/events">): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? siteMetadata(locale, "events") : {};
}

export default async function FineDiningEventsPageRoute({
  params,
}: PageProps<"/[locale]/demos/restaurant/fine-dining/events">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <EventsPage locale={locale} />;
}
