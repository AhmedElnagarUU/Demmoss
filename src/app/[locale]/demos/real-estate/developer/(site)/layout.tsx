import { notFound } from "next/navigation";
import { developerFontClass, siteFontFamily } from "@/features/template-real-estate/variants/developer/fonts";
import { SiteFrame } from "@/features/template-real-estate/variants/developer/site/site-frame";
import { isLocale } from "@/shared/i18n/config";

export default async function DeveloperSiteLayout({
  children,
  params,
}: LayoutProps<"/[locale]/demos/real-estate/developer">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <div className={developerFontClass} style={{ fontFamily: siteFontFamily }}>
      <SiteFrame locale={locale}>{children}</SiteFrame>
    </div>
  );
}
