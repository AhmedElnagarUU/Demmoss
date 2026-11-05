"use server";

import { createFeedback } from "./service";
import { feedbackInputSchema, type FeedbackResult } from "./types";
import { z } from "zod";

export async function createFeedbackAction(input: unknown): Promise<FeedbackResult> {
  const parsed = feedbackInputSchema.safeParse(input);
  if (!parsed.success) return { ok: false, errors: z.flattenError(parsed.error).fieldErrors };
  await createFeedback(parsed.data);
  return { ok: true };
}
