import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.AUTH_SECRET });

  const isOnDashboard = request.nextUrl.pathname.startsWith('/dashboard');

  if (isOnDashboard && !token) {
    // Redirect unauthenticated users to the login page
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'], // Apply middleware only to dashboard routes
};