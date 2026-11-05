import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import type { LocalizedText } from "@/features/demo-engine/types";
import type { LogisticsTranslate } from "../messages";

// Small form pieces of the logistics dashboard (kept here until a second category needs them).

export const inputClass =
  "min-h-11 w-full rounded-control border border-border bg-bg px-3 py-2 text-base text-text focus-visible:outline-2 focus-visible:outline-focus";

export function PageHeader({ title, intro }: { title: string; intro?: string }) {
  return (
    <header className="mb-6 space-y-1">
      <h1 className="text-2xl font-bold text-text">{title}</h1>
      {intro ? <p className="text-muted">{intro}</p> : null}
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

type LabelProps = { id: string; label: string };

export function Field({ id, label, children }: LabelProps & { children: ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-semibold text-text">
        {label}
      </label>
      {children}
    </div>
  );
}

export function TextInput({ id, label, ...props }: InputHTMLAttributes<HTMLInputElement> & LabelProps) {
  return (
    <Field id={id} label={label}>
      <input id={id} className={inputClass} {...props} />
    </Field>
  );
}

export function TextArea({ id, label, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement> & LabelProps) {
  return (
    <Field id={id} label={label}>
      <textarea id={id} rows={3} className={inputClass} {...props} />
    </Field>
  );
}

export function SelectInput({
  id,
  label,
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & LabelProps & { children: ReactNode }) {
  return (
    <Field id={id} label={label}>
      <select id={id} className={inputClass} {...props}>
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
  t: LogisticsTranslate;
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

export function NumberInput({ id, label, ...props }: InputHTMLAttributes<HTMLInputElement> & LabelProps) {
  return <TextInput id={id} label={label} type="number" inputMode="decimal" dir="ltr" {...props} />;
}

// Number fields keep what the owner types as text until it is saved; this reads it.
export function parseNumber(text: string): number | null {
  if (text.trim() === "") return null;
  const value = Number(text);
  return Number.isFinite(value) ? value : null;
}
