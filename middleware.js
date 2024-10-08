import { NextResponse } from 'next/server';
import {MAINURL} from './utils/constants'
export async function middleware(req) {
  const accessToken = req.cookies.get('access_token')?.value;
  const refreshToken = req.cookies.get('refresh_token')?.value;

  // Eğer access token yoksa, kullanıcıyı login sayfasına yönlendir
  if (!accessToken) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Access token süresinin dolup dolmadığını kontrol et
  const isAccessTokenExpired = checkTokenExpiration(accessToken);

  // Eğer access token süresi dolmuşsa
  if (isAccessTokenExpired) {
    // Refresh token varsa yeni access token almak için API'ye istek at
    if (refreshToken) {
      const newAccessToken = await refreshAccessToken(refreshToken);

      if (newAccessToken) {
        // Yeni access token'ı cookie'ye kaydet
        const response = NextResponse.next();
        response.cookies.set('access_token', newAccessToken, {
          httpOnly: true, // Güvenlik için HttpOnly olarak ayarla
          secure: true, // Sadece HTTPS üzerinde gönderilsin
        });
        return response;
      } else {
        // Refresh token geçersizse, kullanıcıyı giriş sayfasına yönlendir
        return NextResponse.redirect(new URL('/login', req.url));
      }
    } else {
      // Refresh token yoksa, kullanıcıyı giriş sayfasına yönlendir
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  return NextResponse.next();
}

// Token süresinin dolup dolmadığını kontrol eden bir fonksiyon
function checkTokenExpiration(token) {
  const payload = JSON.parse(atob(token.split('.')[1])); // Token'ın payload kısmını al
  const expirationTime = payload.exp * 1000; // Exp zamanını milisaniyeye çevir
  return Date.now() > expirationTime; // Şu anki zamanın exp zamanını geçip geçmediğini kontrol et
}

// Yeni access token almak için API'ye istek atan fonksiyon
async function refreshAccessToken(refreshToken) {
  const res = await fetch(`${MAINURL}api/v1/auth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refresh_token: refreshToken }),
  });

  if (res.ok) {
    const data = await res.json();
    return data.access_token; // Yeni access token'ı döndür
  }

  return null; // Hata durumunda null döndür
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
