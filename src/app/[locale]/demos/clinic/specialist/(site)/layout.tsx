import { notFound } from "next/navigation";
import { clinicFontClass, siteFontFamily } from "@/features/template-clinic/fonts";
import { SiteFrame } from "@/features/template-clinic/variants/specialist/site/site-frame";
import { isLocale } from "@/shared/i18n/config";

export default async function SpecialistSiteLayout({
  children,
  params,
}: LayoutProps<"/[locale]/demos/clinic/specialist">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <div className={clinicFontClass} style={{ fontFamily: siteFontFamily }}>
      <SiteFrame locale={locale}>{children}</SiteFrame>
    </div>
  );
}
