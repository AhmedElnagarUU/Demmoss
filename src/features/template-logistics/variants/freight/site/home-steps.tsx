"use client";

import type { Locale } from "@/shared/i18n/config";
import { getFreightT } from "../messages";
import { MutedTail } from "./brand";
import { CenterHead, Reveal } from "./section";
import { container } from "./styles";

const stepKeys = ["s1", "s2", "s3", "s4", "s5"] as const;

// How it works: five numbered steps on a dashed path, exactly as the source lays them out.
export function HomeSteps({ locale }: { locale: Locale }) {
  const t = getFreightT(locale);

  return (
    <section id="how" className="overflow-x-clip pt-[110px] max-[640px]:pt-20">
      <div className={container}>
        <Reveal>
          <CenterHead eyebrow={t("steps.eyebrow")} title={<MutedTail text={t("steps.title")} />} />
        </Reveal>
        <div className="relative">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-[10%] top-[29px] border-t border-dashed border-border max-[1024px]:hidden"
          />
          <ol className="relative grid grid-cols-5 gap-[18px] max-[1024px]:grid-cols-3 max-[1024px]:gap-y-9 max-[640px]:grid-cols-2">
            {stepKeys.map((key, index) => (
              <li key={key}>
                <Reveal delay={index as 0 | 1 | 2 | 3 | 4} className="text-center">
                  <div className="mx-auto mb-5 grid size-[58px] place-items-center rounded-full border border-border bg-surface font-semibold text-text shadow-[0_10px_40px_rgba(17,17,17,0.06)] transition-[background-color,color,transform] duration-300 hover:scale-110 hover:bg-primary hover:text-on-primary motion-reduce:transition-none motion-reduce:hover:scale-100">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <h3 className="mb-2 text-[17px] font-semibold tracking-[-0.01em] text-text rtl:tracking-normal">
                    {t(`steps.${key}.title`)}
                  </h3>
                  <p className="px-2 text-[13.5px] leading-[1.55] text-muted">{t(`steps.${key}.text`)}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
