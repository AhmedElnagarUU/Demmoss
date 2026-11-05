import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GuidePage } from "@/features/software-guide/components/guide-page";
import { getGuideContent } from "@/features/software-guide/guide-content";
import { isLocale } from "@/shared/i18n/config";

export async function generateMetadata({ params }: PageProps<"/[locale]/guide">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const { meta } = getGuideContent(locale);
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: `/${locale}/guide`, languages: { ar: "/ar/guide", en: "/en/guide" } },
  };
}

export default async function GuideRoute({ params }: PageProps<"/[locale]/guide">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <GuidePage locale={locale} />;
}
