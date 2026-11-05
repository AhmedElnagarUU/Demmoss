"use client";

import { formatDateKey, formatNumber } from "@/features/demo-engine/format/format";
import { getRestaurantT } from "../messages";
import { phoneWhatsAppUrl } from "@/features/demo-engine/format/phone";
import { buttonClasses } from "@/shared/ui/button-styles";
import { useRestaurant } from "./restaurant-context";
import { PageHeader } from "@/features/demo-engine/ui";

export function CustomersPage() {
  const { config, locale } = useRestaurant();
  const t = getRestaurantT(locale);
  const customers = config.useCustomers();

  return (
    <div className="space-y-6">
      <PageHeader title={t("customers.title")} intro={t("customers.intro")} />
      {customers.length === 0 ? (
        <p className="text-muted">{t("customers.empty")}</p>
      ) : (
        <div className="overflow-x-auto rounded-control border border-border">
          <table className="w-full text-start">
            <thead className="bg-surface text-sm text-muted">
              <tr>
                <th scope="col" className="p-3 text-start">
                  {t("customers.name")}
                </th>
                <th scope="col" className="p-3 text-start">
                  {t("customers.phone")}
                </th>
                <th scope="col" className="p-3 text-start">
                  {t("customers.count")}
                </th>
                <th scope="col" className="p-3 text-start">
                  {t("customers.last")}
                </th>
                <th scope="col" className="p-3">
                  <span className="sr-only">{t("common.whatsappReply")}</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {customers.map((customer) => (
                <tr key={customer.phone}>
                  <th scope="row" className="p-3 text-start font-semibold">
                    {customer.name}
                  </th>
                  <td className="p-3" dir="ltr">
                    {customer.phone}
                  </td>
                  <td className="p-3">{formatNumber(customer.count, locale)}</td>
                  <td className="p-3">{formatDateKey(customer.lastDate, locale)}</td>
                  <td className="p-3">
                    <a
                      href={phoneWhatsAppUrl(customer.phone, "")}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${t("common.whatsappReply")}: ${customer.name}`}
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
