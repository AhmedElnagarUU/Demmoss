import type { NotificationType } from "@/features/notifications/types";
import type { Locale } from "@/shared/i18n/config";

export const adminSections = [
  "",
  "leads",
  "visitors",
  "demos",
  "activity",
  "feedback",
  "notifications",
  "login",
] as const;
export type AdminSection = (typeof adminSections)[number];

export function adminPath(locale: Locale, section: AdminSection = "", ...rest: string[]): string {
  return ["", locale, "admin", section, ...rest]
    .filter((part, index) => index === 0 || part !== "")
    .join("/");
}

const notificationSection: Record<NotificationType, AdminSection> = {
  new_lead: "leads",
  demo_registered: "demos",
  demo_action: "demos",
  whatsapp_clicked: "activity",
  feedback: "feedback",
};

// Where a notification leads. Derived from its type, never from a stored URL.
export function adminPathForNotification(type: NotificationType, locale: Locale): string {
  return adminPath(locale, notificationSection[type]);
}
