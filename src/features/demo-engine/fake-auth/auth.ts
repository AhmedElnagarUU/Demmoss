import type { Locale } from "@/shared/i18n/config";
import type { Account } from "./types";

export const MIN_PASSWORD_LENGTH = 4;

export async function hashPassword(password: string): Promise<string> {
  const bytes = new TextEncoder().encode(password);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

export type RegisterInput = { name: string; password: string; businessName: string };

export type RegisterResult =
  | { ok: true; account: Account }
  | { ok: false; errors: { name?: "nameRequired"; password?: "passwordTooShort" } };

export async function registerAccount(input: RegisterInput): Promise<RegisterResult> {
  const name = input.name.trim();
  const businessName = input.businessName.trim();
  const errors: Extract<RegisterResult, { ok: false }>["errors"] = {};
  if (!name) errors.name = "nameRequired";
  if (input.password.length < MIN_PASSWORD_LENGTH) errors.password = "passwordTooShort";
  if (errors.name || errors.password) return { ok: false, errors };

  const passwordHash = await hashPassword(input.password);
  return { ok: true, account: { name, passwordHash, ...(businessName ? { businessName } : {}) } };
}

export async function isLoginValid(
  account: Account | null,
  input: { name: string; password: string },
): Promise<boolean> {
  if (!account) return false;
  const sameName = account.name.toLowerCase() === input.name.trim().toLowerCase();
  const samePassword = account.passwordHash === (await hashPassword(input.password));
  return sameName && samePassword;
}

// Only the event context is sent to tracking: never the name, password, or business name.
export function authTrackData(slug: string, locale: Locale) {
  return { template: slug, locale };
}

export function sessionKey(slug: string): string {
  return `demo:session:${slug}`;
}
