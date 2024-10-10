import Cookies from 'cookies';
import {APIURL} from '../../utils/constants'
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      const response = await fetch(`${APIURL}auth/sign-in`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // Set-Cookie başlığını al
        const setCookieHeader = response.headers.get('set-cookie');


        // refresh-token'ı ayrıştır
        const refreshToken = extractRefreshToken(setCookieHeader);
      

        // Erişim token'ını al
        const data = await response.json();

        return res.status(200).json({ 
          access_token: data.access_token,
          refresh_token: refreshToken // Burada refresh token'ı döndürüyoruz
        });
      } else {
        return res.status(401).json({ message: 'Giriş hatası' });
      }
    } catch (error) {
      return res.status(500).json({ message: 'Sunucu hatası' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

// refresh-token'ı ayrıştıran fonksiyon
function extractRefreshToken(setCookieHeader) {
  // "Set-Cookie: refresh-token=..." ifadesini arıyoruz
  const tokenPart = setCookieHeader.match(/refresh-token=([^;]+)/);
  return tokenPart ? tokenPart[1] : null; // Eğer bulursak token'ı döndür, yoksa null döndür
}