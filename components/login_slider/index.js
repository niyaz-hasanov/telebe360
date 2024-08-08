import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import css from './carousel.module.css';
import Image from 'next/image';

export default function Slider() {
    return (
        <Carousel
            renderArrowPrev={(onClickHandler, hasPrev, label) =>
                hasPrev && (
                    <button type="button" onClick={onClickHandler} title={label} style={{ position: 'absolute', top: '50%', left: '4vw', zIndex: '1', background: '#ffffff2a', border: 'none', borderRadius: '50vw', width: '2.5vw', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '2.5vw', color: 'white', fontSize: '1.5vw', transform: 'translateY(-50%)' }}>
                        <FaChevronLeft />
                    </button>
                )
            }
            renderArrowNext={(onClickHandler, hasNext, label) =>
                hasNext && (
                    <button type="button" onClick={onClickHandler} title={label} style={{ position: 'absolute', top: '50%', right: '3vw', zIndex: '1', background: '#ffffff2a', border: 'none', borderRadius: '50vw', width: '2.5vw', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '2.5vw', color: 'white', fontSize: '1.5vw', transform: 'translateY(-50%)' }}>
                        <FaChevronRight />
                    </button>
                )
            }
            useKeyboardArrows={true}
            swipeable={true}
            showStatus={false}
            showThumbs={false}
            autoPlay={true}
            infiniteLoop={true}
            showArrows={false}
            emulateTouch={true}
            swipeScrollTolerance={100}
            interval={20000}
            transitionTime={1500}
            showIndicators={true}
            centerMode={false}
            selectedItem={0}
            stopOnHover={false}
            dynamicHeight={false}
            className={css.slider}
        >
            <div className={css.slider_div}>
                <Image
                    src={'/before_login_media/telebe360logo.svg'}
                    width={0}
                    height={0}
                    className={css.logoImg}
                />
                <div className={css.text_div}>
                    <h2>Xoş Gəlmişsiniz!</h2>
                    <p>Tələbə büdcənizə qənaət edin burada hər şey endirimlidir</p>
                </div>
                <div className={css.image_div}>
                    <div className={css.image1}>
                        <img src='https://th.bing.com/th/id/OIP.zXCBYy0wwzR57asmz_AEkQHaHa?rs=1&pid=ImgDetMain' />
                    </div>
                    <div className={css.image2}>
                        <img src='https://th.bing.com/th/id/OIP.zXCBYy0wwzR57asmz_AEkQHaHa?rs=1&pid=ImgDetMain' />
                    </div>
                    <div className={css.image3}>
                        <img src='https://th.bing.com/th/id/OIP.zXCBYy0wwzR57asmz_AEkQHaHa?rs=1&pid=ImgDetMain' />
                    </div>
                    <div className={css.image4}>
                        <img src='https://th.bing.com/th/id/OIP.zXCBYy0wwzR57asmz_AEkQHaHa?rs=1&pid=ImgDetMain' />
                    </div>
                </div>
            </div>
            
            <div className={css.slider_div}>
                <Image
                    src={'/before_login_media/telebe360logo.svg'}
                    width={0}
                    height={0}
                    className={css.logoImg}
                />
                <div className={css.text_div}>
                    <h2>Xoş Gəlmişsiniz!</h2>
                    <p>Tələbə büdcənizə qənaət edin burada hər şey endirimlidir</p>
                </div>
                <div className={css.image_div}>
                    <div className={css.image1}>
                        <img src='https://th.bing.com/th/id/OIP.zXCBYy0wwzR57asmz_AEkQHaHa?rs=1&pid=ImgDetMain' />
                    </div>
                    <div className={css.image2}>
                        <img src='https://th.bing.com/th/id/OIP.zXCBYy0wwzR57asmz_AEkQHaHa?rs=1&pid=ImgDetMain' />
                    </div>
                    <div className={css.image3}>
                        <img src='https://th.bing.com/th/id/OIP.zXCBYy0wwzR57asmz_AEkQHaHa?rs=1&pid=ImgDetMain' />
                    </div>
                    <div className={css.image4}>
                        <img src='https://th.bing.com/th/id/OIP.zXCBYy0wwzR57asmz_AEkQHaHa?rs=1&pid=ImgDetMain' />
                    </div>
                </div>
            </div>
        </Carousel>
    );
}
