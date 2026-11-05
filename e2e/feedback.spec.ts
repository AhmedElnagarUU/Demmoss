import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { withTestDatabase } from "./helpers/database";

test("F1: the feedback form opens on any page, is accessible, and Escape closes it", async ({ page }) => {
  await page.goto("/en");
  const opener = page.getByRole("button", { name: "Send feedback" });
  await opener.click();

  const dialog = page.getByRole("dialog", { name: "Tell us what you think" });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByLabel("Your message")).toBeVisible();
  await expect(dialog.getByLabel("Email or phone (optional)")).toBeVisible();

  const results = await new AxeBuilder({ page }).analyze();
  const serious = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
  expect(serious.map((v) => `${v.id}: ${v.help}`)).toEqual([]);

  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(opener).toBeFocused();
});

test("F1: the Arabic form is in Arabic", async ({ page }) => {
  await page.goto("/ar");
  await page.getByRole("button", { name: "أرسل ملاحظتك" }).click();
  await expect(page.getByRole("dialog", { name: "شاركنا رأيك" }).getByLabel("رسالتك")).toBeVisible();
});

test("F1, F3: a message sent from a page is saved with its page and the admin is notified", async ({
  page,
}) => {
  await page.goto("/en");
  await page.getByRole("button", { name: "Send feedback" }).click();
  const dialog = page.getByRole("dialog");
  await dialog.getByLabel("Your message").fill("The landing page is clear, please add pricing.");
  await dialog.getByRole("button", { name: "Send", exact: true }).click();

  await expect(dialog.getByText("Thank you! Your message reached us.")).toBeVisible();
  await expect(page).toHaveURL(/\/en$/);

  await expect
    .poll(() =>
      withTestDatabase((db) =>
        db.collection("feedbacks").findOne({ message: "The landing page is clear, please add pricing." }),
      ),
    )
    .toMatchObject({ page: "/en", locale: "en", read: false });
  await expect
    .poll(() => withTestDatabase((db) => db.collection("notifications").countDocuments({ type: "feedback" })))
    .toBeGreaterThan(0);
  await expect
    .poll(() => withTestDatabase((db) => db.collection("events").countDocuments({ name: "feedback_sent" })))
    .toBeGreaterThan(0);
});
