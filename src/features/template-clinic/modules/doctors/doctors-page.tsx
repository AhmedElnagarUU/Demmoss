"use client";

import { useState, type FormEvent } from "react";
import { formatNumber } from "@/features/demo-engine/format/format";
import { trackEdit } from "@/features/demo-engine/track-edit";
import {
  BilingualField,
  ErrorSummary,
  PageHeader,
  Panel,
  parseNumber,
  SelectInput,
  StatusBadge,
  TextInput,
} from "@/features/demo-engine/ui";
import { Button } from "@/shared/ui/button";
import { fillText, hasText } from "../../dashboard/fill";
import { ScheduleEditor } from "../../dashboard/schedule-editor";
import { useClinic } from "../../context";
import { getClinicT } from "../../messages";
import { slotLengths, type Department, type Doctor, type Schedule } from "../../types";

const emptyText = { ar: "", en: "" };
const weekdays: Schedule = [
  { from: "09:00", to: "17:00" },
  { from: "09:00", to: "17:00" },
  { from: "09:00", to: "17:00" },
  { from: "09:00", to: "17:00" },
  { from: "09:00", to: "17:00" },
  null,
  null,
];

// Dashboard (medical centre): departments, and doctors with their weekly schedule (the schedule decides the free times).
export function DoctorsPage() {
  const { store, config, locale } = useClinic();
  const t = getClinicT(locale);
  const doctors = store((state) => state.doctors);
  const departments = store((state) => state.departments);
  const setDoctors = store((state) => state.setDoctors);
  const [editing, setEditing] = useState<Doctor | "new" | null>(null);

  return (
    <div className="space-y-6">
      <PageHeader
        title={t("doctors.title")}
        intro={t("doctors.intro")}
        action={editing ? null : <Button onClick={() => setEditing("new")}>{t("doctors.add")}</Button>}
      />

      {editing ? (
        <DoctorForm
          key={editing === "new" ? "new" : editing.id}
          doctor={editing === "new" ? null : editing}
          onDone={() => setEditing(null)}
        />
      ) : null}

      <Panel title={t("doctors.doctorsTitle")}>
        <ul className="space-y-3">
          {doctors.map((doctor) => {
            const name = doctor.name[locale];
            const department = departments.find((item) => item.id === doctor.departmentId);
            return (
              <li key={doctor.id} className="space-y-2 rounded-control border border-border p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-lg font-bold text-text">{name}</p>
                  {department ? <StatusBadge label={department.name[locale]} /> : null}
                </div>
                <p className="text-muted">
                  {doctor.title[locale]} ·{" "}
                  {t("common.minutes", { minutes: formatNumber(doctor.slotMinutes, locale) })}
                </p>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="secondary"
                    aria-label={`${t("common.edit")}: ${name}`}
                    onClick={() => setEditing(doctor)}
                  >
                    {t("common.edit")}
                  </Button>
                  <Button
                    variant="secondary"
                    disabled={doctors.length <= 1}
                    title={doctors.length <= 1 ? t("doctors.lastDoctor") : undefined}
                    aria-label={`${t("common.remove")}: ${name}`}
                    onClick={() => {
                      setDoctors(doctors.filter((item) => item.id !== doctor.id));
                      trackEdit("doctors", config.slug, locale);
                    }}
                  >
                    {t("common.remove")}
                  </Button>
                </div>
              </li>
            );
          })}
        </ul>
      </Panel>

      <DepartmentsPanel />
    </div>
  );
}

