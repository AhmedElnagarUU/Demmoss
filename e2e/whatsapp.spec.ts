import { expect, test } from "@playwright/test";

test("W5: the WhatsApp button opens a chat with a prefilled message in the visitor's language", async ({
  page,
}) => {
  await page.goto("/ar");
  const link = page.getByRole("link", { name: "تحدث معنا على واتساب" });
  const url = new URL((await link.getAttribute("href")) ?? "");
  expect(url.host).toBe("wa.me");
  expect(url.searchParams.get("text")).toContain("أود التحدث عن مشروع");
});
