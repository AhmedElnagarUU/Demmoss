import type { Locale } from "@/shared/i18n/config";
import { Button } from "@/shared/ui/button";
import { markFeedbackReadAction } from "../actions";
import { formatDateTime, templateName } from "../format";
import { getFeedback } from "../service";
import { adminT } from "../translate";
import { PageHeading } from "./page-heading";

export async function FeedbackPage({ locale }: { locale: Locale }) {
  const t = adminT(locale);
  const feedback = await getFeedback();

  return (
    <>
      <PageHeading title={t("feedback.title")} intro={t("feedback.intro")} />
      <p className="mb-2 text-sm text-muted">{t("common.timesUtc")}</p>
      {feedback.length === 0 ? (
        <p className="text-base text-muted">{t("common.empty")}</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {feedback.map((item) => (
            <li
              key={item.id}
              className={`rounded-control border p-4 ${item.read ? "border-border" : "border-primary bg-surface"}`}
            >
              <article className="flex flex-col gap-2">
                <header className="flex flex-wrap items-center justify-between gap-2 text-sm text-muted">
                  <span>
                    {formatDateTime(item.createdAt, locale)} ·{" "}
                    <span className="font-semibold text-text">
                      {item.read ? t("feedback.read") : t("feedback.unread")}
                    </span>
                  </span>
                  {item.read ? null : (
                    <form action={markFeedbackReadAction}>
                      <input type="hidden" name="id" value={item.id} />
                      <input type="hidden" name="locale" value={locale} />
                      <Button
                        type="submit"
                        variant="secondary"
                        aria-label={t("feedback.markReadFor", {
                          date: formatDateTime(item.createdAt, locale),
                        })}
                      >
                        {t("feedback.markRead")}
                      </Button>
                    </form>
                  )}
                </header>
                <p className="whitespace-pre-wrap text-base text-text">{item.message}</p>
                <p className="text-sm text-muted">
                  {t("feedback.contact")}: {item.contact ?? t("feedback.noContact")}
                </p>
                <p className="text-sm text-muted">
                  {t("feedback.page")}: <bdi>{item.page}</bdi>
                  {item.template ? ` · ${templateName(item.template, locale)}` : ""}
                </p>
              </article>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
