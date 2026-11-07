"use client";

import Link from "next/link";
import type { Locale } from "@/shared/i18n/config";
import { ReservationForm } from "../../../modules/reservations/reservation-form";
import { getFineDiningT } from "../messages";
import { FINE_DINING_SLUG } from "../slug";
import { useFineDiningStore } from "../store";
import { Reveal } from "./reveal";
import { Section, SectionHeading } from "./section";
import { formCard, formSkin } from "./styles";

// Reserve: the main conversion page. Free times only; the booking lands in the dashboard.
export function ReservePage({ locale }: { locale: Locale }) {
  const t = getFineDiningT(locale);
  const root = `/${locale}/demos/restaurant/fine-dining`;

  return (
    <Section id="reserve-title">
      <SectionHeading level={1} id="reserve-title" title={t("reserve.title")} intro={t("reserve.intro")} />
      <div className="mx-auto max-w-[620px]">
        <Reveal className={formCard}>
          <div className={formSkin}>
            <ReservationForm
              store={useFineDiningStore}
              slug={FINE_DINING_SLUG}
              locale={locale}
              dashboardHref={`${root}/dashboard/reservations`}
            />
          </div>
        </Reveal>
        <p className="mt-8 text-sm text-muted">
          {t("reserve.largeParty")}{" "}
          <Link href={`${root}/events`} className="text-(--fd-accent) underline">
            {t("reserve.largePartyLink")}
          </Link>
        </p>
      </div>
    </Section>
  );
}
