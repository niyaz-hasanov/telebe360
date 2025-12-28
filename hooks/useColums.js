import { useEffect, useState } from "react";


export function useColumns({
  cardWidthRem = 21,
  gap = 16,
  minCols = 2,
  maxCols = 20,
} = {}) {
  const [cols, setCols] = useState(1); 

  useEffect(() => {
    const updateCols = () => {
      const rootFontSize = parseFloat(
        getComputedStyle(document.documentElement).fontSize
      );
      const cardWidthPx = cardWidthRem * rootFontSize;

      const width = window.innerWidth;

      const possible = Math.floor(width / (cardWidthPx + gap));

      const next = Math.max(minCols, Math.min(possible, maxCols));

      setCols(next);
    };

    updateCols();
    window.addEventListener("resize", updateCols, { passive: true });
    return () => window.removeEventListener("resize", updateCols);
  }, [cardWidthRem, gap, minCols, maxCols]);

  return cols;
}
