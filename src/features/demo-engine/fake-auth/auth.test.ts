import { describe, expect, it } from "vitest";
import { eventInputSchema } from "@/features/tracking/types";
import { authTrackData, hashPassword, isLoginValid, registerAccount, sessionKey } from "./auth";
import { accountSchema } from "./types";

const sara = { name: "Sara", password: "secret123", businessName: "" };

describe("E1: register", () => {
  it("stores a SHA-256 hash, never the password", async () => {
    const result = await registerAccount(sara);
    if (!result.ok) throw new Error("registration should succeed");

    expect(result.account.passwordHash).toBe(await hashPassword("secret123"));
    expect(result.account.passwordHash).toMatch(/^[0-9a-f]{64}$/);
    expect(JSON.stringify(result.account)).not.toContain("secret123");
    expect(accountSchema.safeParse(result.account).success).toBe(true);
  });

  it("hashes to the known SHA-256 value", async () => {
    expect(await hashPassword("abc")).toBe(
      "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad",
    );
  });

  it("keeps the business name only when given", async () => {
    const without = await registerAccount(sara);
    const withName = await registerAccount({ ...sara, businessName: "  Zaytouna Grill  " });
    expect(without.ok && without.account.businessName).toBeFalsy();
    expect(withName.ok && withName.account.businessName).toBe("Zaytouna Grill");
  });

  it("rejects an empty name and a short password with an error for each field", async () => {
    const result = await registerAccount({ name: "  ", password: "123", businessName: "" });
    expect(result).toEqual({ ok: false, errors: { name: "nameRequired", password: "passwordTooShort" } });
  });
});

describe("E1: login", () => {
  it("accepts the right name and password", async () => {
    const result = await registerAccount(sara);
    if (!result.ok) throw new Error("registration should succeed");
    expect(await isLoginValid(result.account, { name: "sara ", password: "secret123" })).toBe(true);
  });

  it("rejects a wrong password, a wrong name, and a missing account", async () => {
    const result = await registerAccount(sara);
    if (!result.ok) throw new Error("registration should succeed");
    expect(await isLoginValid(result.account, { name: "Sara", password: "wrong-one" })).toBe(false);
    expect(await isLoginValid(result.account, { name: "Omar", password: "secret123" })).toBe(false);
    expect(await isLoginValid(null, { name: "Sara", password: "secret123" })).toBe(false);
  });

  it("keeps a separate session per template", () => {
    expect(sessionKey("restaurant-fine-dining")).not.toBe(sessionKey("restaurant-fast-food"));
  });
});

describe("E1: privacy, name and password never reach tracking", () => {
  it("the tracked payload holds only the template and locale", () => {
    const data = authTrackData("restaurant-fine-dining", "ar");
    expect(data).toEqual({ template: "restaurant-fine-dining", locale: "ar" });
    expect(
      eventInputSchema.safeParse({
        visitorId: crypto.randomUUID(),
        name: "demo_registered",
        page: "/ar/demos/restaurant/fine-dining/dashboard",
        ...data,
      }).success,
    ).toBe(true);
  });
});
