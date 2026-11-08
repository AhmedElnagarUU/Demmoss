import type { ReactNode } from "react";
import { cellClasses } from "./styles";

type Props = { caption: string; headings: string[]; children: ReactNode };

export function DataTable({ caption, headings, children }: Props) {
  return (
    <div className="overflow-x-auto site-tile">
      <table className="w-full min-w-max border-collapse text-sm">
        <caption className="sr-only">{caption}</caption>
        <thead className="bg-white/[0.04]">
          <tr>
            {headings.map((heading) => (
              <th
                key={heading}
                scope="col"
                className={`${cellClasses} text-xs font-semibold uppercase tracking-wide text-muted rtl:tracking-normal`}
              >
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
