export const locales = ["ar", "en"] as const;

export type Locale = (typeof locales)[number];

export const LOCALE_COOKIE = "locale";

const ONE_YEAR_IN_SECONDS = 60 * 60 * 24 * 365;

// Browser only: the proxy reads this cookie to send the visitor to their language next time.
export function rememberLocale(locale: Locale): void {
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=${ONE_YEAR_IN_SECONDS}; samesite=lax`;
}

export function isLocale(value: string | undefined | null): value is Locale {
  return locales.some((locale) => locale === value);
}

export function directionOf(locale: Locale): "rtl" | "ltr" {
  return locale === "ar" ? "rtl" : "ltr";
}

export function otherLocale(locale: Locale): Locale {
  return locale === "ar" ? "en" : "ar";
}

export function localeFromPath(pathname: string): Locale | null {
  const firstSegment = pathname.split("/")[1];
  return isLocale(firstSegment) ? firstSegment : null;
}

export function switchPathLocale(pathname: string, to: Locale): string {
  const rest = localeFromPath(pathname) ? pathname.split("/").slice(2).join("/") : pathname.slice(1);
  return rest ? `/${to}/${rest}` : `/${to}`;
}

type PickLocaleInput = {
  cookie: string | undefined;
  fallback: Locale;
};

export function pickLocale({ cookie, fallback }: PickLocaleInput): Locale {
  if (isLocale(cookie)) return cookie;
  return fallback;
}
