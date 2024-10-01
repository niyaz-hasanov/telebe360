import '../styles/globals.css';
import Navbar from '../components/navbar&toggle/navbar';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Image from 'next/image';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false); // Yüklenme durumu için state

  useEffect(() => {
    const handleStart = () => setLoading(true); // Yüklenme başlat
    const handleComplete = () => setLoading(false); // Yüklenme tamamla

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);

  // Navbar'ın gizleneceği sayfalar
  const noNavbarRoutes = [
    '/technical_support',
    '/notifications',
    '/login',
    '/register',
    '/settings',
    '/settings/my360id',
    '/settings/security',
    '/settings/membership',
    '/settings/notifications',
    '/settings/references',
  ]; 

  return (
    <>
      {loading ? ( // Eğer loading true ise yüklenme animasyonu göster
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
        <>
          {!noNavbarRoutes.includes(router.pathname) && <Navbar />} 
          <Component {...pageProps} />
        </>
      )}
    </>
  );
}

export default MyApp;
