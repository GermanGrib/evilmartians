import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import RoutesPaths from "@/types/routes-paths";

const protectedRoutes = [RoutesPaths.EVILMARTIANS];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAuthenticated =
    request.cookies.get("isAuthenticated")?.value === "true";

  if (
    !isAuthenticated &&
    protectedRoutes.includes(pathname as "/evilmartians")
  ) {
    return NextResponse.redirect(new URL(RoutesPaths.LOGIN, request.url));
  }

  if (isAuthenticated && pathname === RoutesPaths.LOGIN) {
    return NextResponse.redirect(new URL(RoutesPaths.HOME, request.url));
  }

  return NextResponse.next();
}
