import type { ReactNode } from "react";

// Page-level pieces of every template dashboard.

export function PageHeader({ title, intro, action }: { title: string; intro?: string; action?: ReactNode }) {
  return (
    <header className="mb-6 flex flex-wrap items-start justify-between gap-3">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-text">{title}</h1>
        {intro ? <p className="text-muted">{intro}</p> : null}
      </div>
      {action}
    </header>
  );
}

export function Panel({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <section className="space-y-4 rounded-control border border-border bg-bg p-4">
      {title ? <h2 className="text-lg font-bold text-text">{title}</h2> : null}
      {children}
    </section>
  );
}

export function StatusBadge({ label }: { label: string }) {
  return (
    <span className="inline-block rounded-control border border-border bg-surface px-2 py-0.5 text-sm font-semibold text-text">
      {label}
    </span>
  );
}

export function ErrorSummary({ text }: { text: string }) {
  return (
    <p role="alert" className="border-s-4 border-text ps-2 font-semibold text-text">
      {text}
    </p>
  );
}
