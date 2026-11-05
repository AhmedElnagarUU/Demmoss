import "server-only";
import { countFeedback, listFeedback, markFeedbackRead } from "@/features/feedback/service";
import { groupNotifications, type NotificationItem } from "@/features/notifications/group";
import {
  countUnreadNotifications,
  listNotifications,
  markAllNotificationsRead,
  markNotificationRead,
} from "@/features/notifications/service";
import {
  countActiveVisitors,
  countEvents,
  countVisitors,
  countVisitorsBy,
  countVisitorsBySource,
  findVisitor,
  listEventsOfVisitor,
  listRecentEvents,
  listVisitors,
} from "@/features/tracking/service";
import type { EventName } from "@/features/tracking/types";
import { countLeadsByStatus, listLeads, setLeadNotes, setLeadStatus } from "@/features/wizard/service";
import { leadStatuses, type LeadStatus, type LeadType } from "@/features/wizard/types";
import { requireAdmin } from "./auth/admin-session";
import {
  conversionRate,
  daysBefore,
  eventsWithName,
  sourceCounts,
  sourceLabel,
  startOfUtcDay,
  templateStats,
  topCounts,
  visitorsWithEvent,
  type Count,
  type TemplateStats,
} from "./metrics";

// Every function here checks the admin session first (the layout redirect alone is not enough).

const TOP_LIST_SIZE = 8;
export const LIST_LIMIT = 100;

export type Overview = {
  visitors: { today: number; last7Days: number; last30Days: number; total: number };
  devices: Count[];
  countries: Count[];
  languages: Count[];
  sources: Count[];
  wizard: { started: number; completed: number; rate: number | null };
  whatsappClicks: number;
  feedback: { total: number; unread: number };
  leadsByStatus: Record<LeadStatus, number>;
  templates: TemplateStats[];
};

export async function getOverview(now = new Date()): Promise<Overview> {
  await requireAdmin();
  const [
    today,
    last7Days,
    last30Days,
    total,
    totals,
    devices,
    countries,
    languages,
    sources,
    feedback,
    leads,
  ] = await Promise.all([
    countActiveVisitors(startOfUtcDay(now)),
    countActiveVisitors(daysBefore(now, 7)),
    countActiveVisitors(daysBefore(now, 30)),
    countVisitors(),
    countEvents(),
    countVisitorsBy("device"),
    countVisitorsBy("country"),
    countVisitorsBy("locale"),
    countVisitorsBySource(),
    countFeedback(),
    countLeadsByStatus(),
  ]);

  const started = visitorsWithEvent(totals, "wizard_started");
  const completed = visitorsWithEvent(totals, "wizard_completed");

  return {
    visitors: { today, last7Days, last30Days, total },
    devices: topCounts(devices, TOP_LIST_SIZE),
    countries: topCounts(countries, TOP_LIST_SIZE),
    languages: topCounts(languages, TOP_LIST_SIZE),
    sources: topCounts(sourceCounts(sources), TOP_LIST_SIZE),
    wizard: { started, completed, rate: conversionRate(started, completed) },
    whatsappClicks: eventsWithName(totals, "whatsapp_clicked"),
    feedback,
    leadsByStatus: Object.fromEntries(
      leadStatuses.map((status) => [status, leads.find((row) => row.status === status)?.count ?? 0]),
    ) as Record<LeadStatus, number>,
    templates: templateStats(totals),
  };
}

export async function getDemoStats(): Promise<TemplateStats[]> {
  await requireAdmin();
  return templateStats(await countEvents());
}

export type LeadRow = {
  id: string;
  type: LeadType;
  field: string | undefined;
  idea: string | undefined;
  name: string;
  whatsapp: string;
  email: string | undefined;
  locale: string;
  status: LeadStatus;
  notes: string;
  createdAt: Date;
};

