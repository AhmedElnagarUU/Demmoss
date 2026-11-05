import { expect, test } from "@playwright/test";
import { withTestDatabase } from "./helpers/database";

async function visitorIdOf(page: import("@playwright/test").Page): Promise<string> {
  const id = await page.evaluate(() => window.localStorage.getItem("demo:visitor-id"));
  if (!id) throw new Error("no visitor id");
  return id;
}

async function eventsOf(visitorId: string) {
  return withTestDatabase((db) =>
    db
      .collection("events")
      .find({ visitorId }, { sort: { createdAt: 1 } })
      .toArray(),
  );
}

test("T1: visiting pages records page views for one anonymous visitor, with the campaign source", async ({
  page,
}) => {
  await page.goto("/ar?utm_source=instagram&utm_campaign=launch");
  await expect.poll(async () => (await eventsOf(await visitorIdOf(page))).length).toBe(1);
  const visitorId = await visitorIdOf(page);

  await page.getByRole("link", { name: "English" }).click();
  await expect(page).toHaveURL(/\/en$/);

  await expect
    .poll(async () => (await eventsOf(visitorId)).map((e) => [e.name, e.page]))
    .toEqual([
      ["page_view", "/ar"],
      ["language_switched", "/ar"],
      ["page_view", "/en"],
    ]);

  const visitor = await withTestDatabase((db) => db.collection("visitors").findOne({ visitorId }));
  expect(visitor).toMatchObject({ locale: "en", source: { utmSource: "instagram", utmCampaign: "launch" } });
  expect(JSON.stringify(visitor)).not.toMatch(/\d+\.\d+\.\d+\.\d+/);
});

test("T3: a WhatsApp click notifies the admin", async ({ page, context }) => {
  await context.route("https://wa.me/**", (route) => route.abort());
  await page.goto("/en");
  await expect.poll(async () => (await eventsOf(await visitorIdOf(page))).length).toBe(1);

  await page.getByRole("link", { name: "Talk to us on WhatsApp" }).click();

  const visitorId = await visitorIdOf(page);
  await expect.poll(async () => (await eventsOf(visitorId)).map((e) => e.name)).toContain("whatsapp_clicked");
  await expect
    .poll(() =>
      withTestDatabase((db) => db.collection("notifications").countDocuments({ type: "whatsapp_clicked" })),
    )
    .toBeGreaterThan(0);
});
