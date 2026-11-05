import type { ReactNode } from "react";

export function PageHeading({
  title,
  intro,
  children,
}: {
  title: string;
  intro?: string;
  children?: ReactNode;
}) {
  return (
    <header className="mb-6 flex flex-col gap-2">
      <h1 className="text-2xl font-bold text-text">{title}</h1>
      {intro ? <p className="text-base text-muted">{intro}</p> : null}
      {children}
    </header>
  );
}
