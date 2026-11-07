"use client";

import type { Locale } from "@/shared/i18n/config";
import { EventRequestForm } from "../../../modules/event-requests/event-request-form";
import { getFineDiningT } from "../messages";
import { FINE_DINING_SLUG } from "../slug";
import { useFineDiningStore } from "../store";
import { Reveal } from "./reveal";
import { Section, SectionHeading } from "./section";
import { displayFont, formCard, formSkin } from "./styles";

const eventTypes = ["birthday", "business", "engagement", "family"] as const;

// Private dinners: high-value leads. What we host + a request form that lands in the dashboard.
export function EventsPage({ locale }: { locale: Locale }) {
  const t = getFineDiningT(locale);

  return (
    <>
      <Section id="events-title">
        <SectionHeading level={1} id="events-title" title={t("events.title")} intro={t("events.intro")} />
        <h2 className={`${displayFont} mb-6 text-center text-[30px]`}>{t("events.typesTitle")}</h2>
        <ul className="mx-auto grid max-w-[1000px] gap-10 min-[641px]:grid-cols-2 min-[1025px]:grid-cols-4">
          {eventTypes.map((type) => (
            <li key={type} className="border-t border-text/35 pt-4">
              <h3 className={`${displayFont} mb-1 text-[23px]`}>{t(`events.types.${type}.title`)}</h3>
              <p className="text-sm opacity-75">{t(`events.types.${type}.text`)}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="request-title" tone="soft">
        <div className="mx-auto max-w-[1000px]">
          <Reveal className={formCard}>
            <h2 id="request-title" className={`${displayFont} mb-[18px] text-[30px]`}>
              {t("events.formTitle")}
            </h2>
            <div className={formSkin}>
              <EventRequestForm
                store={useFineDiningStore}
                slug={FINE_DINING_SLUG}
                locale={locale}
                dashboardHref={`/${locale}/demos/restaurant/fine-dining/dashboard/events`}
              />
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
