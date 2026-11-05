import "server-only";
import { connectDb } from "@/shared/db/connect";
import { NotificationModel } from "./model";
import type { NotificationInput } from "./types";

export async function insertNotification(input: NotificationInput): Promise<void> {
  await connectDb();
  await NotificationModel.create(input);
}

export async function listNotifications() {
  await connectDb();
  return NotificationModel.find().sort({ createdAt: -1 }).lean();
}
