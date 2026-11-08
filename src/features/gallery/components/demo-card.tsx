import Image from "next/image";
import type { Locale } from "@/shared/i18n/config";
import { LinkButton } from "@/shared/ui/link-button";
import { categoryName } from "../categories";
import { galleryT } from "../translate";
import type { TemplateMeta } from "../types";

export function DemoCard({ locale, demo }: { locale: Locale; demo: TemplateMeta }) {
  const t = galleryT(locale);
  const base = `/${locale}/demos/${demo.category}/${demo.variant}`;

  return (
    <article className="site-tile group flex flex-col overflow-hidden">
      <Image
        src={demo.screenshot}
        alt={t("card.screenshotAlt", { name: demo.name[locale] })}
        width={640}
        height={400}
        loading="lazy"
        className="aspect-[16/10] w-full border-b border-white/5 bg-surface object-cover object-top"
      />
      <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
        <p className="text-xs font-semibold text-primary">{categoryName(demo.category, locale)}</p>
        <h3 className="text-xl font-semibold text-text">{demo.name[locale]}</h3>
        <p className="text-base leading-relaxed text-muted">{demo.pitch[locale]}</p>
        <div className="mt-auto flex flex-wrap gap-3 pt-2">
          <LinkButton
            href={base}
            target="_blank"
            rel="noopener noreferrer"
            className="site-pill bg-primary text-on-primary hover:bg-primary-hover"
          >
            {t("card.openSite")}
            <span className="sr-only"> {t("card.newTab")}</span>
          </LinkButton>
          <LinkButton href={`${base}/dashboard`} variant="secondary" className="site-pill site-btn-ghost">
            {t("card.openDashboard")}
          </LinkButton>
        </div>
      </div>
    </article>
  );
}
