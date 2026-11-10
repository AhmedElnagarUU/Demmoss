import Link from "next/link";
import type { Locale } from "@/shared/i18n/config";
import { landingT } from "../translate";
import { ArrowUpRightIcon } from "./icons";
import { TwoToneHeading } from "./section";

const problems = ["missed", "repeat", "lost"] as const;

export function Problem({ locale }: { locale: Locale }) {
  const t = landingT(locale);
  const number = new Intl.NumberFormat(locale, { minimumIntegerDigits: 2 });

  return (
    <section
      aria-labelledby="problem-title"
      className="mx-auto max-w-[1320px] px-5 py-16 sm:px-8 sm:py-24 lg:px-12"
    >
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-16">
        <TwoToneHeading
          id="problem-title"
          lead={t("problem.titleLead")}
          rest={t("problem.titleRest")}
          className="text-[clamp(2.25rem,5.4vw,4.6rem)]"
        />
        <div className="max-w-md text-sm leading-relaxed text-muted lg:justify-self-end">
          <p>
            {t("problem.intro")} {t("problem.answer")}
          </p>
          <Link
            href="#how"
            className="mt-6 inline-flex items-center gap-2 border-b border-white/25 pb-1 text-xs text-text transition-colors hover:border-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus"
          >
            {t("problem.link")}
            <ArrowUpRightIcon className="size-3" />
          </Link>
        </div>
      </div>

      <ul className="mt-14 grid gap-4 sm:mt-20 md:grid-cols-3">
        {problems.map((problem, index) => (
          <li key={problem} className="studio-inset p-6 sm:p-7">
            <p className="font-mono-label text-faint">{number.format(index + 1)}</p>
            <h3 className="mt-6 text-lg font-normal text-text">{t(`problem.${problem}.title`)}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{t(`problem.${problem}.text`)}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
