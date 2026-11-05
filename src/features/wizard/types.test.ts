import { describe, expect, it } from "vitest";
import { fieldErrorsOf, leadInputSchema } from "./types";

const contact = {
  name: "Sara",
  whatsapp: "+966500000000",
  locale: "ar",
  visitorId: "7d444840-9dc0-41bc-8d6e-1b4a2e6c3a11",
};

function errorsOf(input: unknown) {
  const result = leadInputSchema.safeParse(input);
  return result.success ? null : fieldErrorsOf(result.error);
}

describe("lead input", () => {
  it("W1: accepts the four types when their details are given", () => {
    expect(errorsOf({ ...contact, type: "business", field: "restaurant" })).toBeNull();
    expect(errorsOf({ ...contact, type: "system", idea: "A system to manage my deliveries" })).toBeNull();
    expect(errorsOf({ ...contact, type: "saas", idea: "A tool that schedules social posts" })).toBeNull();
    expect(errorsOf({ ...contact, type: "other", idea: "Not sure yet, I need advice" })).toBeNull();
    expect(errorsOf({ ...contact, type: "mobile-app", idea: "A system to manage my deliveries" })).toEqual({
      type: expect.any(String),
    });
  });

  it("W2: a business website needs a known category, or 'other' with a description", () => {
    expect(errorsOf({ ...contact, type: "business" })).toHaveProperty("field");
    expect(errorsOf({ ...contact, type: "business", field: "space-travel" })).toHaveProperty("field");
    expect(errorsOf({ ...contact, type: "business", field: "other" })).toHaveProperty("idea");
    expect(errorsOf({ ...contact, type: "business", field: "other", idea: "Pet grooming salon" })).toBeNull();
  });

  it("W3: a system, SaaS or other idea must be 10 to 1000 characters", () => {
    for (const type of ["system", "saas", "other"]) {
      expect(errorsOf({ ...contact, type })).toHaveProperty("idea");
      expect(errorsOf({ ...contact, type, idea: "too short" })).toHaveProperty("idea");
      expect(errorsOf({ ...contact, type, idea: "x".repeat(1001) })).toHaveProperty("idea");
      expect(errorsOf({ ...contact, type, idea: "x".repeat(1000) })).toBeNull();
    }
  });

  it("W3: the name is 2 to 80 characters", () => {
    const business = { ...contact, type: "business", field: "clinic" };
    expect(errorsOf({ ...business, name: "A" })).toHaveProperty("name");
    expect(errorsOf({ ...business, name: "  " })).toHaveProperty("name");
    expect(errorsOf({ ...business, name: "x".repeat(81) })).toHaveProperty("name");
  });

  it("W3: the WhatsApp number is 8 to 15 digits with an optional leading +", () => {
    const business = { ...contact, type: "business", field: "clinic" };
    for (const whatsapp of ["+966500000000", "966500000000", "12345678", "123456789012345"]) {
      expect(errorsOf({ ...business, whatsapp }), whatsapp).toBeNull();
    }
    for (const whatsapp of ["1234567", "1234567890123456", "05x0000000", "966+500000000", ""]) {
      expect(errorsOf({ ...business, whatsapp }), whatsapp).toHaveProperty("whatsapp");
    }
  });

  it("W3: spaces and dashes typed in the number are removed before saving", () => {
    const result = leadInputSchema.parse({
      ...contact,
      type: "business",
      field: "clinic",
      whatsapp: "+966 50-000 0000",
    });
    expect(result.whatsapp).toBe("+966500000000");
  });

  it("W3: email is optional but must be an email when given", () => {
    const business = { ...contact, type: "business", field: "clinic" };
    expect(errorsOf({ ...business, email: "sara@example.com" })).toBeNull();
    expect(errorsOf({ ...business, email: "sara" })).toHaveProperty("email");
  });
});
