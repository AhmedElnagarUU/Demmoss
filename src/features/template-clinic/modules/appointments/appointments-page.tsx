"use client";

import { useState } from "react";
import { formatDateKey, formatTime } from "@/features/demo-engine/format/format";
import { phoneWhatsAppUrl } from "@/features/demo-engine/format/phone";
import { PageHeader, SelectInput, StatusBadge } from "@/features/demo-engine/ui";
import { Button } from "@/shared/ui/button";
import { allowedAppointmentStatuses } from "../../appointment-status";
import { useClinic } from "../../context";
import { getClinicT } from "../../messages";
import { appointmentStatuses } from "../../types";

// Dashboard: every appointment request from the site, with the next steps allowed by its status.
export function AppointmentsPage() {
  const { store, locale } = useClinic();
  const t = getClinicT(locale);
  const appointments = store((state) => state.appointments);
  const doctors = store((state) => state.doctors);
  const treatments = store((state) => state.treatments);
  const setStatus = store((state) => state.setAppointmentStatus);
  const [status, setStatusFilter] = useState("");
  const [doctorId, setDoctorFilter] = useState("");

  const shown = [...appointments]
    .filter(
      (item) => (status ? item.status === status : true) && (doctorId ? item.doctorId === doctorId : true),
    )
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  return (
    <div className="space-y-4">
      <PageHeader title={t("appointments.title")} intro={t("appointments.intro")} />
      <div className="grid gap-4 sm:grid-cols-2">
        <SelectInput
          id="filter-status"
          label={t("appointments.filterStatus")}
          value={status}
          onChange={(event) => setStatusFilter(event.target.value)}
        >
          <option value="">{t("appointments.all")}</option>
          {appointmentStatuses.map((item) => (
            <option key={item} value={item}>
              {t(`status.${item}`)}
            </option>
          ))}
        </SelectInput>
        {doctors.length > 1 ? (
          <SelectInput
            id="filter-doctor"
            label={t("appointments.filterDoctor")}
            value={doctorId}
            onChange={(event) => setDoctorFilter(event.target.value)}
          >
            <option value="">{t("appointments.all")}</option>
            {doctors.map((doctor) => (
              <option key={doctor.id} value={doctor.id}>
                {doctor.name[locale]}
              </option>
            ))}
          </SelectInput>
        ) : null}
      </div>

      {shown.length === 0 ? (
        <p className="text-muted">{t("appointments.empty")}</p>
      ) : (
        <ul className="space-y-3">
          {shown.map((item) => {
            const doctor = doctors.find((entry) => entry.id === item.doctorId);
            const treatment = treatments.find((entry) => entry.id === item.treatmentId);
            return (
              <li key={item.id} className="space-y-2 rounded-control border border-border bg-bg p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-lg font-bold text-text">{item.name}</p>
                  <StatusBadge label={t(`status.${item.status}`)} />
                </div>
                <p className="text-text">
                  {treatment ? treatment.name[locale] : t("common.generalTreatment")}
                  {doctors.length > 1 && doctor ? ` · ${doctor.name[locale]}` : ""}
                </p>
                <p className="text-muted">
                  {formatDateKey(item.date, locale)} · {formatTime(item.time, locale)} ·{" "}
                  <span dir="ltr">{item.phone}</span>
                </p>
                {item.note ? <p className="text-text">{item.note}</p> : null}
                <div className="flex flex-wrap gap-2">
                  {allowedAppointmentStatuses(item.status).map((next) => (
                    <Button key={next} variant="secondary" onClick={() => setStatus(item.id, next)}>
                      {t(`appointments.action.${next}`)}: {item.name}
                    </Button>
                  ))}
                  {item.status === "confirmed" ? (
                    <a
                      href={phoneWhatsAppUrl(
                        item.phone,
                        t("appointments.reminder", {
                          name: item.name,
                          day: formatDateKey(item.date, locale),
                          time: formatTime(item.time, locale),
                        }),
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center rounded-control border border-border px-4 font-semibold text-text hover:bg-surface focus-visible:outline-2 focus-visible:outline-focus"
                    >
                      {t("appointments.reminderLink")}: {item.name}
                    </a>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
