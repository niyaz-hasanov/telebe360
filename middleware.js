import { NextResponse } from 'next/server';
import cookie from 'cookie';

export async function middleware(req) {
  const cookies = cookie.parse(req.headers.get('cookie') || '');
  const refreshToken = cookies.access_token; 

  if (!refreshToken) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next(); 
}

export const config = {
  matcher: [
    '/before_login',
    '/settings',
    '/settings/my360id/',
    '/settings/membership/',
    '/settings/security',
    '/settings/notifications',
    '/settings/references',
    '/my_tickets',
  ],
};
