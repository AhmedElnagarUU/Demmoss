import { describe, expect, it } from "vitest";
import { businessNameOf } from "./business-name";
import { seedSettings } from "./variants/fine-dining/seed/content";

const account = { name: "Sara", passwordHash: "a".repeat(64), businessName: "Dar Sara" };

describe("R5: the business name given at register replaces the seed name", () => {
  it("shows the seed name before any account exists", () => {
    const state = { account: null, settings: seedSettings };
    expect(businessNameOf(state, "en")).toBe("Zaytouna");
    expect(businessNameOf(state, "ar")).toBe("زيتونة");
  });

  it("shows the registered name in both languages", () => {
    const state = { account, settings: seedSettings };
    expect(businessNameOf(state, "en")).toBe("Dar Sara");
    expect(businessNameOf(state, "ar")).toBe("Dar Sara");
  });

  it("keeps the seed name when the account gave no business name", () => {
    const state = { account: { name: "Sara", passwordHash: "a".repeat(64) }, settings: seedSettings };
    expect(businessNameOf(state, "en")).toBe("Zaytouna");
  });

  it("a name edited in Settings wins over the registered one", () => {
    const settings = {
      ...seedSettings,
      nameEdited: true,
      businessName: { ar: "دار سارة", en: "Sara House" },
    };
    expect(businessNameOf({ account, settings }, "en")).toBe("Sara House");
    expect(businessNameOf({ account, settings }, "ar")).toBe("دار سارة");
  });
});
