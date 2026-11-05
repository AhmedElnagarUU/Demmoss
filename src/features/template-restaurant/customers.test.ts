import { describe, expect, it } from "vitest";
import { buildCustomers } from "./customers";

describe("Customers are computed from bookings, never stored", () => {
  it("groups bookings by phone number, even when it is written differently", () => {
    const customers = buildCustomers([
      { name: "Yasser", phone: "+966 50 111 2201", date: "2026-11-03" },
      { name: "Yasser A.", phone: "966501112201", date: "2026-11-04" },
      { name: "Lama", phone: "+966 56 444 5504", date: "2026-11-05" },
    ]);
    expect(customers).toHaveLength(2);
    expect(customers.find((customer) => customer.count === 2)).toMatchObject({
      name: "Yasser A.",
      lastDate: "2026-11-04",
    });
  });

  it("lists the most recent customer first", () => {
    const customers = buildCustomers([
      { name: "Old", phone: "966500000001", date: "2026-11-01" },
      { name: "New", phone: "966500000002", date: "2026-11-09" },
    ]);
    expect(customers.map((customer) => customer.name)).toEqual(["New", "Old"]);
  });

  it("returns nothing when there are no bookings", () => {
    expect(buildCustomers([])).toEqual([]);
  });
});
