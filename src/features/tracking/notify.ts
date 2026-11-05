import type { NotificationInput } from "@/features/notifications/types";
import type { EventInput } from "./types";

// Leads and feedback are notified by their own services (they know the saved item).
export function notificationForEvent(event: EventInput): NotificationInput | null {
  const template = event.template ?? "unknown template";
  switch (event.name) {
    case "demo_registered":
      return { type: "demo_registered", title: `New demo account in ${template}`, template: event.template };
    case "demo_action":
      return {
        type: "demo_action",
        title: `New ${event.meta?.kind ?? "action"} in ${template}`,
        template: event.template,
      };
    case "whatsapp_clicked":
      return {
        type: "whatsapp_clicked",
        title: `WhatsApp clicked on ${event.page}`,
        template: event.template,
      };
    default:
      return null;
  }
}
