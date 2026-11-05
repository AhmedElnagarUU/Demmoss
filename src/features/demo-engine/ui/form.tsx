import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import type { LocalizedText } from "../types";

// Form pieces of every template dashboard and public form. Every input has a visible label;
// an error is linked to its input with aria-describedby.

export const inputClass =
  "min-h-11 w-full rounded-control border border-border bg-bg px-3 py-2 text-base text-text focus-visible:outline-2 focus-visible:outline-focus";

type LabelProps = { id: string; label: string; error?: string };

export function Field({ id, label, error, children }: LabelProps & { children: ReactNode }) {
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

export function NumberInput({
  id,
  label,
  error,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & LabelProps) {
  return (
    <TextInput id={id} label={label} error={error} type="number" inputMode="decimal" dir="ltr" {...props} />
  );
}

// Number fields keep what the owner types as text until it is saved; this reads it.
export function parseNumber(text: string): number | null {
  if (text.trim() === "") return null;
  const value = Number(text);
  return Number.isFinite(value) ? value : null;
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
}: SelectHTMLAttributes<HTMLSelectElement> & LabelProps & { children: ReactNode }) {
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
  // the template's translator; only the two language names are read from it
  t: (key: "common.arabic" | "common.english") => string;
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
