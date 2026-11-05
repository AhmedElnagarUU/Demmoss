import { describe, expect, it } from "vitest";
import { countryFromHeader, deviceFromUserAgent } from "./request-info";

describe("T1: who visits (device and country, no IP)", () => {
  it("recognizes phones, tablets, and desktops", () => {
    expect(
      deviceFromUserAgent(
        "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148 Safari/604.1",
      ),
    ).toBe("mobile");
    expect(
      deviceFromUserAgent(
        "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 Chrome/130.0 Mobile Safari/537.36",
      ),
    ).toBe("mobile");
    expect(
      deviceFromUserAgent(
        "Mozilla/5.0 (Linux; Android 14; SM-X710) AppleWebKit/537.36 Chrome/130.0 Safari/537.36",
      ),
    ).toBe("tablet");
    expect(deviceFromUserAgent("Mozilla/5.0 (iPad; CPU OS 17_0 like Mac OS X) AppleWebKit/605.1.15")).toBe(
      "tablet",
    );
    expect(
      deviceFromUserAgent(
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/130.0 Safari/537.36",
      ),
    ).toBe("desktop");
    expect(deviceFromUserAgent(null)).toBe("desktop");
  });

  it("keeps only a valid two-letter country code", () => {
    expect(countryFromHeader("sa")).toBe("SA");
    expect(countryFromHeader("XX")).toBe("unknown");
    expect(countryFromHeader("not-a-country")).toBe("unknown");
    expect(countryFromHeader(null)).toBe("unknown");
  });
});
