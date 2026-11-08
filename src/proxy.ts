import { NextResponse, type NextRequest } from "next/server";
import { publicEnv } from "@/shared/env";
import { LOCALE_COOKIE, pickLocale } from "@/shared/i18n/config";

// Only redirects paths without a locale. Localized pages stay static and are never touched here.
export function proxy(request: NextRequest) {
  const locale = pickLocale({
    cookie: request.cookies.get(LOCALE_COOKIE)?.value,
    fallback: publicEnv.NEXT_PUBLIC_DEFAULT_LOCALE,
  });
  const url = request.nextUrl.clone();
  url.pathname = url.pathname === "/" ? `/${locale}` : `/${locale}${url.pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|ar(?:/|$)|en(?:/|$)|.*\\..*).*)"],
};
