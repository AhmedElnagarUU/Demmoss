"use client";

import { useRealEstate } from "../../../context";
import { getDeveloperT } from "../messages";
import { About } from "./home-about";
import { ProcessSteps } from "./process-steps";
import { container, rtlSafe } from "./styles";

// Process & studio. Goal: trust and less fear (what the journey looks like, who the people are).
// The dark steps come first so the header stays readable at the top of the page. Photo credit is at the end, as the design rules ask.
export function ProcessPage() {
  const { locale } = useRealEstate();
  const t = getDeveloperT(locale);

  return (
    <>
      <ProcessSteps headingLevel={1} detailed />
      <About />
      <div className="bg-(--re-deep) pb-8">
        <p className={`${container} text-[11px] tracking-[0.14em] text-muted ${rtlSafe}`}>
          {t("process.credit")}
        </p>
      </div>
    </>
  );
}
