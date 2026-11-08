import { redirect } from "next/navigation";
import type { Locale } from "@/shared/i18n/config";
import { getAdminSession } from "../auth/admin-session";
import { adminPath } from "../paths";
import { adminT } from "../translate";
import { LanguageSwitch } from "@/shared/ui/language-switch";
import { Logo } from "@/shared/ui/logo";
import { LoginForm } from "./login-form";
import { PageHeading } from "./page-heading";

export async function LoginPage({ locale }: { locale: Locale }) {
  if (await getAdminSession()) redirect(adminPath(locale));
  const t = adminT(locale);

  return (
    <main id="main" className="mx-auto flex min-h-screen max-w-md flex-col justify-center gap-6 px-4 py-10">
      <div className="flex items-center justify-between gap-3">
        <Logo href={`/${locale}`} />
        <LanguageSwitch locale={locale} label={t("nav.switchLanguage")} />
      </div>
      <div className="site-panel p-6 sm:p-8">
        <PageHeading title={t("login.title")} intro={t("login.intro")} />
        <LoginForm
          locale={locale}
          labels={{
            email: t("login.email"),
            password: t("login.password"),
            submit: t("login.submit"),
            invalidInput: t("login.invalidInput"),
            invalidCredentials: t("login.invalidCredentials"),
            tooManyAttempts: t("login.tooManyAttempts", { minutes: "{minutes}" }),
          }}
        />
      </div>
    </main>
  );
}
