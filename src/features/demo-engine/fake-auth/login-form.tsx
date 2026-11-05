"use client";

import { useState, type FormEvent } from "react";
import { track } from "@/features/tracking/client/track";
import type { Locale } from "@/shared/i18n/config";
import { Button } from "@/shared/ui/button";
import { getEngineT } from "../messages";
import { setSessionFlag } from "../storage/session-flag";
import { AuthField } from "./auth-field";
import { authTrackData, isLoginValid, sessionKey } from "./auth";
import type { Account } from "./types";

type Props = { slug: string; locale: Locale; account: Account };

export function LoginForm({ slug, locale, account }: Props) {
  const t = getEngineT(locale);
  const [failed, setFailed] = useState(false);
  const [working, setWorking] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setWorking(true);
    const valid = await isLoginValid(account, {
      name: String(form.get("name") ?? ""),
      password: String(form.get("password") ?? ""),
    });
    setWorking(false);
    setFailed(!valid);
    if (!valid) return;
    setSessionFlag(sessionKey(slug), true);
    track("demo_login", authTrackData(slug, locale));
  }

  return (
    <form onSubmit={submit} noValidate className="mx-auto w-full max-w-md space-y-5 p-6">
      <h1 className="text-2xl font-bold text-text">{t("auth.loginTitle")}</h1>
      <p className="text-muted">{t("auth.loginIntro")}</p>
      <AuthField
        id="login-name"
        name="name"
        label={t("auth.name")}
        autoComplete="username"
        error={failed ? t("auth.errors.wrongCredentials") : undefined}
      />
      <AuthField
        id="login-password"
        name="password"
        type="password"
        label={t("auth.password")}
        autoComplete="current-password"
      />
      <Button type="submit" disabled={working} className="w-full">
        {working ? t("auth.working") : t("auth.login")}
      </Button>
    </form>
  );
}
