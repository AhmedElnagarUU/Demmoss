import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LeadForm } from "@/features/wizard/components/lead-form";
import { WizardShell } from "@/features/wizard/components/wizard-shell";
import { getWizardT } from "@/features/wizard/messages";
import { publicEnv } from "@/shared/env";
import { isLocale } from "@/shared/i18n/config";

export async function generateMetadata({ params }: PageProps<"/[locale]/start">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getWizardT(locale);
  return {
    title: t("meta.title", { brand: publicEnv.NEXT_PUBLIC_BRAND_NAME }),
    description: t("meta.description"),
    alternates: { canonical: `/${locale}/start`, languages: { ar: "/ar/start", en: "/en/start" } },
  };
}

export default async function StartPage({ params }: PageProps<"/[locale]/start">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <WizardShell>
      <LeadForm locale={locale} />
    </WizardShell>
  );
}
