import { NextResponse } from "next/server";

const HOST_TO_PATH = {
  "studio.kronel.io": "/studio",
  "advertising.kronel.io": "/advertising",
  "capital.kronel.io": "/capital",
};

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

export function proxy(request) {
  const host = request.headers.get("host")?.split(":")[0];
  const destination = host && HOST_TO_PATH[host];

  if (!destination) {
    return withCountryCookie(NextResponse.next(), request);
  }

  if (request.nextUrl.pathname === "/") {
    return withCountryCookie(NextResponse.rewrite(new URL(destination, request.url)), request);
  }

  return withCountryCookie(NextResponse.next(), request);
}

export const config = {
  matcher: ["/", "/studio/:path*"],
};
