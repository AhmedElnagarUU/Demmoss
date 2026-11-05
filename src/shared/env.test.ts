import { describe, expect, it } from "vitest";
import { parseEnv, publicEnvSchema } from "./env";
import { getServerEnv } from "./env.server";

const validPublicEnv = {
  NEXT_PUBLIC_BRAND_NAME: "Brand",
  NEXT_PUBLIC_WHATSAPP_NUMBER: "966500000000",
  NEXT_PUBLIC_DEFAULT_LOCALE: "ar",
  NEXT_PUBLIC_SITE_URL: "https://example.com",
};

describe("settings from .env (code rule 6)", () => {
  it("accepts a complete public configuration", () => {
    expect(parseEnv(publicEnvSchema, validPublicEnv).NEXT_PUBLIC_DEFAULT_LOCALE).toBe("ar");
  });

  it("names the variable when the WhatsApp number would produce a broken link", () => {
    expect(() =>
      parseEnv(publicEnvSchema, { ...validPublicEnv, NEXT_PUBLIC_WHATSAPP_NUMBER: "+966 50 000" }),
    ).toThrow(/NEXT_PUBLIC_WHATSAPP_NUMBER/);
  });

  it("rejects a default locale the site does not support", () => {
    expect(() => parseEnv(publicEnvSchema, { ...validPublicEnv, NEXT_PUBLIC_DEFAULT_LOCALE: "fr" })).toThrow(
      /NEXT_PUBLIC_DEFAULT_LOCALE/,
    );
  });

  it("fails with a clear message when MONGODB_URI is missing", () => {
    const saved = process.env.MONGODB_URI;
    delete process.env.MONGODB_URI;
    try {
      expect(() => getServerEnv()).toThrow(/MONGODB_URI/);
    } finally {
      if (saved !== undefined) process.env.MONGODB_URI = saved;
    }
  });
});
