"use client";

import { useState } from "react";
import type { LocalizedText } from "@/features/demo-engine/types";
import type { Locale } from "@/shared/i18n/config";
import { Button } from "@/shared/ui/button";
import { BilingualField, PageHeader, Panel, TextInput } from "@/features/demo-engine/ui";
import { trackEdit } from "@/features/demo-engine/track-edit";
import { formatPrice } from "@/features/demo-engine/format/format";
import { getRestaurantT } from "../../messages";
import type { OrderingStore } from "../orders/orders-store";
import type { NewArea } from "./store-slice";

type Props = { store: OrderingStore; slug: string; locale: Locale };

const emptyText: LocalizedText = { ar: "", en: "" };

// Delivery areas: each has a fee and a minimum order. The checkout applies them, so there are fewer questions.
export function AreasPage({ store, slug, locale }: Props) {
  const t = getRestaurantT(locale);
  const areas = store((state) => state.areas);
  const currency = store((state) => state.settings.currency);
  const addArea = store((state) => state.addArea);
  const updateArea = store((state) => state.updateArea);
  const removeArea = store((state) => state.removeArea);
  const [editing, setEditing] = useState("");
  const [adding, setAdding] = useState(false);

  return (
    <div className="space-y-6">
      <PageHeader title={t("areas.title")} intro={t("areas.intro")} />

      {adding ? (
        <Panel title={t("areas.newTitle")}>
          <AreaForm
            idPrefix="area-new"
            initial={{ name: emptyText, fee: 0, minOrder: 0 }}
            locale={locale}
            onSave={(area) => {
              addArea(area);
              trackEdit("areas", slug, locale);
              setAdding(false);
            }}
            onCancel={() => setAdding(false)}
          />
        </Panel>
      ) : (
        <Button onClick={() => setAdding(true)}>{t("areas.add")}</Button>
      )}

      {areas.length === 0 ? <p className="text-muted">{t("areas.empty")}</p> : null}

      <ul className="space-y-3">
        {areas.map((area) => {
          const name = area.name[locale];
          return (
            <li key={area.id} className="space-y-3 rounded-control border border-border bg-bg p-4">
              {editing === area.id ? (
                <AreaForm
                  idPrefix={`area-${area.id}`}
                  initial={area}
                  locale={locale}
                  onSave={(patch) => {
                    updateArea(area.id, patch);
                    trackEdit("areas", slug, locale);
                    setEditing("");
                  }}
                  onCancel={() => setEditing("")}
                />
              ) : (
                <>
                  <h2 className="text-lg font-bold">{name}</h2>
                  <p className="text-muted">
                    {t("areas.summary", {
                      fee: formatPrice(area.fee, currency, locale),
                      minimum: formatPrice(area.minOrder, currency, locale),
                    })}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="secondary"
                      aria-label={`${t("common.edit")}: ${name}`}
                      onClick={() => setEditing(area.id)}
                    >
                      {t("common.edit")}
                    </Button>
                    <Button
                      variant="secondary"
                      aria-label={`${t("common.delete")}: ${name}`}
                      onClick={() => {
                        removeArea(area.id);
                        trackEdit("areas", slug, locale);
                      }}
                    >
                      {t("common.delete")}
                    </Button>
                  </div>
                </>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

type FormProps = {
  idPrefix: string;
  initial: NewArea;
  locale: Locale;
  onSave: (area: NewArea) => void;
  onCancel: () => void;
};

function AreaForm({ idPrefix, initial, locale, onSave, onCancel }: FormProps) {
  const t = getRestaurantT(locale);
  const [draft, setDraft] = useState(initial);
  const [error, setError] = useState(false);

  function save() {
    if (draft.name.ar.trim() === "" && draft.name.en.trim() === "") {
      setError(true);
      return;
    }
    setError(false);
    const safe = (value: number) => (Number.isFinite(value) ? Math.max(0, value) : 0);
    onSave({ ...draft, fee: safe(draft.fee), minOrder: safe(draft.minOrder) });
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        save();
      }}
      className="space-y-4"
    >
      <BilingualField
        id={`${idPrefix}-name`}
        label={t("areas.name")}
        value={draft.name}
        onChange={(name) => setDraft({ ...draft, name })}
        t={t}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <TextInput
          id={`${idPrefix}-fee`}
          label={t("areas.fee")}
          type="number"
          min={0}
          step="0.5"
          value={draft.fee}
          onChange={(event) => setDraft({ ...draft, fee: event.target.valueAsNumber })}
        />
        <TextInput
          id={`${idPrefix}-min`}
          label={t("areas.minOrder")}
          type="number"
          min={0}
          step="0.5"
          value={draft.minOrder}
          onChange={(event) => setDraft({ ...draft, minOrder: event.target.valueAsNumber })}
        />
      </div>
      {error ? (
        <p role="alert" className="border-s-4 border-text ps-2 font-semibold">
          {t("areas.error")}
        </p>
      ) : null}
      <div className="flex gap-2">
        <Button type="submit">{t("common.save")}</Button>
        <Button variant="secondary" onClick={onCancel}>
          {t("common.cancel")}
        </Button>
      </div>
    </form>
  );
}
