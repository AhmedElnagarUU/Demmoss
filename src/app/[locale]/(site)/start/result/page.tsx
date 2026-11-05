import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { ResultView } from "@/features/wizard/components/result-view";
import { WizardShell } from "@/features/wizard/components/wizard-shell";
import { getWizardT } from "@/features/wizard/messages";
import { isLeadType } from "@/features/wizard/types";
import { publicEnv } from "@/shared/env";
import { isLocale } from "@/shared/i18n/config";

export async function generateMetadata({ params }: PageProps<"/[locale]/start/result">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getWizardT(locale);
  return {
    title: t("meta.resultTitle", { brand: publicEnv.NEXT_PUBLIC_BRAND_NAME }),
    description: t("meta.description"),
    alternates: { languages: { ar: "/ar/start/result", en: "/en/start/result" } },
    robots: { index: false },
  };
}

function single(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function StartResultPage({ params, searchParams }: PageProps<"/[locale]/start/result">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const query = await searchParams;
  const type = single(query.type);
  if (!isLeadType(type)) redirect(`/${locale}/start`);
  return (
    <WizardShell locale={locale}>
      <ResultView locale={locale} type={type} field={single(query.field)} />
    </WizardShell>
  );
}
