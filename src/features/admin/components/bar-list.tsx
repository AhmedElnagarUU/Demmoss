type Props = {
  title: string;
  rows: { label: string; count: number }[];
  empty: string;
  formatCount: (count: number) => string;
};

// A simple list with a proportional bar under each row; no chart library.
export function BarList({ title, rows, empty, formatCount }: Props) {
  const largest = Math.max(1, ...rows.map((row) => row.count));
  return (
    <section className="rounded-control border border-border p-4">
      <h2 className="mb-3 text-lg font-semibold text-text">{title}</h2>
      {rows.length === 0 ? (
        <p className="text-sm text-muted">{empty}</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {rows.map((row) => (
            <li key={row.label}>
              <div className="flex justify-between gap-3 text-sm text-text">
                <span>{row.label}</span>
                <span className="font-semibold">{formatCount(row.count)}</span>
              </div>
              <div className="mt-1 h-2 rounded-full bg-surface" aria-hidden="true">
                <div
                  className="h-2 rounded-full bg-primary"
                  style={{ width: `${(row.count / largest) * 100}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
