import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import {Carousel} from 'react-responsive-carousel';
import { FaChevronRight,FaChevronLeft } from 'react-icons/fa';
import css from './carousel.module.css'

import Image from 'next/image';
export default function Slider(){
    
    return(

<Carousel 
         renderArrowPrev={(onClickHandler, hasPrev, label) =>
            hasPrev && (
                <button type="button" onClick={onClickHandler} title={label} style={{position:'absolute',top:'18vw',left:'5vw',zIndex:'1',background:'#dadada',border:'none',borderRadius:'50vw' ,width:'8vw',display:'flex',justifyContent:'center',alignItems:'center',height:'8vw',color:'white',fontSize:'5vw',}}>
                    <FaChevronLeft/>
                </button>
            )
        }
        renderArrowNext={(onClickHandler, hasNext, label) =>
            hasNext && (
                <button type="button" onClick={onClickHandler} title={label} style={{position:'absolute',top:'18vw',right:'5vw',zIndex:'0',background:'#dadada',border:'none',borderRadius:'50vw' ,width:'8vw',display:'flex',justifyContent:'center',alignItems:'center',height:'8vw',color:'white',fontSize:'5vw'}}>
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
thumbWidth={100}
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

 <div className={css.mobcardiv}>
 <Image
         src={'/udemy.svg'}
         width={0}
         height={0}
         className={css.mobcar}
      />
 </div>
 <div className={css.mobcardiv}>
 <Image
         src={'/udemy.svg'}
         width={0}
         height={0}
         className={css.mobcar}
      />
 </div>
 <div className={css.mobcardiv}>
 <Image
         src={'/udemy.svg'}
         width={0}
         height={0}
         className={css.mobcar}
      />
 </div>
 

 

 
    </Carousel>
    
    )}