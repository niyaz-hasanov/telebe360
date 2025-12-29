import '../styles/globals.css';
import Navbar from '../components/navbar&toggle/navbar';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import '@leenguyen/react-flip-clock-countdown/dist/index.css';
import Image from 'next/image';
import { Toaster } from 'react-hot-toast';
import startTokenRefresh from '../utils/startTokenRefresh';
import Footer from '../components/footer/index';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../components/theme';
import Head from 'next/head'; // ✅ EKLE

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/service-worker.js')
        .catch((error) => {
          console.error('Service Worker registration failed:', error);
        });
    }

    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    const tokenRefreshStartTime = localStorage.getItem('tokenRefreshStartTime');
    const currentTime = new Date().getTime();
    const oneHour = 30 * 60 * 1000;

    if (!tokenRefreshStartTime || currentTime - tokenRefreshStartTime > oneHour) {
      startTokenRefresh();

      const interval = setInterval(() => {
        startTokenRefresh();
      }, 30 * 60 * 1000);

      localStorage.setItem('tokenRefreshStartTime', currentTime);

      return () => {
        clearInterval(interval);
      };
    }

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
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
    '/forgot_password/change_password/[token]'
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
    '/forgot_password/change_password/[token]'
  ];

  return (
    <>
      <Head>
        {/* ✅ iPhone scaling / vw sorunlarını çok sık çözen meta */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
      </Head>

      {loading ? (
        <div className="loading-spinner">
          <p className='loading-text'> Səhifə yüklənir. Gözlədiyinizə görə təşəkkür edirik</p>
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
        <ThemeProvider theme={theme}>
          {!noNavbarRoutes.includes(router.pathname) && <Navbar />}
          <Component {...pageProps} />
          <Toaster
            toastOptions={{ duration: 5000 }}
            limit={2}
          />
          {!noFooterRoutes.includes(router.pathname) && <Footer />}
        </ThemeProvider>
      )}
    </>
  );
}

export default MyApp;
