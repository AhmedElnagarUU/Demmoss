import { describe, expect, it } from "vitest";
import { listNotifications } from "@/features/notifications/service";
import { setupTestDatabase } from "../../../tests/helpers/db";
import { createLeadAction } from "./actions";
import { listLeads } from "./service";

setupTestDatabase();

const visitorId = "7d444840-9dc0-41bc-8d6e-1b4a2e6c3a11";

describe("wizard with a real database", () => {
  it("W6: saving a lead creates a new_lead notification for the admin", async () => {
    const result = await createLeadAction({
      type: "business",
      field: "restaurant",
      name: "Sara",
      whatsapp: "+966 50 000 0000",
      email: "sara@example.com",
      locale: "ar",
      visitorId,
    });

    expect(result.ok).toBe(true);
    const leads = await listLeads();
    expect(leads).toHaveLength(1);
    expect(leads[0]).toMatchObject({
      type: "business",
      field: "restaurant",
      name: "Sara",
      whatsapp: "+966500000000",
      email: "sara@example.com",
      locale: "ar",
      visitorId,
      status: "new",
    });
    const notifications = await listNotifications();
    expect(notifications.map((n) => [n.type, n.title, n.read])).toEqual([
      ["new_lead", "New lead: Sara (business)", false],
    ]);
  });

  it("W3: an idea lead is saved with its idea", async () => {
    const result = await createLeadAction({
      type: "saas",
      idea: "A booking tool for yoga teachers",
      name: "Omar",
      whatsapp: "966511111111",
      locale: "en",
      visitorId,
    });

    expect(result.ok).toBe(true);
    expect((await listLeads())[0]).toMatchObject({ type: "saas", idea: "A booking tool for yoga teachers" });
  });

  it("W6: invalid input saves no lead and no notification, and names the wrong fields", async () => {
    const result = await createLeadAction({
      type: "system",
      idea: "short",
      name: "S",
      whatsapp: "12",
      locale: "en",
      visitorId,
    });

    expect(result).toMatchObject({ ok: false });
    if (!result.ok) expect(Object.keys(result.errors).sort()).toEqual(["idea", "name", "whatsapp"]);
    expect(await listLeads()).toHaveLength(0);
    expect(await listNotifications()).toHaveLength(0);
  });
});
