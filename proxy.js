import { NextResponse } from "next/server";

const HOST_TO_PATH = {
  "studio.kronel.io": "/studio",
  "advertising.kronel.io": "/advertising",
  "capital.kronel.io": "/capital",
};

export function proxy(request) {
  const host = request.headers.get("host")?.split(":")[0];
  const destination = host && HOST_TO_PATH[host];

  if (!destination) {
    return NextResponse.next();
  }

  if (request.nextUrl.pathname === "/") {
    return NextResponse.rewrite(new URL(destination, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
