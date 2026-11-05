"use client";

import { useActionState } from "react";
import { Button } from "@/shared/ui/button";
import { loginAction } from "../actions";
import type { LoginResult } from "../types";
import { inputClasses } from "./styles";

type Props = {
  locale: string;
  labels: {
    email: string;
    password: string;
    submit: string;
    invalidInput: string;
    invalidCredentials: string;
  };
};

export function LoginForm({ locale, labels }: Props) {
  const [result, formAction, pending] = useActionState<LoginResult, FormData>(loginAction, null);
  const error = result?.error === "invalid_input" ? labels.invalidInput : labels.invalidCredentials;

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <input type="hidden" name="locale" value={locale} />
      <label className="flex flex-col gap-1 text-base font-semibold text-text">
        {labels.email}
        <input
          name="email"
          type="email"
          autoComplete="username"
          required
          aria-invalid={result ? true : undefined}
          className={`${inputClasses} font-normal`}
        />
      </label>
      <label className="flex flex-col gap-1 text-base font-semibold text-text">
        {labels.password}
        <input
          name="password"
          type="password"
          autoComplete="current-password"
          required
          aria-invalid={result ? true : undefined}
          className={`${inputClasses} font-normal`}
        />
      </label>
      {result ? (
        <p role="alert" className="text-base font-semibold text-danger">
          {error}
        </p>
      ) : null}
      <Button type="submit" disabled={pending}>
        {labels.submit}
      </Button>
    </form>
  );
}
