import { describe, expect, it } from "vitest";
import { pickLocale, switchPathLocale } from "./config";

describe("first visit language (i18n rule: saved choice wins, otherwise the configured default)", () => {
  it("a remembered choice wins over the default locale", () => {
    expect(pickLocale({ cookie: "en", fallback: "ar" })).toBe("en");
    expect(pickLocale({ cookie: "ar", fallback: "en" })).toBe("ar");
  });

  it("a first visit without a cookie gets the configured default locale", () => {
    expect(pickLocale({ cookie: undefined, fallback: "en" })).toBe("en");
    expect(pickLocale({ cookie: undefined, fallback: "ar" })).toBe("ar");
  });

  it("ignores an unknown or empty cookie and uses the configured default locale", () => {
    expect(pickLocale({ cookie: "fr", fallback: "en" })).toBe("en");
    expect(pickLocale({ cookie: "", fallback: "en" })).toBe("en");
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
