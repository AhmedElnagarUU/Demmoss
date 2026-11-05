"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { track } from "@/features/tracking/client/track";
import { toDateKey } from "@/features/demo-engine/format/dates";
import { formatDateKey, formatTime } from "@/features/demo-engine/format/format";
import { ErrorSummary, SelectInput, TextArea, TextInput } from "@/features/demo-engine/ui";
import { bookableDates, freeTimes, validateBooking, type BookingErrors } from "../booking";
import { useClinic } from "../context";
import { getClinicT } from "../messages";
import { primaryButton } from "./site-ui";

type Props = {
  idPrefix: string;
  initialDoctorId?: string;
  initialTreatmentId?: string;
};

type Done = { dateKey: string; time: string };

// "Book an appointment": only free times from the doctor's weekly schedule are offered, so a patient cannot book a taken slot.
export function BookingForm({ idPrefix, initialDoctorId, initialTreatmentId }: Props) {
  const { store, config, locale } = useClinic();
  const t = getClinicT(locale);
  const doctors = store((state) => state.doctors);
  const treatments = store((state) => state.treatments);
  const appointments = store((state) => state.appointments);
  const addAppointment = store((state) => state.addAppointment);

  const [now] = useState(() => new Date());
  const [doctorId, setDoctorId] = useState(initialDoctorId ?? doctors[0]?.id ?? "");
  const [treatmentId, setTreatmentId] = useState(initialTreatmentId ?? "");
  const [pickedDate, setPickedDate] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [errors, setErrors] = useState<BookingErrors>({});
  const [done, setDone] = useState<Done | null>(null);

  const doctor = doctors.find((item) => item.id === doctorId) ?? doctors[0];
  const dates = doctor ? bookableDates(doctor, now) : [];
  const freeOn = (dateKey: string) => (doctor ? freeTimes({ doctor, dateKey, appointments, now }) : []);
  const dateKey = dates.includes(pickedDate) ? pickedDate : (dates.find((key) => freeOn(key).length > 0) ?? dates[0] ?? "");
  const times = freeOn(dateKey);
  const chosenTime = times.includes(time) ? time : "";
  const treatmentOptions = treatments.filter(
    (item) => !item.departmentId || !doctor?.departmentId || item.departmentId === doctor.departmentId,
  );
  const chosenTreatment = treatmentOptions.some((item) => item.id === treatmentId) ? treatmentId : "";
  const root = `/${locale}${config.basePath}`;

  function submit(event: FormEvent) {
    event.preventDefault();
    const found = validateBooking(
      { doctor, dateKey, time: chosenTime, name, phone },
      { appointments, now },
    );
    setErrors(found);
    if (Object.keys(found).length > 0 || !doctor) return;

    addAppointment({
      doctorId: doctor.id,
      ...(chosenTreatment ? { treatmentId: chosenTreatment } : {}),
      name,
      phone,
      date: dateKey,
      time: chosenTime,
      ...(note.trim() ? { note: note.trim() } : {}),
    });
    track("demo_action", { locale, template: config.slug, meta: { kind: "appointment" } });
    setDone({ dateKey, time: chosenTime });
  }

  if (done) {
    return (
      <div role="status" className="space-y-4 rounded-3xl bg-bg p-6 ring-1 ring-border">
        <h3 className="text-xl font-medium text-text">{t("site.bookingForm.doneTitle")}</h3>
        <p className="text-text">
          {t("site.bookingForm.doneText", {
            day: formatDateKey(done.dateKey, locale),
            time: formatTime(done.time, locale),
          })}
        </p>
        <Link href={`${root}/dashboard/appointments`} className={primaryButton}>
          {t("site.bookingForm.doneDashboard")}
        </Link>
      </div>
    );
  }

  const errorText = (field: keyof BookingErrors) =>
    errors[field] ? t(`site.bookingForm.errors.${field}`) : undefined;

  return (
    <form
      onSubmit={submit}
      noValidate
      aria-label={t("site.bookingForm.title")}
      className="space-y-5 rounded-[28px] bg-bg p-6 shadow-sm ring-1 ring-border sm:p-8"
    >
      {Object.keys(errors).length > 0 ? <ErrorSummary text={t("site.bookingForm.errorSummary")} /> : null}

      {doctors.length > 1 ? (
        <SelectInput
          id={`${idPrefix}-doctor`}
          label={t("site.bookingForm.doctor")}
          value={doctor?.id ?? ""}
          error={errorText("doctor")}
          onChange={(event) => setDoctorId(event.target.value)}
        >
          {doctors.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name[locale]} · {item.title[locale]}
            </option>
          ))}
        </SelectInput>
      ) : null}

      <SelectInput
        id={`${idPrefix}-treatment`}
        label={t("site.bookingForm.treatment")}
        value={chosenTreatment}
        onChange={(event) => setTreatmentId(event.target.value)}
      >
        <option value="">{t("site.bookingForm.anyTreatment")}</option>
        {treatmentOptions.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name[locale]}
          </option>
        ))}
      </SelectInput>

      {dates.length === 0 ? (
        <p className="text-muted">{t("site.bookingForm.noDates")}</p>
      ) : (
        <SelectInput
          id={`${idPrefix}-date`}
          label={t("site.bookingForm.date")}
          value={dateKey}
          error={errorText("date")}
          onChange={(event) => setPickedDate(event.target.value)}
        >
          {dates.map((key) => (
            <option key={key} value={key}>
              {key === toDateKey(now) ? `${t("site.bookingForm.today")} · ` : ""}
              {formatDateKey(key, locale)}
            </option>
          ))}
        </SelectInput>
      )}

      <fieldset className="space-y-2">
        <legend className="text-sm font-semibold text-text">{t("site.bookingForm.time")}</legend>
        {times.length === 0 ? (
          <p className="text-muted">{t("site.bookingForm.noTimes")}</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {times.map((slot) => (
              <label key={slot} className="cursor-pointer">
                <input
                  type="radio"
                  name={`${idPrefix}-time`}
                  value={slot}
                  checked={chosenTime === slot}
                  onChange={() => setTime(slot)}
                  className="peer sr-only"
                />
                <span className="inline-flex min-h-11 items-center rounded-full border border-border px-4 font-semibold text-text peer-checked:border-primary peer-checked:bg-primary peer-checked:text-on-primary peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-focus">
                  {formatTime(slot, locale)}
                </span>
              </label>
            ))}
          </div>
        )}
        {errors.time ? (
          <p className="text-sm font-semibold text-text">{t("site.bookingForm.errors.time")}</p>
        ) : null}
      </fieldset>

      <div className="grid gap-4 sm:grid-cols-2">
        <TextInput
          id={`${idPrefix}-name`}
          label={t("site.bookingForm.name")}
          autoComplete="name"
          value={name}
          error={errorText("name")}
          onChange={(event) => setName(event.target.value)}
        />
        <TextInput
          id={`${idPrefix}-phone`}
          label={t("site.bookingForm.phone")}
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          dir="ltr"
          value={phone}
          error={errorText("phone")}
          onChange={(event) => setPhone(event.target.value)}
        />
      </div>
      <TextArea
        id={`${idPrefix}-note`}
        label={t("site.bookingForm.note")}
        maxLength={300}
        value={note}
        onChange={(event) => setNote(event.target.value)}
      />
      <button type="submit" className={`${primaryButton} w-full`}>
        {t("site.bookingForm.submit")}
      </button>
    </form>
  );
}
