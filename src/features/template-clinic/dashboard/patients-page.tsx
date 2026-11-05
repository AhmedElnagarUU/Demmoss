"use client";

import { useState } from "react";
import { toDateKey } from "@/features/demo-engine/format/dates";
import { formatDateKey, formatNumber } from "@/features/demo-engine/format/format";
import { PageHeader } from "@/features/demo-engine/ui";
import { useClinic } from "../context";
import { getClinicT } from "../messages";
import { groupPatients } from "../patients";

// Dashboard: patients come from appointments (grouped by phone number); nothing is typed in twice.
export function PatientsPage() {
  const { store, locale } = useClinic();
  const t = getClinicT(locale);
  const appointments = store((state) => state.appointments);
  const [today] = useState(() => toDateKey(new Date()));
  const patients = groupPatients(appointments, today);
  const day = (dateKey: string | null) => (dateKey ? formatDateKey(dateKey, locale) : t("patients.none"));

  return (
    <div>
      <PageHeader title={t("patients.title")} intro={t("patients.intro")} />
      {patients.length === 0 ? (
        <p className="text-muted">{t("patients.empty")}</p>
      ) : (
        <ul className="space-y-3">
          {patients.map((patient) => (
            <li key={patient.key} className="space-y-2 rounded-control border border-border bg-bg p-4">
              <p className="text-lg font-bold text-text">
                {patient.name}{" "}
                <span className="text-base font-normal text-muted" dir="ltr">
                  {patient.phone}
                </span>
              </p>
              <dl className="grid gap-3 text-sm sm:grid-cols-5">
                {[
                  [t("patients.requests"), formatNumber(patient.requests, locale)],
                  [t("patients.visits"), formatNumber(patient.visits, locale)],
                  [t("patients.noShows"), formatNumber(patient.noShows, locale)],
                  [t("patients.last"), day(patient.lastVisit)],
                  [t("patients.next"), day(patient.nextAppointment)],
                ].map(([label, value]) => (
                  <div key={label}>
                    <dt className="text-muted">{label}</dt>
                    <dd className="font-semibold text-text">{value}</dd>
                  </div>
                ))}
              </dl>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
