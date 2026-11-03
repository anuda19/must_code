// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// export function middleware(request: NextRequest) {
//   // Read 'refreshToken' (and 'accessToken' if set in cookies)
//   const token = 
//     request.cookies.get('refreshToken')?.value ||
//     request.cookies.get('accessToken')?.value;

//   const { pathname } = request.nextUrl;

//   const isAuthRoute = pathname === '/login' || pathname === '/register';
//   const isProtectedRoute = pathname.startsWith('/dashboard');

//   // 1. If logged in and trying to access /login or /register, redirect to /dashboard
//   if (isAuthRoute && token) {
//     return NextResponse.redirect(new URL('/dashboard', request.url));
//   }

//   // 2. If NOT logged in and trying to access protected routes, redirect to /login
//   if (isProtectedRoute && !token) {
//     return NextResponse.redirect(new URL('/login', request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ['/dashboard/:path*', '/login', '/register'],
// };

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AUTH_ONLY_ROUTES, PUBLIC_ROUTES, ROUTES } from "./lib/routes";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;
  const isAuthenticated = Boolean(accessToken || refreshToken);

  const isPublicRoute = PUBLIC_ROUTES.some((route) =>
    route === "/" ? pathname === "/" : pathname === route || pathname.startsWith(`${route}/`)
  );

  const isAuthOnlyRoute = AUTH_ONLY_ROUTES.some((route) =>
    pathname === route || pathname.startsWith(`${route}/`)
  );

  if (isAuthOnlyRoute && isAuthenticated) {
    return NextResponse.redirect(new URL(ROUTES.dashboard, request.url));
  }

  if (!isPublicRoute && !isAuthenticated) {
    const loginUrl = new URL(ROUTES.login, request.url);
    loginUrl.searchParams.set("from", pathname); // Save intent URL
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}


export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};