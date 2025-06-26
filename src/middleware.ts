import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("auth_token")?.value;
  const { pathname } = req.nextUrl;

  // ✅ Redirect /admin to /admin/dashboard
  if (pathname === "/admin") {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }

  // ✅ If authenticated user visits `/admin/sign-in`, redirect them to `/admin`
  if (pathname === "/admin/sign-in" && token) {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }

  // ✅ Allow access to `/admin/sign-in` if not authenticated
  if (pathname === "/admin/sign-in") {
    return NextResponse.next();
  }

  // ✅ Protect all "/admin" routes (except "/admin/sign-in") if no token
  if (pathname.startsWith("/admin") && !token) {
    return NextResponse.redirect(new URL("/admin/sign-in", req.url));
  }

  return NextResponse.next();
}

// ✅ Apply middleware to all `/admin` routes
export const config = {
  matcher: ["/admin/:path*"],
};
