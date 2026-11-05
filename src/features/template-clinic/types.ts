import { z } from "zod";
import { accountSchema } from "@/features/demo-engine/fake-auth/types";
import { localizedTextSchema } from "@/features/demo-engine/types";

// Shared by both clinic variants. Every visible text is { ar, en }. Prices are whole riyals (SAR).

export const timeSchema = z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/);
export const dateKeySchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);

// One day of a weekly schedule: working hours, or null when the doctor does not work that day.
export const dayHoursSchema = z.object({ from: timeSchema, to: timeSchema }).nullable();
// Seven entries, index = weekday as in Date.getDay() (0 = Sunday).
export const scheduleSchema = z.array(dayHoursSchema).length(7);

export const slotLengths = [15, 20, 30, 45, 60] as const;

export const doctorSchema = z.object({
  id: z.string().min(1),
  name: localizedTextSchema,
  // e.g. "Consultant cardiologist"
  title: localizedTextSchema,
  departmentId: z.string().optional(),
  // a photo id from the variant's photo list
  photo: z.string().min(1),
  bio: localizedTextSchema,
  credentials: z.array(localizedTextSchema),
  years: z.number().int().min(0).max(60),
  slotMinutes: z.number().int().min(10).max(120),
  schedule: scheduleSchema,
});

export const departmentSchema = z.object({
  id: z.string().min(1),
  name: localizedTextSchema,
  description: localizedTextSchema,
});

export const treatmentSchema = z.object({
  id: z.string().min(1),
  name: localizedTextSchema,
  // who it is for
  description: localizedTextSchema,
  steps: z.array(localizedTextSchema),
  durationMinutes: z.number().int().positive().max(600),
  price: z.number().int().min(0).max(1_000_000),
  // true: shown as "from 1,450"
  fromPrice: z.boolean(),
  priceNote: localizedTextSchema,
  // a photo id from the variant's photo list; without it the site draws an illustration
  photo: z.string().optional(),
  departmentId: z.string().optional(),
});

export const appointmentStatuses = ["new", "confirmed", "done", "cancelled", "no_show"] as const;
export const appointmentStatusSchema = z.enum(appointmentStatuses);

export const appointmentSchema = z.object({
  id: z.string().min(1),
  doctorId: z.string().min(1),
  treatmentId: z.string().optional(),
  name: z.string().trim().min(1).max(80),
  phone: z.string().trim().min(1).max(30),
  date: dateKeySchema,
  time: timeSchema,
  note: z.string().max(300).optional(),
  status: appointmentStatusSchema,
  createdAt: z.iso.datetime(),
});

export const resultSchema = z.object({
  id: z.string().min(1),
  title: localizedTextSchema,
  caption: localizedTextSchema,
  // which illustration pair the gallery draws (0, 1, or 2)
  look: z.number().int().min(0).max(2),
  visible: z.boolean(),
});

export const faqSchema = z.object({
  id: z.string().min(1),
  question: localizedTextSchema,
  answer: localizedTextSchema,
});

export const testimonialSchema = z.object({
  id: z.string().min(1),
  name: localizedTextSchema,
  // e.g. "Full-arch restoration"
  context: localizedTextSchema,
  text: localizedTextSchema,
  visible: z.boolean(),
});

export const settingsSchema = z.object({
  businessName: localizedTextSchema,
  // true once the owner edits the name in Settings; until then the name given at register wins
  nameEdited: z.boolean(),
  palette: z.string(),
  phone: z.string(),
  whatsapp: z.string(),
  address: localizedTextSchema,
});

export const contentSchema = z.object({
  hero: z.object({ title: localizedTextSchema, subtitle: localizedTextSchema }),
  about: z.object({ title: localizedTextSchema, text: localizedTextSchema }),
  contact: z.object({ title: localizedTextSchema, text: localizedTextSchema }),
});

export const clinicDataSchema = z.object({
  account: accountSchema.nullable(),
  settings: settingsSchema,
  content: contentSchema,
  doctors: z.array(doctorSchema),
  departments: z.array(departmentSchema),
  treatments: z.array(treatmentSchema),
  appointments: z.array(appointmentSchema),
  results: z.array(resultSchema),
  faqs: z.array(faqSchema),
  testimonials: z.array(testimonialSchema),
  dismissedTips: z.array(z.string()),
});

export type DayHours = z.infer<typeof dayHoursSchema>;
export type Schedule = z.infer<typeof scheduleSchema>;
export type Doctor = z.infer<typeof doctorSchema>;
export type Department = z.infer<typeof departmentSchema>;
export type Treatment = z.infer<typeof treatmentSchema>;
export type AppointmentStatus = z.infer<typeof appointmentStatusSchema>;
export type Appointment = z.infer<typeof appointmentSchema>;
export type Result = z.infer<typeof resultSchema>;
export type Faq = z.infer<typeof faqSchema>;
export type Testimonial = z.infer<typeof testimonialSchema>;
export type Settings = z.infer<typeof settingsSchema>;
export type Content = z.infer<typeof contentSchema>;
export type ClinicData = z.infer<typeof clinicDataSchema>;
