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
    id: "pizza-night",
    title: { ar: "ليلة البيتزا", en: "Pizza Night" },
    description: {
      ar: "مارغريتا فرن الحطب مع ليموناتا بسعر خاص كل ليلة.",
      en: "A Wood-Fired Margherita with a Limonata at a special price, every night.",
    },
    price: 55,
    image: "pizza-margherita",
    active: true,
  },
  {
    id: "family-pasta-box",
    title: { ar: "بوكس الباستا العائلي", en: "Family pasta box" },
    description: {
      ar: "تالياتيلي بالراجو وسباغيتي بومودورو وتيراميسو وأربعة مشروبات تكفي العائلة.",
      en: "Tagliatelle al Ragu, Spaghetti Pomodoro, tiramisu, and four drinks: enough for the whole family.",
    },
    price: 199,
    image: "pasta-tagliatelle",
    active: true,
  },
  {
    id: "date-night",
    title: { ar: "سهرة إيطالية", en: "Date night" },
    description: {
      ar: "ديافولا وبوراتا وكأس نبيذ أحمر لشخصين.",
      en: "A Diavola, burrata, and a glass of red for two.",
    },
    price: 149,
    image: "pizza-diavola",
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
      lines: [lineOf("diavola", 2), lineOf("bruschetta", 1)],
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
      lines: [lineOf("margherita", 1), lineOf("tiramisu", 1)],
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
      lines: [lineOf("tagliatelle-ragu", 1), lineOf("bruschetta", 1), lineOf("limonata", 1)],
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
      lines: [lineOf("margherita", 2), lineOf("bruschetta", 2)],
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
      lines: [lineOf("carbonara", 2), lineOf("arancini", 1), lineOf("espresso", 2)],
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
      lines: [lineOf("margherita", 2), lineOf("diavola", 1)],
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
      lines: [lineOf("diavola", 1), lineOf("bruschetta", 1), lineOf("espresso", 1)],
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
      lines: [lineOf("margherita", 3), lineOf("bruschetta", 2), lineOf("tiramisu", 2)],
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
      lines: [lineOf("tagliatelle-ragu", 1)],
    }),
    order({
      number: 1001,
      when: daysFrom(now, -1, "19:10"),
      status: "completed",
      type: "pickup",
      name: "Sultan Al-Anazi",
      phone: "+966 50 311 4001",
      payment: "card",
      lines: [lineOf("margherita", 1), lineOf("panna-cotta", 1)],
    }),
  ];
}
