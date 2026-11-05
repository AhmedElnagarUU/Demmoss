import type { NotificationType } from "./types";

export type NotificationItem = {
  id: string;
  type: NotificationType;
  title: string;
  template: string | undefined;
  read: boolean;
  createdAt: Date;
};

export type NotificationTypeGroup = {
  type: NotificationType;
  count: number;
  unread: number;
  items: NotificationItem[];
};

export type NotificationDayGroup = {
  day: string; // YYYY-MM-DD in UTC
  types: NotificationTypeGroup[];
};

// Notifications are saved one by one; the list groups them by day (newest first), then by type
// (the type with the newest notification first). Days are UTC so the result never depends on the server.
export function groupNotifications(items: readonly NotificationItem[]): NotificationDayGroup[] {
  const newestFirst = [...items].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  const days = new Map<string, Map<NotificationType, NotificationTypeGroup>>();

  for (const item of newestFirst) {
    const day = item.createdAt.toISOString().slice(0, 10);
    const types = days.get(day) ?? new Map<NotificationType, NotificationTypeGroup>();
    const group = types.get(item.type) ?? { type: item.type, count: 0, unread: 0, items: [] };
    group.count += 1;
    if (!item.read) group.unread += 1;
    group.items.push(item);
    types.set(item.type, group);
    days.set(day, types);
  }

  return [...days].map(([day, types]) => ({ day, types: [...types.values()] }));
}
