import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const protectedRoutes = ["/evilmartinas"];

export function middleware(request: NextRequest) {
  const isAuthenticated =
    request.cookies.get("isAuthenticated")?.value === "true";

  const { pathname } = request.nextUrl;

  if (!isAuthenticated && protectedRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isAuthenticated && pathname === "/login") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/evilmartinas", "/"],
};
