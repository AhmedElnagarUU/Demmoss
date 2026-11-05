import { notFound } from "next/navigation";
import { clinicFontClass, siteFontFamily } from "@/features/template-clinic/fonts";
import { SiteFrame } from "@/features/template-clinic/variants/medical-centre/site/site-frame";
import { isLocale } from "@/shared/i18n/config";

export default async function MedicalCentreSiteLayout({
  children,
  params,
}: LayoutProps<"/[locale]/demos/clinic/medical-centre">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <div className={clinicFontClass} style={{ fontFamily: siteFontFamily }}>
      <SiteFrame locale={locale}>{children}</SiteFrame>
    </div>
  );
}
