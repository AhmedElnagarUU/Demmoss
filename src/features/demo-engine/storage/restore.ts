import type { z } from "zod";
import { accountSchema, type Account } from "../fake-auth/types";

export type DemoData = { account: Account | null };

export function accountOf(saved: unknown): Account | null {
  if (typeof saved !== "object" || saved === null || !("account" in saved)) return null;
  const parsed = accountSchema.safeParse(saved.account);
  return parsed.success ? parsed.data : null;
}

export function resetKeepingAccount<D extends DemoData>(
  createSeed: (now: Date) => D,
  now: Date,
  saved: unknown,
): D {
  return { ...createSeed(now), account: accountOf(saved) };
}

// Valid saved data is kept. Missing or invalid data becomes a fresh seed (keeping a readable account).
export function restoreState<D extends DemoData>(
  saved: unknown,
  schema: z.ZodType<D>,
  createSeed: (now: Date) => D,
  now: Date,
): D {
  const parsed = schema.safeParse(saved);
  return parsed.success ? parsed.data : resetKeepingAccount(createSeed, now, saved);
}
