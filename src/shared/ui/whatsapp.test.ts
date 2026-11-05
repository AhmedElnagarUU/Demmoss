import { describe, expect, it } from "vitest";
import { whatsappUrl } from "./whatsapp";

describe("WhatsApp buttons open a chat with the message ready", () => {
  it("keeps an Arabic message intact through the link", () => {
    const message = "مرحبًا، أود حجز مشروع & موعد؟";
    const url = new URL(whatsappUrl("966500000000", message));
    expect(url.origin + url.pathname).toBe("https://wa.me/966500000000");
    expect(url.searchParams.get("text")).toBe(message);
  });
});
