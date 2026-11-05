import { describe, expect, it } from "vitest";
import { businessNameOf } from "./business-name";
import { seedSettings } from "./variants/agency/seed/content";

const account = { name: "Owner", passwordHash: "a".repeat(64), businessName: "Dar Sara" };

describe("RE13: business name at register", () => {
  it("shows the seed name when no business name was given", () => {
    expect(businessNameOf({ account: null, settings: seedSettings }, "en")).toBe("Dar Al Manzil Real Estate");
    expect(businessNameOf({ account: null, settings: seedSettings }, "ar")).toBe("دار المنزل العقارية");
  });

  it("the registered name replaces the seed name in both languages", () => {
    expect(businessNameOf({ account, settings: seedSettings }, "en")).toBe("Dar Sara");
    expect(businessNameOf({ account, settings: seedSettings }, "ar")).toBe("Dar Sara");
  });

  it("once the owner edits the name in Settings, Settings wins", () => {
    const edited = { ...seedSettings, nameEdited: true, businessName: { ar: "دار سارة", en: "Sara House" } };
    expect(businessNameOf({ account, settings: edited }, "en")).toBe("Sara House");
    expect(businessNameOf({ account, settings: edited }, "ar")).toBe("دار سارة");
  });
});
