import { daysFrom } from "@/features/demo-engine/storage/days-from";
import type { Quote } from "../../../types";

// Sample activity so the dashboard is never empty. All dates are relative to today and always in the past.
// One quote arrived at night (a value tip) and one new quote has waited for days.
// The monthly totals are what the estimator gives with the seed rates (a test checks it).

export function createSampleQuotes(now: Date): Quote[] {
  return [
    {
      id: "quote-1",
      name: "Sultan Al-Mutairi",
      company: "Zahra Home Brands",
      phone: "+966 50 777 1101",
      email: "sultan@zahra.example",
      service: "storage_picking",
      message: "We sell home goods online and need pallets plus picking before the next sale season.",
      status: "new",
      createdAt: daysFrom(now, -1, "22:40"),
      estimate: {
        kind: "storage",
        pallets: 60,
        months: 6,
        ordersPerMonth: 400,
        insurance: false,
        monthlyTotal: 3647.6,
      },
    },
    {
      id: "quote-2",
      name: "Hanan Al-Zahrani",
      company: "Sama Kids",
      phone: "+966 55 888 2202",
      email: "",
      service: "returns",
      message: "About 300 returned items a month need inspection and restocking.",
      status: "new",
      createdAt: daysFrom(now, -2, "13:30"),
      estimate: null,
    },
    {
      id: "quote-3",
      name: "Dalal Al-Shehri",
      company: "Nakhla Dates",
      phone: "+966 54 999 3303",
      email: "dalal@nakhla.example",
      service: "storage",
      message: "Dates in cartons, with batch and expiry tracking.",
      status: "quoted",
      createdAt: daysFrom(now, -3, "10:00"),
      estimate: {
        kind: "storage",
        pallets: 25,
        months: 12,
        ordersPerMonth: 0,
        insurance: true,
        monthlyTotal: 1200,
      },
    },
    {
      id: "quote-4",
      name: "Majed Al-Anazi",
      company: "Rimal Electronics",
      phone: "+966 56 111 4404",
      email: "",
      service: "full_3pl",
      message: "",
      status: "won",
      createdAt: daysFrom(now, -8, "09:15"),
      estimate: {
        kind: "storage",
        pallets: 120,
        months: 12,
        ordersPerMonth: 1500,
        insurance: true,
        monthlyTotal: 9353.52,
      },
    },
    {
      id: "quote-5",
      name: "Turki Al-Subaie",
      company: "Bayt Coffee",
      phone: "+966 50 222 5505",
      email: "",
      service: "storage",
      message: "Only ten pallets for a few months.",
      status: "lost",
      createdAt: daysFrom(now, -12, "11:10"),
      estimate: {
        kind: "storage",
        pallets: 10,
        months: 3,
        ordersPerMonth: 0,
        insurance: false,
        monthlyTotal: 1200,
      },
    },
  ];
}
