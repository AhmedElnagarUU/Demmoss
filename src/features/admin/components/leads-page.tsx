import { leadStatuses, type LeadStatus } from "@/features/wizard/types";
import type { Locale } from "@/shared/i18n/config";
import { Button } from "@/shared/ui/button";
import { saveLeadNotesAction, updateLeadStatusAction } from "../actions";
import { categoryName, formatDateTime } from "../format";
import { adminPath } from "../paths";
import { getLeads, type LeadRow } from "../service";
import { adminT, type AdminTranslate } from "../translate";
import { DataTable } from "./data-table";
import { PageHeading } from "./page-heading";
import { cellClasses, inputClasses, linkClasses } from "./styles";

export function leadStatusFromParam(value: string | string[] | undefined): LeadStatus | undefined {
  return leadStatuses.find((status) => status === value);
}

function StatusForm({ lead, locale, t }: { lead: LeadRow; locale: Locale; t: AdminTranslate }) {
  return (
    <form action={updateLeadStatusAction} className="flex items-center gap-2">
      <input type="hidden" name="id" value={lead.id} />
      <input type="hidden" name="locale" value={locale} />
      <select
        name="status"
        defaultValue={lead.status}
        aria-label={t("leads.statusLabel", { name: lead.name })}
        className={inputClasses}
      >
        {leadStatuses.map((status) => (
          <option key={status} value={status}>
            {t(`leadStatus.${status}`)}
          </option>
        ))}
      </select>
      <Button type="submit" variant="secondary">
        {t("leads.update")}
      </Button>
    </form>
  );
}

function LeadDetails({ lead, locale, t }: { lead: LeadRow; locale: Locale; t: AdminTranslate }) {
  return (
    <details>
      <summary className={`cursor-pointer ${linkClasses}`}>{t("leads.details")}</summary>
      <div className="mt-3 flex min-w-64 flex-col gap-3">
        {lead.idea ? (
          <p>
            <span className="font-semibold">{t("leads.idea")}: </span>
            {lead.idea}
          </p>
        ) : null}
        {lead.email ? (
          <p>
            <span className="font-semibold">{t("leads.email")}: </span>
            {lead.email}
          </p>
        ) : null}
        <p>
          <span className="font-semibold">{t("leads.language")}: </span>
          {lead.locale === "ar" || lead.locale === "en" ? t(`languages.${lead.locale}`) : lead.locale}
        </p>
        <form action={saveLeadNotesAction} className="flex flex-col gap-2">
          <input type="hidden" name="id" value={lead.id} />
          <input type="hidden" name="locale" value={locale} />
          <label className="flex flex-col gap-1 font-semibold">
            {t("leads.notesLabel", { name: lead.name })}
            <textarea
              name="notes"
              defaultValue={lead.notes}
              rows={3}
              maxLength={2000}
              className={`${inputClasses} font-normal`}
            />
          </label>
          <Button type="submit" variant="secondary" className="self-start">
            {t("common.save")}
          </Button>
        </form>
      </div>
    </details>
  );
}

export async function LeadsPage({ locale, status }: { locale: Locale; status: LeadStatus | undefined }) {
  const t = adminT(locale);
  const leads = await getLeads(status);

  return (
    <>
      <PageHeading title={t("leads.title")} intro={t("leads.intro")} />
      <form method="get" action={adminPath(locale, "leads")} className="mb-4 flex flex-wrap items-end gap-2">
        <div className="flex flex-col gap-1">
          <label htmlFor="leads-status-filter" className="text-sm font-semibold text-text">
            {t("leads.filterLabel")}
          </label>
          <select id="leads-status-filter" name="status" defaultValue={status ?? ""} className={inputClasses}>
            <option value="">{t("common.all")}</option>
            {leadStatuses.map((value) => (
              <option key={value} value={value}>
                {t(`leadStatus.${value}`)}
              </option>
            ))}
          </select>
        </div>
        <Button type="submit" variant="secondary">
          {t("common.filter")}
        </Button>
      </form>
      <p className="mb-2 text-sm text-muted">{t("common.timesUtc")}</p>

      {leads.length === 0 ? (
        <p className="text-base text-muted">{t("common.empty")}</p>
      ) : (
        <DataTable
          caption={t("leads.caption")}
          headings={[
            t("leads.date"),
            t("leads.contact"),
            t("leads.request"),
            t("leads.status"),
            t("leads.details"),
          ]}
        >
          {leads.map((lead) => (
            <tr key={lead.id}>
              <td className={cellClasses}>{formatDateTime(lead.createdAt, locale)}</td>
              <th scope="row" className={`${cellClasses} font-normal`}>
                <span className="block font-semibold text-text">{lead.name}</span>
                <a
                  href={`https://wa.me/${lead.whatsapp.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t("leads.whatsapp", { name: lead.name })}
                  className={linkClasses}
                >
                  <bdi>{lead.whatsapp}</bdi>
                </a>
              </th>
              <td className={cellClasses}>
                <span className="block">{t(`leadType.${lead.type}`)}</span>
                {lead.type === "business" ? (
                  <span className="block text-muted">
                    {lead.field ? categoryName(lead.field, locale) : t("leads.noField")}
                  </span>
                ) : null}
              </td>
              <td className={cellClasses}>
                <StatusForm lead={lead} locale={locale} t={t} />
              </td>
              <td className={cellClasses}>
                <LeadDetails lead={lead} locale={locale} t={t} />
              </td>
            </tr>
          ))}
        </DataTable>
      )}
    </>
  );
}
