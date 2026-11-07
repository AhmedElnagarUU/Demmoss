"use client";

import { useRealEstate } from "../../../context";
import { getDeveloperT } from "../messages";
import { Lines } from "./brand";
import { Reveal } from "./reveal";
import { container, h2Big, labelClass, rtlSafe, sectionPad } from "./styles";

const steps = ["consult", "design", "build", "handover"] as const;

// Four steps on a black band, joined by a thin line with a ring per step. Goal: trust and less fear (what the journey looks like).
// The process page shows a longer text per step.
export function ProcessSteps({
  headingLevel = 2,
  detailed = false,
}: {
  headingLevel?: 1 | 2;
  detailed?: boolean;
}) {
  const { locale } = useRealEstate();
  const t = getDeveloperT(locale);
  const Heading = headingLevel === 1 ? "h1" : "h2";

  return (
    <section
      id="process"
      aria-labelledby="process-title"
      className={`${sectionPad} relative overflow-x-clip bg-(--re-deep)`}
    >
      <div className={container}>
        <Reveal>
          <p className={`${labelClass} text-muted`}>{t("steps.eyebrow")}</p>
        </Reveal>
        <Reveal>
          <Heading id="process-title" className={h2Big}>
            <Lines text={t("steps.title")} />
          </Heading>
        </Reveal>
        <ol className="relative mt-[90px] grid grid-cols-4 before:absolute before:inset-x-0 before:top-[7px] before:h-px before:bg-border max-[1024px]:grid-cols-2 max-[1024px]:gap-y-[50px] max-[1024px]:before:hidden max-[640px]:grid-cols-1">
          {steps.map((key, index) => (
            <li key={key}>
              <Reveal
                className={`group relative pe-8 pt-11 before:absolute before:start-0 before:top-0 before:size-[15px] before:rounded-full before:border before:border-(--re-accent) before:bg-(--re-deep) before:transition-[background-color,box-shadow] before:duration-[400ms] hover:before:bg-(--re-accent) hover:before:shadow-[0_0_18px_color-mix(in_srgb,var(--re-accent)_70%,transparent)]`}
              >
                <span
                  className={`text-[13px] font-extralight tracking-[0.3em] text-(--re-accent) rtl:font-light ${rtlSafe}`}
                >
                  0{index + 1}
                </span>
                <h3 className={`mb-3.5 mt-3 text-base font-light uppercase tracking-[0.2em] ${rtlSafe}`}>
                  {t(`steps.${key}.title`)}
                </h3>
                <p className="text-[13px] leading-[1.9] text-muted rtl:leading-[2]">
                  {detailed ? t(`process.detail.${key}`) : t(`steps.${key}.text`)}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
