import { describe, expect, it } from "vitest";
import { groupPatients, patientKey } from "./patients";
import type { Appointment } from "./types";

const make = (over: Partial<Appointment>): Appointment => ({
  id: "a",
  doctorId: "d1",
  name: "Sara",
  phone: "966501234567",
  date: "2026-11-01",
  time: "09:00",
  status: "done",
  createdAt: "2026-10-30T10:00:00.000Z",
  ...over,
});

describe("C6: patients are built from appointments", () => {
  it("the same phone written two ways is one patient", () => {
    expect(patientKey("0501234567")).toBe(patientKey("+966 50 123 4567"));
  });

  it("groups by phone and counts visits, no shows, last visit, and next appointment", () => {
    const patients = groupPatients(
      [
        make({ id: "1", date: "2026-10-01", status: "done" }),
        make({
          id: "2",
          phone: "0501234567",
          date: "2026-10-20",
          status: "done",
          createdAt: "2026-10-18T10:00:00.000Z",
        }),
        make({ id: "3", date: "2026-10-25", status: "no_show", createdAt: "2026-10-22T10:00:00.000Z" }),
        make({ id: "4", date: "2026-11-10", status: "confirmed", createdAt: "2026-11-01T10:00:00.000Z" }),
        make({ id: "5", date: "2026-11-12", status: "cancelled", createdAt: "2026-11-02T10:00:00.000Z" }),
      ],
      "2026-11-04",
    );
    expect(patients).toHaveLength(1);
    expect(patients[0]).toMatchObject({
      requests: 5,
      visits: 2,
      noShows: 1,
      lastVisit: "2026-10-20",
      nextAppointment: "2026-11-10",
    });
  });

  it("separates different phones and lists the most recently active first", () => {
    const patients = groupPatients(
      [
        make({ id: "1", name: "Old", phone: "966500000001", createdAt: "2026-10-01T10:00:00.000Z" }),
        make({
          id: "2",
          name: "New",
          phone: "966500000002",
          createdAt: "2026-11-01T10:00:00.000Z",
          status: "new",
        }),
      ],
      "2026-11-04",
    );
    expect(patients.map((patient) => patient.name)).toEqual(["New", "Old"]);
    expect(patients[0]?.lastVisit).toBeNull();
  });

  it("no appointments, no patients", () => {
    expect(groupPatients([], "2026-11-04")).toEqual([]);
  });
});
