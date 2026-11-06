"use server";

import { getClientKey } from "@/shared/rate-limit";
import { submitLead } from "./service";
import { fieldErrorsOf, leadInputSchema, type CreateLeadResult } from "./types";

export async function createLeadAction(input: unknown): Promise<CreateLeadResult> {
  const parsed = leadInputSchema.safeParse(input);
  if (!parsed.success) return { ok: false, errors: fieldErrorsOf(parsed.error) };
  const clientKey = await getClientKey();
  const result = await submitLead(parsed.data, { clientKey, now: Date.now() });
  if (!result.ok) return { ok: false, rateLimited: true };
  return { ok: true, id: result.id };
}
