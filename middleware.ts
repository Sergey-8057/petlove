import { NextRequest, NextResponse } from 'next/server';

const privateRoutes = ['/profile'];
const authRoutes = ['/login', '/register'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get('accessToken')?.value;

  const isPrivateRoute = privateRoutes.some(route => pathname.startsWith(route));

  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));

  if (!accessToken) {
    if (isPrivateRoute) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    return NextResponse.next();
  }

  if (isAuthRoute) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/profile/:path*', '/login', '/register'],
};
