"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState, type FormEvent, type ReactNode } from "react";
import type { Locale } from "@/shared/i18n/config";
import { formatPrice } from "@/features/demo-engine/format/format";
import { formatNumber } from "../../../format";
import { getLogisticsT } from "../../../messages";
import { validateQuote, type QuoteErrors } from "../../../quotes";
import { trackAction } from "../../../track";
import type { FreightEstimate, ServiceKey } from "../../../types";
import { getFreightT } from "../messages";
import { FREIGHT_SLUG } from "../slug";
import { useFreightStore } from "../store";
import { ArrowIcon, CheckCircleIcon } from "./icons";
import { btnOutline, btnPrimary, fieldClass, fieldLabel } from "./styles";

type Props = {
  locale: Locale;
  dashboardHref: string;
  estimate?: FreightEstimate | null;
  defaultService?: ServiceKey;
};

const cargoKeys = ["general", "electronics", "apparel", "machinery", "fragile"] as const;
const serviceOptions = ["air", "sea", "road", "rail", "not_sure"] as const;

// The quote form of the source: name, phone, email, cargo type, mode, message, one pill and the inline thank-you.
// It keeps the demo's validation and sends the lead (with the estimate, when there is one) to the dashboard.
export function QuoteForm({ locale, dashboardHref, estimate = null, defaultService = "not_sure" }: Props) {
  const t = getFreightT(locale);
  const shared = getLogisticsT(locale);
  const currency = useFreightStore((state) => state.settings.currency);
  const addQuote = useFreightStore((state) => state.addQuote);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [cargo, setCargo] = useState<(typeof cargoKeys)[number]>("general");
  const [mode, setMode] = useState<ServiceKey>(estimate?.mode ?? defaultService);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<QuoteErrors>({});
  const [doneFor, setDoneFor] = useState<string | null>(null);
  const autoMessage = useRef("");

  const summary = useMemo(() => {
    if (!estimate) return "";
    return t("quote.estimateSummary", {
      min: formatPrice(estimate.minCost, currency, locale),
      max: formatPrice(estimate.maxCost, currency, locale),
      weight: formatNumber(estimate.weightKg, locale),
      volume: formatNumber(estimate.volumeCbm, locale),
      origin: estimate.origin[locale],
      destination: estimate.destination[locale],
    });
  }, [estimate, locale, currency, t]);

  // "Get exact quote" fills the mode and the message when the visitor has not typed a message of their own.
  const [appliedSummary, setAppliedSummary] = useState("");
  if (estimate && summary && appliedSummary !== summary) {
    setAppliedSummary(summary);
    setMode(estimate.mode);
    setMessage((current) => (current.trim() === "" || current === autoMessage.current ? summary : current));
  }
  useEffect(() => {
    autoMessage.current = summary;
  }, [summary]);

  function submit(event: FormEvent) {
    event.preventDefault();
    const found = validateQuote({ name, phone, email });
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    const cargoType = t(`quote.cargoOptions.${cargo}`);
    const details = [cargoType, message.trim()].filter(Boolean).join(" — ");
    addQuote({
      name: name.trim(),
      company: "",
      phone: phone.trim(),
      email: email.trim(),
      service: mode,
      message: details.slice(0, 600),
      estimate,
    });
    trackAction("quote", FREIGHT_SLUG, locale);
    setDoneFor(name.trim());
  }

  function restart() {
    setDoneFor(null);
    setName("");
    setPhone("");
    setEmail("");
    setMessage("");
    setMode(estimate?.mode ?? defaultService);
    setErrors({});
  }

  if (doneFor !== null) {
    return (
      <div role="status" className="space-y-4">
        <div className="flex items-start gap-3">
          <CheckCircleIcon className="mt-0.5 size-[22px] shrink-0 text-text" />
          <div>
            <h3 className="text-2xl font-semibold tracking-[-0.02em] text-text">{t("quote.doneTitle")}</h3>
            <p className="mt-1 text-[14.5px] text-muted">{t("quote.doneText", { name: doneFor })}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href={dashboardHref} className={btnPrimary}>
            {t("quote.doneDashboard")}
            <ArrowIcon className="size-[18px] rtl:rotate-180" />
          </Link>
          <button type="button" onClick={restart} className={btnOutline}>
            {t("quote.doneAnother")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="space-y-5">
      {Object.keys(errors).length > 0 ? (
        <p role="alert" className="border-s-4 border-primary ps-2 text-sm font-semibold text-text">
          {t("quote.errorSummary")}
        </p>
      ) : null}

      <div className="grid grid-cols-2 gap-3.5 max-[640px]:grid-cols-1">
        <Field
          label={t("quote.name")}
          htmlFor="quote-name"
          error={errors.name ? t("quote.errors.name") : undefined}
        >
          <input
            id="quote-name"
            autoComplete="name"
            placeholder={t("quote.namePlaceholder")}
            value={name}
            aria-invalid={errors.name ? true : undefined}
            onChange={(event) => setName(event.target.value)}
            className={fieldClass}
          />
        </Field>

        <Field
          label={t("quote.phone")}
          htmlFor="quote-phone"
          error={errors.phone ? t("quote.errors.phone") : undefined}
        >
          <input
            id="quote-phone"
            type="tel"
            inputMode="tel"
            dir="ltr"
            autoComplete="tel"
            placeholder={t("quote.phonePlaceholder")}
            value={phone}
            aria-invalid={errors.phone ? true : undefined}
            onChange={(event) => setPhone(event.target.value)}
            className={`${fieldClass} text-start`}
          />
        </Field>

        <Field
          label={t("quote.email")}
          htmlFor="quote-email"
          error={errors.email ? t("quote.errors.email") : undefined}
          className="col-span-full"
        >
          <input
            id="quote-email"
            type="email"
            inputMode="email"
            dir="ltr"
            autoComplete="email"
            placeholder={t("quote.emailPlaceholder")}
            value={email}
            aria-invalid={errors.email ? true : undefined}
            onChange={(event) => setEmail(event.target.value)}
            className={`${fieldClass} text-start`}
          />
        </Field>

        <Field label={t("quote.cargo")} htmlFor="quote-cargo">
          <select
            id="quote-cargo"
            value={cargo}
            onChange={(event) => setCargo(event.target.value as (typeof cargoKeys)[number])}
            className={fieldClass}
          >
            {cargoKeys.map((key) => (
              <option key={key} value={key}>
                {t(`quote.cargoOptions.${key}`)}
              </option>
            ))}
          </select>
        </Field>

        <Field label={t("quote.mode")} htmlFor="quote-mode">
          <select
            id="quote-mode"
            value={mode}
            onChange={(event) => setMode(event.target.value as ServiceKey)}
            className={fieldClass}
          >
            {serviceOptions.map((key) => (
              <option key={key} value={key}>
                {shared(`services.${key}`)}
              </option>
            ))}
          </select>
        </Field>

        <Field label={t("quote.message")} htmlFor="quote-message" className="col-span-full">
          <textarea
            id="quote-message"
            rows={4}
            maxLength={600}
            placeholder={t("quote.messagePlaceholder")}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            className={`${fieldClass} min-h-[100px] resize-y`}
          />
        </Field>
      </div>

      {estimate ? <p className="text-sm font-medium text-text">{t("quote.estimateAttached")}</p> : null}

      <button type="submit" className={`${btnPrimary} mt-2`}>
        {t("quote.submit")}
        <ArrowIcon className="size-[18px] rtl:rotate-180" />
      </button>
    </form>
  );
}

// One labelled field of the form; the error sits under the input like the rest of the demo forms.
export function Field({
  label,
  htmlFor,
  error,
  dark = false,
  className = "",
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  dark?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <label
        htmlFor={htmlFor}
        className={
          dark
            ? "mb-1.5 block text-[11.5px] font-normal uppercase tracking-[0.06em] text-bg/60 rtl:normal-case rtl:tracking-normal"
            : fieldLabel
        }
      >
        {label}
      </label>
      {children}
      {error ? <p className="mt-1 text-xs font-semibold text-text">{error}</p> : null}
    </div>
  );
}
