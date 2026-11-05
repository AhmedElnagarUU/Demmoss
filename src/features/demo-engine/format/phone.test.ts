import { describe, expect, it } from "vitest";
import { isValidPhone, phoneDigits, phoneWhatsAppUrl } from "./phone";

describe("E1: phone numbers typed in demo forms", () => {
  it("accepts 8 to 18 digits with an optional plus, spaces and dashes", () => {
    expect(isValidPhone("+966 50-123 4567")).toBe(true);
    expect(isValidPhone("0501234567")).toBe(true);
    expect(isValidPhone("12345")).toBe(false);
    expect(isValidPhone("call me")).toBe(false);
  });

  it("opens a WhatsApp chat with digits only", () => {
    expect(phoneDigits("+966 50-123 4567")).toBe("966501234567");
    expect(phoneWhatsAppUrl("+966 50-123 4567", "Hi")).toContain("966501234567");
  });
});
