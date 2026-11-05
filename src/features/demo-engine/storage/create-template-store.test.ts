import { describe, expect, it } from "vitest";
import { z } from "zod";
import { accountSchema, type Account } from "../fake-auth/types";
import { createTemplateStore, storageKey } from "./create-template-store";
import { daysFrom } from "./days-from";

const account: Account = { name: "Sara", passwordHash: "a".repeat(64), businessName: "My Cafe" };

const schema = z.object({
  account: accountSchema.nullable(),
  notes: z.array(z.string()),
  bookedAt: z.string(),
});

function fakeStorage(): Storage {
  const items = new Map<string, string>();
  return {
    get length() {
      return items.size;
    },
    clear: () => items.clear(),
    getItem: (key) => items.get(key) ?? null,
    key: (index) => [...items.keys()][index] ?? null,
    removeItem: (key) => void items.delete(key),
    setItem: (key, value) => void items.set(key, value),
  };
}

function buildStore(storage: Storage, version = 1) {
  return createTemplateStore({
    slug: "test-cafe",
    version,
    schema,
    createSeed: (now) => ({ account: null, notes: ["seed note"], bookedAt: daysFrom(now, -1, "19:30") }),
    actions: (set) => ({
      addNote: (note: string) => set((state) => ({ notes: [...state.notes, note] })),
    }),
    storage: () => storage,
  });
}

function save(storage: Storage, version: number, state: unknown) {
  storage.setItem(storageKey("test-cafe"), JSON.stringify({ state, version }));
}

describe("E2: changes are kept in the browser", () => {
  it("a returning visitor gets the saved data back", async () => {
    const storage = fakeStorage();
    const first = buildStore(storage);
    await first.persist.rehydrate();
    first.getState().setAccount(account);
    first.getState().addNote("my note");

    const returning = buildStore(storage);
    await returning.persist.rehydrate();
    expect(returning.getState().notes).toEqual(["seed note", "my note"]);
    expect(returning.getState().account).toEqual(account);
  });

  it("uses the key demo:<slug>", async () => {
    const storage = fakeStorage();
    const store = buildStore(storage);
    await store.persist.rehydrate();
    store.getState().addNote("x");
    expect(storage.getItem("demo:test-cafe")).not.toBeNull();
  });
});

describe("E2/E3: a new data version resets to the new seed and keeps only the account", () => {
  it("drops old content but keeps the registered account", async () => {
    const storage = fakeStorage();
    save(storage, 1, { account, notes: ["old note"], bookedAt: "2020-01-01T00:00:00.000Z" });

    const store = buildStore(storage, 2);
    await store.persist.rehydrate();

    expect(store.getState().notes).toEqual(["seed note"]);
    expect(store.getState().account).toEqual(account);
  });
});

describe("E2: invalid saved data resets to the seed", () => {
  it("replaces data that does not match the schema", async () => {
    const storage = fakeStorage();
    save(storage, 1, { account, notes: "not a list", bookedAt: 5 });

    const store = buildStore(storage);
    await store.persist.rehydrate();

    expect(store.getState().notes).toEqual(["seed note"]);
  });

  it("starts from the seed when nothing is saved", async () => {
    const store = buildStore(fakeStorage());
    await store.persist.rehydrate();
    expect(store.getState().notes).toEqual(["seed note"]);
    expect(store.getState().account).toBeNull();
  });

  it("does not keep a broken account", async () => {
    const storage = fakeStorage();
    save(storage, 1, { account: { name: "", passwordHash: "plain" }, notes: [] });

    const store = buildStore(storage);
    await store.persist.rehydrate();

    expect(store.getState().account).toBeNull();
  });
});

describe("E3: reset demo", () => {
  it("restores the seed and keeps the account", async () => {
    const store = buildStore(fakeStorage());
    await store.persist.rehydrate();
    store.getState().setAccount(account);
    store.getState().addNote("my note");

    store.getState().resetDemo();

    expect(store.getState().notes).toEqual(["seed note"]);
    expect(store.getState().account).toEqual(account);
  });
});
