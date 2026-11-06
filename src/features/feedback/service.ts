import "server-only";
import { createNotification } from "@/features/notifications/service";
import { checkRateLimit } from "@/shared/rate-limit";
import { insertFeedback, listFeedback } from "./repository";
import type { FeedbackInput } from "./types";

const feedbackRateLimit = { limit: 5, windowMs: 60 * 60 * 1000 };

export type SubmitFeedbackResult = { ok: true } | { ok: false; reason: "rate_limited" };

export async function submitFeedback(
  input: FeedbackInput,
  request: { clientKey: string | null; now: number },
): Promise<SubmitFeedbackResult> {
  if (
    request.clientKey &&
    !checkRateLimit(`feedback:${request.clientKey}`, { ...feedbackRateLimit, now: request.now }).allowed
  ) {
    return { ok: false, reason: "rate_limited" };
  }
  await createFeedback(input);
  return { ok: true };
}

export async function createFeedback(input: FeedbackInput): Promise<void> {
  await insertFeedback(input);
  await createNotification({
    type: "feedback",
    title: `New feedback from ${input.page}`,
    template: input.template,
  });
}

export { listFeedback };
export { countFeedback, markFeedbackRead } from "./repository";
