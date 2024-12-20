import cookie from 'cookie';
import { APIURL } from '../../../utils/constants';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    await refreshAccessToken(req, res);
  } else {
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}

const refreshAccessToken = async (req, res) => {
  try {
    const cookies = cookie.parse(req.headers.cookie || '');
    const refreshToken = cookies.RT;

    if (!refreshToken) {

      return res.status(401).json({});
    }

    const response = await fetch(`${APIURL}auth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': `refresh-token=${refreshToken}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      const { access_token } = data;

      res.setHeader('Set-Cookie', cookie.serialize('access_token', access_token, {
        httpOnly: false, 
        secure: process.env.NODE_ENV === 'production', 
        sameSite: 'Lax', 
        path: '/', 
        maxAge: 60 * 60 * 24 * 7,
      }));

      return res.status(200).json({ access_token });
    } else {
      console.error();
      return res.status();
    }
  } catch (error) {
    console.error();
    return res.status(500).json();
  }
};
