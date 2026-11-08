"use client";

import type { Locale } from "@/shared/i18n/config";
import type { FreightEstimate } from "../../../types";
import { FreightCalculator } from "./calculator";
import { Reveal } from "./section";
import { container } from "./styles";

// The calculator block of the home page: the source's 100px top space, then the ink card.
export function HomeCalculator({
  locale,
  onQuote,
}: {
  locale: Locale;
  onQuote: (estimate: FreightEstimate) => void;
}) {
  return (
    <section id="calculator" className="overflow-x-clip pt-[100px] max-[640px]:pt-[70px]">
      <div className={container}>
        <Reveal>
          <FreightCalculator locale={locale} onQuote={onQuote} />
        </Reveal>
      </div>
    </section>
  );
}
