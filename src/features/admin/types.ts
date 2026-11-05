import { z } from "zod";
import { notificationTypes } from "@/features/notifications/types";
import { leadStatuses } from "@/features/wizard/types";
import { locales } from "@/shared/i18n/config";

const locale = z.enum(locales);
export const objectIdSchema = z.string().regex(/^[a-f0-9]{24}$/);

export const loginInputSchema = z.object({
  email: z.string().trim().min(1).max(200),
  password: z.string().min(1).max(200),
  locale,
});

export type LoginResult = { error: "invalid_input" | "invalid_credentials" } | null;

export const localeInputSchema = z.object({ locale });

export const leadStatusInputSchema = z.object({ id: objectIdSchema, status: z.enum(leadStatuses), locale });

export const leadNotesInputSchema = z.object({
  id: objectIdSchema,
  notes: z.string().trim().max(2000),
  locale,
});

export const markFeedbackReadInputSchema = z.object({ id: objectIdSchema, locale });

export const openNotificationInputSchema = z.object({
  id: objectIdSchema,
  type: z.enum(notificationTypes),
  locale,
});

export const visitorIdSchema = z.uuid();
