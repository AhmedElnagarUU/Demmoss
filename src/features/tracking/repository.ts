import "server-only";
import { connectDb } from "@/shared/db/connect";
import type { Locale } from "@/shared/i18n/config";
import { EventModel, VisitorModel } from "./model";
import type { Device, EventMeta, EventName, VisitorSource } from "./types";

type VisitorVisit = {
  visitorId: string;
  country: string;
  device: Device;
  locale: Locale;
  source: VisitorSource | undefined;
  seenAt: Date;
};

export async function upsertVisitor(visit: VisitorVisit): Promise<void> {
  await connectDb();
  await VisitorModel.updateOne(
    { visitorId: visit.visitorId },
    {
      $set: { lastSeenAt: visit.seenAt, country: visit.country, device: visit.device, locale: visit.locale },
      $setOnInsert: { firstSeenAt: visit.seenAt, source: visit.source ?? {} },
    },
    { upsert: true },
  );
}

type NewEvent = {
  visitorId: string;
  name: EventName;
  locale: Locale;
  page: string;
  template: string | undefined;
  meta: EventMeta | undefined;
  createdAt: Date;
};

export async function insertEvent(event: NewEvent): Promise<void> {
  await connectDb();
  await EventModel.create(event);
}

export async function findVisitor(visitorId: string) {
  await connectDb();
  return VisitorModel.findOne({ visitorId }).lean();
}

export async function countVisitors(): Promise<number> {
  await connectDb();
  return VisitorModel.countDocuments();
}

export async function listEventsOfVisitor(visitorId: string) {
  await connectDb();
  return EventModel.find({ visitorId }).sort({ createdAt: 1 }).lean();
}
