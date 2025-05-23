import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "@/lib/auth-middleware";

const unprotectedRoutes = ["/auth", "/api/public"];

export default async function middleware(request: NextRequest) {
  const session = await authMiddleware(request);
  const { pathname } = request.nextUrl;

  const isUnprotected = unprotectedRoutes.some(route =>
    pathname.startsWith(route)
  );

  if (!isUnprotected && !session) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|wallboard|api/customer/insight|api/configuration/tag|api/wallboard|api/auth|auth|api/text/facebook).*)",
  ],
};