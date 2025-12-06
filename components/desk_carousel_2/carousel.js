// Slider.jsx
import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import css from './carousel.module.css';
import { fetchSliderData } from '../../utils/banner/fetchSliderData';
import { MAINURL } from '../../utils/constants';

export default function Slider() {
   function getBannerImg(path) {
      return path ? `${MAINURL}uploads/${path}` : '/noaddbanner.png';
    }
  const [slides, setSlides] = useState([]);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    skipSnaps: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchSliderData();
      const filteredSlides = data.filter(item => item.type === false);
      setSlides(filteredSlides);
    };
    fetchData();
  }, []);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className={css.emblaMain}>
      {/* Sol ok – sadece 1’den fazla slide varsa göster */}
      {slides.length > 1 && (
        <button
          type="button"
          onClick={scrollPrev}
          className={css.arrowLeftMain}
        >
          <FaChevronLeft />
        </button>
      )}

      {/* Sağ ok – sadece 1’den fazla slide varsa göster */}
      {slides.length > 1 && (
        <button
          type="button"
          onClick={scrollNext}
          className={css.arrowRightMain}
        >
          <FaChevronRight />
        </button>
      )}

      {/* Embla viewport */}
      <div className={css.emblaViewport} ref={emblaRef}>
        <div className={css.emblaContainer}>
          {slides.map(slide => (
            <div className={css.emblaSlide} key={slide.id}>
              <img
                src={getBannerImg(slide.desktop_img_path)}
                alt={slide.name}
                className={css.deskcar}
                 onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = '/noaddbanner.png';
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
