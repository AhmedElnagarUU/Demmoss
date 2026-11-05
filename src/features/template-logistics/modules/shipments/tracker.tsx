"use client";

import { useState, type FormEvent } from "react";
import type { Locale } from "@/shared/i18n/config";
import { Button } from "@/shared/ui/button";
import { formatDate, formatDateTime } from "@/features/demo-engine/format/format";
import { getLogisticsT } from "../../messages";
import { trackAction } from "../../track";
import { currentStatus, timelineOf } from "./status";
import type { TrackerStore } from "./shipments-store";
import { findShipment } from "./tracking";

type Props = { store: TrackerStore; slug: string; locale: Locale };

const DEMO_NUMBERS = 3;

// The public tracker: a tracking number in, the live timeline out. It reads the same store the dashboard writes.
export function Tracker({ store, slug, locale }: Props) {
  const t = getLogisticsT(locale);
  const shipments = store((state) => state.shipments);
  const [code, setCode] = useState("");
  const [searched, setSearched] = useState<string | null>(null);
  const shipment = searched === null ? undefined : findShipment(shipments, searched);

  function search(value: string) {
    setSearched(value);
    if (findShipment(shipments, value)) trackAction("tracking", slug, locale);
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    search(code);
  }

  return (
    <div className="space-y-5">
      <form onSubmit={submit} className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="grow space-y-1.5">
          <label htmlFor="tracking-number" className="block text-sm font-semibold text-text">
            {t("tracker.label")}
          </label>
          <input
            id="tracking-number"
            dir="ltr"
            autoComplete="off"
            placeholder="JC-48213"
            value={code}
            onChange={(event) => setCode(event.target.value)}
            className="min-h-11 w-full rounded-control border border-border bg-bg px-3 py-2 text-base text-text focus-visible:outline-2 focus-visible:outline-focus"
          />
        </div>
        <Button type="submit">{t("tracker.submit")}</Button>
      </form>

      <p className="flex flex-wrap items-center gap-2 text-sm text-muted">
        {t("tracker.hint")}
        {shipments.slice(0, DEMO_NUMBERS).map((item) => (
          <button
            key={item.id}
            type="button"
            dir="ltr"
            onClick={() => {
              setCode(item.trackingNumber);
              search(item.trackingNumber);
            }}
            className="min-h-11 rounded-control border border-border bg-surface px-3 font-semibold text-text hover:bg-border focus-visible:outline-2 focus-visible:outline-focus"
          >
            {item.trackingNumber}
          </button>
        ))}
      </p>

      <div aria-live="polite">
        {searched !== null && !shipment ? (
          <p role="alert" className="border-s-4 border-text ps-3 font-semibold text-text">
            {t("tracker.notFound", { code: searched.trim() })}
          </p>
        ) : null}
        {shipment ? (
          <section
            aria-labelledby="tracked-number"
            className="space-y-4 rounded-control border border-border bg-surface p-5"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 id="tracked-number" dir="ltr" className="text-2xl font-bold text-text">
                {shipment.trackingNumber}
              </h3>
              <p className="rounded-full bg-primary px-3 py-1 text-sm font-bold text-on-primary">
                {t(`shipmentSteps.${currentStatus(shipment)}.title`)}
              </p>
            </div>
            <dl className="grid gap-3 text-text sm:grid-cols-3">
              <div>
                <dt className="text-sm font-semibold text-muted">{t("tracker.route")}</dt>
                <dd>
                  {t("shipments.route", {
                    origin: shipment.origin[locale],
                    destination: shipment.destination[locale],
                  })}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-semibold text-muted">{t("tracker.cargo")}</dt>
                <dd>
                  {shipment.cargo} · {t(`modes.${shipment.mode}`)}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-semibold text-muted">{t("tracker.eta")}</dt>
                <dd>{formatDate(shipment.eta, locale)}</dd>
              </div>
            </dl>
            <ol aria-label={t("tracker.steps")} className="space-y-3 border-s-2 border-border ps-5">
              {timelineOf(shipment).map((step) => (
                <li
                  key={step.status}
                  aria-current={step.state === "current" ? "step" : undefined}
                  className={`relative ${step.state === "upcoming" ? "text-muted" : "text-text"}`}
                >
                  <span
                    aria-hidden="true"
                    className={`absolute -start-[1.85rem] top-1.5 size-3 rounded-full border-2 border-primary ${
                      step.state === "upcoming" ? "bg-bg" : "bg-primary"
                    }`}
                  />
                  <p className="font-bold">
                    {t(`shipmentSteps.${step.status}.title`)}
                    <span className="sr-only"> · {t(`tracker.${step.state}`)}</span>
                  </p>
                  <p className="text-sm">
                    {step.at ? `${formatDateTime(step.at, locale)} · ` : ""}
                    {step.note ?? t(`shipmentSteps.${step.status}.hint`)}
                  </p>
                </li>
              ))}
            </ol>
          </section>
        ) : null}
      </div>
    </div>
  );
}
