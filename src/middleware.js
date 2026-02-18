import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request) {
  const token = request.cookies.get("adminToken")?.value;
  const pathname = request.nextUrl.pathname;

  // Allow login page
  if (pathname.startsWith("/admin/login")) {
    return NextResponse.next();
  }

  // Protect admin pages
  if (pathname.startsWith("/admin")) {
    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);

      await jwtVerify(token, secret); // jose verify

      return NextResponse.next();
    } catch (e) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin((?!/login).*)"],
};
