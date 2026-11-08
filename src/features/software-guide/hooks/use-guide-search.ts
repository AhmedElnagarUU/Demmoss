"use client";

import { useSyncExternalStore } from "react";

// One search text shared by the sidebar, the drawer and the glossary (they are separate client components).
let query = "";
const listeners = new Set<() => void>();

export function setGuideQuery(next: string) {
  query = next;
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function useGuideQuery(): string {
  return useSyncExternalStore(
    subscribe,
    () => query,
    () => "",
  );
}
