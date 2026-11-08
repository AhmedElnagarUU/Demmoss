import type { Locale } from "@/shared/i18n/config";
import { LinkButton } from "@/shared/ui/link-button";
import { landingT } from "../translate";
import { Section } from "./section";

const bars = [42, 58, 50, 74, 62, 88, 70, 96];

export function DemoHighlights({ locale }: { locale: Locale }) {
  const t = landingT(locale);

  return (
    <Section id="demos-title" badge={t("demos.badge")} title={t("demos.title")} intro={t("demos.text")}>
      <div className="site-panel mx-auto flex max-w-4xl flex-col items-center gap-8 px-5 py-8 sm:px-8 sm:py-10">
        <div aria-hidden="true" className="w-full max-w-xl">
          <div className="overflow-hidden rounded-xl border border-white/10 bg-[#060a08]">
            <div className="flex items-center gap-2 border-b border-white/5 px-4 py-2.5">
              <span className="size-2 rounded-full bg-red-400/70" />
              <span className="size-2 rounded-full bg-amber-300/70" />
              <span className="size-2 rounded-full bg-primary/80" />
              <span className="ms-2 h-4 flex-1 rounded-full bg-white/5" />
            </div>
            <div className="grid gap-3 p-4 sm:grid-cols-[1.2fr_1fr]">
              <div className="rounded-lg border border-white/5 bg-white/[0.03] p-3">
                <div className="h-2 w-16 rounded-full bg-white/15" />
                <div className="mt-3 flex h-20 items-end gap-1.5">
                  {bars.map((height, index) => (
                    <span
                      key={index}
                      className={`flex-1 rounded-sm ${index === 5 ? "bg-primary" : "bg-primary/20"}`}
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>
              </div>
              <div className="grid gap-2">
                {["bg-primary/30", "bg-white/10", "bg-white/10"].map((tone, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 rounded-lg border border-white/5 bg-white/[0.02] p-2.5"
                  >
                    <span className={`size-6 rounded-md ${tone}`} />
                    <span className="flex-1">
                      <span className="block h-1.5 w-14 rounded-full bg-white/15" />
                      <span className="mt-1.5 block h-1.5 w-8 rounded-full bg-white/10" />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <LinkButton
          href={`/${locale}/demos`}
          variant="secondary"
          className="site-pill site-btn-secondary relative gap-2"
        >
          <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="size-4">
            <path d="M7 5.5v9l7-4.5-7-4.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          </svg>
          {t("demos.cta")}
        </LinkButton>
      </div>
    </Section>
  );
}
