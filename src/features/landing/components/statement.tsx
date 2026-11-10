import type { Locale } from "@/shared/i18n/config";
import { landingT } from "../translate";

function Dot({ className }: { className: string }) {
  return (
    <span
      aria-hidden="true"
      className={`absolute size-2.5 rounded-full border-2 border-bg bg-text ring-1 ring-white/70 shadow-[0_0_10px_rgba(255,255,255,0.7)] ${className}`}
    />
  );
}

export function Statement({ locale }: { locale: Locale }) {
  const t = landingT(locale);

  return (
    <section aria-labelledby="statement-text" className="overflow-hidden px-5 py-20 sm:py-28">
      <div className="relative mx-auto aspect-square w-[min(92vw,720px)]">
        <div
          aria-hidden="true"
          className="absolute -inset-[12%] rounded-full bg-[radial-gradient(circle,var(--color-accent),transparent_70%)] opacity-[0.12] blur-[70px]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-full border border-white/30 shadow-[0_0_22px_rgba(255,255,255,0.14),inset_0_0_30px_rgba(255,255,255,0.05)]"
        />
        <Dot className="start-[8%] top-[28%]" />
        <Dot className="end-[8%] top-[28%]" />
        <Dot className="bottom-[0.4%] start-1/2 -translate-x-1/2 rtl:translate-x-1/2" />

        <span className="studio-badge absolute start-1/2 top-0 -translate-x-1/2 -translate-y-1/2 shadow-lg shadow-black/40 rtl:translate-x-1/2">
          {t("statement.badge")}
        </span>

        <p
          id="statement-text"
          className="studio-display absolute inset-x-[14%] top-1/2 -translate-y-1/2 text-balance text-center text-[clamp(1.25rem,3.4vw,2.6rem)] text-text"
        >
          {t("statement.text")}
        </p>

        <span className="studio-badge absolute bottom-[18%] start-[12%] shadow-lg shadow-black/40">
          {t("statement.demos")}
        </span>
        <span className="studio-badge absolute bottom-[18%] end-[12%] shadow-lg shadow-black/40">
          {t("statement.languages")}
        </span>
      </div>
    </section>
  );
}
