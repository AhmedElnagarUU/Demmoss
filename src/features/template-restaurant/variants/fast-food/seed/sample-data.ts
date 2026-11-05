import { daysFrom } from "@/features/demo-engine/storage/days-from";
import type { Area } from "../../../modules/areas/types";
import type { Offer } from "../../../modules/offers/types";
import { orderTotals } from "../../../modules/orders/totals";
import type { Order, OrderLine, OrderStatus, OrderType, PaymentMethod } from "../../../modules/orders/types";
import { seedMenu } from "./menu";

// Sample activity so the dashboard is never empty. All dates are relative to today.
// Orders are created in the past (minutes or days before "now"), so they are never in the future.

export const seedAreas: Area[] = [
  { id: "olaya", name: { ar: "العليا", en: "Al Olaya" }, fee: 8, minOrder: 40 },
  { id: "malqa", name: { ar: "الملقا", en: "Al Malqa" }, fee: 10, minOrder: 50 },
  { id: "hittin", name: { ar: "حطين", en: "Hittin" }, fee: 12, minOrder: 50 },
  { id: "nakheel", name: { ar: "النخيل", en: "Al Nakheel" }, fee: 15, minOrder: 60 },
];

export const seedOffers: Offer[] = [
  {
    id: "double-tuesday",
    title: { ar: "ثلاثاء الدبل", en: "Double Tuesday" },
    description: {
      ar: "دبل سماش مع بطاطس ومشروب بسعر خاص كل ثلاثاء.",
      en: "A Double Smash with fries and a drink at a special price, every Tuesday.",
    },
    price: 49,
    image: "burger-stack",
    active: true,
  },
  {
    id: "family-box",
    title: { ar: "بوكس العائلة", en: "Family box" },
    description: {
      ar: "أربعة برجر كلاسيك وبطاطس كبيرة وأربعة مشروبات تكفي العائلة كلها.",
      en: "Four Classic Smash burgers, large fries, and four drinks: enough for the whole family.",
    },
    price: 139,
    image: "burger-fries",
    active: true,
  },
  {
    id: "late-night",
    title: { ar: "كومبو آخر الليل", en: "Late-night combo" },
    description: {
      ar: "كلاسيك سماش مع بطاطس بالجبن وميلك شيك لوتس للسهرة.",
      en: "A Classic Smash with cheese fries and a Lotus shake for the late shift.",
    },
    price: 59,
    image: "burger-dark",
    active: false,
  },
];

function lineOf(itemId: string, qty: number): OrderLine {
  const item = seedMenu.items.find((candidate) => candidate.id === itemId);
  if (!item) throw new Error(`Seed order uses an unknown dish: ${itemId}`);
  return { name: item.name, price: item.price, qty };
}

type Sample = {
  number: number;
  when: Date | string;
  status: OrderStatus;
  type: OrderType;
  areaId?: string;
  name: string;
  phone: string;
  payment: PaymentMethod;
  lines: OrderLine[];
  address?: string;
  note?: string;
};

function order(sample: Sample): Order {
  const area = seedAreas.find((candidate) => candidate.id === sample.areaId);
  const totals = orderTotals(sample.lines, sample.type, area);
  return {
    id: `order-${sample.number}`,
    number: sample.number,
    lines: sample.lines,
    type: sample.type,
    ...(sample.type === "delivery" && area
      ? { areaId: area.id, areaName: area.name, address: sample.address ?? "" }
      : {}),
    name: sample.name,
    phone: sample.phone,
    payment: sample.payment,
    ...(sample.note ? { note: sample.note } : {}),
    ...totals,
    status: sample.status,
    createdAt: typeof sample.when === "string" ? sample.when : sample.when.toISOString(),
  };
}

const minutesAgo = (now: Date, minutes: number) => new Date(now.getTime() - minutes * 60_000);

// Newest first, like the dashboard. Today's orders are minutes old; yesterday's include one placed after closing time.
export function createSampleOrders(now: Date): Order[] {
  return [
    order({
      number: 1010,
      when: minutesAgo(now, 8),
      status: "new",
      type: "delivery",
      areaId: "olaya",
      name: "Sultan Al-Anazi",
      phone: "+966 50 311 4001",
      payment: "cash",
      lines: [lineOf("double", 2), lineOf("cheese-fries", 1)],
      address: "Olaya Street, Building 12, flat 4",
      note: "Please ring the bell twice.",
    }),
    order({
      number: 1009,
      when: minutesAgo(now, 19),
      status: "new",
      type: "pickup",
      name: "Reem Al-Ghamdi",
      phone: "+966 55 422 5002",
      payment: "card",
      lines: [lineOf("classic", 1), lineOf("lotus", 1)],
    }),
    order({
      number: 1008,
      when: minutesAgo(now, 34),
      status: "preparing",
      type: "delivery",
      areaId: "malqa",
      name: "Bader Al-Subaie",
      phone: "+966 50 533 6003",
      payment: "card",
      lines: [lineOf("truffle", 1), lineOf("fries", 1), lineOf("vanilla", 1)],
      address: "Al Malqa, Prince Turki Road, villa 8",
    }),
    order({
      number: 1007,
      when: minutesAgo(now, 52),
      status: "ready",
      type: "pickup",
      name: "Faisal Al-Dosari",
      phone: "+966 56 644 7004",
      payment: "cash",
      lines: [lineOf("classic", 2), lineOf("fries", 2)],
    }),
    order({
      number: 1006,
      when: minutesAgo(now, 75),
      status: "out_for_delivery",
      type: "delivery",
      areaId: "hittin",
      name: "Noura Al-Qahtani",
      phone: "+966 50 755 8005",
      payment: "cash",
      lines: [lineOf("chicken", 2), lineOf("onion-rings", 1), lineOf("soft-drinks", 2)],
      address: "Hittin, King Salman Road, tower B",
    }),
    order({
      number: 1005,
      when: minutesAgo(now, 110),
      status: "completed",
      type: "pickup",
      name: "Lina Al-Harbi",
      phone: "+966 55 866 9006",
      payment: "card",
      lines: [lineOf("kids-meal", 2), lineOf("double", 1)],
    }),
    order({
      number: 1004,
      when: daysFrom(now, -1, "23:50"),
      status: "completed",
      type: "delivery",
      areaId: "olaya",
      name: "Majed Al-Dossary",
      phone: "+966 50 977 1007",
      payment: "cash",
      lines: [lineOf("double", 1), lineOf("cheese-fries", 1), lineOf("soft-drinks", 1)],
      address: "Al Olaya, Tahlia Street, flat 21",
    }),
    order({
      number: 1003,
      when: daysFrom(now, -1, "21:45"),
      status: "completed",
      type: "delivery",
      areaId: "nakheel",
      name: "Hind Al-Mutairi",
      phone: "+966 56 188 2008",
      payment: "card",
      lines: [lineOf("classic", 3), lineOf("fries", 2), lineOf("lotus", 2)],
      address: "Al Nakheel, villa 5",
    }),
    order({
      number: 1002,
      when: daysFrom(now, -1, "20:30"),
      status: "cancelled",
      type: "pickup",
      name: "Yasser Al-Qahtani",
      phone: "+966 50 299 3009",
      payment: "cash",
      lines: [lineOf("truffle", 1)],
    }),
    order({
      number: 1001,
      when: daysFrom(now, -1, "19:10"),
      status: "completed",
      type: "pickup",
      name: "Sultan Al-Anazi",
      phone: "+966 50 311 4001",
      payment: "card",
      lines: [lineOf("classic", 1), lineOf("vanilla", 1)],
    }),
  ];
}
