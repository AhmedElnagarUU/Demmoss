import type { Locale } from "@/shared/i18n/config";
import { landingT } from "../translate";

const leads = [
  {
    key: "hero.previews.leads1",
    initial: "hero.previews.leads1.initial",
    label: "hero.previews.leads1.label",
    time: "hero.previews.leads1.time",
  },
  {
    key: "hero.previews.leads2",
    initial: "hero.previews.leads2.initial",
    label: "hero.previews.leads2.label",
    time: "hero.previews.leads2.time",
  },
  {
    key: "hero.previews.leads3",
    initial: "hero.previews.leads3.initial",
    label: "hero.previews.leads3.label",
    time: "hero.previews.leads3.time",
  },
] as const;

const orders = [
  { key: "confirmed", label: "hero.previews.orders.confirmed", ago: "hero.previews.ordersAgo.confirmed" },
  { key: "paid", label: "hero.previews.orders.paid", ago: "hero.previews.ordersAgo.paid" },
  {
    key: "whatsapp",
    label: "hero.previews.orders.whatsapp",
    ago: "hero.previews.ordersAgo.whatsapp",
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
            <p className="text-xs font-semibold text-text">{t("hero.previews.leadsTitle")}</p>
            <span className="rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-[10px] text-primary">
              {t("hero.previews.live")}
            </span>
          </div>
          <ul className="mt-4 space-y-2.5">
            {leads.map((lead, index) => (
              <li key={lead.key} className="flex items-center gap-2.5">
                <span
                  className={`flex size-7 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold text-on-primary ${
                    index === 0 ? "bg-primary" : index === 1 ? "bg-emerald-400/80" : "bg-emerald-900"
                  }`}
                >
                  {t(lead.initial)}
                </span>
                <span className="min-w-0 flex-1 truncate text-[11px] text-text">{t(lead.label)}</span>
                <span className="shrink-0 text-[10px] text-muted">{t(lead.time)}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="site-panel p-5 sm:translate-y-1">
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs font-semibold text-text">{t("hero.previews.bookingsTitle")}</p>
            <span className="text-[10px] text-primary">{t("hero.previews.bookingsTrend")}</span>
          </div>
          <div className="mt-5 flex items-center gap-5">
            <div
              className="relative flex size-24 shrink-0 items-center justify-center rounded-full"
              style={{
                background: "conic-gradient(#22c55e 0deg 250deg, rgba(255,255,255,0.08) 250deg 360deg)",
              }}
            >
              <span className="flex size-[4.5rem] items-center justify-center rounded-full bg-[var(--color-site-panel)] text-[11px] text-muted">
                {t("hero.previews.bookingsLabel")}
              </span>
            </div>
            <div>
              <p className="text-3xl font-semibold tracking-tight text-text">
                {t("hero.previews.bookingsTotal")}
              </p>
              <p className="mt-1 text-[11px] text-muted">{t("hero.previews.bookingsHint")}</p>
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
            <p className="text-xs font-semibold text-text">{t("hero.previews.ordersTitle")}</p>
            <span className="size-1.5 rounded-full bg-primary" />
          </div>
          <ul className="mt-4 space-y-2.5">
            {orders.map((order) => (
              <li
                key={order.key}
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
                <span className="min-w-0 flex-1 truncate text-[11px] text-text">{t(order.label)}</span>
                <span className="shrink-0 text-[10px] text-muted">{t(order.ago)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
