"use client";

import { useState, type FormEvent } from "react";
import type { Locale } from "@/shared/i18n/config";
import { formatDate, formatDateTime } from "@/features/demo-engine/format/format";
import { getLogisticsT } from "../../../messages";
import { trackAction } from "../../../track";
import { currentStatus, timelineOf } from "../../../modules/shipments/status";
import { findShipment } from "../../../modules/shipments/tracking";
import { FREIGHT_SLUG } from "../slug";
import { useFreightStore } from "../store";
import { ArrowIcon, CheckCircleIcon } from "./icons";
import { btnPrimary, fieldClass, fieldLabel, panel } from "./styles";

const DEMO_NUMBERS = 3;

// The public tracker in the source's visual language: a tracking number in, the live timeline out.
export function Tracker({ locale }: { locale: Locale }) {
  const t = getLogisticsT(locale);
  const shipments = useFreightStore((state) => state.shipments);
  const [code, setCode] = useState("");
  const [searched, setSearched] = useState<string | null>(null);
  const shipment = searched === null ? undefined : findShipment(shipments, searched);

  function search(value: string) {
    setSearched(value);
    if (findShipment(shipments, value)) trackAction("tracking", FREIGHT_SLUG, locale);
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    search(code);
  }

  return (
    <div className="space-y-5">
      <form onSubmit={submit} className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="grow">
          <label htmlFor="tracking-number" className={fieldLabel}>
            {t("tracker.label")}
          </label>
          <input
            id="tracking-number"
            dir="ltr"
            autoComplete="off"
            placeholder="JC-48213"
            value={code}
            onChange={(event) => setCode(event.target.value)}
            className={`${fieldClass} text-start`}
          />
        </div>
        <button type="submit" className={btnPrimary}>
          {t("tracker.submit")}
          <ArrowIcon className="size-[18px] rtl:rotate-180" />
        </button>
      </form>

      <div className="flex flex-wrap items-center gap-2 text-sm text-muted">
        <span>{t("tracker.hint")}</span>
        {shipments.slice(0, DEMO_NUMBERS).map((item) => (
          <button
            key={item.id}
            type="button"
            dir="ltr"
            onClick={() => {
              setCode(item.trackingNumber);
              search(item.trackingNumber);
            }}
            className="min-h-11 cursor-pointer rounded-full border border-border bg-surface px-3 font-semibold text-text transition-colors duration-200 hover:bg-(--lg-band) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
          >
            {item.trackingNumber}
          </button>
        ))}
      </div>

      <div aria-live="polite">
        {searched !== null && !shipment ? (
          <p role="alert" className="border-s-4 border-text ps-3 font-semibold text-text">
            {t("tracker.notFound", { code: searched.trim() })}
          </p>
        ) : null}

        {shipment ? (
          <section aria-labelledby="tracked-number" className={`${panel} p-6 sm:p-[34px]`}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 id="tracked-number" dir="ltr" className="text-start text-2xl font-semibold text-text">
                {shipment.trackingNumber}
              </h3>
              <p className="rounded-full bg-primary px-3 py-1 text-sm font-semibold text-on-primary">
                {t(`shipmentSteps.${currentStatus(shipment)}.title`)}
              </p>
            </div>

            <dl className="mt-5 grid gap-4 text-text sm:grid-cols-3">
              <div>
                <dt className="text-xs font-medium uppercase tracking-[0.06em] text-muted rtl:normal-case rtl:tracking-normal">
                  {t("tracker.route")}
                </dt>
                <dd className="mt-1">
                  {t("shipments.route", {
                    origin: shipment.origin[locale],
                    destination: shipment.destination[locale],
                  })}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-medium uppercase tracking-[0.06em] text-muted rtl:normal-case rtl:tracking-normal">
                  {t("tracker.cargo")}
                </dt>
                <dd className="mt-1">
                  {shipment.cargo} · {t(`modes.${shipment.mode}`)}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-medium uppercase tracking-[0.06em] text-muted rtl:normal-case rtl:tracking-normal">
                  {t("tracker.eta")}
                </dt>
                <dd className="mt-1">{formatDate(shipment.eta, locale)}</dd>
              </div>
            </dl>

            <ol aria-label={t("tracker.steps")} className="mt-6 space-y-4 border-s-2 border-border ps-6">
              {timelineOf(shipment).map((step) => (
                <li
                  key={step.status}
                  aria-current={step.state === "current" ? "step" : undefined}
                  className={`relative ${step.state === "upcoming" ? "text-muted" : "text-text"}`}
                >
                  <span
                    aria-hidden="true"
                    className={`absolute -start-[1.95rem] top-1.5 grid size-[18px] place-items-center rounded-full border-2 border-primary ${
                      step.state === "upcoming" ? "bg-bg" : "bg-primary"
                    }`}
                  >
                    {step.state === "done" ? <CheckCircleIcon className="size-2.5 text-on-primary" /> : null}
                  </span>
                  <p className="font-semibold">
                    {t(`shipmentSteps.${step.status}.title`)}
                    <span className="sr-only"> · {t(`tracker.${step.state}`)}</span>
                  </p>
                  <p className="mt-0.5 text-sm">
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
