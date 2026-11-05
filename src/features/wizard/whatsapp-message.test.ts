import { describe, expect, it } from "vitest";
import { getWizardT } from "./messages";
import { buildWhatsAppMessage, summarizeIdea } from "./whatsapp-message";

describe("WhatsApp message from the wizard", () => {
  it("W5: a business request contains the type, the category and the name (English)", () => {
    const message = buildWhatsAppMessage({
      t: getWizardT("en"),
      brand: "Brand",
      type: "business",
      fieldName: "Restaurants & cafés",
      name: "Sara",
    });
    expect(message).toBe(
      "Hello Brand, I'm Sara.\nI want a website for my business.\nMy field: Restaurants & cafés",
    );
  });

  it("W5: an idea request contains the type, the idea and the name (Arabic)", () => {
    const message = buildWhatsAppMessage({
      t: getWizardT("ar"),
      brand: "Brand",
      type: "saas",
      idea: "تطبيق لحجز دروس اليوغا",
      name: "عمر",
    });
    expect(message).toContain("عمر");
    expect(message).toContain("أريد بناء منتج SaaS.");
    expect(message).toContain("فكرتي: تطبيق لحجز دروس اليوغا");
  });

  it("W5: without a name it still reads naturally", () => {
    const message = buildWhatsAppMessage({ t: getWizardT("en"), brand: "Brand", type: "other" });
    expect(message).toBe("Hello Brand.\nI have a project idea.");
  });

  it("W5: a long idea is shortened to one line so the message stays readable", () => {
    const summary = summarizeIdea(`First line\n\n${"word ".repeat(100)}`);
    expect(summary).not.toContain("\n");
    expect(summary.length).toBeLessThanOrEqual(200);
    expect(summary.endsWith("…")).toBe(true);
    expect(summarizeIdea("  short   idea ")).toBe("short idea");
  });
});
