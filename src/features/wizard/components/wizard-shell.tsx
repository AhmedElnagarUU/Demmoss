import type { ReactNode } from "react";

export function WizardShell({ children }: { children: ReactNode }) {
  return (
    <main id="main" className="mx-auto flex max-w-xl flex-col gap-6 px-4 pb-16 pt-6">
      {children}
    </main>
  );
}
