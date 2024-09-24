import { jwtDecode } from "jwt-decode";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

type DecodedType = { email: string; role: string; iat: number; exp: number };

export function middleware(request: NextRequest) {
  const token = request.cookies.get("authorization")?.value;
  const response = NextResponse.next();
  let role: string | undefined;

  if (token) {
    try {
      const decoded: DecodedType = jwtDecode(token);
      role = decoded.role;
    } catch (er) {
      console.error("Token decoding failed:", er);
      return NextResponse.redirect(new URL("/auth", request.url));
    }
  }
  const { pathname } = request.nextUrl;

  if (pathname === "/" && role === "ADMIN") {
    return NextResponse.redirect(new URL("/admin/Dashboard", request.url));
  }

  if (pathname.startsWith("/admin") && (!token || role !== "ADMIN")) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  if (pathname === "/auth" && token) {
    response.cookies.set("authorization", "", { maxAge: -1 });
  }

  return response;
}
export const config = { matcher: ["/", "/auth", "/admin/:path*"] };
