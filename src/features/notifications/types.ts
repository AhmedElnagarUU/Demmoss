import { z } from "zod";

export const notificationTypes = [
  "new_lead",
  "demo_registered",
  "demo_action",
  "whatsapp_clicked",
  "feedback",
] as const;

export type NotificationType = (typeof notificationTypes)[number];

export const notificationInputSchema = z.object({
  type: z.enum(notificationTypes),
  title: z.string().min(1).max(200),
  template: z.string().optional(),
  link: z.string().optional(),
});

export type NotificationInput = z.infer<typeof notificationInputSchema>;
