"use client";

import { useState, type FormEvent } from "react";
import type { Locale } from "@/shared/i18n/config";
import { Button } from "@/shared/ui/button";
import { PageHeader, Panel, SelectInput, StatusBadge, TextInput } from "../../dashboard/ui";
import { formatDate, formatDateTime } from "../../format";
import { getLogisticsT } from "../../messages";
import { trackEdit } from "../../track";
import { transportModes, type TransportMode } from "../../types";
import { currentStatus, nextStatuses } from "./status";
import type { ShipmentsStore } from "./shipments-store";
import type { Shipment } from "./types";

type Props = { store: ShipmentsStore; slug: string; locale: Locale };

export function ShipmentsPage({ store, slug, locale }: Props) {
  const t = getLogisticsT(locale);
  const shipments = store((state) => state.shipments);

  return (
    <div className="space-y-6">
      <PageHeader title={t("shipments.title")} intro={t("shipments.intro")} />
      <AddShipment store={store} slug={slug} locale={locale} />
      {shipments.length === 0 ? <p className="text-muted">{t("shipments.empty")}</p> : null}
      <ul className="space-y-4">
        {shipments.map((shipment) => (
          <li key={shipment.id}>
            <ShipmentCard shipment={shipment} store={store} slug={slug} locale={locale} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function ShipmentCard({ shipment, store, slug, locale }: { shipment: Shipment } & Props) {
  const t = getLogisticsT(locale);
  const move = store((state) => state.moveShipmentStatus);
  const status = currentStatus(shipment);
  const options = nextStatuses(shipment);
  const [next, setNext] = useState(options[0] ?? status);
  const [note, setNote] = useState("");
  // the choice follows the shipment: after a move, the first later step is offered again
  const chosen = options.includes(next) ? next : (options[0] ?? status);
  const idBase = `ship-${shipment.id}`;

  return (
    <article aria-labelledby={`${idBase}-title`} className="space-y-3 rounded-control border border-border bg-bg p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 id={`${idBase}-title`} className="text-lg font-bold text-text" dir="ltr">
          {shipment.trackingNumber}
        </h2>
        <StatusBadge label={t(`shipmentSteps.${status}.title`)} />
      </div>
      <p className="text-text">
        {shipment.customer} · {t(`modes.${shipment.mode}`)} ·{" "}
        {t("shipments.route", { origin: shipment.origin[locale], destination: shipment.destination[locale] })}
      </p>
      <p className="text-sm text-muted">
        {shipment.cargo} · {t("shipments.eta", { date: formatDate(shipment.eta, locale) })}
      </p>

      {options.length === 0 ? (
        <p className="font-semibold text-text">{t("shipments.final")}</p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
          <SelectInput
            id={`${idBase}-status`}
            label={t("shipments.newStatus")}
            value={chosen}
            onChange={(event) => setNext(event.target.value as typeof chosen)}
          >
            {options.map((option) => (
              <option key={option} value={option}>
                {t(`shipmentSteps.${option}.title`)}
              </option>
            ))}
          </SelectInput>
          <TextInput
            id={`${idBase}-note`}
            label={t("shipments.note")}
            maxLength={120}
            value={note}
            onChange={(event) => setNote(event.target.value)}
          />
          <Button
            aria-label={`${t("shipments.update")}: ${shipment.trackingNumber}`}
            onClick={() => {
              move(shipment.id, chosen, note);
              trackEdit("shipments", slug, locale);
              setNote("");
            }}
          >
            {t("shipments.update")}
          </Button>
        </div>
      )}

      <details>
        <summary className="min-h-11 cursor-pointer py-2 font-semibold text-text focus-visible:outline-2 focus-visible:outline-focus">
          {t("shipments.history")}
        </summary>
        <ol className="space-y-1 pt-1">
          {[...shipment.events].reverse().map((event) => (
            <li key={event.status} className="text-sm text-text">
              <span className="font-semibold">{t(`shipmentSteps.${event.status}.title`)}</span> ·{" "}
              {formatDateTime(event.at, locale)}
              {event.note ? ` · ${event.note}` : ""}
            </li>
          ))}
        </ol>
      </details>
    </article>
  );
}

const ETA_FALLBACK_DAYS = 30;

function AddShipment({ store, slug, locale }: Props) {
  const t = getLogisticsT(locale);
  const rates = store((state) => state.rates);
  const addShipment = store((state) => state.addShipment);
  const newest = store((state) => state.shipments[0]?.trackingNumber ?? "");
  const [customer, setCustomer] = useState("");
  const [cargo, setCargo] = useState("");
  const [originId, setOriginId] = useState(rates.origins[0]?.id ?? "");
  const [destinationId, setDestinationId] = useState(rates.destinations[0]?.id ?? "");
  const [mode, setMode] = useState<TransportMode>("sea");
  const [added, setAdded] = useState<string | null>(null);
  const [now] = useState(() => new Date());
  const canAdd = customer.trim() !== "" && cargo.trim() !== "";

  function submit(event: FormEvent) {
    event.preventDefault();
    const origin = rates.origins.find((item) => item.id === originId);
    const destination = rates.destinations.find((item) => item.id === destinationId);
    if (!canAdd || !origin || !destination) return;
    const modeRate = rates.modes.find((item) => item.mode === mode);
    const days = (modeRate?.daysMax ?? ETA_FALLBACK_DAYS) + destination.extraDays;
    const eta = new Date(now.getTime() + days * 24 * 60 * 60 * 1000).toISOString();
    addShipment({ customer, cargo, mode, origin: origin.name, destination: destination.name, eta });
    trackEdit("shipments", slug, locale);
    setAdded(customer.trim());
    setCustomer("");
    setCargo("");
  }

  return (
    <Panel title={t("shipments.addTitle")}>
      <form onSubmit={submit} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <TextInput
            id="new-ship-customer"
            label={t("shipments.customer")}
            maxLength={80}
            value={customer}
            onChange={(event) => setCustomer(event.target.value)}
          />
          <TextInput
            id="new-ship-cargo"
            label={t("shipments.cargo")}
            maxLength={80}
            value={cargo}
            onChange={(event) => setCargo(event.target.value)}
          />
          <SelectInput
            id="new-ship-origin"
            label={t("shipments.origin")}
            value={originId}
            onChange={(event) => setOriginId(event.target.value)}
          >
            {rates.origins.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name[locale]}
              </option>
            ))}
          </SelectInput>
          <SelectInput
            id="new-ship-destination"
            label={t("shipments.destination")}
            value={destinationId}
            onChange={(event) => setDestinationId(event.target.value)}
          >
            {rates.destinations.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name[locale]}
              </option>
            ))}
          </SelectInput>
          <SelectInput
            id="new-ship-mode"
            label={t("shipments.mode")}
            value={mode}
            onChange={(event) => setMode(event.target.value as TransportMode)}
          >
            {transportModes.map((item) => (
              <option key={item} value={item}>
                {t(`modes.${item}`)}
              </option>
            ))}
          </SelectInput>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button type="submit" disabled={!canAdd}>
            {t("shipments.add")}
          </Button>
          {added ? (
            <p role="status" className="font-semibold text-text">
              {t("shipments.added", { number: newest })}
            </p>
          ) : null}
        </div>
      </form>
    </Panel>
  );
}
