import { describe, expect, it } from "vitest";
import { fontStack } from "./font-stack";

const montserrat = { style: { fontFamily: "'Montserrat', 'Montserrat Fallback'" } };
const plexArabic = { style: { fontFamily: "'IBM Plex Sans Arabic', 'IBM Plex Sans Arabic Fallback'" } };

describe("i18n-rtl: Arabic text reaches the template's Arabic font", () => {
  it("puts both real fonts before any Arial-based fallback", () => {
    expect(fontStack([montserrat, plexArabic], "sans-serif")).toBe(
      "'Montserrat', 'IBM Plex Sans Arabic', 'Montserrat Fallback', 'IBM Plex Sans Arabic Fallback', sans-serif",
    );
  });

  it("keeps a font without a fallback and ends with the generic family", () => {
    expect(fontStack([{ style: { fontFamily: "'Lalezar'" } }, plexArabic], "Impact, sans-serif")).toBe(
      "'Lalezar', 'IBM Plex Sans Arabic', 'IBM Plex Sans Arabic Fallback', Impact, sans-serif",
    );
  });
});
