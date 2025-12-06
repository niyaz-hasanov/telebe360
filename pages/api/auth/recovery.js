// pages/api/auth/recovery.js
export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { email } = req.body;

      // Email'in doğru formatta olup olmadığını kontrol et
      if (!email || !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
        return res.status(422).json({ message: 'Geçersiz email adresi' });
      }

      // URL-encoded formatta body hazırlama
      const formBody = new URLSearchParams();
      formBody.append('email', email);

      // Dış API'ye istek gönder
      const apiResponse = await fetch('https://api.telebe360.com/api/v1/auth/recovery', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formBody.toString(),
      });

      // API'den gelen yanıtı kontrol et
      if (!apiResponse.ok) {
        const errorData = await apiResponse.json();
        return res.status(apiResponse.status).json({ message: errorData.message || 'Dış API hatası' });
      }

      const data = await apiResponse.json();
      res.status(200).json({ message: 'Başarıyla işlem yapıldı', data });
    } catch (error) {
      console.error('API Error:', error);
      res.status(500).json({ message: 'İç sunucu hatası' });
    }
  } else {
    res.status(405).json({ message: 'Yalnızca POST istekleri kabul edilir' });
  }
}
