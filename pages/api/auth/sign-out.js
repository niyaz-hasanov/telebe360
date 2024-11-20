import { APIURL } from '../../../utils/constants';
import cookie from 'cookie';
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const cookies = cookie.parse(req.headers.cookie || '');
    const refreshToken = cookies.RT;

    

   

    try {
      const response = await fetch(`${APIURL}auth/sign-out`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cookie': `refresh-token=${refreshToken}`, 
        },
        
      });

      if (response.ok) {
        res.setHeader('Set-Cookie', cookie.serialize('RT', '', {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          maxAge: -1,
          path: '/',
        }));

        return res.status(200).json({ message: 'Çıkış başarılı' });
      } else {
        return res.status(response.status).json({ message: 'Çıkış hatası' });
      }
    } catch (error) {
      console.error('Çıkış isteği sırasında hata:', error);
      return res.status(500).json({ message: 'Sunucu hatası' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
