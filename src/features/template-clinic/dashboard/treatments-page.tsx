"use client";

import { useState, type FormEvent } from "react";
import { trackEdit } from "@/features/demo-engine/track-edit";
import { formatNumber } from "@/features/demo-engine/format/format";
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
import { formatPrice } from "../format";
import { useClinic } from "../context";
import { getClinicT } from "../messages";
import type { Treatment } from "../types";
import { fillText, hasText } from "./fill";

const blank = {
  name: { ar: "", en: "" },
  description: { ar: "", en: "" },
  priceNote: { ar: "", en: "" },
  price: "",
  duration: "30",
  fromPrice: false,
  photo: "",
  departmentId: "",
};

// Dashboard: the price list. A change here is the change on the website (price table, treatment pages, booking form).
export function TreatmentsPage() {
  const { store, config, locale } = useClinic();
  const t = getClinicT(locale);
  const treatments = store((state) => state.treatments);
  const setTreatments = store((state) => state.setTreatments);
  const [editing, setEditing] = useState<Treatment | "new" | null>(null);

  return (
    <div className="space-y-6">
      <PageHeader
        title={t("treatments.title")}
        intro={t("treatments.intro")}
        action={editing ? null : <Button onClick={() => setEditing("new")}>{t("treatments.add")}</Button>}
      />
      {editing ? (
        <TreatmentForm
          key={editing === "new" ? "new" : editing.id}
          treatment={editing === "new" ? null : editing}
          onDone={() => setEditing(null)}
        />
      ) : null}
      {treatments.length === 0 ? <p className="text-muted">{t("treatments.empty")}</p> : null}
      <ul className="space-y-3">
        {treatments.map((item) => {
          const name = item.name[locale];
          return (
            <li key={item.id} className="space-y-2 rounded-control border border-border bg-bg p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-lg font-bold text-text">{name}</p>
                <StatusBadge
                  label={`${item.fromPrice ? `${t("common.from")} ` : ""}${formatPrice(item.price, locale)}`}
                />
              </div>
              <p className="text-muted">
                {t("common.minutes", { minutes: formatNumber(item.durationMinutes, locale) })}
                {item.priceNote[locale] ? ` · ${item.priceNote[locale]}` : ""}
              </p>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="secondary"
                  aria-label={`${t("common.edit")}: ${name}`}
                  onClick={() => setEditing(item)}
                >
                  {t("common.edit")}
                </Button>
                <Button
                  variant="secondary"
                  aria-label={`${t("common.remove")}: ${name}`}
                  onClick={() => {
                    setTreatments(treatments.filter((entry) => entry.id !== item.id));
                    trackEdit("treatments", config.slug, locale);
                  }}
                >
                  {t("common.remove")}
                </Button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function TreatmentForm({ treatment, onDone }: { treatment: Treatment | null; onDone: () => void }) {
  const { store, config, locale } = useClinic();
  const t = getClinicT(locale);
  const treatments = store((state) => state.treatments);
  const departments = store((state) => state.departments);
  const setTreatments = store((state) => state.setTreatments);
  const [draft, setDraft] = useState(
    treatment
      ? {
          name: treatment.name,
          description: treatment.description,
          priceNote: treatment.priceNote,
          price: String(treatment.price),
          duration: String(treatment.durationMinutes),
          fromPrice: treatment.fromPrice,
          photo: treatment.photo ?? "",
          departmentId: treatment.departmentId ?? "",
        }
      : blank,
  );
  const [error, setError] = useState(false);

  function submit(event: FormEvent) {
    event.preventDefault();
    const price = parseNumber(draft.price);
    const duration = parseNumber(draft.duration);
    if (!hasText(draft.name) || price === null || price < 0 || duration === null || duration < 1) {
      setError(true);
      return;
    }
    const values = {
      name: fillText(draft.name),
      description: fillText(draft.description),
      priceNote: fillText(draft.priceNote),
      price: Math.round(price),
      durationMinutes: Math.round(duration),
      fromPrice: draft.fromPrice,
      ...(draft.photo ? { photo: draft.photo } : {}),
      ...(draft.departmentId ? { departmentId: draft.departmentId } : {}),
    };
    if (treatment) {
      setTreatments(
        treatments.map((item) =>
          item.id === treatment.id ? { ...values, id: item.id, steps: item.steps } : item,
        ),
      );
    } else {
      setTreatments([...treatments, { ...values, id: crypto.randomUUID(), steps: [] }]);
    }
    trackEdit("treatments", config.slug, locale);
    onDone();
  }

  return (
    <form onSubmit={submit} noValidate>
      <Panel title={t(treatment ? "treatments.editTitle" : "treatments.addTitle")}>
        {error ? <ErrorSummary text={t("treatments.error")} /> : null}
        <BilingualField
          id="treatment-name"
          label={t("treatments.name")}
          value={draft.name}
          onChange={(name) => setDraft({ ...draft, name })}
          t={t}
        />
        <BilingualField
          id="treatment-description"
          label={t("treatments.description")}
          value={draft.description}
          onChange={(description) => setDraft({ ...draft, description })}
          t={t}
          multiline
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <TextInput
            id="treatment-price"
            label={t("treatments.price")}
            type="number"
            inputMode="numeric"
            dir="ltr"
            min={0}
            value={draft.price}
            onChange={(event) => setDraft({ ...draft, price: event.target.value })}
          />
          <TextInput
            id="treatment-duration"
            label={t("treatments.duration")}
            type="number"
            inputMode="numeric"
            dir="ltr"
            min={1}
            value={draft.duration}
            onChange={(event) => setDraft({ ...draft, duration: event.target.value })}
          />
        </div>
        <label className="flex min-h-11 items-center gap-2 font-semibold text-text">
          <input
            type="checkbox"
            className="size-5"
            checked={draft.fromPrice}
            onChange={(event) => setDraft({ ...draft, fromPrice: event.target.checked })}
          />
          {t("treatments.from")}
        </label>
        <BilingualField
          id="treatment-note"
          label={t("treatments.priceNote")}
          value={draft.priceNote}
          onChange={(priceNote) => setDraft({ ...draft, priceNote })}
          t={t}
        />
        {departments.length > 0 ? (
          <SelectInput
            id="treatment-department"
            label={t("treatments.department")}
            value={draft.departmentId}
            onChange={(event) => setDraft({ ...draft, departmentId: event.target.value })}
          >
            <option value="">{t("treatments.noDepartment")}</option>
            {departments.map((department) => (
              <option key={department.id} value={department.id}>
                {department.name[locale]}
              </option>
            ))}
          </SelectInput>
        ) : null}
        <SelectInput
          id="treatment-photo"
          label={t("treatments.photo")}
          value={draft.photo}
          onChange={(event) => setDraft({ ...draft, photo: event.target.value })}
        >
          <option value="">{t("treatments.noPhoto")}</option>
          {config.photos
            .filter((photo) => !photo.portrait)
            .map((photo) => (
              <option key={photo.id} value={photo.id}>
                {photo.alt[locale]}
              </option>
            ))}
        </SelectInput>
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
