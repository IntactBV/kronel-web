import { NextResponse } from "next/server";
import languageSettings from "./app/[locale]/studio/languages.json";

const HOST_TO_PATH = {
  "studio.kronel.io": "studio",
  "advertising.kronel.io": "advertising",
  "capital.kronel.io": "capital",
};

const enabledLocales = Object.entries(languageSettings.countries)
  .filter(([, config]) => config.enabled !== false)
  .map(([code]) => code);
const defaultLocale = enabledLocales[0] || "en";

function getCountryCode(request) {
  return (
    request.headers.get("x-vercel-ip-country") ||
    request.headers.get("cf-ipcountry") ||
    request.headers.get("cloudfront-viewer-country") ||
    request.headers.get("x-country-code") ||
    ""
  ).toUpperCase();
}

function withCountryCookie(response, request) {
  const countryCode = getCountryCode(request);

  if (countryCode) {
    response.cookies.set("kronel.country", countryCode, {
      maxAge: 60 * 60 * 24,
      path: "/",
      sameSite: "lax",
    });
  }

  return response;
}

function getPreferredLocale(request) {
  const cookieLocale = request.cookies.get("kronel.studio.language")?.value;
  if (cookieLocale && enabledLocales.includes(cookieLocale)) return cookieLocale;

  const preferred = request.headers
    .get("accept-language")
    ?.split(",")[0]
    .split("-")[0]
    .toLowerCase();

  return enabledLocales.includes(preferred) ? preferred : defaultLocale;
}

export function proxy(request) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return withCountryCookie(NextResponse.next(), request);
  }

  const host = request.headers.get("host")?.split(":")[0];
  const destination = host && HOST_TO_PATH[host];
  const pathnameHasLocale = enabledLocales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );

  if (pathnameHasLocale) {
    return withCountryCookie(NextResponse.next(), request);
  }

  const locale = getPreferredLocale(request);
  const nextUrl = request.nextUrl.clone();

  nextUrl.pathname =
    destination && pathname === "/"
      ? `/${locale}/${destination}`
      : `/${locale}${pathname}`;

  return withCountryCookie(NextResponse.redirect(nextUrl, 308), request);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
