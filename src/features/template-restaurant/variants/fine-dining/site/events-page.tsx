"use client";

import type { Locale } from "@/shared/i18n/config";
import { EventRequestForm } from "../../../modules/event-requests/event-request-form";
import { getFineDiningT } from "../messages";
import { FINE_DINING_SLUG } from "../slug";
import { useFineDiningStore } from "../store";
import { Section, SectionHeading } from "./section";

const eventTypes = ["birthday", "business", "engagement", "family"] as const;

// Private events: high-value leads. What we host + a request form that lands in the dashboard.
export function EventsPage({ locale }: { locale: Locale }) {
  const t = getFineDiningT(locale);

  return (
    <>
      <Section id="events-title">
        <SectionHeading level={1} id="events-title" eyebrow={t("events.eyebrow")} title={t("events.title")} />
        <p className="max-w-2xl text-lg text-muted">{t("events.intro")}</p>
      </Section>

      <Section id="types-title" tone="soft">
        <h2 id="types-title" className="mb-8 text-3xl font-bold">
          {t("events.typesTitle")}
        </h2>
        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {eventTypes.map((type) => (
            <li key={type} className="space-y-2 border-t-2 border-(--fd-accent) pt-4">
              <h3 className="text-xl font-bold">{t(`events.types.${type}.title`)}</h3>
              <p className="text-muted">{t(`events.types.${type}.text`)}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="request-title">
        <h2 id="request-title" className="mb-8 text-3xl font-bold">
          {t("events.formTitle")}
        </h2>
        <div className="max-w-3xl font-sans">
          <EventRequestForm
            store={useFineDiningStore}
            slug={FINE_DINING_SLUG}
            locale={locale}
            dashboardHref={`/${locale}/demos/restaurant/fine-dining/dashboard/events`}
          />
        </div>
      </Section>
    </>
  );
}
