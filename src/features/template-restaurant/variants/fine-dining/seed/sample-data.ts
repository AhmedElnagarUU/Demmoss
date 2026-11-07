import { daysFrom } from "@/features/demo-engine/storage/days-from";
import { dateKeyFromNow } from "@/features/demo-engine/format/dates";
import type { EventRequest } from "../../../modules/event-requests/types";
import type { Reservation, ReservationSettings } from "../../../modules/reservations/types";

// Sample activity so the dashboard is never empty. All dates are relative to today.
// Requests are created "yesterday" or earlier, so they are always in the past.

export const seedReservationSettings: ReservationSettings = {
  slotMinutes: 90,
  slots: ["11:00", "12:30", "14:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00"],
  maxGuestsPerSlot: 30,
};

export function createSampleReservations(now: Date): Reservation[] {
  return [
    {
      id: "res-1",
      date: dateKeyFromNow(now, -1),
      time: "19:30",
      guests: 4,
      name: "Yasser Al-Qahtani",
      phone: "+966 50 111 2201",
      status: "seated",
      createdAt: daysFrom(now, -3, "16:20"),
    },
    {
      id: "res-2",
      date: dateKeyFromNow(now, -1),
      time: "21:00",
      guests: 2,
      name: "Hind Al-Mutairi",
      phone: "+966 50 222 3302",
      status: "no_show",
      createdAt: daysFrom(now, -2, "10:05"),
    },
    {
      id: "res-3",
      date: dateKeyFromNow(now, 0),
      time: "21:00",
      guests: 6,
      name: "Yasser Al-Qahtani",
      phone: "+966 50 111 2201",
      status: "confirmed",
      createdAt: daysFrom(now, -1, "13:40"),
    },
    {
      id: "res-4",
      date: dateKeyFromNow(now, 0),
      time: "19:30",
      guests: 3,
      name: "Majed Al-Dossary",
      phone: "+966 55 333 4403",
      status: "cancelled",
      createdAt: daysFrom(now, -1, "20:10"),
    },
    {
      id: "res-5",
      date: dateKeyFromNow(now, 1),
      time: "19:30",
      guests: 2,
      name: "Lama Haddad",
      phone: "+966 56 444 5504",
      status: "new",
      createdAt: daysFrom(now, -1, "22:15"),
    },
    {
      id: "res-6",
      date: dateKeyFromNow(now, 2),
      time: "21:00",
      guests: 4,
      name: "Nada Al-Zahrani",
      phone: "+966 50 555 6605",
      occasion: "birthday",
      note: "A small birthday cake for my daughter, please.",
      status: "new",
      createdAt: daysFrom(now, -1, "23:50"),
    },
    {
      id: "res-7",
      date: dateKeyFromNow(now, 3),
      time: "19:30",
      guests: 8,
      name: "Tariq Mansour",
      phone: "+966 54 666 7706",
      status: "confirmed",
      createdAt: daysFrom(now, -2, "11:30"),
    },
    {
      id: "res-8",
      date: dateKeyFromNow(now, 5),
      time: "18:00",
      guests: 2,
      name: "Salma Al-Harbi",
      phone: "+966 53 777 8807",
      occasion: "anniversary",
      status: "new",
      createdAt: daysFrom(now, -1, "21:40"),
    },
  ];
}

export function createSampleEventRequests(now: Date): EventRequest[] {
  return [
    {
      id: "event-1",
      type: "business",
      date: dateKeyFromNow(now, 21),
      guests: 18,
      budget: "5000_10000",
      name: "Walid Nasser",
      phone: "+966 50 888 9908",
      details: "Quarterly dinner for our sales team, with a set menu and a short presentation.",
      status: "new",
      createdAt: daysFrom(now, -1, "18:30"),
    },
    {
      id: "event-2",
      type: "engagement",
      date: dateKeyFromNow(now, 40),
      guests: 20,
      budget: "over_10000",
      name: "Maha Al-Shehri",
      phone: "+966 59 999 1019",
      details: "عشاء خطوبة للعائلة المقربة مع تنسيق ورد وطاولة حلويات.",
      status: "replied",
      createdAt: daysFrom(now, -4, "12:15"),
    },
  ];
}
