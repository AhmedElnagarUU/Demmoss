import type { z } from "zod";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { Account } from "../fake-auth/types";
import type { HydratableStore } from "./use-hydrated";
import { resetKeepingAccount, restoreState, type DemoData } from "./restore";

export type EngineActions = {
  setAccount: (account: Account | null) => void;
  resetDemo: () => void;
};

export type EngineState = { account: Account | null } & EngineActions;

// What engine components need from a template store hook (any template store fits).
export type EngineStore = HydratableStore & (<T>(selector: (state: EngineState) => T) => T);

type SetData<D> = (update: Partial<D> | ((state: D) => Partial<D>)) => void;

type Options<D extends DemoData, A extends object> = {
  slug: string;
  version: number;
  schema: z.ZodType<D>;
  createSeed: (now: Date) => D;
  actions: (set: SetData<D>, get: () => D) => A;
  storage?: () => Storage;
};

export function storageKey(slug: string): string {
  return `demo:${slug}`;
}

export function createTemplateStore<D extends DemoData, A extends object>(options: Options<D, A>) {
  const { slug, version, schema, createSeed } = options;
  type State = D & A & EngineActions;

  return create<State>()(
    persist(
      (set, get) => ({
        ...createSeed(new Date()),
        ...options.actions(set as unknown as SetData<D>, get),
        setAccount: (account) => set({ account } as Partial<State>),
        resetDemo: () =>
          set((state) => resetKeepingAccount(createSeed, new Date(), state) as unknown as Partial<State>),
      }),
      {
        name: storageKey(slug),
        version,
        storage: createJSONStorage(options.storage ?? (() => window.localStorage)),
        skipHydration: true,
        migrate: (saved) => resetKeepingAccount(createSeed, new Date(), saved),
        merge: (saved, current) => ({ ...current, ...restoreState(saved, schema, createSeed, new Date()) }),
      },
    ),
  );
}
