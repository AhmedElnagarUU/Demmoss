import { beforeEach, describe, expect, it, vi } from "vitest";
import { createFakeStorage } from "../../../../../tests/helpers/storage";
import type { Property } from "../../types";
import { seedProperties } from "./seed/properties";

// The store reads window.localStorage when it is created, so a fake one is installed first.
const storage = createFakeStorage();
vi.stubGlobal("window", { localStorage: storage });
const { useAgencyStore } = await import("./store");

const account = { name: "Sara", passwordHash: "a".repeat(64), businessName: "Hartwell Sara" };
const store = () => useAgencyStore.getState();

const request = {
  propertyId: "alder-lane",
  name: "  Nada  ",
  phone: "966500000009",
  date: "2026-11-10",
  time: "10:30",
};

beforeEach(() => {
  storage.clear();
  store().resetDemo();
  store().setAccount(null);
});

describe("RE3, RE7: viewings", () => {
  it("a new viewing arrives first with status new and a trimmed name", () => {
    const before = store().viewings.length;
    const id = store().addViewing(request, new Date(2026, 10, 4, 12, 0));
    expect(store().viewings[0]).toMatchObject({ id, status: "new", name: "Nada", time: "10:30" });
    expect(store().viewings).toHaveLength(before + 1);
  });

  it("RE8: status follows new → confirmed → done and ignores a forbidden jump", () => {
    const id = store().addViewing(request);
    store().setViewingStatus(id, "done");
    expect(store().viewings[0]?.status).toBe("new");
    store().setViewingStatus(id, "confirmed");
    store().setViewingStatus(id, "done");
    expect(store().viewings[0]?.status).toBe("done");
    store().setViewingStatus(id, "confirmed");
    expect(store().viewings[0]?.status).toBe("done");
  });
});

describe("RE4, RE9: inquiries", () => {
  it("an inquiry goes new → replied → closed", () => {
    const id = store().addInquiry({ kind: "valuation", name: "Huda", phone: "966507654321", message: "" });
    expect(store().inquiries[0]).toMatchObject({ id, status: "new", kind: "valuation" });
    store().setInquiryStatus(id, "replied");
    store().setInquiryStatus(id, "closed");
    store().setInquiryStatus(id, "replied");
    expect(store().inquiries[0]?.status).toBe("closed");
  });
});

describe("RE10: properties, agents, testimonials", () => {
  const draft = () => ({
    ...structuredClone(seedProperties[0] as Property),
    id: undefined,
  });

  it("adds a property first, edits it, and removes it", () => {
    const id = store().addProperty({ ...draft(), title: { ar: "جديد", en: "New" } });
    expect(store().properties[0]?.id).toBe(id);
    store().replaceProperty(id, { ...draft(), title: { ar: "معدّل", en: "Edited" }, price: 999_000 });
    expect(store().properties[0]).toMatchObject({ id, price: 999_000, title: { en: "Edited" } });
    store().removeProperty(id);
    expect(store().properties.some((property) => property.id === id)).toBe(false);
  });

  it("removing an agent clears the agent from their properties", () => {
    store().removeAgent("edward");
    expect(store().agents.some((agent) => agent.id === "edward")).toBe(false);
    expect(store().properties.filter((property) => property.agentId === "edward")).toEqual([]);
    expect(store().properties.find((property) => property.id === "alder-lane")).toBeDefined();
  });

  it("hides a testimonial without deleting it", () => {
    store().updateTestimonial("t-maya", { visible: false });
    expect(store().testimonials.find((item) => item.id === "t-maya")?.visible).toBe(false);
  });

  it("RE13: editing the name in Settings marks it as edited", () => {
    expect(store().settings.nameEdited).toBe(false);
    store().updateSettings({ phone: "123" });
    expect(store().settings.nameEdited).toBe(false);
    store().updateSettings({ businessName: { ar: "س", en: "S" } });
    expect(store().settings.nameEdited).toBe(true);
  });

  it("tips can be dismissed once", () => {
    store().dismissTip("viewingWaiting:view-2");
    store().dismissTip("viewingWaiting:view-2");
    expect(store().dismissedTips).toEqual(["viewingWaiting:view-2"]);
  });
});

describe("E3: reset", () => {
  it("reset restores the seed and keeps the account", () => {
    store().setAccount(account);
    store().addViewing(request);
    store().removeProperty("alder-lane");
    store().resetDemo();
    expect(store().account).toEqual(account);
    expect(store().properties.some((property) => property.id === "alder-lane")).toBe(true);
    expect(store().viewings.some((viewing) => viewing.name === "Nada")).toBe(false);
  });
});
