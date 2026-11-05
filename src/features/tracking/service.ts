import "server-only";
import { createNotification } from "@/features/notifications/service";
import { notificationForEvent } from "./notify";
import { insertEvent, upsertVisitor } from "./repository";
import { countryFromHeader, deviceFromUserAgent } from "./request-info";
import type { EventInput } from "./types";

export type RequestContext = {
  countryHeader: string | null;
  userAgent: string | null;
  now: Date;
};

export async function recordEvent(event: EventInput, context: RequestContext): Promise<void> {
  await upsertVisitor({
    visitorId: event.visitorId,
    country: countryFromHeader(context.countryHeader),
    device: deviceFromUserAgent(context.userAgent),
    locale: event.locale,
    source: event.source,
    seenAt: context.now,
  });
  await insertEvent({
    visitorId: event.visitorId,
    name: event.name,
    locale: event.locale,
    page: event.page,
    template: event.template,
    meta: event.meta,
    createdAt: context.now,
  });
  const notification = notificationForEvent(event);
  if (notification) await createNotification(notification);
}

export { countVisitors, findVisitor, listEventsOfVisitor } from "./repository";
