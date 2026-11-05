"use client";

import { useEffect, useState } from "react";

export type HydratableStore = {
  persist: {
    rehydrate: () => void | Promise<void>;
    onFinishHydration: (listener: () => void) => () => void;
    getOptions: () => { name?: string };
  };
};

// The type of a template's store as the shared dashboard and site parts see it: select a slice of `State`.
// Any variant store (it has more data and actions) fits `StoreOf<SharedState>`.
export type StoreOf<State> = HydratableStore & (<T>(selector: (state: State) => T) => T);

// Loads the saved demo from localStorage in the browser and keeps tabs in sync.
export function useHydrated(store: HydratableStore): boolean {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stopListening = store.persist.onFinishHydration(() => setHydrated(true));
    void store.persist.rehydrate();

    const key = store.persist.getOptions().name;
    const syncOtherTab = (event: StorageEvent) => {
      if (event.key === key) void store.persist.rehydrate();
    };
    window.addEventListener("storage", syncOtherTab);

    return () => {
      stopListening();
      window.removeEventListener("storage", syncOtherTab);
    };
  }, [store]);

  return hydrated;
}
