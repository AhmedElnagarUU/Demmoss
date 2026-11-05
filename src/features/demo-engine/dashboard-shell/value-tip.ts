export type ValueTipData = { id: string; text: string };

// One tip per page: the first one the owner has not dismissed yet.
export function pickValueTip(
  tips: readonly ValueTipData[],
  dismissedIds: readonly string[],
): ValueTipData | null {
  return tips.find((tip) => !dismissedIds.includes(tip.id)) ?? null;
}
