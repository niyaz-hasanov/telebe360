// hooks/useColumns.js
import { useState, useEffect } from 'react';

export function useColumns() {
  const [cols, setCols] = useState(1); // SSR için default 1

  useEffect(() => {
    const updateCols = () => {
      const w = window.innerWidth;
     
      // Breakpoint'leri kendi tasarımına göre değiştir
      if (w < 320 && w>475) {
        setCols(4);      // mobile
      } else if (w < 1350 && w>1010) {
        setCols(3);      // tablet
      }
      else if (w <1920 && w>1000) {
        setCols(4);      // küçük desktop
      } else if (w < 2560 && w>1920) {
        setCols(6);      // küçük desktop
      }
      else if (w ==1920 && w<2200) {
        setCols(4);      // küçük desktop
      } 
      else if (w ==768) {
        setCols(4);      // küçük desktop
      } else {
        setCols(4);      // büyük desktop
      }
    };

    updateCols();
    window.addEventListener('resize', updateCols);
    return () => window.removeEventListener('resize', updateCols);
  }, []);

  return cols;
}
