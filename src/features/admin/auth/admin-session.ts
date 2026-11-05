import "server-only";
import { cookies } from "next/headers";
import { getAdminEnv } from "@/shared/env.server";
import { verifyPassword } from "./password";
import {
  SESSION_COOKIE,
  SESSION_MAX_AGE_SECONDS,
  signSession,
  verifySession,
  type AdminSession,
} from "./session";

export class AdminAuthError extends Error {
  constructor() {
    super("Admin session required");
  }
}

export async function getAdminSession(): Promise<AdminSession | null> {
  const env = getAdminEnv();
  const store = await cookies();
  const session = verifySession(store.get(SESSION_COOKIE)?.value, env.SESSION_SECRET, new Date());
  return session?.email === env.ADMIN_EMAIL ? session : null;
}

// Every admin read and update calls this first: a layout redirect alone is not enough.
export async function requireAdmin(): Promise<AdminSession> {
  const session = await getAdminSession();
  if (!session) throw new AdminAuthError();
  return session;
}

export function credentialsAreValid(email: string, password: string): boolean {
  const env = getAdminEnv();
  // The password is always checked, so a wrong email and a wrong password take the same time.
  const passwordMatches = verifyPassword(password, env.ADMIN_PASSWORD_HASH);
  return passwordMatches && email.trim().toLowerCase() === env.ADMIN_EMAIL.toLowerCase();
}

export async function startAdminSession(): Promise<void> {
  const env = getAdminEnv();
  const store = await cookies();
  store.set(SESSION_COOKIE, signSession(env.ADMIN_EMAIL, env.SESSION_SECRET, new Date()), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
}

export async function endAdminSession(): Promise<void> {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
}
