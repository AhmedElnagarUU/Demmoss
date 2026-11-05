"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState, type ReactNode } from "react";
import { categories } from "@/features/gallery/categories";
import { track } from "@/features/tracking/client/track";
import { readOrCreateVisitorId } from "@/features/tracking/client/visitor";
import type { Locale } from "@/shared/i18n/config";
import { Button } from "@/shared/ui/button";
import { createLeadAction } from "../actions";
import { getWizardT, type WizardTranslate } from "../messages";
import {
  fieldErrorsOf,
  fieldOther,
  isLeadType,
  leadInputSchema,
  leadTypes,
  type LeadField,
  type LeadFieldErrors,
  type LeadType,
} from "../types";
import { LEAD_SUMMARY_KEY } from "../lead-summary";

type Step = 1 | 2 | 3;

type Draft = {
  type: LeadType | "";
  field: string;
  idea: string;
  name: string;
  whatsapp: string;
  email: string;
};

const emptyDraft: Draft = { type: "", field: "", idea: "", name: "", whatsapp: "", email: "" };

const stepFields: Record<Step, LeadField[]> = {
  1: ["type"],
  2: ["field", "idea"],
  3: ["name", "whatsapp", "email"],
};

const inputClasses =
  "min-h-11 w-full rounded-control border border-border bg-bg px-3 py-2 text-base text-text " +
  "focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-focus " +
  "aria-[invalid=true]:border-red-700";

function visitorIdOfBrowser(): string {
  try {
    return readOrCreateVisitorId(window.localStorage, () => crypto.randomUUID()).visitorId;
  } catch {
    return crypto.randomUUID();
  }
}

function inputOf(draft: Draft, locale: Locale, visitorId: string) {
  return {
    type: draft.type,
    field: draft.type === "business" ? draft.field : undefined,
    idea: draft.idea.trim() || undefined,
    name: draft.name,
    whatsapp: draft.whatsapp,
    email: draft.email.trim() || undefined,
    locale,
    visitorId,
  };
}

function firstStepWithError(errors: LeadFieldErrors): Step {
  const steps: Step[] = [1, 2, 3];
  return steps.find((step) => stepFields[step].some((field) => errors[field])) ?? 3;
}

function errorMessage(field: LeadField, t: WizardTranslate): string {
  switch (field) {
    case "type":
      return t("type.error");
    case "field":
      return t("details.fieldError");
    case "idea":
      return t("details.ideaError");
    case "name":
      return t("contact.nameError");
    case "whatsapp":
      return t("contact.whatsappError");
    case "email":
      return t("contact.emailError");
    default:
      return t("common.serverError");
  }
}

export function LeadForm({ locale }: { locale: Locale }) {
  return (
    <Suspense fallback={null}>
      <LeadSteps locale={locale} />
    </Suspense>
  );
}

