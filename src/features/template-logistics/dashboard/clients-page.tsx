"use client";

import { useMemo } from "react";
import { buttonClasses } from "@/shared/ui/button-styles";
import { buildClients } from "../clients";
import { formatDate } from "@/features/demo-engine/format/format";
import { formatNumber } from "../format";
import { getLogisticsT } from "../messages";
import { phoneWhatsAppUrl } from "@/features/demo-engine/format/phone";
import { useLogistics } from "./logistics-context";
import { PageHeader } from "@/features/demo-engine/ui";

export function ClientsPage() {
  const { store, locale } = useLogistics();
  const t = getLogisticsT(locale);
  const quotes = store((state) => state.quotes);
  const clients = useMemo(() => buildClients(quotes), [quotes]);

  return (
    <div className="space-y-6">
      <PageHeader title={t("clients.title")} intro={t("clients.intro")} />
      {clients.length === 0 ? (
        <p className="text-muted">{t("clients.empty")}</p>
      ) : (
        <div className="overflow-x-auto rounded-control border border-border">
          <table className="w-full text-start">
            <thead className="bg-surface text-sm text-muted">
              <tr>
                <th scope="col" className="p-3 text-start">
                  {t("clients.name")}
                </th>
                <th scope="col" className="p-3 text-start">
                  {t("clients.company")}
                </th>
                <th scope="col" className="p-3 text-start">
                  {t("clients.phone")}
                </th>
                <th scope="col" className="p-3 text-start">
                  {t("clients.count")}
                </th>
                <th scope="col" className="p-3 text-start">
                  {t("clients.last")}
                </th>
                <th scope="col" className="p-3">
                  <span className="sr-only">{t("common.whatsappReply")}</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {clients.map((client) => (
                <tr key={client.phone}>
                  <th scope="row" className="p-3 text-start font-semibold">
                    {client.name}
                  </th>
                  <td className="p-3">{client.company || "—"}</td>
                  <td className="p-3" dir="ltr">
                    {client.phone}
                  </td>
                  <td className="p-3">{formatNumber(client.count, locale)}</td>
                  <td className="p-3">{formatDate(client.lastAt, locale)}</td>
                  <td className="p-3">
                    <a
                      href={phoneWhatsAppUrl(client.phone, "")}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${t("common.whatsappReply")}: ${client.name}`}
                      className={buttonClasses("whatsapp")}
                    >
                      {t("common.whatsappReply")}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
