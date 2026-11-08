import { eventNames, type EventName } from "@/features/tracking/types";
import type { Locale } from "@/shared/i18n/config";
import { Button } from "@/shared/ui/button";
import { adminPath } from "../paths";
import { getActivity, LIST_LIMIT } from "../service";
import { adminT } from "../translate";
import { EventTable } from "./event-table";
import { PageHeading } from "./page-heading";
import { inputClasses } from "./styles";

export function eventNameFromParam(value: string | string[] | undefined): EventName | undefined {
  return eventNames.find((name) => name === value);
}

export async function ActivityPage({ locale, name }: { locale: Locale; name: EventName | undefined }) {
  const t = adminT(locale);
  const events = await getActivity({ name });

  return (
    <>
      <PageHeading title={t("activity.title")} intro={t("activity.intro")} />
      <form
        method="get"
        action={adminPath(locale, "activity")}
        className="mb-4 flex flex-wrap items-end gap-2"
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="activity-event-filter" className="text-sm font-semibold text-text">
            {t("activity.eventLabel")}
          </label>
          <select id="activity-event-filter" name="event" defaultValue={name ?? ""} className={inputClasses}>
            <option value="">{t("activity.anyEvent")}</option>
            {eventNames.map((value) => (
              <option key={value} value={value}>
                {t(`events.${value}`)}
              </option>
            ))}
          </select>
        </div>
        <Button type="submit" variant="secondary">
          {t("common.filter")}
        </Button>
      </form>
      <p className="mb-2 text-sm text-muted">
        {t("common.showing", { count: String(LIST_LIMIT) })} {t("common.timesUtc")}
      </p>
      {events.length === 0 ? (
        <p className="text-base text-muted">{t("common.empty")}</p>
      ) : (
        <EventTable events={events} locale={locale} caption={t("activity.caption")} showVisitor />
      )}
    </>
  );
}
