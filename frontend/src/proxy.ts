import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;
  const protectedRoute = ["/Home", "/Profile"];
  const isProtected = protectedRoute.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );
  if (!token && isProtected) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (token && pathname === "/") {
    return NextResponse.redirect(new URL("/Home", request.url));
  }
  return NextResponse.next();
}
console.log("Middleware OK");

export const config = {
  matcher: ["/", "/Home/:path*","/Profile"],
};
