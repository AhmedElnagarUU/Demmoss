import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import type { LocalizedText } from "@/features/demo-engine/types";
import type { RealEstateTranslate } from "../messages";

// Small form pieces shared by the dashboard and the public forms.

export const inputClass =
  "min-h-11 w-full rounded-control border border-border bg-bg px-3 py-2 text-base text-text focus-visible:outline-2 focus-visible:outline-focus";

export function PageHeader({ title, intro, action }: { title: string; intro?: string; action?: ReactNode }) {
  return (
    <header className="mb-6 flex flex-wrap items-start justify-between gap-3">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-text">{title}</h1>
        {intro ? <p className="text-muted">{intro}</p> : null}
      </div>
      {action}
    </header>
  );
}

export function Panel({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <section className="space-y-4 rounded-control border border-border bg-bg p-4">
      {title ? <h2 className="text-lg font-bold text-text">{title}</h2> : null}
      {children}
    </section>
  );
}

type LabelProps = { id: string; label: string; error?: string };
type FieldProps = LabelProps & { children: ReactNode };

export function Field({ id, label, error, children }: FieldProps) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-semibold text-text">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="text-sm font-semibold text-text">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function errorProps(id: string, error: string | undefined) {
  return error ? { "aria-invalid": true, "aria-describedby": `${id}-error` } : {};
}

export function TextInput({
  id,
  label,
  error,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & LabelProps) {
  return (
    <Field id={id} label={label} error={error}>
      <input id={id} className={inputClass} {...errorProps(id, error)} {...props} />
    </Field>
  );
}

export function TextArea({
  id,
  label,
  error,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement> & LabelProps) {
  return (
    <Field id={id} label={label} error={error}>
      <textarea id={id} rows={3} className={inputClass} {...errorProps(id, error)} {...props} />
    </Field>
  );
}

export function SelectInput({
  id,
  label,
  error,
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & FieldProps) {
  return (
    <Field id={id} label={label} error={error}>
      <select id={id} className={inputClass} {...errorProps(id, error)} {...props}>
        {children}
      </select>
    </Field>
  );
}

type BilingualProps = {
  id: string;
  label: string;
  value: LocalizedText;
  onChange: (value: LocalizedText) => void;
  t: RealEstateTranslate;
  multiline?: boolean;
};

// One text, two inputs: the owner edits Arabic, English, or both.
export function BilingualField({ id, label, value, onChange, t, multiline = false }: BilingualProps) {
  const Input = multiline ? TextArea : TextInput;
  return (
    <fieldset className="space-y-3">
      <legend className="text-sm font-bold text-text">{label}</legend>
      <Input
        id={`${id}-ar`}
        label={`${label} (${t("common.arabic")})`}
        lang="ar"
        dir="rtl"
        value={value.ar}
        onChange={(event) => onChange({ ...value, ar: event.target.value })}
      />
      <Input
        id={`${id}-en`}
        label={`${label} (${t("common.english")})`}
        lang="en"
        dir="ltr"
        value={value.en}
        onChange={(event) => onChange({ ...value, en: event.target.value })}
      />
    </fieldset>
  );
}

export function StatusBadge({ label }: { label: string }) {
  return (
    <span className="inline-block rounded-control border border-border bg-surface px-2 py-0.5 text-sm font-semibold text-text">
      {label}
    </span>
  );
}

export function ErrorSummary({ text }: { text: string }) {
  return (
    <p role="alert" className="border-s-4 border-text ps-2 font-semibold text-text">
      {text}
    </p>
  );
}
