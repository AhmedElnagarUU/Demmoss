"use client";

import { useRealEstate } from "../../../context";
import { getAgencyT } from "../messages";

const principles = ["local", "pricing", "fullService"] as const;

// Three principles. Goal: trust (why choose this agency).
export function Principles() {
  const { locale } = useRealEstate();
  const t = getAgencyT(locale);
  return (
    <ol className="grid gap-8 md:grid-cols-3">
      {principles.map((key, index) => (
        <li key={key} className="space-y-3 border-t border-on-primary/40 pt-5">
          <p aria-hidden="true" className="text-sm">
            0{index + 1}
          </p>
          <h3 className="text-xl font-semibold">{t(`principles.${key}.title`)}</h3>
          <p>{t(`principles.${key}.text`)}</p>
        </li>
      ))}
    </ol>
  );
}
