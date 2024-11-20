import { APIURL } from "../constants";

export const fetchSliderData = async () => {
  
    
    try {
        const response = await fetch(`${APIURL}banners/`);

        if (response.status === 404) {
           window.location.href = '/404' 
            return null; 
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Fetch error:', error);
        router.push('/404'); 
        return null; 
    }
};