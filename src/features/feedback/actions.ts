"use server";

import { getClientKey } from "@/shared/rate-limit";
import { submitFeedback } from "./service";
import { feedbackInputSchema, type FeedbackResult } from "./types";
import { z } from "zod";

export async function createFeedbackAction(input: unknown): Promise<FeedbackResult> {
  const parsed = feedbackInputSchema.safeParse(input);
  if (!parsed.success) return { ok: false, errors: z.flattenError(parsed.error).fieldErrors };
  const clientKey = await getClientKey();
  const result = await submitFeedback(parsed.data, { clientKey, now: Date.now() });
  if (!result.ok) return { ok: false, rateLimited: true };
  return { ok: true };
}
