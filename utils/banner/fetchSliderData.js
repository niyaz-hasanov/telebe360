

export const fetchSliderData = async () => {
  
    
    try {
        const response = await fetch('http://209.38.40.216:8000/api/v1/banners');

        // Eğer response 404 dönerse yönlendirme yap
        if (response.status === 404) {
           window.location.href = '/404' // 404 sayfasına yönlendirme
            return null; // Veriyi döndürme
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Fetch error:', error);
        router.push('/404'); // Hata durumunda 404 sayfasına yönlendirme
        return null; // Veriyi döndürme
    }
};