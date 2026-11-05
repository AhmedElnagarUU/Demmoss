import "server-only";
import { model, models, Schema, type InferSchemaType, type Model } from "mongoose";
import { locales } from "@/shared/i18n/config";

const feedbackSchema = new Schema(
  {
    visitorId: { type: String, required: true },
    message: { type: String, required: true },
    contact: { type: String },
    page: { type: String, required: true },
    template: { type: String },
    locale: { type: String, enum: locales, required: true },
    read: { type: Boolean, required: true, default: false },
  },
  { timestamps: { createdAt: true, updatedAt: false } },
);

export type FeedbackDocument = InferSchemaType<typeof feedbackSchema> & { createdAt: Date };

export const FeedbackModel =
  (models.Feedback as Model<FeedbackDocument> | undefined) ??
  model<FeedbackDocument>("Feedback", feedbackSchema);
