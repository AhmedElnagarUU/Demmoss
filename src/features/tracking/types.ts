import { z } from "zod";
import { locales } from "@/shared/i18n/config";

// Single source: .claude/rules/analytics.md (a contract test keeps both lists equal).
export const eventNames = [
  "page_view",
  "wizard_started",
  "wizard_completed",
  "demo_opened",
  "demo_registered",
  "demo_login",
  "demo_action",
  "content_edited",
  "language_switched",
  "demo_reset",
  "whatsapp_clicked",
  "feedback_sent",
  "guide_quiz_completed",
] as const;

export type EventName = (typeof eventNames)[number];

// Only these small, non-personal keys are accepted. Anything else is rejected (privacy).
export const eventMetaSchema = z
  .object({
    kind: z.string().max(40),
    section: z.string().max(40),
    result: z.string().max(40),
    from: z.enum(locales),
    to: z.enum(locales),
  })
  .partial()
  .strict();

export const visitorSourceSchema = z
  .object({
    utmSource: z.string().max(100),
    utmMedium: z.string().max(100),
    utmCampaign: z.string().max(100),
    referrer: z.string().max(300),
  })
  .partial()
  .strict();

export const eventInputSchema = z
  .object({
    visitorId: z.uuid(),
    name: z.enum(eventNames),
    locale: z.enum(locales),
    page: z.string().startsWith("/").max(300),
    template: z
      .string()
      .regex(/^[a-z0-9-]+$/)
      .max(60)
      .optional(),
    meta: eventMetaSchema.optional(),
    source: visitorSourceSchema.optional(),
  })
  .strict();

export type EventInput = z.infer<typeof eventInputSchema>;
export type EventMeta = z.infer<typeof eventMetaSchema>;
export type VisitorSource = z.infer<typeof visitorSourceSchema>;

export const devices = ["mobile", "tablet", "desktop"] as const;
export type Device = (typeof devices)[number];
