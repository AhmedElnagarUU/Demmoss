import { redirect } from "next/navigation";
import type { Locale } from "@/shared/i18n/config";
import { getAdminSession } from "../auth/admin-session";
import { adminPath } from "../paths";
import { adminT } from "../translate";
import { LoginForm } from "./login-form";
import { PageHeading } from "./page-heading";

export async function LoginPage({ locale }: { locale: Locale }) {
  if (await getAdminSession()) redirect(adminPath(locale));
  const t = adminT(locale);

  return (
    <main id="main" className="mx-auto flex max-w-md flex-col px-4 py-10">
      <PageHeading title={t("login.title")} intro={t("login.intro")} />
      <LoginForm
        locale={locale}
        labels={{
          email: t("login.email"),
          password: t("login.password"),
          submit: t("login.submit"),
          invalidInput: t("login.invalidInput"),
          invalidCredentials: t("login.invalidCredentials"),
        }}
      />
    </main>
  );
}
