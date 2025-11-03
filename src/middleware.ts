import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define protected paths
const protectedRoutes = ['/admin'];

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  const isProtected = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  if (isProtected && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

// Run only on specific routes
export const config = {
  matcher: ['/admin/:path*',"/api/admin/:path*"],
};
