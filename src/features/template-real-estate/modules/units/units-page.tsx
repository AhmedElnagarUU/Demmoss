"use client";

import { useState, type FormEvent } from "react";
import type { HydratableStore } from "@/features/demo-engine/storage/use-hydrated";
import { Button } from "@/shared/ui/button";
import { unitCounts } from "../../availability";
import { useRealEstate } from "../../context";
import { ErrorSummary, PageHeader, Panel, SelectInput, StatusBadge, TextInput, inputClass } from "../../dashboard/ui";
import { trackEdit } from "../../dashboard/track-edit";
import { formatNumber, formatPrice } from "../../format";
import { getRealEstateT } from "../../messages";
import { unitStatuses, type Property } from "../../types";
import type { UnitsActions } from "./store-slice";

export type UnitsStore = HydratableStore &
  (<T>(selector: (state: { properties: Property[] } & UnitsActions) => T) => T);

// Dashboard (developer only): units of each residence and their availability. The site reads the same units.
export function UnitsPage({ store }: { store: UnitsStore }) {
  const { config, locale } = useRealEstate();
  const t = getRealEstateT(locale);
  const properties = store((state) => state.properties);
  const setUnitStatus = store((state) => state.setUnitStatus);
  const updateUnit = store((state) => state.updateUnit);
  const removeUnit = store((state) => state.removeUnit);

  return (
    <div className="space-y-6">
      <PageHeader title={t("units.title")} intro={t("units.intro")} />
      <AddUnitForm store={store} />

      {properties.length === 0 ? <p className="text-muted">{t("properties.empty")}</p> : null}
      {properties.map((property) => {
        const title = property.title[locale];
        const counts = unitCounts(property.units);
        return (
          <Panel key={property.id} title={title}>
            <p className="text-muted">
              {t("units.summary", {
                available: formatNumber(counts.available, locale),
                reserved: formatNumber(counts.reserved, locale),
                sold: formatNumber(counts.sold, locale),
              })}
            </p>
            {property.units.length === 0 ? (
              <p className="text-muted">{t("units.empty")}</p>
            ) : (
              <ul className="divide-y divide-border">
                {property.units.map((unit) => (
                  <li key={unit.id} className="flex flex-wrap items-end gap-3 py-3">
                    <div className="min-w-24">
                      <p className="font-bold text-text">{unit.label}</p>
                      <p className="text-sm text-muted">
                        {t("units.floorSize", {
                          floor: formatNumber(unit.floor, locale),
                          size: formatNumber(unit.size, locale),
                        })}
                      </p>
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor={`price-${unit.id}`} className="block text-sm font-semibold text-text">
                        {t("units.priceOf", { unit: unit.label, residence: title })}
                      </label>
                      <input
                        id={`price-${unit.id}`}
                        key={unit.price}
                        type="number"
                        inputMode="numeric"
                        min={1}
                        dir="ltr"
                        defaultValue={unit.price}
                        className={`${inputClass} w-40`}
                        onBlur={(event) => {
                          const price = Number(event.target.value);
                          if (Number.isInteger(price) && price > 0 && price !== unit.price) {
                            updateUnit(property.id, unit.id, { price });
                            trackEdit("units", config.slug, locale);
                          }
                        }}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor={`status-${unit.id}`} className="block text-sm font-semibold text-text">
                        {t("units.statusOf", { unit: unit.label, residence: title })}
                      </label>
                      <select
                        id={`status-${unit.id}`}
                        className={`${inputClass} w-40`}
                        value={unit.status}
                        onChange={(event) => {
                          const status = unitStatuses.find((item) => item === event.target.value);
                          if (!status) return;
                          setUnitStatus(property.id, unit.id, status);
                          trackEdit("units", config.slug, locale);
                        }}
                      >
                        {unitStatuses.map((status) => (
                          <option key={status} value={status}>
                            {t(`unitStatus.${status}`)}
                          </option>
                        ))}
                      </select>
                    </div>
                    <StatusBadge label={formatPrice(unit.price, locale)} />
                    <Button
                      variant="secondary"
                      aria-label={t("units.removeUnit", { unit: unit.label, residence: title })}
                      onClick={() => {
                        removeUnit(property.id, unit.id);
                        trackEdit("units", config.slug, locale);
                      }}
                    >
                      {t("common.remove")}
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </Panel>
        );
      })}
    </div>
  );
}

function AddUnitForm({ store }: { store: UnitsStore }) {
  const { config, locale } = useRealEstate();
  const t = getRealEstateT(locale);
  const properties = store((state) => state.properties);
  const addUnit = store((state) => state.addUnit);
  const [propertyId, setPropertyId] = useState("");
  const [label, setLabel] = useState("");
  const [floor, setFloor] = useState("0");
  const [size, setSize] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState(false);

  const chosen = properties.find((property) => property.id === propertyId) ?? properties[0];

  function submit(event: FormEvent) {
    event.preventDefault();
    const values = { floor: Number(floor), size: Number(size), price: Number(price) };
    const valid =
      chosen &&
      label.trim() !== "" &&
      Number.isInteger(values.floor) &&
      values.floor >= 0 &&
      values.size > 0 &&
      Number.isInteger(values.price) &&
      values.price > 0;
    if (!chosen || !valid) {
      setError(true);
      return;
    }
    addUnit(chosen.id, { label: label.trim(), status: "available", ...values });
    trackEdit("units", config.slug, locale);
    setError(false);
    setLabel("");
    setSize("");
    setPrice("");
  }

  if (!chosen) return null;
  return (
    <form onSubmit={submit} noValidate>
      <Panel title={t("units.addTitle")}>
        {error ? <ErrorSummary text={t("units.error")} /> : null}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <SelectInput
            id="unit-residence"
            label={t("units.residence")}
            value={chosen.id}
            onChange={(event) => setPropertyId(event.target.value)}
          >
            {properties.map((property) => (
              <option key={property.id} value={property.id}>
                {property.title[locale]}
              </option>
            ))}
          </SelectInput>
          <TextInput id="unit-label" label={t("units.label")} value={label} onChange={(e) => setLabel(e.target.value)} />
          <TextInput
            id="unit-floor"
            label={t("units.floor")}
            type="number"
            min={0}
            value={floor}
            onChange={(e) => setFloor(e.target.value)}
          />
          <TextInput
            id="unit-size"
            label={t("units.size")}
            type="number"
            min={1}
            value={size}
            onChange={(e) => setSize(e.target.value)}
          />
          <TextInput
            id="unit-price"
            label={t("units.price")}
            type="number"
            min={1}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <Button type="submit">{t("units.add")}</Button>
      </Panel>
    </form>
  );
}