function LeadSteps({ locale }: { locale: Locale }) {
  const t = getWizardT(locale);
  const router = useRouter();
  const preselected = useSearchParams().get("type");
  const [draft, setDraft] = useState<Draft>(() =>
    isLeadType(preselected) ? { ...emptyDraft, type: preselected } : emptyDraft,
  );
  const [step, setStep] = useState<Step>(isLeadType(preselected) ? 2 : 1);
  const [errors, setErrors] = useState<LeadFieldErrors>({});
  const [sending, setSending] = useState(false);
  const [serverError, setServerError] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);

  useEffect(() => {
    track("wizard_started", { locale });
  }, [locale]);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    heading.current?.focus();
  }, [step]);

  function change(patch: Partial<Draft>) {
    setDraft((current) => ({ ...current, ...patch }));
    setErrors({});
  }

  function stepErrors(forStep: Step): LeadFieldErrors {
    const result = leadInputSchema.safeParse(inputOf(draft, locale, visitorIdOfBrowser()));
    const all = result.success ? {} : fieldErrorsOf(result.error);
    const own: LeadFieldErrors = {};
    for (const field of stepFields[forStep]) {
      const message = all[field];
      if (message) own[field] = message;
    }
    return own;
  }

  function goNext() {
    const found = stepErrors(step);
    setErrors(found);
    if (Object.keys(found).length === 0) setStep(step === 1 ? 2 : 3);
  }

  function goBack() {
    setErrors({});
    setStep(step === 3 ? 2 : 1);
  }

  async function submit() {
    const found = stepErrors(3);
    if (Object.keys(found).length > 0) {
      setErrors(found);
      return;
    }
    const input = inputOf(draft, locale, visitorIdOfBrowser());
    setSending(true);
    setServerError(false);
    try {
      const result = await createLeadAction(input);
      if (!result.ok) {
        setErrors(result.errors);
        setStep(firstStepWithError(result.errors));
        return;
      }
      track("wizard_completed", { locale });
      sessionStorage.setItem(LEAD_SUMMARY_KEY, JSON.stringify({ name: draft.name.trim(), idea: draft.idea }));
      const query = new URLSearchParams({ type: input.type });
      if (input.field) query.set("field", input.field);
      router.push(`/${locale}/start/result?${query.toString()}`);
    } catch {
      setServerError(true);
    } finally {
      setSending(false);
    }
  }

  const isBusiness = draft.type === "business";
  const title =
    step === 1
      ? t("type.title")
      : step === 3
        ? t("contact.title")
        : isBusiness
          ? t("details.businessTitle")
          : t("details.ideaTitle");

  return (
    <form
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        if (step === 3) void submit();
        else goNext();
      }}
      className="flex flex-col gap-6"
    >
      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted">{t("common.step", { current: String(step), total: "3" })}</p>
        <div className="h-1.5 rounded-full bg-surface" aria-hidden="true">
          <div className="h-full rounded-full bg-primary" style={{ width: `${(step / 3) * 100}%` }} />
        </div>
      </div>

      <h1 ref={heading} tabIndex={-1} className="text-2xl font-bold outline-none sm:text-3xl">
        {title}
      </h1>

      {step === 1 && (
        <TypeStep
          t={t}
          value={draft.type}
          error={errors.type ? errorMessage("type", t) : undefined}
          onChange={(type) => change({ type })}
        />
      )}
      {step === 2 && <DetailsStep t={t} locale={locale} draft={draft} errors={errors} onChange={change} />}
      {step === 3 && <ContactStep t={t} draft={draft} errors={errors} onChange={change} />}

      {serverError && (
        <p role="alert" className="text-sm font-semibold text-red-700">
          {t("common.serverError")}
        </p>
      )}

      <div className="flex flex-wrap gap-3">
        {step > 1 && (
          <Button variant="secondary" onClick={goBack} disabled={sending}>
            {t("common.back")}
          </Button>
        )}
        <Button type="submit" disabled={sending}>
          {step === 3 ? (sending ? t("common.sending") : t("common.submit")) : t("common.next")}
        </Button>
      </div>
    </form>
  );
}

function TypeStep(props: {
  t: WizardTranslate;
  value: Draft["type"];
  error: string | undefined;
  onChange: (type: LeadType) => void;
}) {
  const { t, value, error, onChange } = props;
  return (
    <fieldset className="flex flex-col gap-3" aria-describedby={error ? "type-error" : undefined}>
      <legend className="mb-1 text-base text-muted">{t("type.hint")}</legend>
      {leadTypes.map((type) => (
        <label
          key={type}
          className="flex cursor-pointer items-start gap-3 rounded-control border border-border p-4 has-checked:border-primary has-checked:bg-surface has-focus-visible:outline-2 has-focus-visible:outline-focus"
        >
          <input
            type="radio"
            name="type"
            value={type}
            checked={value === type}
            onChange={() => onChange(type)}
            className="mt-1 size-4 accent-primary"
          />
          <span className="flex flex-col gap-1">
            <span className="font-semibold">{t(`type.${type}.label`)}</span>
            <span className="text-sm text-muted">{t(`type.${type}.hint`)}</span>
          </span>
        </label>
      ))}
      {error && <FieldError id="type-error">{error}</FieldError>}
    </fieldset>
  );
}

type StepProps = {
  t: WizardTranslate;
  draft: Draft;
  errors: LeadFieldErrors;
  onChange: (patch: Partial<Draft>) => void;
};

