import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GalleryPage } from "@/features/gallery/components/gallery-page";
import { galleryT } from "@/features/gallery/translate";
import { isLocale } from "@/shared/i18n/config";

export async function generateMetadata({ params }: PageProps<"/[locale]/demos">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = galleryT(locale);
  return {
    title: t("meta.title"),
    description: t("meta.description"),
    alternates: { canonical: `/${locale}/demos`, languages: { ar: "/ar/demos", en: "/en/demos" } },
  };
}

export default async function DemosPage({ params }: PageProps<"/[locale]/demos">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <GalleryPage locale={locale} />;
}
