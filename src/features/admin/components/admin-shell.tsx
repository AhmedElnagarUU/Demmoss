import type { ReactNode } from "react";
import type { Locale } from "@/shared/i18n/config";
import { Button } from "@/shared/ui/button";
import { logoutAction } from "../actions";
import { adminPath, type AdminSection } from "../paths";
import { adminT } from "../translate";
import { SidebarLink } from "./sidebar-link";

const sections = [
  { section: "", key: "overview" },
  { section: "leads", key: "leads" },
  { section: "visitors", key: "visitors" },
  { section: "demos", key: "demos" },
  { section: "activity", key: "activity" },
  { section: "feedback", key: "feedback" },
  { section: "notifications", key: "notifications" },
] as const satisfies readonly { section: AdminSection; key: string }[];

type Props = { locale: Locale; unreadNotifications: number; children: ReactNode };

export function AdminShell({ locale, unreadNotifications, children }: Props) {
  const t = adminT(locale);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6 md:flex-row">
      <aside className="flex shrink-0 flex-col gap-4 md:w-56">
        <nav aria-label={t("nav.label")}>
          <ul className="flex flex-wrap gap-1 md:flex-col">
            {sections.map(({ section, key }) => (
              <li key={key}>
                <SidebarLink
                  href={adminPath(locale, section)}
                  label={t(`nav.${key}`)}
                  exact={section === ""}
                  unread={key === "notifications" ? unreadNotifications : 0}
                  unreadLabel={t("nav.unread", { count: String(unreadNotifications) })}
                />
              </li>
            ))}
          </ul>
        </nav>
        <form action={logoutAction}>
          <input type="hidden" name="locale" value={locale} />
          <Button type="submit" variant="secondary" className="w-full">
            {t("nav.logout")}
          </Button>
        </form>
      </aside>
      <main id="main" className="min-w-0 flex-1">
        {children}
      </main>
    </div>
  );
}