function DetailsStep({ t, locale, draft, errors, onChange }: StepProps & { locale: Locale }) {
  if (draft.type !== "business") {
    return (
      <div className="flex flex-col gap-2">
        <p className="text-base text-muted">{t("details.ideaHint")}</p>
        <Field id="idea" label={t("details.ideaLabel")} error={errors.idea && errorMessage("idea", t)}>
          <textarea
            id="idea"
            rows={6}
            value={draft.idea}
            onChange={(event) => onChange({ idea: event.target.value })}
            aria-invalid={Boolean(errors.idea)}
            aria-describedby={errors.idea ? "idea-error" : undefined}
            className={inputClasses}
          />
        </Field>
      </div>
    );
  }

  const isOtherField = draft.field === fieldOther;
  return (
    <div className="flex flex-col gap-5">
      <Field id="field" label={t("details.fieldLabel")} error={errors.field && errorMessage("field", t)}>
        <select
          id="field"
          value={draft.field}
          onChange={(event) => onChange({ field: event.target.value })}
          aria-invalid={Boolean(errors.field)}
          aria-describedby={errors.field ? "field-error" : undefined}
          className={inputClasses}
        >
          <option value="">{t("details.fieldPlaceholder")}</option>
          {categories.map((category) => (
            <option key={category.slug} value={category.slug}>
              {category.name[locale]}
            </option>
          ))}
          <option value={fieldOther}>{t("details.fieldOther")}</option>
        </select>
      </Field>
      <Field
        id="idea"
        label={
          isOtherField ? t("details.otherFieldLabel") : `${t("details.noteLabel")} (${t("common.optional")})`
        }
        error={errors.idea && errorMessage("idea", t)}
      >
        <textarea
          id="idea"
          rows={4}
          value={draft.idea}
          onChange={(event) => onChange({ idea: event.target.value })}
          aria-invalid={Boolean(errors.idea)}
          aria-describedby={errors.idea ? "idea-error" : undefined}
          className={inputClasses}
        />
      </Field>
    </div>
  );
}

function ContactStep({ t, draft, errors, onChange }: StepProps) {
  return (
    <div className="flex flex-col gap-5">
      <p className="text-base text-muted">{t("contact.hint")}</p>
      <Field id="name" label={t("contact.nameLabel")} error={errors.name && errorMessage("name", t)}>
        <input
          id="name"
          type="text"
          autoComplete="name"
          value={draft.name}
          onChange={(event) => onChange({ name: event.target.value })}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
          className={inputClasses}
        />
      </Field>
      <Field
        id="whatsapp"
        label={t("contact.whatsappLabel")}
        hint={t("contact.whatsappHint")}
        error={errors.whatsapp && errorMessage("whatsapp", t)}
      >
        <input
          id="whatsapp"
          type="tel"
          inputMode="tel"
          dir="ltr"
          autoComplete="tel"
          value={draft.whatsapp}
          onChange={(event) => onChange({ whatsapp: event.target.value })}
          aria-invalid={Boolean(errors.whatsapp)}
          aria-describedby={errors.whatsapp ? "whatsapp-hint whatsapp-error" : "whatsapp-hint"}
          className={`${inputClasses} text-start`}
        />
      </Field>
      <Field
        id="email"
        label={`${t("contact.emailLabel")} (${t("common.optional")})`}
        error={errors.email && errorMessage("email", t)}
      >
        <input
          id="email"
          type="email"
          dir="ltr"
          autoComplete="email"
          value={draft.email}
          onChange={(event) => onChange({ email: event.target.value })}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
          className={`${inputClasses} text-start`}
        />
      </Field>
    </div>
  );
}

function Field(props: { id: string; label: string; hint?: string; error?: string; children: ReactNode }) {
  const { id, label, hint, error, children } = props;
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-base font-semibold">
        {label}
      </label>
      {hint && (
        <p id={`${id}-hint`} className="text-sm text-muted">
          {hint}
        </p>
      )}
      {children}
      {error && <FieldError id={`${id}-error`}>{error}</FieldError>}
    </div>
  );
}

function FieldError({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={id} role="alert" className="text-sm font-semibold text-red-700">
      {children}
    </p>
  );
}
