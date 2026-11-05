import "server-only";
import { model, models, Schema, type InferSchemaType, type Model } from "mongoose";
import { notificationTypes } from "./types";

const notificationSchema = new Schema(
  {
    type: { type: String, enum: notificationTypes, required: true },
    title: { type: String, required: true },
    template: { type: String },
    link: { type: String },
    read: { type: Boolean, required: true, default: false, index: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } },
);

export type NotificationDocument = InferSchemaType<typeof notificationSchema> & { createdAt: Date };

export const NotificationModel =
  (models.Notification as Model<NotificationDocument> | undefined) ??
  model<NotificationDocument>("Notification", notificationSchema);
