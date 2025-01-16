import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const protectedRoutes = ['/dashboard'];
  const authToken = request.cookies.get('next-auth.session-token') || request.cookies.get('__Secure-next-auth.session-token');

  const isProtected = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  if (isProtected && !authToken) {
    const url = new URL('/login', request.url);
    url.searchParams.set('callbackUrl', request.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Add the config here
export const config = {
  matcher: ['/dashboard/:path*'], // Protect all `/dashboard` routes
};
