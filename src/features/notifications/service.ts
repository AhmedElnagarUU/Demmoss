import "server-only";
import { insertNotification, listNotifications } from "./repository";
import { notificationInputSchema, type NotificationInput } from "./types";

export async function createNotification(input: NotificationInput): Promise<void> {
  await insertNotification(notificationInputSchema.parse(input));
}

export { listNotifications };
