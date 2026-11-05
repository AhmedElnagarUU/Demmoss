"use server";

import { createLead } from "./service";
import { fieldErrorsOf, leadInputSchema, type CreateLeadResult } from "./types";

export async function createLeadAction(input: unknown): Promise<CreateLeadResult> {
  const parsed = leadInputSchema.safeParse(input);
  if (!parsed.success) return { ok: false, errors: fieldErrorsOf(parsed.error) };
  const { id } = await createLead(parsed.data);
  return { ok: true, id };
}
