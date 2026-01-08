import React, { useState, useEffect, useCallback, useRef } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import css from './carousel.module.css';
import { fetchSliderData } from '../../utils/banner/fetchSliderData';
import { MAINURL } from '../../utils/constants';

export default function Slider() {
  const [slides, setSlides] = useState([]);
  const autoplayRef = useRef(null);

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
      const filteredSlides = data.filter(item => item.type === false);
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

  const stopAutoplay = useCallback(() => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  }, []);

  const startAutoplay = useCallback(() => {
    stopAutoplay();
    if (!emblaApi || slides.length <= 1) return;

    autoplayRef.current = setInterval(() => {
      emblaApi.scrollNext();
    }, 4000);
  }, [emblaApi, slides.length, stopAutoplay]);

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, [startAutoplay, stopAutoplay]);

  return (
    <div
      className={css.emblaMain}
      onMouseEnter={stopAutoplay}
      onMouseLeave={startAutoplay}
    >
      {slides.length > 1 && (
        <button type="button" onClick={scrollPrev} className={css.arrowLeftMain}>
          <FaChevronLeft />
        </button>
      )}

      {slides.length > 1 && (
        <button type="button" onClick={scrollNext} className={css.arrowRightMain}>
          <FaChevronRight />
        </button>
      )}

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
