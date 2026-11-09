import type { ReactNode } from "react";
import type { Locale } from "@/shared/i18n/config";
import { landingT } from "../translate";
import { Section } from "./section";

const problems = ["missed", "repeat", "lost"] as const;

const icons: Record<(typeof problems)[number], ReactNode> = {
  missed: (
    <path d="M6.5 3h3l1.5 4-2 1.5a12 12 0 0 0 6.5 6.5L17 13l4 1.5v3a2.5 2.5 0 0 1-2.5 2.5A15.5 15.5 0 0 1 3 5.5 2.5 2.5 0 0 1 5.5 3z" />
  ),
  repeat: (
    <>
      <path d="M17 3l4 4-4 4" />
      <path d="M3 11V9a2 2 0 0 1 2-2h16" />
      <path d="M7 21l-4-4 4-4" />
      <path d="M21 13v2a2 2 0 0 1-2 2H3" />
    </>
  ),
  lost: (
    <>
      <path d="M9 4h7l4 4v10H9z" />
      <path d="M16 4v4h4" />
      <path d="M5 8v12h9" />
      <path d="M12 11h4M12 14h4" />
    </>
  ),
};

export function Problem({ locale }: { locale: Locale }) {
  const t = landingT(locale);

  return (
    <Section
      id="problem-title"
      badge={t("problem.badge")}
      title={t("problem.title")}
      intro={t("problem.intro")}
    >
      <ul className="grid gap-4 sm:grid-cols-3">
        {problems.map((problem) => (
          <li key={problem} className="site-panel p-6">
            <span className="flex size-11 items-center justify-center rounded-xl border border-primary/25 bg-primary/10 text-primary">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-5"
              >
                {icons[problem]}
              </svg>
            </span>
            <h3 className="mt-4 text-lg font-semibold text-text">{t(`problem.${problem}.title`)}</h3>
            <p className="mt-2 text-base leading-relaxed text-muted">{t(`problem.${problem}.text`)}</p>
          </li>
        ))}
      </ul>
      <p className="mt-8 text-center font-medium text-text">{t("problem.answer")}</p>
    </Section>
  );
}
