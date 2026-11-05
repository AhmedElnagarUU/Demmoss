import Link from "next/link";
import type { Locale } from "@/shared/i18n/config";
import { formatDateTime } from "../format";
import { adminPath } from "../paths";
import { getVisitorJourney } from "../service";
import { adminT } from "../translate";
import { visitorIdSchema } from "../types";
import { EventTable } from "./event-table";
import { PageHeading } from "./page-heading";
import { linkClasses } from "./styles";
import { countryLabel, deviceLabel, languageLabel, sourceLabelText } from "./visitors-page";

export async function VisitorJourneyPage({ locale, visitorId }: { locale: Locale; visitorId: string }) {
  const t = adminT(locale);
  const parsed = visitorIdSchema.safeParse(visitorId);
  const journey = parsed.success ? await getVisitorJourney(parsed.data) : null;

  return (
    <>
      <Link href={adminPath(locale, "visitors")} className={`mb-4 inline-block ${linkClasses}`}>
        {t("visitors.back")}
      </Link>
      <PageHeading
        title={t("visitors.journeyTitle")}
        intro={journey ? t("visitors.journeyIntro") : undefined}
      />
      {journey ? (
        <>
          <p className="mb-4 text-base text-text">
            <bdi>{journey.visitor.visitorId.slice(0, 8)}</bdi>
            {" · "}
            {countryLabel(journey.visitor.country, locale, t)}
            {" · "}
            {deviceLabel(journey.visitor.device, t)}
            {" · "}
            {languageLabel(journey.visitor.locale, t)}
            {" · "}
            {sourceLabelText(journey.visitor.source, t)}
            {" · "}
            {formatDateTime(journey.visitor.firstSeenAt, locale)}
          </p>
          <p className="mb-2 text-sm text-muted">{t("common.timesUtc")}</p>
          {journey.events.length === 0 ? (
            <p className="text-base text-muted">{t("common.empty")}</p>
          ) : (
            <EventTable
              events={journey.events}
              locale={locale}
              caption={t("visitors.journeyCaption")}
              showVisitor={false}
            />
          )}
        </>
      ) : (
        <p className="text-base text-muted">{t("visitors.notFound")}</p>
      )}
    </>
  );
}
