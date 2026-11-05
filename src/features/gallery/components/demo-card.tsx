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
    <article className="flex flex-col overflow-hidden rounded-control border border-border bg-bg">
      <Image
        src={demo.screenshot}
        alt={t("card.screenshotAlt", { name: demo.name[locale] })}
        width={640}
        height={400}
        loading="lazy"
        className="h-auto w-full border-b border-border bg-surface"
      />
      <div className="flex flex-1 flex-col gap-3 p-5">
        <p className="text-sm font-medium text-muted">{categoryName(demo.category, locale)}</p>
        <h3 className="text-xl font-bold">{demo.name[locale]}</h3>
        <p className="text-muted">{demo.pitch[locale]}</p>
        <div className="mt-auto flex flex-wrap gap-3 pt-2">
          <LinkButton href={base}>{t("card.openSite")}</LinkButton>
          <LinkButton href={`${base}/dashboard`} variant="secondary">
            {t("card.openDashboard")}
          </LinkButton>
        </div>
      </div>
    </article>
  );
}
