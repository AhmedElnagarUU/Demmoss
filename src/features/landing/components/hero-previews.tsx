import type { Locale } from "@/shared/i18n/config";
import { landingT } from "../translate";

const nightItems = [
  {
    key: "booking",
    initial: "hero.previews.night.items.booking.initial",
    label: "hero.previews.night.items.booking.label",
    time: "hero.previews.night.items.booking.time",
  },
  {
    key: "order",
    initial: "hero.previews.night.items.order.initial",
    label: "hero.previews.night.items.order.label",
    time: "hero.previews.night.items.order.time",
  },
  {
    key: "question",
    initial: "hero.previews.night.items.question.initial",
    label: "hero.previews.night.items.question.label",
    time: "hero.previews.night.items.question.time",
  },
] as const;

const autoSteps = [
  {
    key: "confirm",
    label: "hero.previews.auto.steps.confirm.label",
    time: "hero.previews.auto.steps.confirm.time",
  },
  {
    key: "whatsapp",
    label: "hero.previews.auto.steps.whatsapp.label",
    time: "hero.previews.auto.steps.whatsapp.time",
  },
  {
    key: "dashboard",
    label: "hero.previews.auto.steps.dashboard.label",
    time: "hero.previews.auto.steps.dashboard.time",
  },
] as const;

// Three tilted product cards under the hero, echoing the reference composition.
// Decorative: the headline and subtitle carry the message for assistive tech.
export function HeroPreviews({ locale }: { locale: Locale }) {
  const t = landingT(locale);

  return (
    <div aria-hidden="true" className="relative mx-auto mt-12 max-w-5xl px-4 sm:mt-16 sm:px-6">
      <div className="grid items-end gap-4 sm:grid-cols-[1fr_1.15fr_1.35fr] sm:gap-5">
        <div className="site-panel hidden -rotate-3 p-4 sm:block sm:translate-y-6">
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs font-semibold text-text">{t("hero.previews.night.title")}</p>
            <span className="rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-[10px] text-primary">
              {t("hero.previews.live")}
            </span>
          </div>
          <ul className="mt-4 space-y-2.5">
            {nightItems.map((item, index) => (
              <li key={item.key} className="flex items-center gap-2.5">
                <span
                  className={`flex size-7 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold text-on-primary ${
                    index === 0 ? "bg-primary" : index === 1 ? "bg-emerald-400/80" : "bg-emerald-900"
                  }`}
                >
                  {t(item.initial)}
                </span>
                <span className="min-w-0 flex-1 truncate text-[11px] text-text">{t(item.label)}</span>
                <span className="shrink-0 text-[10px] text-muted">{t(item.time)}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="site-panel p-5 sm:translate-y-1">
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs font-semibold text-text">{t("hero.previews.closed.title")}</p>
            <span className="text-[10px] text-primary">{t("hero.previews.closed.today")}</span>
          </div>
          <div className="mt-5 flex items-center gap-5">
            <div
              className="relative flex size-24 shrink-0 items-center justify-center rounded-full"
              style={{
                background: "conic-gradient(#22c55e 0deg 250deg, rgba(255,255,255,0.08) 250deg 360deg)",
              }}
            >
              <span className="flex size-[4.5rem] items-center justify-center rounded-full bg-[var(--color-site-panel)] text-[11px] text-muted">
                {t("hero.previews.closed.period")}
              </span>
            </div>
            <div>
              <p className="text-3xl font-semibold tracking-tight text-text">
                {t("hero.previews.closed.total")}
              </p>
              <p className="mt-1 text-[11px] text-muted">{t("hero.previews.closed.hint")}</p>
            </div>
          </div>
          <div className="mt-5 flex h-12 items-end gap-1.5">
            {[38, 58, 44, 72, 52, 86, 66, 94, 76, 100, 82, 92].map((height, index) => (
              <span
                key={index}
                className="flex-1 rounded-sm bg-primary/25"
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
        </div>

        <div className="site-panel hidden rotate-3 p-4 sm:block sm:translate-y-8">
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs font-semibold text-text">{t("hero.previews.auto.title")}</p>
            <span className="size-1.5 rounded-full bg-primary" />
          </div>
          <ul className="mt-4 space-y-2.5">
            {autoSteps.map((step) => (
              <li
                key={step.key}
                className="flex items-center gap-2 rounded-lg border border-white/5 bg-white/[0.03] px-2.5 py-2"
              >
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full border border-primary/40 text-primary">
                  <svg viewBox="0 0 12 12" fill="none" className="size-2.5">
                    <path
                      d="M2.5 6.2l2.2 2.2 4.8-5"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="min-w-0 flex-1 truncate text-[11px] text-text">{t(step.label)}</span>
                <span className="shrink-0 text-[10px] text-muted">{t(step.time)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
