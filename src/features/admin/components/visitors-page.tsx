import Link from "next/link";
import type { Locale } from "@/shared/i18n/config";
import { countryName, formatDateTime } from "../format";
import { adminPath } from "../paths";
import { getVisitors } from "../service";
import { adminT, type AdminTranslate } from "../translate";
import { DataTable } from "./data-table";
import { PageHeading } from "./page-heading";
import { cellClasses, linkClasses } from "./styles";

export function deviceLabel(device: string, t: AdminTranslate): string {
  return device === "mobile" || device === "tablet" || device === "desktop" ? t(`devices.${device}`) : device;
}

export function languageLabel(language: string, t: AdminTranslate): string {
  return language === "ar" || language === "en" ? t(`languages.${language}`) : language;
}

export function countryLabel(code: string, locale: Locale, t: AdminTranslate): string {
  return code === "unknown" ? t("common.unknown") : (countryName(code, locale) ?? code);
}

export function sourceLabelText(source: string, t: AdminTranslate): string {
  return source === "direct" ? t("common.direct") : source;
}

export async function VisitorsPage({ locale }: { locale: Locale }) {
  const t = adminT(locale);
  const visitors = await getVisitors();

  return (
    <>
      <PageHeading title={t("visitors.title")} intro={t("visitors.intro")} />
      <p className="mb-2 text-sm text-muted">{t("common.timesUtc")}</p>
      {visitors.length === 0 ? (
        <p className="text-base text-muted">{t("common.empty")}</p>
      ) : (
        <DataTable
          caption={t("visitors.caption")}
          headings={[
            t("visitors.visitor"),
            t("visitors.country"),
            t("visitors.device"),
            t("visitors.language"),
            t("visitors.source"),
            t("visitors.firstSeen"),
            t("visitors.lastSeen"),
          ]}
        >
          {visitors.map((visitor) => (
            <tr key={visitor.visitorId}>
              <th scope="row" className={`${cellClasses} font-normal`}>
                <Link href={adminPath(locale, "visitors", visitor.visitorId)} className={linkClasses}>
                  <bdi>{visitor.visitorId.slice(0, 8)}</bdi>
                </Link>
              </th>
              <td className={cellClasses}>{countryLabel(visitor.country, locale, t)}</td>
              <td className={cellClasses}>{deviceLabel(visitor.device, t)}</td>
              <td className={cellClasses}>{languageLabel(visitor.locale, t)}</td>
              <td className={cellClasses}>{sourceLabelText(visitor.source, t)}</td>
              <td className={cellClasses}>{formatDateTime(visitor.firstSeenAt, locale)}</td>
              <td className={cellClasses}>{formatDateTime(visitor.lastSeenAt, locale)}</td>
            </tr>
          ))}
        </DataTable>
      )}
    </>
  );
}
