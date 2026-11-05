import { describe, expect, it } from "vitest";
import {
  bookableDates,
  combinedSchedule,
  freeTimes,
  nextFreeSlot,
  slotTimes,
  validateBooking,
} from "./booking";
import type { Appointment, Doctor } from "./types";

const open = { from: "09:00", to: "11:00" };
// Works Sunday to Thursday, closed Friday and Saturday.
const doctor: Doctor = {
  id: "d1",
  name: { ar: "د", en: "Dr" },
  title: { ar: "ط", en: "T" },
  photo: "p",
  bio: { ar: "", en: "" },
  credentials: [],
  years: 5,
  slotMinutes: 30,
  schedule: [open, open, open, open, open, null, null],
};
// Wednesday 2026-11-04, 08:00
const now = new Date(2026, 10, 4, 8, 0);

const appointment = (over: Partial<Appointment>): Appointment => ({
  id: "a",
  doctorId: "d1",
  name: "Sara",
  phone: "966500000001",
  date: "2026-11-04",
  time: "09:00",
  status: "new",
  createdAt: "2026-11-03T10:00:00.000Z",
  ...over,
});

describe("C1, C8: free times come from the weekly schedule", () => {
  it("slotTimes: the last appointment ends by closing time", () => {
    expect(slotTimes(open, 30)).toEqual(["09:00", "09:30", "10:00", "10:30"]);
    expect(slotTimes({ from: "09:00", to: "09:20" }, 30)).toEqual([]);
  });

  it("offers every slot on a working day", () => {
    expect(freeTimes({ doctor, dateKey: "2026-11-04", appointments: [], now })).toHaveLength(4);
  });

  it("hides times that already passed today", () => {
    const later = new Date(2026, 10, 4, 9, 45);
    expect(freeTimes({ doctor, dateKey: "2026-11-04", appointments: [], now: later })).toEqual([
      "10:00",
      "10:30",
    ]);
  });

  it("hides a time held by a new or confirmed appointment, but not a cancelled or no-show one", () => {
    const times = (status: Appointment["status"]) =>
      freeTimes({ doctor, dateKey: "2026-11-04", appointments: [appointment({ status })], now });
    expect(times("new")).not.toContain("09:00");
    expect(times("confirmed")).not.toContain("09:00");
    expect(times("cancelled")).toContain("09:00");
    expect(times("no_show")).toContain("09:00");
  });

  it("another doctor's appointment does not take this doctor's slot", () => {
    const other = appointment({ doctorId: "d2" });
    expect(freeTimes({ doctor, dateKey: "2026-11-04", appointments: [other], now })).toContain("09:00");
  });

  it("closed days and days beyond two weeks have no times", () => {
    expect(freeTimes({ doctor, dateKey: "2026-11-06", appointments: [], now })).toEqual([]);
    expect(freeTimes({ doctor, dateKey: "2026-12-30", appointments: [], now })).toEqual([]);
    expect(bookableDates(doctor, now)).not.toContain("2026-11-06");
    expect(bookableDates(doctor, now)).toHaveLength(10);
  });

  it("C8: changing the schedule changes the free times", () => {
    const shorter = { ...doctor, schedule: doctor.schedule.map(() => ({ from: "09:00", to: "10:00" })) };
    expect(freeTimes({ doctor: shorter, dateKey: "2026-11-04", appointments: [], now })).toEqual([
      "09:00",
      "09:30",
    ]);
  });

  it("nextFreeSlot skips a full day", () => {
    const full = ["09:00", "09:30", "10:00", "10:30"].map((time, index) =>
      appointment({ id: String(index), time }),
    );
    expect(nextFreeSlot(doctor, full, now)).toEqual({ dateKey: "2026-11-05", time: "09:00" });
  });

  it("combinedSchedule spans the earliest opening to the latest closing", () => {
    const evening = {
      ...doctor,
      schedule: [{ from: "14:00", to: "21:00" }, null, null, null, null, null, null],
    };
    expect(combinedSchedule([doctor, evening])[0]).toEqual({ from: "09:00", to: "21:00" });
    expect(combinedSchedule([doctor, evening])[6]).toBeNull();
  });
});

describe("C1: validateBooking", () => {
  const input = { doctor, dateKey: "2026-11-05", time: "09:30", name: "Sara", phone: "966500000001" };
  const context = { appointments: [], now };

  it("accepts a free time", () => {
    expect(validateBooking(input, context)).toEqual({});
  });

  it("rejects a taken time, a missing name, and a bad phone", () => {
    const taken = [appointment({ date: "2026-11-05", time: "09:30" })];
    expect(validateBooking(input, { ...context, appointments: taken })).toEqual({ time: true });
    expect(validateBooking({ ...input, name: " ", phone: "12" }, context)).toEqual({
      name: true,
      phone: true,
    });
  });

  it("rejects a closed day and a missing doctor", () => {
    expect(validateBooking({ ...input, dateKey: "2026-11-06" }, context)).toMatchObject({
      date: true,
      time: true,
    });
    expect(validateBooking({ ...input, doctor: undefined }, context)).toMatchObject({ doctor: true });
  });
});
