import { getAllDemos } from "@/features/gallery/catalog";
import type { Locale } from "@/shared/i18n/config";
import { landingStats } from "../stats";
import { landingT } from "../translate";

export function Stats({ locale }: { locale: Locale }) {
  const t = landingT(locale);
  const number = new Intl.NumberFormat(locale);
  const { demoCount, categoryCount } = landingStats(getAllDemos());
  const cells = [
    { id: "demos", value: demoCount, label: t("stats.demos") },
    { id: "languages", value: 2, label: t("stats.languages") },
    { id: "categories", value: categoryCount, label: t("stats.categories") },
    { id: "signups", value: 0, label: t("stats.signups") },
  ];

  return (
    <section aria-label={t("stats.demos")} className="mt-4 border-y border-white/[0.08]">
      <ul className="mx-auto grid max-w-[1320px] grid-cols-2 px-5 sm:px-8 lg:grid-cols-4 lg:px-12">
        {cells.map((cell, index) => (
          <li
            key={cell.id}
            data-stat={cell.id}
            className={`py-10 sm:py-14 ${index > 0 ? "lg:border-s lg:border-white/[0.08] lg:ps-8" : ""} ${
              index % 2 === 1 ? "border-s border-white/[0.08] ps-6 lg:ps-8" : ""
            } ${index > 1 ? "border-t border-white/[0.08] lg:border-t-0" : ""}`}
          >
            <p className="text-[clamp(2.5rem,5vw,4rem)] font-light leading-none tracking-tight text-text rtl:tracking-normal">
              {number.format(cell.value)}
            </p>
            <p className="font-mono-label mt-4 text-faint">{cell.label}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
