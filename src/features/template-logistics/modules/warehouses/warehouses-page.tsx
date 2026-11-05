"use client";

import { useState } from "react";
import type { Locale } from "@/shared/i18n/config";
import { Button } from "@/shared/ui/button";
import { BilingualField, NumberInput, PageHeader, Panel, parseNumber } from "../../dashboard/ui";
import { formatNumber } from "../../format";
import { getLogisticsT } from "../../messages";
import { trackEdit } from "../../track";
import { freePallets, occupancyPercent } from "./availability";
import type { WarehousesStore } from "./warehouses-store";
import type { Warehouse } from "./types";

type Props = { store: WarehousesStore; slug: string; locale: Locale };

export function WarehousesPage({ store, slug, locale }: Props) {
  const t = getLogisticsT(locale);
  const warehouses = store((state) => state.warehouses);
  const [savedId, setSavedId] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <PageHeader title={t("warehouses.title")} intro={t("warehouses.intro")} />
      <ul className="space-y-4">
        {warehouses.map((warehouse) => (
          // the form restarts from the saved warehouse after a save or a reset
          <li key={`${warehouse.id}:${JSON.stringify(warehouse)}`}>
            <WarehouseForm
              warehouse={warehouse}
              store={store}
              slug={slug}
              locale={locale}
              saved={savedId === warehouse.id}
              onSaved={() => setSavedId(warehouse.id)}
              onEdited={() => setSavedId(null)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

type FormProps = Props & { warehouse: Warehouse; saved: boolean; onSaved: () => void; onEdited: () => void };

function WarehouseForm({ warehouse, store, slug, locale, saved, onSaved, onEdited }: FormProps) {
  const t = getLogisticsT(locale);
  const update = store((state) => state.updateWarehouse);
  const [name, setName] = useState(warehouse.name);
  const [address, setAddress] = useState(warehouse.address);
  const [capacity, setCapacity] = useState(String(warehouse.capacityPallets));
  const [occupied, setOccupied] = useState(String(warehouse.occupiedPallets));
  const [area, setArea] = useState(String(warehouse.areaM2));
  const [invalid, setInvalid] = useState(false);
  const idBase = `wh-${warehouse.id}`;

  function save() {
    const capacityPallets = parseNumber(capacity);
    const occupiedPallets = parseNumber(occupied);
    const areaM2 = parseNumber(area);
    const valid =
      capacityPallets !== null &&
      Number.isInteger(capacityPallets) &&
      capacityPallets >= 1 &&
      occupiedPallets !== null &&
      Number.isInteger(occupiedPallets) &&
      occupiedPallets >= 0 &&
      areaM2 !== null &&
      Number.isInteger(areaM2) &&
      areaM2 >= 1;
    setInvalid(!valid);
    if (!valid) return;
    update(warehouse.id, { name, address, capacityPallets, occupiedPallets, areaM2 });
    trackEdit("warehouses", slug, locale);
    onSaved();
  }

  const edited = (action: () => void) => () => {
    action();
    onEdited();
  };

  return (
    <Panel title={warehouse.name[locale]}>
      <p className="font-semibold text-text">
        {t("warehouses.free", { count: formatNumber(freePallets(warehouse), locale) })} ·{" "}
        {t("warehouses.occupancy", { percent: formatNumber(occupancyPercent(warehouse), locale) })}
      </p>
      <BilingualField id={`${idBase}-name`} label={t("warehouses.name")} value={name} onChange={(v) => edited(() => setName(v))()} t={t} />
      <BilingualField
        id={`${idBase}-address`}
        label={t("warehouses.address")}
        value={address}
        onChange={(v) => edited(() => setAddress(v))()}
        t={t}
      />
      <div className="grid gap-4 sm:grid-cols-3">
        <NumberInput
          id={`${idBase}-capacity`}
          label={t("warehouses.capacity")}
          min={1}
          value={capacity}
          onChange={(event) => edited(() => setCapacity(event.target.value))()}
        />
        <NumberInput
          id={`${idBase}-occupied`}
          label={t("warehouses.occupied")}
          min={0}
          value={occupied}
          onChange={(event) => edited(() => setOccupied(event.target.value))()}
        />
        <NumberInput
          id={`${idBase}-area`}
          label={t("warehouses.area")}
          min={1}
          value={area}
          onChange={(event) => edited(() => setArea(event.target.value))()}
        />
      </div>
      {invalid ? (
        <p role="alert" className="border-s-4 border-text ps-2 font-semibold text-text">
          {t("warehouses.invalid")}
        </p>
      ) : null}
      <div className="flex flex-wrap items-center gap-3">
        <Button aria-label={`${t("warehouses.save")}: ${warehouse.name[locale]}`} onClick={save}>
          {t("warehouses.save")}
        </Button>
        {saved ? (
          <p role="status" className="font-semibold text-text">
            {t("common.saved")}
          </p>
        ) : null}
      </div>
    </Panel>
  );
}
