"use client";

import { Button } from "@/shared/ui/button";
import { buttonClasses } from "@/shared/ui/button-styles";
import { businessNameOf } from "../business-name";
import { formatDateTime } from "../format";
import { getLogisticsT } from "../messages";
import { clientWhatsAppUrl } from "../phone";
import { allowedQuoteStatuses } from "../quotes";
import { useLogistics } from "./logistics-context";
import { estimateText } from "./quote-estimate";
import { PageHeader, StatusBadge } from "./ui";

export function QuotesPage() {
  const { store, locale } = useLogistics();
  const t = getLogisticsT(locale);
  const quotes = store((state) => state.quotes);
  const currency = store((state) => state.settings.currency);
  const setStatus = store((state) => state.setQuoteStatus);
  const businessName = store((state) => businessNameOf(state, locale));
  const sorted = [...quotes].sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  return (
    <div className="space-y-6">
      <PageHeader title={t("quotes.title")} intro={t("quotes.intro")} />
      {sorted.length === 0 ? <p className="text-muted">{t("quotes.empty")}</p> : null}
      <ul className="space-y-3">
        {sorted.map((quote) => (
          <li key={quote.id} className="space-y-3 rounded-control border border-border bg-bg p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-lg font-bold text-text">{quote.name}</p>
              <StatusBadge label={t(`statuses.${quote.status}`)} />
            </div>
            <p className="text-text">{t("quotes.service", { service: t(`services.${quote.service}`) })}</p>
            {quote.estimate ? (
              <p className="font-semibold text-text">{estimateText(quote.estimate, locale, currency, t)}</p>
            ) : null}
            {quote.company ? (
              <p className="text-sm text-text">{t("quotes.company", { company: quote.company })}</p>
            ) : null}
            {quote.message ? (
              <p className="text-sm text-text">{t("quotes.message", { message: quote.message })}</p>
            ) : null}
            <p className="text-sm text-muted" dir="ltr">
              {quote.phone}
              {quote.email ? ` · ${quote.email}` : ""}
            </p>
            <p className="text-sm text-muted">
              {t("quotes.received", { when: formatDateTime(quote.createdAt, locale) })}
            </p>
            <div className="flex flex-wrap gap-2">
              {allowedQuoteStatuses(quote.status).map((status) => (
                <Button
                  key={status}
                  variant="secondary"
                  aria-label={`${t(`statusActions.${status}`)}: ${quote.name}`}
                  onClick={() => setStatus(quote.id, status)}
                >
                  {t(`statusActions.${status}`)}
                </Button>
              ))}
              <a
                href={clientWhatsAppUrl(
                  quote.phone,
                  t("quotes.whatsappMessage", { name: quote.name, business: businessName }),
                )}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${t("common.whatsappReply")}: ${quote.name}`}
                className={buttonClasses("whatsapp")}
              >
                {t("common.whatsappReply")}
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
