import '../styles/globals.css';
import Navbar from '../components/navbar&toggle/navbar';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const noNavbarRoutes = ['/technical_support','/notifications','/login', '/register','/','/settings','/settings/my360id','/settings/security','/settings/membership','/settings/notifications','/settings/references']; 

  return (
    <>
      {!noNavbarRoutes.includes(router.pathname) && <Navbar />}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;