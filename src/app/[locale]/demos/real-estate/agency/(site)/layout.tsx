import { notFound } from "next/navigation";
import { agencyFontClass, siteFontFamily } from "@/features/template-real-estate/variants/agency/fonts";
import { SiteFrame } from "@/features/template-real-estate/variants/agency/site/site-frame";
import { isLocale } from "@/shared/i18n/config";

export default async function AgencySiteLayout({
  children,
  params,
}: LayoutProps<"/[locale]/demos/real-estate/agency">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <div className={agencyFontClass} style={{ fontFamily: siteFontFamily }}>
      <SiteFrame locale={locale}>{children}</SiteFrame>
    </div>
  );
}
