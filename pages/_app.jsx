import '../styles/globals.css';
import Navbar from '../components/navbar&toggle/navbar';
import { useRouter } from 'next/router';
import { useState, useEffect, useRef } from 'react';
import '@leenguyen/react-flip-clock-countdown/dist/index.css';
import Image from 'next/image';
import { Toaster } from 'react-hot-toast';
import toast from "../utils/toastLimited"; // path'i dosyana göre ayarla

import startTokenRefresh from '../utils/startTokenRefresh';
import Footer from '../components/footer/index';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../components/theme';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // interval id'yi saklayalım (cleanup garanti olsun)
  const refreshIntervalRef = useRef(null);

  useEffect(() => {
    // Service Worker kaydı
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/service-worker.js')
        .catch((error) => {
          console.error('Service Worker registration failed:', error);
        });
    }

    const handleStart = () => {
      setLoading(true);
      toast.dismiss(); // route değişirken ekrandaki toastları temizle
    };

    const handleComplete = () => setLoading(false);

    // Router event listener'ları
    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    // Token refresh setup (erken return yok)
    if (typeof window !== 'undefined') {
      const tokenRefreshStartTimeRaw = localStorage.getItem('tokenRefreshStartTime');
      const tokenRefreshStartTime = tokenRefreshStartTimeRaw ? Number(tokenRefreshStartTimeRaw) : 0;

      const currentTime = Date.now();
      const thirtyMinutes = 30 * 60 * 1000;

      const shouldStart =
        !tokenRefreshStartTime || Number.isNaN(tokenRefreshStartTime) || currentTime - tokenRefreshStartTime > thirtyMinutes;

      if (shouldStart) {
        // bir kere çalıştır
        startTokenRefresh();

        // varsa eski interval'i temizle
        if (refreshIntervalRef.current) {
          clearInterval(refreshIntervalRef.current);
        }

        // tekrar eden refresh
        refreshIntervalRef.current = setInterval(() => {
          startTokenRefresh();
        }, thirtyMinutes);

        localStorage.setItem('tokenRefreshStartTime', String(currentTime));
      }
    }

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);

      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
        refreshIntervalRef.current = null;
      }
    };
  }, [router]);

  const noNavbarRoutes = [
    '/technical_support',
    '/notifications',
    '/login',
    '/before_login',
    '/register',
    '/settings',
    '/settings/my360id',
    '/settings/security',
    '/settings/promo',
    '/settings/membership',
    '/settings/notifications',
    '/settings/references',
    '/verify_email/[token]',
    '/ticket_burn/[id]',
    '/forgot_password',
    '/forgot_password/change_password/[token]',
  ];

  const noFooterRoutes = [
    '/technical_support',
    '/notifications',
    '/login',
    '/before_login',
    '/register',
    '/settings',
    '/settings/my360id',
    '/settings/security',
    '/settings/membership',
    '/settings/notifications',
    '/settings/references',
    '/settings/promo',
    '/verify_email/[token]',
    '/ticket_burn/[id]',
    '/my_tickets',
    '/coming_soon',
    '/forgot_password',
    '/forgot_password/change_password/[token]',
  ];

  return (
    <ThemeProvider theme={theme}>
      {/* ✅ Toaster HER ZAMAN burada: mount/unmount olmaz */}
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 5000,
        }}
      />

      {loading ? (
        <div className="loading-spinner">
          <p className="loading-text">Səhifə yüklənir. Gözlədiyinizə görə təşəkkür edirik</p>
          <div className="spinner">
            <Image
              width={50}
              height={40}
              src="https://raw.githubusercontent.com/niyaz-hasanov/telebe360/04016920d5b8c96e96550d2fc8452b006c9b352f/public/home/360minilogo.svg"
              alt="Loading Logo"
            />
          </div>
        </div>
      ) : (
        <>
          {!noNavbarRoutes.includes(router.pathname) && <Navbar />}
          <Component {...pageProps} />
          {!noFooterRoutes.includes(router.pathname) && <Footer />}
        </>
      )}
    </ThemeProvider>
  );
}

export default MyApp;
