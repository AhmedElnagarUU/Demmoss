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
  return FeedbackModel.find().sort({ createdAt: -1 }).lean();
}