function DoctorForm({ doctor, onDone }: { doctor: Doctor | null; onDone: () => void }) {
  const { store, config, locale } = useClinic();
  const t = getClinicT(locale);
  const doctors = store((state) => state.doctors);
  const departments = store((state) => state.departments);
  const setDoctors = store((state) => state.setDoctors);
  const portraits = config.photos.filter((photo) => photo.portrait);
  const [draft, setDraft] = useState(
    doctor
      ? {
          ...doctor,
          departmentId: doctor.departmentId ?? "",
          years: String(doctor.years),
          slotMinutes: String(doctor.slotMinutes),
        }
      : {
          id: "",
          name: emptyText,
          title: emptyText,
          departmentId: departments[0]?.id ?? "",
          photo: portraits[0]?.id ?? "",
          bio: emptyText,
          credentials: [],
          years: "5",
          slotMinutes: "30",
          schedule: weekdays,
        },
  );
  const [error, setError] = useState(false);

  function submit(event: FormEvent) {
    event.preventDefault();
    const years = parseNumber(draft.years);
    const slotMinutes = parseNumber(draft.slotMinutes);
    if (
      !hasText(draft.name) ||
      !hasText(draft.title) ||
      years === null ||
      slotMinutes === null ||
      slotMinutes < 10
    ) {
      return setError(true);
    }
    const values: Doctor = {
      id: doctor?.id ?? crypto.randomUUID(),
      name: fillText(draft.name),
      title: fillText(draft.title),
      ...(draft.departmentId ? { departmentId: draft.departmentId } : {}),
      photo: draft.photo,
      bio: fillText(draft.bio),
      credentials: draft.credentials,
      years: Math.min(60, Math.max(0, Math.round(years))),
      slotMinutes: Math.min(120, Math.round(slotMinutes)),
      schedule: draft.schedule,
    };
    setDoctors(
      doctor ? doctors.map((item) => (item.id === doctor.id ? values : item)) : [...doctors, values],
    );
    trackEdit("doctors", config.slug, locale);
    onDone();
  }

  return (
    <form onSubmit={submit} noValidate>
      <Panel title={t(doctor ? "doctors.editTitle" : "doctors.addTitle")}>
        {error ? <ErrorSummary text={t("doctors.error")} /> : null}
        <BilingualField
          id="doctor-name"
          label={t("doctors.name")}
          value={draft.name}
          onChange={(name) => setDraft({ ...draft, name })}
          t={t}
        />
        <BilingualField
          id="doctor-title"
          label={t("doctors.role")}
          value={draft.title}
          onChange={(title) => setDraft({ ...draft, title })}
          t={t}
        />
        <BilingualField
          id="doctor-bio"
          label={t("doctors.bio")}
          value={draft.bio}
          onChange={(bio) => setDraft({ ...draft, bio })}
          t={t}
          multiline
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <SelectInput
            id="doctor-department"
            label={t("doctors.department")}
            value={draft.departmentId}
            onChange={(event) => setDraft({ ...draft, departmentId: event.target.value })}
          >
            <option value="">{t("doctors.noDepartment")}</option>
            {departments.map((department) => (
              <option key={department.id} value={department.id}>
                {department.name[locale]}
              </option>
            ))}
          </SelectInput>
          <SelectInput
            id="doctor-photo"
            label={t("doctors.photo")}
            value={draft.photo}
            onChange={(event) => setDraft({ ...draft, photo: event.target.value })}
          >
            {portraits.map((photo) => (
              <option key={photo.id} value={photo.id}>
                {photo.alt[locale]}
              </option>
            ))}
          </SelectInput>
          <TextInput
            id="doctor-years"
            label={t("doctors.years")}
            type="number"
            dir="ltr"
            min={0}
            value={draft.years}
            onChange={(event) => setDraft({ ...draft, years: event.target.value })}
          />
          <SelectInput
            id="doctor-slot"
            label={t("doctors.slotMinutes")}
            value={draft.slotMinutes}
            onChange={(event) => setDraft({ ...draft, slotMinutes: event.target.value })}
          >
            {slotLengths.map((minutes) => (
              <option key={minutes} value={minutes}>
                {t("common.minutes", { minutes: formatNumber(minutes, locale) })}
              </option>
            ))}
          </SelectInput>
        </div>
        <fieldset className="space-y-2">
          <legend className="text-sm font-bold text-text">{t("doctors.schedule")}</legend>
          <ScheduleEditor
            schedule={draft.schedule}
            locale={locale}
            idPrefix="doctor-schedule"
            onChange={(schedule) => setDraft({ ...draft, schedule })}
          />
        </fieldset>
        <div className="flex flex-wrap gap-3">
          <Button type="submit">{t("common.save")}</Button>
          <Button variant="secondary" onClick={onDone}>
            {t("common.cancel")}
          </Button>
        </div>
      </Panel>
    </form>
  );
}

