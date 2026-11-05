"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { track } from "@/features/tracking/client/track";
import { useRealEstate } from "../context";
import { ErrorSummary, SelectInput, TextArea, TextInput } from "../dashboard/ui";
import { formatPrice } from "../format";
import { getRealEstateT } from "../messages";
import { validateInquiry, type InquiryErrors } from "../modules/inquiries/validate";
import type { InquiryKind } from "../types";
import { pillClasses } from "./site-ui";

type Props = {
  // what a visitor can ask for; the first one is the default
  kinds: readonly InquiryKind[];
  propertyId?: string;
  defaultUnitId?: string;
  idPrefix: string;
  titleId: string;
};

// Questions, valuation and brochure requests: a lead that arrives in the dashboard Inquiries.
export function InquiryForm({ kinds, propertyId, defaultUnitId = "", idPrefix, titleId }: Props) {
  const { store, config, locale } = useRealEstate();
  const t = getRealEstateT(locale);
  const properties = store((state) => state.properties);
  const addInquiry = store((state) => state.addInquiry);

  const [kind, setKind] = useState<InquiryKind>(kinds[0] ?? "question");
  const [unitId, setUnitId] = useState(defaultUnitId);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [done, setDone] = useState(false);

  const property = properties.find((item) => item.id === propertyId);
  const freeUnits = property?.units.filter((unit) => unit.status === "available") ?? [];
  const chosenUnit = freeUnits.some((unit) => unit.id === unitId) ? unitId : "";

  function submit(event: FormEvent) {
    event.preventDefault();
    const found = validateInquiry({ kind, name, phone, message });
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    addInquiry({
      kind,
      name,
      phone,
      message,
      ...(propertyId ? { propertyId } : {}),
      ...(chosenUnit ? { unitId: chosenUnit } : {}),
    });
    track("demo_action", { locale, template: config.slug, meta: { kind: "inquiry" } });
    setDone(true);
  }

  if (done) {
    return (
      <div role="status" className="space-y-4 rounded-control border border-border bg-surface p-6">
        <h3 className="text-xl font-semibold text-text">{t("inquiryForm.doneTitle")}</h3>
        <p className="text-text">{t("inquiryForm.doneText")}</p>
        <Link href={`/${locale}${config.basePath}/dashboard/inquiries`} className={pillClasses.solid}>
          {t("inquiryForm.doneDashboard")}
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate aria-labelledby={titleId} className="space-y-5">
      {Object.keys(errors).length > 0 ? <ErrorSummary text={t("inquiryForm.errorSummary")} /> : null}

      {kinds.length > 1 ? (
        <fieldset className="space-y-2">
          <legend className="text-sm font-semibold text-text">{t("inquiryForm.kind")}</legend>
          <div className="flex flex-wrap gap-2">
            {kinds.map((item) => (
              <label key={item} className="cursor-pointer">
                <input
                  type="radio"
                  name={`${idPrefix}-kind`}
                  value={item}
                  checked={kind === item}
                  onChange={() => setKind(item)}
                  className="peer sr-only"
                />
                <span className="inline-flex min-h-11 items-center rounded-full border border-border px-4 font-semibold text-text peer-checked:border-primary peer-checked:bg-primary peer-checked:text-on-primary peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-focus">
                  {t(`inquiryKind.${item}`)}
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      ) : null}

      {freeUnits.length > 0 ? (
        <SelectInput
          id={`${idPrefix}-unit`}
          label={t("inquiryForm.unit")}
          value={chosenUnit}
          onChange={(event) => setUnitId(event.target.value)}
        >
          <option value="">{t("inquiryForm.noUnit")}</option>
          {freeUnits.map((unit) => (
            <option key={unit.id} value={unit.id}>
              {unit.label} · {formatPrice(unit.price, locale)}
            </option>
          ))}
        </SelectInput>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <TextInput
          id={`${idPrefix}-name`}
          label={t("inquiryForm.name")}
          autoComplete="name"
          value={name}
          error={errors.name ? t("inquiryForm.errors.name") : undefined}
          onChange={(event) => setName(event.target.value)}
        />
        <TextInput
          id={`${idPrefix}-phone`}
          label={t("inquiryForm.phone")}
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          dir="ltr"
          value={phone}
          error={errors.phone ? t("inquiryForm.errors.phone") : undefined}
          onChange={(event) => setPhone(event.target.value)}
        />
      </div>
      <TextArea
        id={`${idPrefix}-message`}
        label={t(kind === "question" ? "inquiryForm.message" : "inquiryForm.messageOptional")}
        maxLength={500}
        value={message}
        error={errors.message ? t("inquiryForm.errors.message") : undefined}
        onChange={(event) => setMessage(event.target.value)}
      />
      <button type="submit" className={pillClasses.line}>
        {t("inquiryForm.submit")}
      </button>
    </form>
  );
}
