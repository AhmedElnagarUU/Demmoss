import type { ReactNode } from "react";
import type { Locale } from "@/shared/i18n/config";
import { landingT } from "../translate";
import { Section } from "./section";

const steps = ["step1", "step2", "step3", "step4"] as const;

const stroke = {
  fill: "none",
  stroke: "#4ade80",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

// Small green line illustrations, one per step. Decorative: the step text carries the meaning.
const illustrations: Record<(typeof steps)[number], ReactNode> = {
  step1: (
    <svg viewBox="0 0 220 110" className="h-full w-full">
      <rect x="40" y="8" width="140" height="94" rx="10" {...stroke} strokeOpacity="0.5" />
      <rect x="56" y="24" width="108" height="12" rx="6" {...stroke} strokeOpacity="0.6" />
      <rect x="56" y="44" width="108" height="12" rx="6" {...stroke} strokeOpacity="0.6" />
      <rect x="76" y="68" width="68" height="24" rx="8" fill="#22c55e" />
      <path
        d="M100 80h20m-6-5 5 5-5 5"
        stroke="#03150b"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  ),
  step2: (
    <svg viewBox="0 0 220 110" className="h-full w-full">
      <path d="M62 55h30M128 55h30" {...stroke} strokeOpacity="0.6" strokeDasharray="3 4" />
      {[34, 110, 186].map((x, index) => (
        <g key={x}>
          <rect
            x={x - 24}
            y="31"
            width="48"
            height="48"
            rx="12"
            fill="#0b1410"
            stroke="#22c55e"
            strokeOpacity={index === 1 ? 1 : 0.45}
          />
          <circle cx={x} cy="55" r={index === 1 ? 9 : 7} {...stroke} />
        </g>
      ))}
    </svg>
  ),
  step3: (
    <svg viewBox="0 0 220 110" className="h-full w-full">
      <rect x="30" y="10" width="160" height="92" rx="10" {...stroke} strokeOpacity="0.5" />
      <path d="M30 30h160" {...stroke} strokeOpacity="0.5" />
      <circle cx="44" cy="20" r="2.5" fill="#22c55e" />
      <circle cx="54" cy="20" r="2.5" fill="#22c55e" fillOpacity="0.5" />
      <rect x="46" y="42" width="70" height="46" rx="6" {...stroke} strokeOpacity="0.6" />
      <path d="M130 48h44M130 62h34M130 76h40" {...stroke} strokeOpacity="0.6" />
      <path
        d="M150 90l22-22 6 6-22 22-9 3z"
        fill="#0b1410"
        stroke="#22c55e"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  ),
  step4: (
    <svg viewBox="0 0 220 110" className="h-full w-full">
      <rect x="50" y="12" width="120" height="70" rx="10" {...stroke} strokeOpacity="0.5" />
      <path d="M96 96h28M110 82v14" {...stroke} strokeOpacity="0.5" />
      <path
        d="M92 66c0-18 8-30 18-38 10 8 18 20 18 38l-9-4h-18z"
        fill="#0b1410"
        stroke="#22c55e"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="110" cy="48" r="5" {...stroke} />
      <circle cx="152" cy="28" r="4" fill="#22c55e" />
      <circle cx="152" cy="28" r="8" {...stroke} strokeOpacity="0.4" />
    </svg>
  ),
};

export function HowWeWork({ locale }: { locale: Locale }) {
  const t = landingT(locale);

  return (
    <Section
      id="how-title"
      badge={t("how.badge")}
      title={
        <>
          {t("how.titleLead")} <br />
          <span className="site-serif text-[1.1em]">{t("how.titleAccent")}</span>
        </>
      }
      tone="soft"
    >
      <ol className="grid gap-4 md:grid-cols-2">
        {steps.map((step, index) => (
          <li key={step} className="site-tile flex flex-col justify-between gap-6 p-6 sm:p-7">
            <div className="flex items-start gap-4">
              <p
                aria-hidden="true"
                className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-sm font-semibold text-primary"
              >
                {(index + 1).toLocaleString(locale)}
              </p>
              <div>
                <h3 className="text-lg font-medium text-text">{t(`how.${step}.title`)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{t(`how.${step}.text`)}</p>
              </div>
            </div>
            <div
              aria-hidden="true"
              className="mx-auto h-28 w-full max-w-xs rounded-xl border border-white/10 bg-black/30 p-2"
            >
              {illustrations[step]}
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
