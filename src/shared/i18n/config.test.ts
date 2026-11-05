import { describe, expect, it } from "vitest";
import { pickLocale, switchPathLocale } from "./config";

describe("first visit language (i18n rule: browser language, saved choice, Arabic fallback)", () => {
  it("uses the saved choice before the browser language", () => {
    expect(pickLocale({ cookie: "en", acceptLanguage: "ar-SA,ar;q=0.9", fallback: "ar" })).toBe("en");
  });

  it("follows the browser language when nothing is saved", () => {
    expect(pickLocale({ cookie: undefined, acceptLanguage: "en-US,en;q=0.9,ar;q=0.8", fallback: "ar" })).toBe(
      "en",
    );
    expect(pickLocale({ cookie: undefined, acceptLanguage: "ar-EG", fallback: "en" })).toBe("ar");
  });

  it("respects the quality order and skips unsupported languages", () => {
    expect(
      pickLocale({ cookie: undefined, acceptLanguage: "fr;q=1, en;q=0.4, ar;q=0.8", fallback: "en" }),
    ).toBe("ar");
  });

  it("falls back to the default locale for unknown, empty, or broken values", () => {
    expect(pickLocale({ cookie: "fr", acceptLanguage: "fr-FR,de", fallback: "ar" })).toBe("ar");
    expect(pickLocale({ cookie: undefined, acceptLanguage: null, fallback: "ar" })).toBe("ar");
    expect(pickLocale({ cookie: undefined, acceptLanguage: "en;q=0", fallback: "ar" })).toBe("ar");
  });
});

describe("language switch keeps the visitor on the same page", () => {
  it("swaps only the locale segment", () => {
    expect(switchPathLocale("/ar/demos/restaurant/fast-food/menu", "en")).toBe(
      "/en/demos/restaurant/fast-food/menu",
    );
    expect(switchPathLocale("/en", "ar")).toBe("/ar");
    expect(switchPathLocale("/ar/", "en")).toBe("/en");
  });
});
