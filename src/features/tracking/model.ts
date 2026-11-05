import "server-only";
import { model, models, Schema, type InferSchemaType, type Model } from "mongoose";
import { locales } from "@/shared/i18n/config";
import { devices, eventNames } from "./types";

const visitorSchema = new Schema({
  visitorId: { type: String, required: true, unique: true },
  firstSeenAt: { type: Date, required: true },
  lastSeenAt: { type: Date, required: true },
  country: { type: String, required: true },
  device: { type: String, enum: devices, required: true },
  locale: { type: String, enum: locales, required: true },
  source: {
    utmSource: String,
    utmMedium: String,
    utmCampaign: String,
    referrer: String,
  },
});

const eventSchema = new Schema({
  visitorId: { type: String, required: true, index: true },
  name: { type: String, enum: eventNames, required: true, index: true },
  locale: { type: String, enum: locales, required: true },
  page: { type: String, required: true },
  template: { type: String },
  meta: { type: Schema.Types.Mixed },
  createdAt: { type: Date, required: true, index: true },
});

export type VisitorDocument = InferSchemaType<typeof visitorSchema>;
export type EventDocument = InferSchemaType<typeof eventSchema>;

export const VisitorModel =
  (models.Visitor as Model<VisitorDocument> | undefined) ?? model<VisitorDocument>("Visitor", visitorSchema);

export const EventModel =
  (models.Event as Model<EventDocument> | undefined) ?? model<EventDocument>("Event", eventSchema);
