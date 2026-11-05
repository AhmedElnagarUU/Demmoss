import { beforeEach, describe, expect, it, vi } from "vitest";
import { createFakeStorage } from "../../../../../tests/helpers/storage";

// The store reads window.localStorage when it is created, so a fake one is installed first.
const storage = createFakeStorage();
vi.stubGlobal("window", { localStorage: storage });
const { useMedicalCentreStore } = await import("./store");

const account = { name: "Sara", passwordHash: "a".repeat(64), businessName: "Noor" };
const store = () => useMedicalCentreStore.getState();
const request = {
  doctorId: "huda-saeed",
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

describe("C4, C5: appointments", () => {
  it("a new appointment arrives first with status new and a trimmed name", () => {
    const before = store().appointments.length;
    const id = store().addAppointment(request, new Date(2026, 10, 4, 12, 0));
    expect(store().appointments[0]).toMatchObject({ id, status: "new", name: "Nada", time: "10:30" });
    expect(store().appointments).toHaveLength(before + 1);
  });

  it("status follows new → confirmed → done and ignores a forbidden jump", () => {
    const id = store().addAppointment(request);
    store().setAppointmentStatus(id, "done");
    expect(store().appointments[0]?.status).toBe("new");
    store().setAppointmentStatus(id, "confirmed");
    store().setAppointmentStatus(id, "done");
    expect(store().appointments[0]?.status).toBe("done");
    store().setAppointmentStatus(id, "confirmed");
    expect(store().appointments[0]?.status).toBe("done");
  });
});

describe("C7, C8, C12: owner edits", () => {
  it("C7: changing a treatment price changes the stored price list", () => {
    const treatments = store().treatments.map((item) =>
      item.id === "child-consult" ? { ...item, price: 260 } : item,
    );
    store().setTreatments(treatments);
    expect(store().treatments.find((item) => item.id === "child-consult")?.price).toBe(260);
  });

  it("C8: a doctor's hours can be replaced", () => {
    const doctor = store().doctors[0];
    if (!doctor) throw new Error("seed has a doctor");
    store().setDoctors([{ ...doctor, schedule: doctor.schedule.map(() => null) }]);
    expect(store().doctors[0]?.schedule.every((day) => day === null)).toBe(true);
  });

  it("editing the name in Settings marks it as edited, other settings do not", () => {
    expect(store().settings.nameEdited).toBe(false);
    store().updateSettings({ phone: "123" });
    expect(store().settings.nameEdited).toBe(false);
    store().updateSettings({ businessName: { ar: "س", en: "S" } });
    expect(store().settings.nameEdited).toBe(true);
  });

  it("tips can be dismissed once", () => {
    store().dismissTip("noShows");
    store().dismissTip("noShows");
    expect(store().dismissedTips).toEqual(["noShows"]);
  });
});

describe("E3: reset", () => {
  it("reset restores the seed and keeps the account", () => {
    store().setAccount(account);
    store().addAppointment(request);
    store().setTreatments([]);
    store().resetDemo();
    expect(store().account).toEqual(account);
    expect(store().treatments.length).toBeGreaterThan(0);
    expect(store().appointments.some((item) => item.name === "Nada")).toBe(false);
  });
});
