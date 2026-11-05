import "server-only";
import { model, models, Schema, type InferSchemaType, type Model } from "mongoose";
import { locales } from "@/shared/i18n/config";
import { leadStatuses, leadTypes } from "./types";

const leadSchema = new Schema(
  {
    type: { type: String, enum: leadTypes, required: true },
    field: { type: String },
    idea: { type: String },
    name: { type: String, required: true },
    whatsapp: { type: String, required: true },
    email: { type: String },
    locale: { type: String, enum: locales, required: true },
    visitorId: { type: String, required: true, index: true },
    status: { type: String, enum: leadStatuses, required: true, default: "new", index: true },
    notes: { type: String },
  },
  { timestamps: true },
);

export type LeadDocument = InferSchemaType<typeof leadSchema> & { createdAt: Date; updatedAt: Date };

export const LeadModel =
  (models.Lead as Model<LeadDocument> | undefined) ?? model<LeadDocument>("Lead", leadSchema);
