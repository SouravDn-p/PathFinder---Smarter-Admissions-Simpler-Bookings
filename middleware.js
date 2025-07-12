import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const authRequiredRegex = [
  /^\/profile(\/.*)?$/,
  /^\/colleges\/[^/]+$/,
  /^\/my-college(\/.*)?$/,
];

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  if (authRequiredRegex.some((re) => re.test(pathname)) && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile", "/profile/:path*", "/colleges/:path*", "/my-college"],
};
