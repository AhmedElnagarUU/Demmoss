import { z } from "zod";
import { locales } from "@/shared/i18n/config";

export const feedbackInputSchema = z
  .object({
    visitorId: z.uuid(),
    message: z.string().trim().min(3).max(1000),
    contact: z
      .string()
      .trim()
      .max(200)
      .optional()
      .transform((contact) => contact || undefined),
    page: z.string().startsWith("/").max(300),
    template: z
      .string()
      .regex(/^[a-z0-9-]+$/)
      .max(60)
      .optional(),
    locale: z.enum(locales),
  })
  .strict();

export type FeedbackInput = z.infer<typeof feedbackInputSchema>;

export type FeedbackResult = { ok: true } | { ok: false; errors: Record<string, string[] | undefined> };
