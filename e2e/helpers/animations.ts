import type { Page } from "@playwright/test";

// Axe reads the colors on screen right now. A fade-in that is half done makes good colors look faint,
// so wait until every finite animation and transition has ended before an accessibility scan.
export async function settleAnimations(page: Page) {
  await page.evaluate(async () => {
    const finite = document
      .getAnimations()
      .filter((animation) => animation.effect?.getComputedTiming().iterations !== Infinity);
    await Promise.all(finite.map((animation) => animation.finished.catch(() => undefined)));
  });
}
