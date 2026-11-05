import { describe, expect, it } from "vitest";
import { buildClients } from "./clients";
import { businessNameOf } from "@/features/demo-engine/fake-auth/business-name";
import { allowedQuoteStatuses, canMoveQuote, validateQuote } from "./quotes";
import { afterHoursFacts, staleQuoteFacts } from "./value-tips";
import type { Quote, Settings } from "./types";

function quote(patch: Partial<Quote>): Quote {
  return {
    id: "q1",
    name: "Nada",
    company: "",
    phone: "+966 50 000 0001",
    email: "",
    service: "air",
    message: "",
    status: "new",
    createdAt: "2026-11-08T09:00:00.000Z",
    estimate: null,
    ...patch,
  };
}

describe("L3: quote status", () => {
  it("follows new → quoted → won or lost", () => {
    expect(allowedQuoteStatuses("new")).toEqual(["quoted", "lost"]);
    expect(allowedQuoteStatuses("quoted")).toEqual(["won", "lost"]);
  });

  it("won and lost are final, and a new quote cannot be won without being quoted", () => {
    expect(allowedQuoteStatuses("won")).toEqual([]);
    expect(allowedQuoteStatuses("lost")).toEqual([]);
    expect(canMoveQuote("new", "won")).toBe(false);
    expect(canMoveQuote("quoted", "new")).toBe(false);
  });
});

describe("L2: quote form validation", () => {
  it("needs a name and a phone number", () => {
    expect(validateQuote({ name: " ", phone: "123", email: "" })).toEqual({ name: true, phone: true });
    expect(validateQuote({ name: "Nada", phone: "+966 50 123 4567", email: "" })).toEqual({});
  });

  it("the email is optional but must look like an address when given", () => {
    expect(validateQuote({ name: "Nada", phone: "0501234567", email: "nada@" })).toEqual({ email: true });
    expect(validateQuote({ name: "Nada", phone: "0501234567", email: "nada@shop.sa" })).toEqual({});
  });
});

describe("clients", () => {
  it("groups quotes by phone number; name and company come from the latest quote", () => {
    const clients = buildClients([
      quote({ id: "a", name: "Old Name", company: "Old Co", createdAt: "2026-11-01T09:00:00.000Z" }),
      quote({
        id: "b",
        name: "New Name",
        company: "New Co",
        phone: "966500000001",
        createdAt: "2026-11-05T09:00:00.000Z",
      }),
      quote({ id: "c", name: "Other", phone: "+966 55 999 8888", createdAt: "2026-11-03T09:00:00.000Z" }),
    ]);
    expect(clients).toHaveLength(2);
    expect(clients[0]).toMatchObject({ name: "New Name", company: "New Co", count: 2 });
    expect(clients[1]).toMatchObject({ name: "Other", count: 1 });
  });
});

describe("L11: quote value tips", () => {
  const settings: Pick<Settings, "officeOpen" | "officeClose"> = {
    officeOpen: "08:00",
    officeClose: "17:00",
  };

  it("a quote that arrived on a Friday or after 17:00 is an after-hours fact; one during office hours is not", () => {
    // 2026-11-06 is a Friday, 2026-11-08 is a Sunday
    const friday = quote({ id: "fri", createdAt: new Date(2026, 10, 6, 11, 0).toISOString() });
    const sundayLate = quote({ id: "late", createdAt: new Date(2026, 10, 8, 22, 30).toISOString() });
    const sundayOpen = quote({ id: "open", createdAt: new Date(2026, 10, 8, 10, 0).toISOString() });
    const facts = afterHoursFacts([friday, sundayLate, sundayOpen], settings);
    expect(facts.map((fact) => fact.id)).toEqual(["afterHours:late", "afterHours:fri"]);
  });

  it("a new quote waiting 24 hours or more is stale; answered or recent ones are not", () => {
    const now = new Date("2026-11-10T12:00:00.000Z");
    const facts = staleQuoteFacts(
      [
        quote({ id: "old", createdAt: "2026-11-08T12:00:00.000Z" }),
        quote({ id: "recent", createdAt: "2026-11-10T08:00:00.000Z" }),
        quote({ id: "answered", status: "quoted", createdAt: "2026-11-01T12:00:00.000Z" }),
      ],
      now,
    );
    expect(facts).toMatchObject([{ id: "staleQuote:old", amount: 48 }]);
  });
});

describe("business name at register", () => {
  const settings = {
    businessName: { ar: "جسر كارجو", en: "Jisr Cargo" },
    nameEdited: false,
  } as Settings;
  const account = { name: "Sara", passwordHash: "a".repeat(64), businessName: "Dar Sara" };

  it("replaces the seed name in both languages", () => {
    expect(businessNameOf({ account, settings }, "en")).toBe("Dar Sara");
    expect(businessNameOf({ account, settings }, "ar")).toBe("Dar Sara");
  });

  it("the seed name stays when no business name was given, and Settings wins after an edit", () => {
    expect(businessNameOf({ account: { ...account, businessName: undefined }, settings }, "ar")).toBe(
      "جسر كارجو",
    );
    expect(businessNameOf({ account, settings: { ...settings, nameEdited: true } }, "en")).toBe("Jisr Cargo");
  });
});
