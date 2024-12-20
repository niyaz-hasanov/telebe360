 // pages/api/auth/recovery.js
export default async function handler(req, res) {
    if (req.method === 'POST') {
      try {
        const { email } = req.body;
  
        // Burada API'ye istek yapılabilir
        // Örnek olarak, email'in doğru formatta olup olmadığını kontrol edelim:
        if (!email || !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
          return res.status(422).json({ message: 'Geçersiz email adresi' });
        }
  
        // Burada örnek olarak sabit bir yanıt döndürüyoruz, aslında bu noktada dış API'ye istek yapılacak
        // Örnek olarak: 
        // const apiResponse = await fetch('external_api_url', { ... });
        
        res.status(200).json({ message: 'Başarıyla işlem yapıldı', email });
      } catch (error) {
        console.error('API Error:', error);
        res.status(500).json({ message: 'İç sunucu hatası' });
      }
    } else {
      res.status(405).json({ message: 'Yalnızca POST istekleri kabul edilir' });
    }
  }
  