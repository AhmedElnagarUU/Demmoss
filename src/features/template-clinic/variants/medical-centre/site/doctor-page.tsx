"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { formatDateKey, formatNumber, formatTime } from "@/features/demo-engine/format/format";
import { nextFreeSlot } from "../../../booking";
import { useClinic } from "../../../context";
import { findPhoto, SitePhoto } from "../../../site/photo";
import { HoursList } from "../../../site/site-parts";
import {
  cardClasses,
  GlowDot,
  Pill,
  primaryButton,
  SectionTitle,
  softButton,
  wrap,
} from "../../../site/site-ui";
import { getCentreT } from "../messages";

// Doctor profile, chosen by ?id= so doctors added in the dashboard open without a build step.
export function DoctorPage() {
  return (
    <Suspense fallback={null}>
      <DoctorPageContent />
    </Suspense>
  );
}

function DoctorPageContent() {
  const id = useSearchParams().get("id") ?? "";
  const { store, config, locale } = useClinic();
  const t = getCentreT(locale);
  const doctor = store((state) => state.doctors.find((item) => item.id === id));
  const department = store((state) => state.departments.find((item) => item.id === doctor?.departmentId));
  const appointments = store((state) => state.appointments);
  const [now] = useState(() => new Date());
  const root = `/${locale}${config.basePath}`;

  if (!doctor) {
    return (
      <div className={`${wrap} space-y-4 py-12`}>
        <h1 className="text-2xl font-medium">{t("doctor.notFound")}</h1>
        <Link href={`${root}/doctors`} className={softButton}>
          {t("doctor.back")}
        </Link>
      </div>
    );
  }

  const next = nextFreeSlot(doctor, appointments, now);
  const years = formatNumber(doctor.years, locale);

  return (
    <div className={`${wrap} grid gap-10 py-12 lg:grid-cols-[1fr_1.4fr]`}>
      <div className="aspect-[4/5] overflow-hidden rounded-[30px] bg-surface">
        <SitePhoto
          photo={findPhoto(config.photos, doctor.photo)}
          locale={locale}
          priority
          sizes="(min-width: 1024px) 480px, 100vw"
        />
      </div>
      <div className="space-y-6">
        <Link href={`${root}/doctors`} className="text-sm font-medium text-(--cl-accent) underline">
          {t("doctor.back")}
        </Link>
        {department ? <Pill>{department.name[locale]}</Pill> : null}
        <SectionTitle level={1}>{doctor.name[locale]}</SectionTitle>
        <p className="text-lg text-muted">
          {doctor.title[locale]} · {t("doctor.years", { years })}
        </p>
        <p>{doctor.bio[locale]}</p>
        {doctor.credentials.length > 0 ? (
          <div className="space-y-2">
            <h2 className="text-lg font-medium">{t("doctor.credentials")}</h2>
            <ul className="space-y-2">
              {doctor.credentials.map((credential) => (
                <li key={credential.en} className="flex items-start gap-3">
                  <GlowDot />
                  <span>{credential[locale]}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        <div className={cardClasses}>
          <h2 className="mb-3 text-lg font-medium">{t("doctor.schedule")}</h2>
          <HoursList schedule={doctor.schedule} locale={locale} />
        </div>
        <p className="text-lg">
          <span className="text-muted">{t("doctor.nextFree")}: </span>
          <strong className="font-medium">
            {next
              ? `${formatDateKey(next.dateKey, locale)} · ${formatTime(next.time, locale)}`
              : t("doctor.noFree")}
          </strong>
        </p>
        <Link href={`${root}/book?doctor=${doctor.id}`} className={primaryButton}>
          {t("doctor.book", { name: doctor.name[locale] })}
        </Link>
      </div>
    </div>
  );
}
