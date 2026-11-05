import { notFound } from "next/navigation";
import { LandingPlaceholder } from "@/features/landing/components/landing-placeholder";
import { isLocale } from "@/shared/i18n/config";

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <LandingPlaceholder locale={locale} />;
}
