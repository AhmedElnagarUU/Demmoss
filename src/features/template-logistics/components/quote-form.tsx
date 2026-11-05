"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import type { Locale } from "@/shared/i18n/config";
import { Button } from "@/shared/ui/button";
import { buttonClasses } from "@/shared/ui/button-styles";
import { SelectInput, TextArea, TextInput } from "../dashboard/ui";
import type { LogisticsStore } from "../logistics-store";
import { getLogisticsT } from "../messages";
import { validateQuote, type QuoteErrors } from "../quotes";
import { trackAction } from "../track";
import type { Estimate, ServiceKey } from "../types";

type Props = {
  store: LogisticsStore;
  slug: string;
  locale: Locale;
  dashboardHref: string;
  services: readonly ServiceKey[];
  // the service chosen until the visitor picks another one
  defaultService: ServiceKey;
  // the calculator or estimator result that goes with the request
  estimate: Estimate | null;
};

// The quote request form: the lead of both variants. The estimate the visitor just made is attached to it.
export function QuoteForm({ store, slug, locale, dashboardHref, services, defaultService, estimate }: Props) {
  const t = getLogisticsT(locale);
  const addQuote = store((state) => state.addQuote);

  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [chosenService, setChosenService] = useState<ServiceKey | null>(null);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<QuoteErrors>({});
  const [doneFor, setDoneFor] = useState<string | null>(null);
  const service = chosenService ?? defaultService;

  function submit(event: FormEvent) {
    event.preventDefault();
    const found = validateQuote({ name, phone, email });
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    addQuote({ name, company, phone, email, service, message: message.trim(), estimate });
    trackAction("quote", slug, locale);
    setDoneFor(name.trim());
  }

  if (doneFor !== null) {
    return (
      <div role="status" className="space-y-4 rounded-control border border-border bg-surface p-6">
        <h2 className="text-2xl font-bold text-text">{t("quoteForm.doneTitle")}</h2>
        <p className="text-text">{t("quoteForm.doneText", { name: doneFor })}</p>
        <div className="flex flex-wrap gap-3">
          <Link href={dashboardHref} className={buttonClasses("primary")}>
            {t("quoteForm.doneDashboard")}
          </Link>
          <Button
            variant="secondary"
            onClick={() => {
              setDoneFor(null);
              setName("");
              setCompany("");
              setPhone("");
              setEmail("");
              setMessage("");
            }}
          >
            {t("quoteForm.doneAnother")}
          </Button>
        </div>
      </div>
    );
  }

  const errorText = (field: keyof QuoteErrors) =>
    errors[field] ? t(`quoteForm.errors.${field}`) : undefined;

  return (
    <form onSubmit={submit} noValidate className="space-y-5">
      {Object.keys(errors).length > 0 ? (
        <p role="alert" className="border-s-4 border-text ps-2 font-semibold text-text">
          {t("quoteForm.errorSummary")}
        </p>
      ) : null}
      {estimate ? <p className="font-semibold text-text">{t("quoteForm.estimateAttached")}</p> : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <TextInput
            id="quote-name"
            label={t("quoteForm.name")}
            autoComplete="name"
            value={name}
            aria-invalid={errors.name ? true : undefined}
            onChange={(event) => setName(event.target.value)}
          />
          {errors.name ? <FieldError text={errorText("name")} /> : null}
        </div>
        <TextInput
          id="quote-company"
          label={t("quoteForm.company")}
          autoComplete="organization"
          value={company}
          onChange={(event) => setCompany(event.target.value)}
        />
        <div className="space-y-1.5">
          <TextInput
            id="quote-phone"
            label={t("quoteForm.phone")}
            type="tel"
            dir="ltr"
            autoComplete="tel"
            value={phone}
            aria-invalid={errors.phone ? true : undefined}
            onChange={(event) => setPhone(event.target.value)}
          />
          {errors.phone ? <FieldError text={errorText("phone")} /> : null}
        </div>
        <div className="space-y-1.5">
          <TextInput
            id="quote-email"
            label={t("quoteForm.email")}
            type="email"
            dir="ltr"
            autoComplete="email"
            value={email}
            aria-invalid={errors.email ? true : undefined}
            onChange={(event) => setEmail(event.target.value)}
          />
          {errors.email ? <FieldError text={errorText("email")} /> : null}
        </div>
        <SelectInput
          id="quote-service"
          label={t("quoteForm.service")}
          value={service}
          onChange={(event) => setChosenService(event.target.value as ServiceKey)}
        >
          {services.map((item) => (
            <option key={item} value={item}>
              {t(`services.${item}`)}
            </option>
          ))}
        </SelectInput>
      </div>

      <TextArea
        id="quote-message"
        label={t("quoteForm.message")}
        value={message}
        maxLength={600}
        onChange={(event) => setMessage(event.target.value)}
      />

      <Button type="submit" className="w-full sm:w-auto">
        {t("quoteForm.submit")}
      </Button>
    </form>
  );
}

function FieldError({ text }: { text: string | undefined }) {
  return <p className="border-s-4 border-text ps-2 text-sm font-semibold text-text">{text}</p>;
}
