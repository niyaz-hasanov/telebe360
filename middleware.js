import { NextResponse } from 'next/server';
import cookie from 'cookie';

export async function middleware(req) {
  // Cookie'den access_token kontrolü
  const cookies = cookie.parse(req.headers.get('cookie') || '');
  const accessToken = cookies.access_token; // Doğru cookie adını kullanın

  // access_token yoksa login sayfasına yönlendirme
  if (!accessToken) {
    const loginUrl = new URL('/login', req.url);
    return NextResponse.redirect(loginUrl);
  }

  // Eğer access_token varsa devam et
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
  ],
};
