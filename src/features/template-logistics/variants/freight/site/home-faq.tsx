"use client";

import Link from "next/link";
import { useState } from "react";
import type { Locale } from "@/shared/i18n/config";
import { getFreightT } from "../messages";
import { FREIGHT_ROOT } from "../slug";
import { useFreightStore } from "../store";
import { MutedTail } from "./brand";
import { ArrowIcon } from "./icons";
import { Reveal } from "./section";
import { btnOutline, container, eyebrow, rtlSafe } from "./styles";

// The FAQ of the source: a text column with an outline action, and six rows that open one at a time.
export function HomeFaq({ locale }: { locale: Locale }) {
  const t = getFreightT(locale);
  const faq = useFreightStore((state) => state.faq);
  const [open, setOpen] = useState<string | null>(faq[0]?.id ?? null);
  const root = `/${locale}${FREIGHT_ROOT}`;

  return (
    <section id="faq" className="overflow-x-clip pt-[110px] max-[640px]:pt-20">
      <div
        className={`${container} grid grid-cols-[0.8fr_1.2fr] gap-[60px] max-[1024px]:grid-cols-1 max-[1024px]:gap-12`}
      >
        <Reveal>
          <p className={eyebrow}>{t("faq.eyebrow")}</p>
          <h2
            className={`mt-3.5 text-[clamp(28px,3.4vw,44px)] font-medium leading-[1.08] tracking-[-0.025em] text-text ${rtlSafe} rtl:leading-[1.35]`}
          >
            <MutedTail text={t("faq.title")} />
          </h2>
          <p className="my-4 max-w-[340px] text-muted">{t("faq.text")}</p>
          <Link href={`${root}#contacts`} className={btnOutline}>
            {t("faq.ask")}
            <ArrowIcon className="size-[18px] rtl:rotate-180" />
          </Link>
        </Reveal>

        <Reveal delay={1}>
          <div>
            {faq.map((item) => {
              const isOpen = item.id === open;
              return (
                <div key={item.id} className="border-b border-border">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${item.id}`}
                    onClick={() => setOpen(isOpen ? null : item.id)}
                    className="flex w-full cursor-pointer items-center justify-between gap-5 border-0 bg-transparent py-6 text-start text-[17px] font-medium tracking-[-0.01em] text-text focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus max-[640px]:text-[15.5px] rtl:tracking-normal"
                  >
                    {item.question[locale]}
                    <span
                      aria-hidden="true"
                      className={`relative grid size-8 shrink-0 place-items-center rounded-full border transition-colors duration-300 ${
                        isOpen ? "border-text bg-text text-bg" : "border-border text-text"
                      }`}
                    >
                      <span className="absolute h-[1.5px] w-3 bg-current" />
                      <span
                        className={`absolute h-3 w-[1.5px] bg-current transition-transform duration-300 ${
                          isOpen ? "scale-y-0" : ""
                        }`}
                      />
                    </span>
                  </button>
                  <div
                    id={`faq-answer-${item.id}`}
                    className={`grid transition-[grid-template-rows] duration-[400ms] motion-reduce:transition-none ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="pb-6 pe-[50px] text-[15px] leading-[1.55] text-muted max-[640px]:pe-0">
                        {item.answer[locale]}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
