import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import css from './carousel.module.css';
import { fetchSliderData } from '../../utils/banner/fetchSliderData';
import { MAINURL } from '../../utils/constants';
import Image from 'next/image';
export default function DesktopSlider() {
  const [slides, setSlides] = useState([]);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    skipSnaps: false,
  });
  function getBannerImg(path) {
    return path ? `${MAINURL}uploads/${path}` : '/noaddbanner.png';
  }

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
          {slides.map(slide => (
            <div className={css.emblaSlide} key={slide.id}>
              <Image
              width={9999}
              height={1}
               alt={slide.name}
                className={css.deskcar}
                src={getBannerImg(slide.desktop_img_path)}
               
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
