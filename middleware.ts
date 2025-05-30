import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const role = request.cookies.get('role')?.value;

  if (role !== 'authenticated') {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  return NextResponse.next();
}

// مسیردهی: فقط این صفحات را بررسی کن
export const config = {
  matcher: ['/', '/profile/:path*', '/cart'],
};
