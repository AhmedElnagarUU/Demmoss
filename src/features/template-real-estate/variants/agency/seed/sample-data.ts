import { daysFrom } from "@/features/demo-engine/storage/days-from";
import { dateKeyFromNow } from "@/features/demo-engine/format/dates";
import type { Inquiry, Viewing } from "../../../types";

// Sample activity with dates relative to today, so the dashboard is never empty and never old.
// Every createdAt is in the past, whatever the time of day.
function hoursAgo(now: Date, hours: number): string {
  return new Date(now.getTime() - hours * 60 * 60 * 1000).toISOString();
}

export function createSampleViewings(now: Date): Viewing[] {
  return [
    {
      id: "view-1",
      propertyId: "alder-lane",
      name: "ماجد العتيبي",
      phone: "+966 50 555 0101",
      date: dateKeyFromNow(now, 2),
      time: "17:30",
      note: "نرغب بزيارة العائلة كاملة.",
      status: "new",
      createdAt: hoursAgo(now, 3),
    },
    {
      id: "view-2",
      propertyId: "cypress-court",
      name: "ريم الغامدي",
      phone: "+966 55 555 0102",
      date: dateKeyFromNow(now, 3),
      time: "16:00",
      status: "new",
      createdAt: daysFrom(now, -2, "11:20"),
    },
    {
      id: "view-3",
      propertyId: "quay-street",
      name: "Sultan Al-Mutairi",
      phone: "+966 54 555 0103",
      date: dateKeyFromNow(now, 1),
      time: "12:00",
      status: "confirmed",
      createdAt: daysFrom(now, -2, "09:40"),
    },
    {
      id: "view-4",
      propertyId: "cypress-court",
      name: "حنان الزهراني",
      phone: "+966 50 555 0104",
      date: dateKeyFromNow(now, 4),
      time: "10:30",
      status: "confirmed",
      createdAt: daysFrom(now, -3, "15:05"),
    },
    {
      id: "view-5",
      propertyId: "mill-yard",
      name: "Abdulaziz Al-Shammari",
      phone: "+966 56 555 0105",
      date: dateKeyFromNow(now, -2),
      time: "16:00",
      status: "done",
      createdAt: daysFrom(now, -6, "10:00"),
    },
    {
      id: "view-6",
      propertyId: "birch-road",
      name: "دلال العنزي",
      phone: "+966 59 555 0106",
      date: dateKeyFromNow(now, -1),
      time: "12:00",
      status: "no_show",
      createdAt: daysFrom(now, -5, "13:30"),
    },
  ];
}

export function createSampleInquiries(now: Date): Inquiry[] {
  return [
    {
      id: "inq-1",
      propertyId: "alder-lane",
      kind: "question",
      name: "نواف الراشد",
      phone: "+966 50 555 0201",
      message: "هل السعر قابل للتفاوض؟ وهل الفيلا جاهزة للسكن فورًا؟",
      status: "new",
      createdAt: hoursAgo(now, 5),
    },
    {
      id: "inq-2",
      kind: "valuation",
      name: "Hessa Al-Subaie",
      phone: "+966 55 555 0202",
      message: "أرغب بتقييم بيتي في المدينة القديمة قبل عرضه للبيع.",
      status: "new",
      createdAt: daysFrom(now, -2, "20:15"),
    },
    {
      id: "inq-3",
      propertyId: "quay-street",
      kind: "question",
      name: "Omar Al-Khalidi",
      phone: "+966 54 555 0203",
      message: "Can the yearly rent be paid in two instalments?",
      status: "replied",
      createdAt: daysFrom(now, -3, "17:45"),
    },
    {
      id: "inq-4",
      propertyId: "mill-yard",
      kind: "question",
      name: "منيرة السهلي",
      phone: "+966 56 555 0204",
      message: "ما هي رسوم الصيانة السنوية للمجمع؟",
      status: "closed",
      createdAt: daysFrom(now, -8, "12:10"),
    },
  ];
}
