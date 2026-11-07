"use client";

import { formatNumber } from "@/features/demo-engine/format/format";
import { useRealEstate } from "../../../context";
import { getAgencyT } from "../messages";
import { rtlSafe } from "./styles";

const principles = ["local", "pricing", "fullService"] as const;

// Three principles on the dark band: a thin beige number, a title and a short text, divided by hairlines.
// Goal: trust (why choose this agency).
export function Principles() {
  const { locale } = useRealEstate();
  const t = getAgencyT(locale);
  return (
    <ol className="mt-[70px] grid grid-cols-3 max-[640px]:mt-10 max-[640px]:grid-cols-1">
      {principles.map((key, index) => (
        <li
          key={key}
          className="border-s border-white/15 px-11 py-2.5 first:border-s-0 first:ps-0 max-[1024px]:px-6 max-[1024px]:first:ps-0 max-[640px]:border-s-0 max-[640px]:border-t max-[640px]:px-0 max-[640px]:py-[30px] max-[640px]:first:border-t-0"
        >
          <em
            aria-hidden="true"
            className={`mb-[26px] block text-5xl font-extralight not-italic leading-none tracking-[0.06em] text-(--re-beige) rtl:font-light ${rtlSafe}`}
          >
            {formatNumber(index + 1, locale, { minimumIntegerDigits: 2 })}
          </em>
          <h3
            className={`mb-4 text-[15px] font-light uppercase leading-[1.2] tracking-[0.2em] text-(--re-beige) rtl:leading-[1.5] ${rtlSafe}`}
          >
            {t(`principles.${key}.title`)}
          </h3>
          <p className="text-[13px] leading-[1.9] text-white/[0.62]">{t(`principles.${key}.text`)}</p>
        </li>
      ))}
    </ol>
  );
}
