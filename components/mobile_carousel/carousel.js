// MobileSlider.jsx / .tsx
import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import css from './carousel.module.css';
import { fetchSliderData } from '../../utils/banner/fetchSliderData';
import { MAINURL } from '../../utils/constants';

export default function MobileSlider() {
    function getBannerImg(path) {
      return path ? `${MAINURL}uploads/${path}` : '/noaddbannermobile.png';
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
      const filteredSlides = data.filter(item => item.type === true);
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
    <div className={css.emblaMobile}>
      {/* Sol ok */}
      <button
        type="button"
        onClick={scrollPrev}
        className={css.arrowLeftMobile}
      >
        <FaChevronLeft />
      </button>

      {/* Sağ ok */}
      <button
        type="button"
        onClick={scrollNext}
        className={css.arrowRightMobile}
      >
        <FaChevronRight />
      </button>

      {/* Embla viewport */}
      <div className={css.emblaViewport} ref={emblaRef}>
        <div className={css.emblaContainer}>
          {slides.map(slide => (
            <div className={css.emblaSlide} key={slide.id}>
              <img
               src={getBannerImg(slide.mobile_img_path)}
               
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = '/noaddbannermobile.png';
                }}
                alt={slide.name}
                className={css.mobcar}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
