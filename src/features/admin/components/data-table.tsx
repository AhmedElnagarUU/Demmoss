import type { ReactNode } from "react";
import { cellClasses } from "./styles";

type Props = { caption: string; headings: string[]; children: ReactNode };

export function DataTable({ caption, headings, children }: Props) {
  return (
    <div className="overflow-x-auto rounded-control border border-border">
      <table className="w-full min-w-max border-collapse text-sm">
        <caption className="sr-only">{caption}</caption>
        <thead className="bg-surface">
          <tr>
            {headings.map((heading) => (
              <th key={heading} scope="col" className={`${cellClasses} font-semibold text-text`}>
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">{children}</tbody>
      </table>
    </div>
  );
}
