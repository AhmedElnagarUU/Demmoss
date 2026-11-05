import type { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label: string;
  hint?: string;
  error?: string;
};

export function AuthField({ id, label, hint, error, ...inputProps }: Props) {
  const describedBy = [hint ? `${id}-hint` : "", error ? `${id}-error` : ""].filter(Boolean).join(" ");
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-semibold text-text">
        {label}
      </label>
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy || undefined}
        className="min-h-11 w-full rounded-control border border-border bg-bg px-3 text-base text-text focus-visible:outline-2 focus-visible:outline-focus"
        {...inputProps}
      />
      {hint ? (
        <p id={`${id}-hint`} className="text-sm text-muted">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p
          id={`${id}-error`}
          role="alert"
          className="border-s-4 border-text ps-2 text-sm font-semibold text-text"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}
