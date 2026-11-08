import type { ReactNode } from "react";

export function WizardShell({ children }: { children: ReactNode }) {
  return (
    <main id="main" className="relative mx-auto flex max-w-xl flex-col gap-6 px-4 pb-20 pt-10 sm:pt-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-16 start-1/4 -z-10 size-72 rounded-full bg-primary/10 blur-3xl"
      />
      {children}
    </main>
  );
}
