import "server-only";
import { connectDb } from "@/shared/db/connect";
import { FeedbackModel } from "./model";
import type { FeedbackInput } from "./types";

export async function insertFeedback(input: FeedbackInput): Promise<void> {
  await connectDb();
  await FeedbackModel.create(input);
}

export async function listFeedback() {
  await connectDb();
  return FeedbackModel.find().sort({ createdAt: -1, _id: -1 }).lean();
}

export async function countFeedback(): Promise<{ total: number; unread: number }> {
  await connectDb();
  const [total, unread] = await Promise.all([
    FeedbackModel.countDocuments(),
    FeedbackModel.countDocuments({ read: false }),
  ]);
  return { total, unread };
}

export async function markFeedbackRead(id: string): Promise<void> {
  await connectDb();
  await FeedbackModel.updateOne({ _id: id }, { $set: { read: true } });
}
