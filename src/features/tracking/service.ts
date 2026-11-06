import "server-only";
import { createNotification } from "@/features/notifications/service";
import { checkRateLimit } from "@/shared/rate-limit";
import { notificationForEvent } from "./notify";
import { insertEvent, upsertVisitor } from "./repository";
import { countryFromHeader, deviceFromUserAgent } from "./request-info";
import type { EventInput } from "./types";

const eventRateLimit = { limit: 120, windowMs: 60 * 1000 };

export type RequestContext = {
  countryHeader: string | null;
  userAgent: string | null;
  now: Date;
};

export async function submitEvent(
  event: EventInput,
  context: RequestContext & { clientKey: string | null },
): Promise<void> {
  if (
    context.clientKey &&
    !checkRateLimit(`event:${context.clientKey}`, { ...eventRateLimit, now: context.now.getTime() }).allowed
  ) {
    return;
  }
  await recordEvent(event, context);
}

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

export {
  countActiveVisitors,
  countEvents,
  countVisitors,
  countVisitorsBy,
  countVisitorsBySource,
  findVisitor,
  listEventsOfVisitor,
  listRecentEvents,
  listVisitors,
} from "./repository";
