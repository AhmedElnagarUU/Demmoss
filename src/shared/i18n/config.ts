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
  acceptLanguage: string | null;
  fallback: Locale;
};

export function pickLocale({ cookie, acceptLanguage, fallback }: PickLocaleInput): Locale {
  if (isLocale(cookie)) return cookie;
  return preferredLanguage(acceptLanguage) ?? fallback;
}

function preferredLanguage(acceptLanguage: string | null): Locale | null {
  if (!acceptLanguage) return null;
  const ranked = acceptLanguage
    .split(",")
    .map((part) => {
      const [tag = "", ...params] = part.trim().split(";");
      const qParam = params.find((param) => param.trim().startsWith("q="));
      const quality = qParam ? Number(qParam.trim().slice(2)) : 1;
      return { language: tag.split("-")[0]?.toLowerCase(), quality: Number.isNaN(quality) ? 0 : quality };
    })
    .filter((entry) => entry.quality > 0)
    .sort((a, b) => b.quality - a.quality);
  return ranked.map((entry) => entry.language).find(isLocale) ?? null;
}
