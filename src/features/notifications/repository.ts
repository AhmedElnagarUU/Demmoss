import "server-only";
import { connectDb } from "@/shared/db/connect";
import { NotificationModel } from "./model";
import type { NotificationInput } from "./types";

export async function insertNotification(input: NotificationInput): Promise<void> {
  await connectDb();
  await NotificationModel.create(input);
}

export async function listNotifications(limit = 500) {
  await connectDb();
  return NotificationModel.find().sort({ createdAt: -1, _id: -1 }).limit(limit).lean();
}

export async function countUnreadNotifications(): Promise<number> {
  await connectDb();
  return NotificationModel.countDocuments({ read: false });
}

export async function markNotificationRead(id: string): Promise<void> {
  await connectDb();
  await NotificationModel.updateOne({ _id: id }, { $set: { read: true } });
}

export async function markAllNotificationsRead(): Promise<void> {
  await connectDb();
  await NotificationModel.updateMany({ read: false }, { $set: { read: true } });
}
