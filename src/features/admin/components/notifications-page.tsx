import type { Locale } from "@/shared/i18n/config";
import { Button } from "@/shared/ui/button";
import { markAllNotificationsReadAction, openNotificationAction } from "../actions";
import { formatDateTime, formatDay, formatNumber } from "../format";
import { getNotificationGroups, getUnreadNotificationCount } from "../service";
import { adminT } from "../translate";
import { PageHeading } from "./page-heading";
import { linkClasses } from "./styles";

export async function NotificationsPage({ locale }: { locale: Locale }) {
  const t = adminT(locale);
  const [days, unread] = await Promise.all([getNotificationGroups(), getUnreadNotificationCount()]);

  return (
    <>
      <PageHeading title={t("notifications.title")} intro={t("notifications.intro")} />
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <p className="text-base font-semibold text-text">
          {unread > 0
            ? t("notifications.unreadCount", { count: formatNumber(unread, locale) })
            : t("notifications.allRead")}
        </p>
        {unread > 0 ? (
          <form action={markAllNotificationsReadAction}>
            <input type="hidden" name="locale" value={locale} />
            <Button type="submit" variant="secondary">
              {t("notifications.markAllRead")}
            </Button>
          </form>
        ) : null}
      </div>
      <p className="mb-4 text-sm text-muted">{t("common.timesUtc")}</p>

      {days.length === 0 ? (
        <p className="text-base text-muted">{t("common.empty")}</p>
      ) : (
        days.map((day) => (
          <section key={day.day} className="mb-6">
            <h2 className="mb-2 text-lg font-semibold text-text">{formatDay(day.day, locale)}</h2>
            <div className="flex flex-col gap-2">
              {day.types.map((group) => (
                <details key={group.type} className="site-tile p-3" open={group.unread > 0}>
                  <summary className="cursor-pointer font-semibold text-text">
                    {t("notifications.group", {
                      type: t(`notificationTypes.${group.type}`),
                      count: formatNumber(group.count, locale),
                    })}
                    {group.unread > 0 ? (
                      <span className="ms-2 text-sm text-primary">
                        {t("notifications.unreadCount", { count: formatNumber(group.unread, locale) })}
                      </span>
                    ) : null}
                  </summary>
                  <ul className="mt-3 flex flex-col gap-2">
                    {group.items.map((item) => (
                      <li key={item.id}>
                        <form action={openNotificationAction} className="flex flex-wrap items-baseline gap-2">
                          <input type="hidden" name="id" value={item.id} />
                          <input type="hidden" name="type" value={item.type} />
                          <input type="hidden" name="locale" value={locale} />
                          <button
                            type="submit"
                            aria-label={t("notifications.openItem", { title: item.title })}
                            className={`text-start ${linkClasses} ${item.read ? "font-normal" : ""}`}
                          >
                            {item.title}
                          </button>
                          <span className="text-sm text-muted">
                            {formatDateTime(item.createdAt, locale)}
                            {item.read ? "" : ` · ${t("notifications.unreadItem")}`}
                          </span>
                        </form>
                      </li>
                    ))}
                  </ul>
                </details>
              ))}
            </div>
          </section>
        ))
      )}
    </>
  );
}
