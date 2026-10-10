import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const COOKIE = "yv_session";

function secretKey() {
  const secret = process.env.AUTH_SECRET || "yogovoyage-fallback-secret-key-32b";
  return new TextEncoder().encode(secret);
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get(COOKIE)?.value;

  let role: string | null = null;
  if (token) {
    try {
      const { payload } = await jwtVerify(token, secretKey());
      role = String(payload.role || "");
    } catch {
      role = null;
    }
  }

  if (pathname.startsWith("/admin")) {
    if (!token || role !== "SUPERADMIN") {
      const url = req.nextUrl.clone();
      url.pathname = "/login";
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }
  }

  if (pathname.startsWith("/account")) {
    if (!token) {
      const url = req.nextUrl.clone();
      url.pathname = "/login";
      const next =
        req.nextUrl.search && req.nextUrl.search !== "?"
          ? `${pathname}${req.nextUrl.search}`
          : pathname;
      url.searchParams.set("next", next);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/account/:path*", "/admin/:path*"],
};
