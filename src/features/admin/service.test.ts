import { beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { createFeedback } from "@/features/feedback/service";
import { recordEvent } from "@/features/tracking/service";
import type { EventInput } from "@/features/tracking/types";
import { createLead, listLeads } from "@/features/wizard/service";
import type { LeadInput } from "@/features/wizard/types";
import { setupTestDatabase } from "../../../tests/helpers/db";
import { AdminAuthError } from "./auth/admin-session";
import { hashPassword } from "./auth/password";
import { signSession } from "./auth/session";
import {
  changeLeadStatus,
  getActivity,
  getDemoStats,
  getFeedback,
  getLeads,
  getNotificationGroups,
  getOverview,
  getUnreadNotificationCount,
  getVisitorJourney,
  getVisitors,
  markAllNotificationsAsRead,
  markFeedbackAsRead,
  markNotificationAsRead,
  saveLeadNotes,
} from "./service";

// Next.js request cookies exist only inside a request, so the test supplies the cookie jar.
const jar = vi.hoisted(() => ({ cookie: undefined as string | undefined }));
vi.mock("next/headers", () => ({
  cookies: async () => ({
    get: () => (jar.cookie ? { name: "admin_session", value: jar.cookie } : undefined),
  }),
}));

setupTestDatabase();

const secret = "a-test-secret-that-is-at-least-32-characters-long";
const adminEmail = "owner@example.com";

beforeAll(() => {
  process.env.ADMIN_EMAIL = adminEmail;
  process.env.ADMIN_PASSWORD_HASH = hashPassword("a password");
  process.env.SESSION_SECRET = secret;
});

beforeEach(() => {
  jar.cookie = undefined;
});

function signIn(): void {
  jar.cookie = signSession(adminEmail, secret, new Date());
}

const iphone = "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148";
const desktop = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/130.0 Safari/537.36";

const visitorA = "7d444840-9dc0-41bc-8d6e-1b4a2e6c3a01";
const visitorB = "7d444840-9dc0-41bc-8d6e-1b4a2e6c3a02";
const visitorC = "7d444840-9dc0-41bc-8d6e-1b4a2e6c3a03";
const visitorD = "7d444840-9dc0-41bc-8d6e-1b4a2e6c3a04";

async function track(
  visitorId: string,
  name: EventInput["name"],
  at: string,
  extra: Partial<EventInput> = {},
  userAgent = desktop,
  country = "SA",
): Promise<void> {
  await recordEvent(
    { visitorId, name, locale: "en", page: "/en", ...extra },
    { countryHeader: country, userAgent, now: new Date(at) },
  );
}

const lead: LeadInput = {
  type: "business",
  field: "restaurant",
  idea: undefined,
  name: "Sara Almutairi",
  whatsapp: "+966501234567",
  email: undefined,
  locale: "en",
  visitorId: visitorA,
};

describe("C1: every admin read and update refuses without a valid session", () => {
  const everyAdminFunction: [string, () => Promise<unknown>][] = [
    ["getOverview", () => getOverview()],
    ["getDemoStats", () => getDemoStats()],
    ["getLeads", () => getLeads()],
    ["changeLeadStatus", () => changeLeadStatus("65f0c0ffee0123456789abcd", "won")],
    ["saveLeadNotes", () => saveLeadNotes("65f0c0ffee0123456789abcd", "note")],
    ["getVisitors", () => getVisitors()],
    ["getVisitorJourney", () => getVisitorJourney(visitorA)],
    ["getActivity", () => getActivity({})],
    ["getFeedback", () => getFeedback()],
    ["markFeedbackAsRead", () => markFeedbackAsRead("65f0c0ffee0123456789abcd")],
    ["getNotificationGroups", () => getNotificationGroups()],
    ["getUnreadNotificationCount", () => getUnreadNotificationCount()],
    ["markNotificationAsRead", () => markNotificationAsRead("65f0c0ffee0123456789abcd")],
    ["markAllNotificationsAsRead", () => markAllNotificationsAsRead()],
  ];

  it.each(everyAdminFunction)("%s throws when there is no cookie", async (_name, call) => {
    await expect(call()).rejects.toBeInstanceOf(AdminAuthError);
  });

  it("rejects a tampered cookie, an expired cookie, and another person's email", async () => {
    const valid = signSession(adminEmail, secret, new Date());
    jar.cookie = `${valid}x`;
    await expect(getLeads()).rejects.toBeInstanceOf(AdminAuthError);

    jar.cookie = signSession(adminEmail, secret, new Date(Date.now() - 9 * 60 * 60 * 1000));
    await expect(getLeads()).rejects.toBeInstanceOf(AdminAuthError);

    jar.cookie = signSession("someone@else.com", secret, new Date());
    await expect(getLeads()).rejects.toBeInstanceOf(AdminAuthError);
  });

  it("does not change a lead when the update is refused", async () => {
    const { id } = await createLead(lead);
    await expect(changeLeadStatus(id, "won")).rejects.toBeInstanceOf(AdminAuthError);
    expect((await listLeads())[0]?.status).toBe("new");
  });

  it("allows the reads with a valid session", async () => {
    signIn();
    await expect(getLeads()).resolves.toEqual([]);
  });
});

describe("C2, C5, C7: metrics from seeded events", () => {
  const now = new Date("2026-03-10T12:00:00Z");

  beforeEach(async () => {
    signIn();
    // A: today, finishes the wizard and uses a demo. B: 3 days ago, starts the wizard and only opens a demo.
    // C: 20 days ago, clicks WhatsApp. D: 40 days ago, one page view.
    await track(visitorA, "page_view", "2026-03-10T09:00:00Z", {}, iphone);
    await track(visitorA, "wizard_started", "2026-03-10T09:01:00Z", { page: "/en/start" }, iphone);
    await track(visitorA, "wizard_completed", "2026-03-10T09:02:00Z", { page: "/en/start" }, iphone);
    await track(
      visitorA,
      "demo_opened",
      "2026-03-10T09:05:00Z",
      { template: "restaurant-fast-food" },
      iphone,
    );
    await track(
      visitorA,
      "demo_registered",
      "2026-03-10T09:06:00Z",
      { template: "restaurant-fast-food" },
      iphone,
    );
    await track(
      visitorA,
      "demo_action",
      "2026-03-10T09:07:00Z",
      { template: "restaurant-fast-food", meta: { kind: "order" } },
      iphone,
    );
    await track(visitorB, "wizard_started", "2026-03-07T10:00:00Z", { source: { utmSource: "instagram" } });
    await track(visitorB, "demo_opened", "2026-03-07T10:05:00Z", { template: "restaurant-fast-food" });
    await track(
      visitorC,
      "whatsapp_clicked",
      "2026-02-18T10:00:00Z",
      { locale: "ar", page: "/ar" },
      desktop,
      "EG",
    );
    await track(visitorD, "page_view", "2026-01-30T10:00:00Z", {}, desktop, "XX");
  });

  it("counts visitors per window, wizard conversion, WhatsApp clicks, and groups visitors", async () => {
    const result = await getOverview(now);

    expect(result.visitors).toEqual({ today: 1, last7Days: 2, last30Days: 3, total: 4 });
    expect(result.wizard).toEqual({ started: 2, completed: 1, rate: 0.5 });
    expect(result.whatsappClicks).toBe(1);
    expect(result.devices).toEqual([
      { value: "desktop", count: 3 },
      { value: "mobile", count: 1 },
    ]);
    expect(result.countries).toEqual([
      { value: "SA", count: 2 },
      { value: "EG", count: 1 },
      { value: "unknown", count: 1 },
    ]);
    expect(result.sources).toEqual([
      { value: "direct", count: 3 },
      { value: "instagram", count: 1 },
    ]);
  });

  it("shows where visitors stop in each demo (opened, registered, used it)", async () => {
    const [stats] = await getDemoStats();

    expect(stats).toMatchObject({ template: "restaurant-fast-food", opened: 2, registered: 1, actions: 1 });
    expect(stats?.funnel.map((step) => step.rateFromPrevious)).toEqual([null, 0.5, 1]);
  });

  it("C5: a visitor's journey lists their events in order, and activity filters by event", async () => {
    const journey = await getVisitorJourney(visitorA);
    expect(journey?.visitor).toMatchObject({ country: "SA", device: "mobile" });
    expect(journey?.events.map((e) => e.name)).toEqual([
      "page_view",
      "wizard_started",
      "wizard_completed",
      "demo_opened",
      "demo_registered",
      "demo_action",
    ]);
    expect(await getVisitorJourney("7d444840-9dc0-41bc-8d6e-1b4a2e6c3aff")).toBeNull();

    const registrations = await getActivity({ name: "demo_registered" });
    expect(registrations).toHaveLength(1);
    expect(registrations[0]).toMatchObject({ visitorId: visitorA, template: "restaurant-fast-food" });

    const visitors = await getVisitors();
    expect(visitors[0]?.visitorId).toBe(visitorA);
  });
});

describe("C3: leads and their status", () => {
  beforeEach(signIn);

  it("lists leads newest first, filters by status, and saves a status change and notes", async () => {
    const first = await createLead({ ...lead, name: "First Lead" });
    await createLead({ ...lead, name: "Second Lead" });

    expect((await getLeads()).map((row) => row.name)).toEqual(["Second Lead", "First Lead"]);

    await changeLeadStatus(first.id, "contacted");
    await saveLeadNotes(first.id, "Call on Sunday morning");

    expect((await getLeads("contacted")).map((row) => row.name)).toEqual(["First Lead"]);
    expect((await getLeads("new")).map((row) => row.name)).toEqual(["Second Lead"]);
    expect((await getLeads("contacted"))[0]).toMatchObject({
      status: "contacted",
      notes: "Call on Sunday morning",
      whatsapp: "+966501234567",
      type: "business",
      field: "restaurant",
    });
  });
});

describe("C6: feedback", () => {
  beforeEach(signIn);

  it("lists feedback newest first and marks one message as read", async () => {
    const base = {
      visitorId: visitorA,
      contact: undefined,
      page: "/en",
      template: undefined,
      locale: "en" as const,
    };
    await createFeedback({ ...base, message: "First message" });
    await createFeedback({ ...base, message: "Second message" });

    const list = await getFeedback();
    expect(list.map((item) => [item.message, item.read])).toEqual([
      ["Second message", false],
      ["First message", false],
    ]);

    await markFeedbackAsRead(list[0]?.id ?? "");
    expect((await getFeedback()).map((item) => [item.message, item.read])).toEqual([
      ["Second message", true],
      ["First message", false],
    ]);
  });
});

describe("N1, N3: notifications", () => {
  beforeEach(signIn);

  async function seedNotifications(): Promise<void> {
    await createLead(lead);
    await track(visitorA, "demo_registered", "2026-03-10T09:00:00Z", { template: "clinic-dental" });
    await track(visitorB, "demo_registered", "2026-03-10T09:10:00Z", { template: "clinic-dental" });
  }

  function countsByType(groups: Awaited<ReturnType<typeof getNotificationGroups>>) {
    const counts: Record<string, number> = {};
    for (const group of groups.flatMap((day) => day.types))
      counts[group.type] = (counts[group.type] ?? 0) + group.count;
    return counts;
  }

  it("counts what is unread and groups the list by type with counts", async () => {
    await seedNotifications();

    expect(await getUnreadNotificationCount()).toBe(3);
    expect(countsByType(await getNotificationGroups())).toEqual({ new_lead: 1, demo_registered: 2 });
  });

  it("reading one notification lowers the count by one", async () => {
    await seedNotifications();
    const [first] = (await getNotificationGroups())
      .flatMap((day) => day.types)
      .flatMap((group) => group.items);

    await markNotificationAsRead(first?.id ?? "");

    expect(await getUnreadNotificationCount()).toBe(2);
  });

  it("N3: mark all as read clears the unread count and keeps the notifications", async () => {
    await seedNotifications();

    await markAllNotificationsAsRead();

    expect(await getUnreadNotificationCount()).toBe(0);
    expect(countsByType(await getNotificationGroups())).toEqual({ new_lead: 1, demo_registered: 2 });
  });
});
