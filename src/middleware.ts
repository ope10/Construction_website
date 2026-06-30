import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const path = url.pathname;

  // 1. Handle Logout path
  if (path === '/hq-portal-tx98z/logout') {
    const response = NextResponse.redirect(new URL('/', request.url));
    response.cookies.delete('hq_session');
    return response;
  }

  // 2. Guard all sub-paths under /hq-portal-tx98z/ (like /submissions)
  // We leave '/hq-portal-tx98z' (the root of the portal) completely accessible so it can render the login form.
  if (path.startsWith('/hq-portal-tx98z/') && path !== '/hq-portal-tx98z') {
    const adminPassword = process.env.ADMIN_PASSWORD || 'changeme';
    const sessionCookie = request.cookies.get('hq_session');

    if (sessionCookie?.value !== adminPassword) {
      // Internally rewrite to /404. Address bar keeps showing the requested path,
      // but rendering is a 404 page, hiding the route existence.
      return NextResponse.rewrite(new URL('/404', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/hq-portal-tx98z/:path*'],
};
