import { daysFrom } from "@/features/demo-engine/storage/days-from";
import { dateKeyFromNow } from "../../../dates";
import type { Inquiry, Viewing } from "../../../types";

// Sample activity with dates relative to today. Every createdAt is in the past, whatever the time of day.
function hoursAgo(now: Date, hours: number): string {
  return new Date(now.getTime() - hours * 60 * 60 * 1000).toISOString();
}

export function createSampleViewings(now: Date): Viewing[] {
  return [
    {
      id: "view-1",
      propertyId: "hada-ridge-villa",
      unitId: "hr-1",
      name: "عبدالرحمن الشهري",
      phone: "+966 50 555 0301",
      date: dateKeyFromNow(now, 3),
      time: "10:30",
      note: "نرغب برؤية الموقع والمخططات.",
      status: "new",
      createdAt: hoursAgo(now, 4),
    },
    {
      id: "view-2",
      propertyId: "shati-sky-residence",
      unitId: "sk-1",
      name: "Lina Bakr",
      phone: "+966 55 555 0302",
      date: dateKeyFromNow(now, 2),
      time: "16:00",
      status: "new",
      createdAt: daysFrom(now, -2, "14:10"),
    },
    {
      id: "view-3",
      propertyId: "obhur-driftline",
      unitId: "od-1",
      name: "فيصل المالكي",
      phone: "+966 54 555 0303",
      date: dateKeyFromNow(now, 1),
      time: "12:00",
      status: "confirmed",
      createdAt: daysFrom(now, -3, "09:30"),
    },
    {
      id: "view-4",
      propertyId: "obhur-driftline",
      name: "Noor Al-Amri",
      phone: "+966 56 555 0304",
      date: dateKeyFromNow(now, 4),
      time: "17:30",
      status: "confirmed",
      createdAt: daysFrom(now, -4, "18:20"),
    },
    {
      id: "view-5",
      propertyId: "corniche-skyline-penthouse",
      name: "سلطان العتيبي",
      phone: "+966 59 555 0305",
      date: dateKeyFromNow(now, -3),
      time: "16:00",
      status: "done",
      createdAt: daysFrom(now, -7, "11:00"),
    },
  ];
}

export function createSampleInquiries(now: Date): Inquiry[] {
  return [
    {
      id: "inq-1",
      propertyId: "hada-stillwater-villa",
      unitId: "hs-1",
      kind: "brochure",
      name: "ريم الدوسري",
      phone: "+966 50 555 0401",
      message: "",
      status: "new",
      createdAt: hoursAgo(now, 6),
    },
    {
      id: "inq-2",
      propertyId: "shati-sky-residence",
      kind: "question",
      name: "Khaled Nasser",
      phone: "+966 55 555 0402",
      message: "Is the private lift included in the price, and when is the handover?",
      status: "new",
      createdAt: daysFrom(now, -2, "19:40"),
    },
    {
      id: "inq-3",
      propertyId: "obhur-shore-house",
      kind: "question",
      name: "هالة الجهني",
      phone: "+966 54 555 0403",
      message: "هل توجد خطة دفع على مراحل حتى التسليم؟",
      status: "replied",
      createdAt: daysFrom(now, -5, "13:15"),
    },
  ];
}
