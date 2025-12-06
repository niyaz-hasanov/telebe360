import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import css from './carousel.module.css';
import { fetchSliderData } from '../../utils/banner/fetchSliderData';
import { MAINURL } from '../../utils/constants';

export default function Slider() {
  const [slides, setSlides] = useState([]);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    skipSnaps: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchSliderData();
      // type: false olanlar (senin mevcut mantığın)
      const filteredSlides = data.filter((item) => item.type === false);
      setSlides(filteredSlides);
    };

    fetchData();
  }, []);

  const scrollPrev = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className={css.embla}>
      {/* Sol ok – sadece 1’den fazla slide varsa */}
      {slides.length > 1 && (
        <button
          type="button"
          onClick={scrollPrev}
          className={css.arrowLeft}
        >
          <FaChevronLeft />
        </button>
      )}

      {/* Sağ ok – sadece 1’den fazla slide varsa */}
      {slides.length > 1 && (
        <button
          type="button"
          onClick={scrollNext}
          className={css.arrowRight}
        >
          <FaChevronRight />
        </button>
      )}

      {/* Embla viewport */}
      <div className={css.emblaViewport} ref={emblaRef}>
        <div className={css.emblaContainer}>
          {slides.map((slide) => (
            <div className={css.emblaSlide} key={slide.id}>
              <img
                src={
                  slide.mobile_img_path
                    ? `${MAINURL}uploads/${slide.mobile_img_path}`
                    : '/noaddbannermobile.png'
                }
                alt={slide.name}
                className={css.mobcar}
                onError={(e) => {
                  // sonsuz döngü olmasın diye önce onError'u temizle
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = '/noaddbannermobile.png';
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