export async function getLeads(status?: LeadStatus): Promise<LeadRow[]> {
  await requireAdmin();
  const leads = await listLeads(status);
  return leads.map((lead) => ({
    id: String(lead._id),
    type: lead.type,
    field: lead.field ?? undefined,
    idea: lead.idea ?? undefined,
    name: lead.name,
    whatsapp: lead.whatsapp,
    email: lead.email ?? undefined,
    locale: lead.locale,
    status: lead.status,
    notes: lead.notes ?? "",
    createdAt: lead.createdAt,
  }));
}

export async function changeLeadStatus(id: string, status: LeadStatus): Promise<void> {
  await requireAdmin();
  await setLeadStatus(id, status);
}

export async function saveLeadNotes(id: string, notes: string): Promise<void> {
  await requireAdmin();
  await setLeadNotes(id, notes);
}

export type VisitorRow = {
  visitorId: string;
  country: string;
  device: string;
  locale: string;
  source: string;
  firstSeenAt: Date;
  lastSeenAt: Date;
};

function toVisitorRow(visitor: Awaited<ReturnType<typeof listVisitors>>[number]): VisitorRow {
  return {
    visitorId: visitor.visitorId,
    country: visitor.country,
    device: visitor.device,
    locale: visitor.locale,
    source: sourceLabel({
      utmSource: visitor.source?.utmSource ?? undefined,
      referrer: visitor.source?.referrer ?? undefined,
    }),
    firstSeenAt: visitor.firstSeenAt,
    lastSeenAt: visitor.lastSeenAt,
  };
}

export async function getVisitors(): Promise<VisitorRow[]> {
  await requireAdmin();
  return (await listVisitors(LIST_LIMIT)).map(toVisitorRow);
}

export type EventRow = {
  id: string;
  visitorId: string;
  name: EventName;
  template: string | undefined;
  page: string;
  createdAt: Date;
};

function toEventRow(event: Awaited<ReturnType<typeof listRecentEvents>>[number]): EventRow {
  return {
    id: String(event._id),
    visitorId: event.visitorId,
    name: event.name,
    template: event.template ?? undefined,
    page: event.page,
    createdAt: event.createdAt,
  };
}

export async function getVisitorJourney(
  visitorId: string,
): Promise<{ visitor: VisitorRow; events: EventRow[] } | null> {
  await requireAdmin();
  const visitor = await findVisitor(visitorId);
  if (!visitor) return null;
  const events = await listEventsOfVisitor(visitorId);
  return { visitor: toVisitorRow(visitor), events: events.map(toEventRow) };
}

export async function getActivity(filter: { name?: EventName; template?: string }): Promise<EventRow[]> {
  await requireAdmin();
  return (await listRecentEvents({ limit: LIST_LIMIT, ...filter })).map(toEventRow);
}

export type FeedbackRow = {
  id: string;
  message: string;
  contact: string | undefined;
  page: string;
  template: string | undefined;
  read: boolean;
  createdAt: Date;
};

export async function getFeedback(): Promise<FeedbackRow[]> {
  await requireAdmin();
  return (await listFeedback()).map((item) => ({
    id: String(item._id),
    message: item.message,
    contact: item.contact ?? undefined,
    page: item.page,
    template: item.template ?? undefined,
    read: item.read,
    createdAt: item.createdAt,
  }));
}

export async function markFeedbackAsRead(id: string): Promise<void> {
  await requireAdmin();
  await markFeedbackRead(id);
}

export async function getNotificationGroups() {
  await requireAdmin();
  const notifications = await listNotifications();
  const items: NotificationItem[] = notifications.map((notification) => ({
    id: String(notification._id),
    type: notification.type,
    title: notification.title,
    template: notification.template ?? undefined,
    read: notification.read,
    createdAt: notification.createdAt,
  }));
  return groupNotifications(items);
}

export async function getUnreadNotificationCount(): Promise<number> {
  await requireAdmin();
  return countUnreadNotifications();
}

export async function markNotificationAsRead(id: string): Promise<void> {
  await requireAdmin();
  await markNotificationRead(id);
}

export async function markAllNotificationsAsRead(): Promise<void> {
  await requireAdmin();
  await markAllNotificationsRead();
}
