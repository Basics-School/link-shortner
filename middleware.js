
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
export default auth((req) => {
  const url = req.nextUrl;
  const path = url.pathname;
  const session = req.auth;
  let publicPath =
    path === "/" ||
    path === "/sign-in" ||
    path === "/sign-up" ||
    path === "/forgot-password" ||
    path === "/reset-password" ||
    path === "/verify-email";
  if (session && publicPath) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }
  if (!session && !publicPath) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};