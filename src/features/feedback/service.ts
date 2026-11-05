import "server-only";
import { createNotification } from "@/features/notifications/service";
import { insertFeedback, listFeedback } from "./repository";
import type { FeedbackInput } from "./types";

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
