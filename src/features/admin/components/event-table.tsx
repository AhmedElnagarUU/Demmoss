import Link from "next/link";
import type { Locale } from "@/shared/i18n/config";
import { formatDateTime, templateName } from "../format";
import { adminPath } from "../paths";
import type { EventRow } from "../service";
import { adminT } from "../translate";
import { DataTable } from "./data-table";
import { cellClasses, linkClasses } from "./styles";

type Props = { events: EventRow[]; locale: Locale; caption: string; showVisitor: boolean };

export function EventTable({ events, locale, caption, showVisitor }: Props) {
  const t = adminT(locale);
  const headings = [t("activity.when"), t("activity.event"), t("activity.template"), t("activity.page")];
  if (showVisitor) headings.push(t("activity.visitor"));

  return (
    <DataTable caption={caption} headings={headings}>
      {events.map((event) => (
        <tr key={event.id}>
          <td className={cellClasses}>{formatDateTime(event.createdAt, locale)}</td>
          <td className={`${cellClasses} font-semibold text-text`}>{t(`events.${event.name}`)}</td>
          <td className={cellClasses}>{event.template ? templateName(event.template, locale) : ""}</td>
          <td className={cellClasses}>
            <bdi>{event.page}</bdi>
          </td>
          {showVisitor ? (
            <td className={cellClasses}>
              <Link href={adminPath(locale, "visitors", event.visitorId)} className={linkClasses}>
                <bdi>{event.visitorId.slice(0, 8)}</bdi>
              </Link>
            </td>
          ) : null}
        </tr>
      ))}
    </DataTable>
  );
}
