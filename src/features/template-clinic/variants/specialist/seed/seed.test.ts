import { describe, expect, it } from "vitest";
import { hoursOn, slotTimes } from "../../../booking";
import { clinicDataSchema } from "../../../types";
import { isActiveAppointment } from "../../../appointment-status";
import { allTipFacts } from "../../../value-tips";
import { specialistPhotos } from "../photos";
import { createSpecialistSeed } from ".";

const arabicLetters = /[؀-ۿ]/;
const morning = new Date(2026, 10, 4, 0, 30);
const evening = new Date(2026, 10, 4, 23, 59);

describe("Dr. Al Harthi seed", () => {
  it("is valid for the store schema, at any time of the day", () => {
    expect(clinicDataSchema.safeParse(createSpecialistSeed(morning)).success).toBe(true);
    expect(clinicDataSchema.safeParse(createSpecialistSeed(evening)).success).toBe(true);
  });

  it("starts with sample activity in several statuses so the dashboard is never empty", () => {
    const seed = createSpecialistSeed(evening);
    expect(seed.appointments.length).toBeGreaterThanOrEqual(9);
    expect(new Set(seed.appointments.map((item) => item.status)).size).toBe(5);
    expect(seed.account).toBeNull();
  });

  it("sample requests are never created in the future", () => {
    for (const now of [morning, evening]) {
      for (const item of createSpecialistSeed(now).appointments) {
        expect(new Date(item.createdAt).getTime()).toBeLessThan(now.getTime());
      }
    }
  });

  it("every appointment is on a working day, on a real slot, and no two active ones share a slot", () => {
    for (const now of [morning, evening, new Date(2026, 10, 6, 12), new Date(2026, 10, 7, 12)]) {
      const seed = createSpecialistSeed(now);
      const taken = new Set<string>();
      for (const item of seed.appointments) {
        const doctor = seed.doctors.find((entry) => entry.id === item.doctorId);
        const hours = doctor ? hoursOn(doctor, item.date) : null;
        expect(hours).not.toBeNull();
        if (!doctor || !hours) continue;
        expect(slotTimes(hours, doctor.slotMinutes)).toContain(item.time);
        if (isActiveAppointment(item.status)) {
          const key = `${item.doctorId}|${item.date}|${item.time}`;
          expect(taken.has(key)).toBe(false);
          taken.add(key);
        }
      }
    }
  });

  it("C9: the sample data is enough to show value tips", () => {
    const seed = createSpecialistSeed(evening);
    const keys = allTipFacts(seed, evening).map((fact) => fact.key);
    expect(keys).toEqual(expect.arrayContaining(["waiting", "afterHours", "noShows", "popularTreatment"]));
  });

  it("every photo, department, doctor, and treatment reference points to something that exists", () => {
    const seed = createSpecialistSeed(morning);
    const photoIds = specialistPhotos.map((photo) => photo.id);
    const departmentIds = seed.departments.map((item) => item.id);
    for (const doctor of seed.doctors) {
      expect(photoIds).toContain(doctor.photo);
      if (doctor.departmentId) expect(departmentIds).toContain(doctor.departmentId);
    }
    for (const treatment of seed.treatments) {
      if (treatment.photo) expect(photoIds).toContain(treatment.photo);
      if (treatment.departmentId) expect(departmentIds).toContain(treatment.departmentId);
    }
    for (const item of seed.appointments) {
      expect(seed.doctors.map((doctor) => doctor.id)).toContain(item.doctorId);
      if (item.treatmentId)
        expect(seed.treatments.map((treatment) => treatment.id)).toContain(item.treatmentId);
    }
  });

  it("C10: Arabic texts are written in Arabic and every text exists in both languages", () => {
    const seed = createSpecialistSeed(morning);
    const texts = [
      seed.settings.businessName,
      seed.content.hero.title,
      seed.content.about.text,
      ...seed.treatments.map((item) => item.name),
      ...seed.faqs.map((item) => item.answer),
      ...seed.testimonials.map((item) => item.text),
    ];
    for (const text of texts) {
      expect(arabicLetters.test(text.ar)).toBe(true);
      expect(text.en.trim()).not.toBe("");
    }
  });
});
