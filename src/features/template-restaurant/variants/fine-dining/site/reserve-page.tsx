"use client";

import Link from "next/link";
import type { Locale } from "@/shared/i18n/config";
import { ReservationForm } from "../../../modules/reservations/reservation-form";
import { getFineDiningT } from "../messages";
import { FINE_DINING_SLUG } from "../slug";
import { useFineDiningStore } from "../store";
import { Section, SectionHeading } from "./section";

// Reserve: the main conversion page. Free times only; the booking lands in the dashboard.
export function ReservePage({ locale }: { locale: Locale }) {
  const t = getFineDiningT(locale);
  const root = `/${locale}/demos/restaurant/fine-dining`;

  return (
    <Section id="reserve-title">
      <SectionHeading
        level={1}
        id="reserve-title"
        eyebrow={t("reserve.eyebrow")}
        title={t("reserve.title")}
      />
      <p className="mb-8 max-w-2xl text-lg text-muted">{t("reserve.intro")}</p>
      <div className="max-w-3xl font-sans">
        <ReservationForm
          store={useFineDiningStore}
          slug={FINE_DINING_SLUG}
          locale={locale}
          dashboardHref={`${root}/dashboard/reservations`}
        />
        <p className="mt-8 text-muted">
          {t("reserve.largeParty")}{" "}
          <Link href={`${root}/events`} className="font-semibold text-primary underline">
            {t("reserve.largePartyLink")}
          </Link>
        </p>
      </div>
    </Section>
  );
}
