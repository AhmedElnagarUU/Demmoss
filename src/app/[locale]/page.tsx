import { notFound } from "next/navigation";
import { LandingPage } from "@/features/landing/components/landing-page";
import { isLocale } from "@/shared/i18n/config";

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <LandingPage locale={locale} />;
}
