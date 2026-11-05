"use client";

import type { ReactNode } from "react";
import { useHydrated, type HydratableStore } from "./use-hydrated";

type Props = { store: HydratableStore; loadingLabel: string; children: ReactNode };

export function HydrationGate({ store, loadingLabel, children }: Props) {
  const hydrated = useHydrated(store);
  if (hydrated) return children;
  return (
    <div role="status" aria-busy="true" aria-label={loadingLabel} className="space-y-4 p-6">
      <div className="h-8 w-1/3 animate-pulse rounded-control bg-surface" />
      <div className="h-32 animate-pulse rounded-control bg-surface" />
      <div className="h-32 animate-pulse rounded-control bg-surface" />
    </div>
  );
}
