import { APIURL } from '../../../utils/constants';
import cookie from 'cookie';

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

      console.log('Response Status:', response.status);
      console.log('Response Headers:', response.headers);

      const responseData = await response.json();
      
      if (response.ok) {
        const accessToken = responseData.access_token;

        const setCookieHeader = response.headers.get('set-cookie');
        const refreshToken = extractRefreshToken(setCookieHeader);

        res.setHeader('Set-Cookie', cookie.serialize('RT', refreshToken, {
          httpOnly: true,
          secure: true, 
          sameSite: 'Lax',
          path: '/', 
          maxAge: 60 * 60 * 24 * 30, // 30 gün
        }));
          
        return res.status(200).json({ access_token: accessToken });
      } else {
        console.log('Login error detail:', responseData);
        return res.status(response.status).json({ message: 'Login error', detail: responseData.detail });
      }

    } catch (error) {
      console.error('Hata:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  } else {
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

function extractRefreshToken(setCookieHeader) {
  const tokenPart = setCookieHeader?.match(/refresh-token=([^;]+)/);
  return tokenPart ? tokenPart[1] : null;
}
