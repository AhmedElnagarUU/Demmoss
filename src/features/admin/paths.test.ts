import { describe, expect, it } from "vitest";
import { notificationTypes } from "@/features/notifications/types";
import { adminPath, adminPathForNotification } from "./paths";

describe("N2: a notification opens the related admin page", () => {
  it("sends each notification type to the page that shows it", () => {
    expect(adminPathForNotification("new_lead", "en")).toBe("/en/admin/leads");
    expect(adminPathForNotification("feedback", "ar")).toBe("/ar/admin/feedback");
    expect(adminPathForNotification("demo_registered", "en")).toBe("/en/admin/demos");
    expect(adminPathForNotification("demo_action", "en")).toBe("/en/admin/demos");
    expect(adminPathForNotification("whatsapp_clicked", "en")).toBe("/en/admin/activity");
  });

  it("every notification type has an admin page inside the admin area", () => {
    for (const type of notificationTypes) {
      expect(adminPathForNotification(type, "en")).toMatch(/^\/en\/admin\/[a-z]+$/);
    }
  });

  it("builds admin paths, with and without a section", () => {
    expect(adminPath("en")).toBe("/en/admin");
    expect(adminPath("ar", "visitors", "abc")).toBe("/ar/admin/visitors/abc");
  });
});
