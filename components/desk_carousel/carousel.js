import React, { useState, useEffect } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import css from './carousel.module.css';
import Image from 'next/image';
import { fetchSliderData } from '../../utils/banner/fetchSliderData';
import {MAINURL} from '../../utils/constants'
export default function DesktopSlider() {
    const [slides, setSlides] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchSliderData();
            // type: true olan verileri filtrele
            const filteredSlides = data.filter(item => item.type === true);
            setSlides(filteredSlides);
        };

        fetchData();
    }, []);

    return (
        <Carousel
            renderArrowPrev={(onClickHandler, hasPrev, label) =>
                hasPrev && (
                    <button type="button" onClick={onClickHandler} title={label} style={{position:'absolute',top:'9vw',left:'4vw',zIndex:'1',background:'#ffffff2a',border:'none',borderRadius:'50vw' ,width:'2.5vw',display:'flex',justifyContent:'center',alignItems:'center',height:'2.5vw',color:'white',fontSize:'1.5vw'}}>
                        <FaChevronLeft/>
                    </button>
                )
            }
            renderArrowNext={(onClickHandler, hasNext, label) =>
                hasNext && (
                    <button type="button" onClick={onClickHandler} title={label} style={{position:'absolute',top:'9vw',right:'3vw',zIndex:'1',background:'#ffffff2a',border:'none',borderRadius:'50vw' ,width:'2.5vw',display:'flex',justifyContent:'center',alignItems:'center',height:'2.5vw',color:'white',fontSize:'1.5vw'}}>
                        <FaChevronRight/>
                    </button>
                )
            }
            useKeyboardArrows={true}
            swipeable={true}
            showStatus={false}
            showThumbs={false}
            autoPlay={true}
            infiniteLoop={true}
            showArrows={true}
            emulateTouch={true}
            swipeScrollTolerance={5}
            thumbWidth={0}
            interval={5000}
            transitionTime={1500}
            showIndicators={false}
            centerMode={true}
            centerSlidePercentage={100}
            selectedItem={0}
            stopOnHover={false}
            dynamicHeight={true}
            className={css.carousel}
        >
            {slides.map((slide) => (
                <div key={slide.id}>
                    <img
                        src={`${MAINURL}uploads/${slide.desktop_img_path}`} // Desktop için ilgili görsel
                        alt={slide.name}
                        width={0}
                        height={0}
                        className={css.deskcar}
                    />
                </div>
            ))}
        </Carousel>
    );
}
