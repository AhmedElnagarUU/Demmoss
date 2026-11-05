"use client";

import { useState, type FormEvent } from "react";
import { track } from "@/features/tracking/client/track";
import type { Locale } from "@/shared/i18n/config";
import { Button } from "@/shared/ui/button";
import { getEngineT } from "../messages";
import { setSessionFlag } from "../storage/session-flag";
import { AuthField } from "./auth-field";
import { authTrackData, registerAccount, sessionKey, type RegisterResult } from "./auth";
import type { Account } from "./types";

type Props = { slug: string; locale: Locale; onRegistered: (account: Account) => void };

export function RegisterForm({ slug, locale, onRegistered }: Props) {
  const t = getEngineT(locale);
  const [errors, setErrors] = useState<Extract<RegisterResult, { ok: false }>["errors"]>({});
  const [working, setWorking] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setWorking(true);
    const result = await registerAccount({
      name: String(form.get("name") ?? ""),
      password: String(form.get("password") ?? ""),
      businessName: String(form.get("businessName") ?? ""),
    });
    setWorking(false);
    if (!result.ok) return setErrors(result.errors);
    onRegistered(result.account);
    setSessionFlag(sessionKey(slug), true);
    track("demo_registered", authTrackData(slug, locale));
  }

  return (
    <form onSubmit={submit} noValidate className="mx-auto w-full max-w-md space-y-5 p-6">
      <h1 className="text-2xl font-bold text-text">{t("auth.registerTitle")}</h1>
      <p className="text-muted">{t("auth.registerIntro")}</p>
      <AuthField
        id="register-name"
        name="name"
        label={t("auth.name")}
        autoComplete="off"
        error={errors.name ? t(`auth.errors.${errors.name}`) : undefined}
      />
      <AuthField
        id="register-password"
        name="password"
        type="password"
        label={t("auth.password")}
        autoComplete="new-password"
        error={errors.password ? t(`auth.errors.${errors.password}`) : undefined}
      />
      <AuthField
        id="register-business"
        name="businessName"
        label={t("auth.businessName")}
        hint={t("auth.businessNameHint")}
        autoComplete="off"
      />
      <Button type="submit" disabled={working} className="w-full">
        {working ? t("auth.working") : t("auth.register")}
      </Button>
    </form>
  );
}
