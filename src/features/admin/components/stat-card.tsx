export function StatCard({ label, value, note }: { label: string; value: string; note?: string }) {
  return (
    <div className="rounded-control border border-border bg-surface p-4">
      <dt className="text-sm text-muted">{label}</dt>
      <dd className="mt-1 text-2xl font-bold text-text">{value}</dd>
      {note ? <dd className="mt-1 text-sm text-muted">{note}</dd> : null}
    </div>
  );
}
