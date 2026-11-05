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

export type EventCount = { name: EventName; template: string | undefined; events: number; visitors: number };

// Counts events and distinct visitors per (event name, template), optionally only since a date.
export async function countEvents(since?: Date): Promise<EventCount[]> {
  await connectDb();
  const rows = await EventModel.aggregate<{
    _id: { name: EventName; template?: string };
    events: number;
    visitors: number;
  }>([
    ...(since ? [{ $match: { createdAt: { $gte: since } } }] : []),
    {
      $group: {
        _id: { name: "$name", template: "$template", visitorId: "$visitorId" },
        events: { $sum: 1 },
      },
    },
    {
      $group: {
        _id: { name: "$_id.name", template: "$_id.template" },
        events: { $sum: "$events" },
        visitors: { $sum: 1 },
      },
    },
  ]);
  return rows.map((row) => ({
    name: row._id.name,
    template: row._id.template,
    events: row.events,
    visitors: row.visitors,
  }));
}

// Visitors who did anything (any event) since a date.
export async function countActiveVisitors(since: Date): Promise<number> {
  await connectDb();
  const rows = await EventModel.aggregate<{ visitors: number }>([
    { $match: { createdAt: { $gte: since } } },
    { $group: { _id: "$visitorId" } },
    { $count: "visitors" },
  ]);
  return rows[0]?.visitors ?? 0;
}

export type VisitorField = "country" | "device" | "locale";

export async function countVisitorsBy(field: VisitorField): Promise<{ value: string; count: number }[]> {
  await connectDb();
  const rows = await VisitorModel.aggregate<{ _id: string; count: number }>([
    { $group: { _id: `$${field}`, count: { $sum: 1 } } },
  ]);
  return rows.map((row) => ({ value: row._id, count: row.count }));
}

export type SourceCount = { utmSource: string | undefined; referrer: string | undefined; count: number };

export async function countVisitorsBySource(): Promise<SourceCount[]> {
  await connectDb();
  const rows = await VisitorModel.aggregate<{
    _id: { utmSource?: string; referrer?: string };
    count: number;
  }>([
    {
      $group: {
        _id: { utmSource: "$source.utmSource", referrer: "$source.referrer" },
        count: { $sum: 1 },
      },
    },
  ]);
  return rows.map((row) => ({ utmSource: row._id.utmSource, referrer: row._id.referrer, count: row.count }));
}

export async function listVisitors(limit: number) {
  await connectDb();
  return VisitorModel.find().sort({ lastSeenAt: -1 }).limit(limit).lean();
}

export async function listRecentEvents(options: { limit: number; name?: EventName; template?: string }) {
  await connectDb();
  const filter = {
    ...(options.name ? { name: options.name } : {}),
    ...(options.template ? { template: options.template } : {}),
  };
  return EventModel.find(filter).sort({ createdAt: -1 }).limit(options.limit).lean();
}