function DepartmentsPanel() {
  const { store, config, locale } = useClinic();
  const t = getClinicT(locale);
  const departments = store((state) => state.departments);
  const doctors = store((state) => state.doctors);
  const treatments = store((state) => state.treatments);
  const setDepartments = store((state) => state.setDepartments);
  const [editing, setEditing] = useState<Department | "new" | null>(null);
  const [draft, setDraft] = useState({ name: emptyText, description: emptyText });
  const [error, setError] = useState(false);

  function open(department: Department | "new") {
    setDraft(department === "new" ? { name: emptyText, description: emptyText } : department);
    setError(false);
    setEditing(department);
  }

  function save(event: FormEvent) {
    event.preventDefault();
    if (!hasText(draft.name)) return setError(true);
    const values = { name: fillText(draft.name), description: fillText(draft.description) };
    setDepartments(
      editing && editing !== "new"
        ? departments.map((item) => (item.id === editing.id ? { ...values, id: item.id } : item))
        : [...departments, { ...values, id: crypto.randomUUID() }],
    );
    trackEdit("departments", config.slug, locale);
    setEditing(null);
  }

  return (
    <Panel title={t("doctors.departmentsTitle")}>
      <ul className="space-y-3">
        {departments.map((department) => {
          const name = department.name[locale];
          const inUse =
            doctors.some((doctor) => doctor.departmentId === department.id) ||
            treatments.some((treatment) => treatment.departmentId === department.id);
          return (
            <li
              key={department.id}
              className="flex flex-wrap items-center justify-between gap-2 rounded-control border border-border p-4"
            >
              <p className="font-bold text-text">{name}</p>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="secondary"
                  aria-label={`${t("common.edit")}: ${name}`}
                  onClick={() => open(department)}
                >
                  {t("common.edit")}
                </Button>
                {inUse ? (
                  <StatusBadge label={t("doctors.departmentInUse")} />
                ) : (
                  <Button
                    variant="secondary"
                    aria-label={`${t("common.remove")}: ${name}`}
                    onClick={() => {
                      setDepartments(departments.filter((item) => item.id !== department.id));
                      trackEdit("departments", config.slug, locale);
                    }}
                  >
                    {t("common.remove")}
                  </Button>
                )}
              </div>
            </li>
          );
        })}
      </ul>
      {editing ? (
        <form onSubmit={save} noValidate className="space-y-4">
          {error ? <ErrorSummary text={t("doctors.departmentError")} /> : null}
          <BilingualField
            id="department-name"
            label={t("doctors.departmentName")}
            value={draft.name}
            onChange={(name) => setDraft({ ...draft, name })}
            t={t}
          />
          <BilingualField
            id="department-description"
            label={t("doctors.departmentDescription")}
            value={draft.description}
            onChange={(description) => setDraft({ ...draft, description })}
            t={t}
            multiline
          />
          <div className="flex flex-wrap gap-3">
            <Button type="submit">{t("common.save")}</Button>
            <Button variant="secondary" onClick={() => setEditing(null)}>
              {t("common.cancel")}
            </Button>
          </div>
        </form>
      ) : (
        <Button variant="secondary" onClick={() => open("new")}>
          {t("doctors.addDepartment")}
        </Button>
      )}
    </Panel>
  );
}
