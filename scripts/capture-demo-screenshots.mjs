import { statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { chromium } from "playwright-core";

const rows = [
  { slug: "restaurant-fine-dining", source: "theme-sources/03-verdant-table.html" },
  { slug: "restaurant-fast-food", source: "theme-sources/06-sole-trattoria.html" },
  { slug: "real-estate-agency", source: "theme-sources/02-hartwell-realty.html" },
  { slug: "real-estate-developer", source: "theme-sources/01-solenne-estates.html" },
  { slug: "clinic-specialist", source: "theme-sources/02-dr-adrian-vale.html" },
  { slug: "logistics-freight", source: "theme-sources/01-orbis-cargo.html" },
  { slug: "logistics-warehousing", source: "theme-sources/03-stackwell-3pl.html" },
  { slug: "clinic-medical-centre", url: "/en/demos/clinic/medical-centre" },
];

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputDir = path.join(projectRoot, "public", "demos");

async function waitForPage(page) {
  await page.waitForLoadState("load", { timeout: 30_000 });
  await page.waitForLoadState("networkidle", { timeout: 30_000 }).catch(() => {});
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(1500);
}

async function hideOverlays(page) {
  await page.evaluate(() => {
    const overlays = document.querySelectorAll(
      '[class*="cookie" i], [class*="consent" i], [id*="cookie" i], [class*="chat" i]',
    );
    for (const element of overlays) {
      const style = getComputedStyle(element);
      if (style.position !== "fixed" && style.position !== "sticky") continue;
      const box = element.getBoundingClientRect();
      if (box.top < window.innerHeight && box.bottom > 0) element.remove();
    }
  });
}

const browser = await chromium.launch({ headless: true });

try {
  for (const { slug, source, url } of rows) {
    if (url && !process.env.SCREENSHOT_BASE_URL) {
      console.log(`skipped ${slug}: set SCREENSHOT_BASE_URL to capture ${url} from a running server`);
      continue;
    }
    const context = await browser.newContext({
      viewport: { width: 1280, height: 800 },
      deviceScaleFactor: 1,
      reducedMotion: "reduce",
    });
    const page = await context.newPage();

    try {
      const target = url
        ? `${process.env.SCREENSHOT_BASE_URL}${url}`
        : pathToFileURL(path.join(projectRoot, source)).href;
      await page.goto(target, { waitUntil: "load", timeout: 30_000 });
      await waitForPage(page);
      await hideOverlays(page);

      const file = path.join(outputDir, `${slug}.jpg`);
      await page.screenshot({ path: file, type: "jpeg", quality: 82 });
      const size = statSync(file).size;
      console.log(`${path.relative(projectRoot, file)}  ${size} bytes`);
    } finally {
      await context.close();
    }
  }
} finally {
  await browser.close();
}
