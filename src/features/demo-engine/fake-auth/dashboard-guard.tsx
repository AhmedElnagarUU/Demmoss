"use client";

import type { ReactNode } from "react";
import type { Locale } from "@/shared/i18n/config";
import type { EngineStore } from "../storage/create-template-store";
import { useSessionFlag } from "../storage/session-flag";
import { sessionKey } from "./auth";
import { LoginForm } from "./login-form";
import { RegisterForm } from "./register-form";

type Props = { store: EngineStore; slug: string; locale: Locale; children: ReactNode };

// Wrap it in HydrationGate: the account is only known after the store is loaded.
export function DashboardGuard({ store, slug, locale, children }: Props) {
  const account = store((state) => state.account);
  const setAccount = store((state) => state.setAccount);
  const loggedIn = useSessionFlag(sessionKey(slug));

  if (account && loggedIn) return children;
  if (account) return <LoginForm slug={slug} locale={locale} account={account} />;
  return <RegisterForm slug={slug} locale={locale} onRegistered={setAccount} />;
}
