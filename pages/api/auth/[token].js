

// Token ile şifre değiştirme API'si
export default async function handler(req, res) {
  const { token } = req.query;
  
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Token'in doğruluğunu kontrol edin (örneğin veritabanı veya token doğrulama servisi ile)
    if (!token) {
      return res.status(400).json({ message: 'Geçersiz token' });
    }

    const { password } = req.body;
    
    if (!password || password.length < 6) {
      return res.status(400).json({ message: 'Şifre en az 6 karakter olmalıdır.' });
    }

    // Token ile şifreyi güncellemek için işlemleri yapın (örneğin veritabanı güncelleme)
    // Bu örnekte, sadece başarılı yanıt dönüyoruz.
    // Gerçek uygulamada token ile şifreyi güncellemek için veritabanı işlemi yapılacaktır.

    // Örnek: Token doğrulandıktan sonra şifreyi güncelle
    // await updatePassword(token, password);

    return res.status(200).json({ message: 'Şifrə uğurla dəyişdirildi.' });
  } catch (error) {
    return res.status(500).json({ message: 'Şifrə dəyişdirilərkən xəta baş verdi.' });
  }
}

