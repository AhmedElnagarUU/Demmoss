// Pure calculations behind the admin dashboard. They get counts and return numbers, so they are easy to test.

export type EventTotals = { name: string; template: string | undefined; events: number; visitors: number };

export type Count = { value: string; count: number };

export function startOfUtcDay(now: Date): Date {
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
}

export function daysBefore(now: Date, days: number): Date {
  return new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
}

// Share from 0 to 1, or null when nothing started. A step cannot convert more than everyone who reached it.
export function conversionRate(from: number, to: number): number | null {
  if (from <= 0) return null;
  return Math.min(to / from, 1);
}

export type FunnelStep = { count: number; rateFromPrevious: number | null };

export function funnelSteps(counts: readonly number[]): FunnelStep[] {
  return counts.map((count, index) => ({
    count,
    rateFromPrevious: index === 0 ? null : conversionRate(counts[index - 1] ?? 0, count),
  }));
}

// Largest first; equal counts keep a stable alphabetical order. The rest is dropped.
export function topCounts(rows: readonly Count[], limit: number): Count[] {
  return [...rows].sort((a, b) => b.count - a.count || a.value.localeCompare(b.value)).slice(0, limit);
}

export function sourceLabel(source: { utmSource?: string; referrer?: string }): string {
  if (source.utmSource) return source.utmSource.toLowerCase();
  if (source.referrer) {
    try {
      return new URL(source.referrer).hostname.replace(/^www\./, "");
    } catch {
      return source.referrer;
    }
  }
  return "direct";
}

export function sourceCounts(
  rows: readonly { utmSource?: string | undefined; referrer?: string | undefined; count: number }[],
): Count[] {
  const totals = new Map<string, number>();
  for (const row of rows) {
    const label = sourceLabel(row);
    totals.set(label, (totals.get(label) ?? 0) + row.count);
  }
  return [...totals].map(([value, count]) => ({ value, count }));
}

function totalFor(rows: readonly EventTotals[], name: string, template?: string) {
  const matching = rows.filter(
    (row) => row.name === name && (template === undefined || row.template === template),
  );
  return {
    events: matching.reduce((sum, row) => sum + row.events, 0),
    visitors: matching.reduce((sum, row) => sum + row.visitors, 0),
  };
}

// Visitors per event across the whole site (a visitor counted once per event name).
export function visitorsWithEvent(rows: readonly EventTotals[], name: string): number {
  return rows
    .filter((row) => row.name === name && row.template === undefined)
    .reduce((s, r) => s + r.visitors, 0);
}

export function eventsWithName(rows: readonly EventTotals[], name: string): number {
  return rows.filter((row) => row.name === name).reduce((sum, row) => sum + row.events, 0);
}

export type TemplateStats = {
  template: string;
  opened: number;
  registered: number;
  actions: number;
  contentEdits: number;
  resets: number;
  funnel: FunnelStep[];
};

// One row per template slug. The funnel counts visitors (opened, registered, acted); edits and resets count events.
export function templateStats(rows: readonly EventTotals[]): TemplateStats[] {
  const slugs = [...new Set(rows.flatMap((row) => (row.template ? [row.template] : [])))];
  return slugs
    .map((template) => {
      const opened = totalFor(rows, "demo_opened", template).visitors;
      const registered = totalFor(rows, "demo_registered", template).visitors;
      const actions = totalFor(rows, "demo_action", template).visitors;
      return {
        template,
        opened,
        registered,
        actions,
        contentEdits: totalFor(rows, "content_edited", template).events,
        resets: totalFor(rows, "demo_reset", template).events,
        funnel: funnelSteps([opened, registered, actions]),
      };
    })
    .sort((a, b) => b.opened - a.opened || a.template.localeCompare(b.template));
}
