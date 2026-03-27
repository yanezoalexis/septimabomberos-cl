import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  if (pathname.startsWith("/admin")) {
    const session = request.cookies.get("bomberos_session");
    
    if (!session) {
      const loginUrl = new URL("/auth/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }
  
  if (pathname === "/auth/login") {
    const session = request.cookies.get("bomberos_session");
    if (session) {
      const adminUrl = new URL("/admin", request.url);
      return NextResponse.redirect(adminUrl);
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/auth/login"],
};
