"use client";

import { useSyncExternalStore } from "react";

// Small per-tab flags (logged in, banner dismissed) kept in sessionStorage.
const listeners = new Set<() => void>();

function read(key: string): boolean {
  try {
    return window.sessionStorage.getItem(key) === "1";
  } catch {
    return false;
  }
}

export function setSessionFlag(key: string, value: boolean): void {
  try {
    if (value) window.sessionStorage.setItem(key, "1");
    else window.sessionStorage.removeItem(key);
  } catch {
    // sessionStorage blocked: the flag is simply not kept.
  }
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useSessionFlag(key: string): boolean {
  return useSyncExternalStore(
    subscribe,
    () => read(key),
    () => false,
  );
}
