import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import css from './carousel.module.css';
import Link from 'next/link';
import Image from 'next/image';

const Slider = ({ tickets }) => {
  return (
    <Carousel
    renderArrowPrev={(onClickHandler, hasPrev, label) =>
      hasPrev && (
          <button type="button" onClick={onClickHandler} title={label} style={{position:'absolute',top:'8vw',left:'2vw',zIndex:'1',background:'#DADADA',border:'none',borderRadius:'50vw' ,width:'2.5vw',display:'flex',justifyContent:'center',alignItems:'center',height:'2.5vw',color:'white',fontSize:'1.5vw',}}>
              <FaChevronLeft/>
          </button>
      )
  }
  renderArrowNext={(onClickHandler, hasNext, label) =>
      hasNext && (
          <button type="button" onClick={onClickHandler} title={label} style={{position:'absolute',top:'8vw',right:'3vw',zIndex:'1',background:'#dadada',border:'none',borderRadius:'50vw' ,width:'2.5vw',display:'flex',justifyContent:'center',alignItems:'center',height:'2.5vw',color:'white',fontSize:'1.5vw'}}>
          <FaChevronRight/>
          </button>
        )
      }
      useKeyboardArrows={true}
      swipeable={false}
      showStatus={false}
      showThumbs={false}
      autoPlay={false}
      infiniteLoop={false}
      showArrows={true}
      emulateTouch={false}
      swipeScrollTolerance={100}
      thumbWidth={0}
      interval={5000}
      transitionTime={1500}
      showIndicators={false}
      centerMode={true}
      centerSlidePercentage={29}
      selectedItem={0}
      stopOnHover={false}
      dynamicHeight={false}
      className={css.carousel}
    >
      {tickets.map(ticket => (
        <div key={ticket.id} className={css.mobcardiv}>
          <Link style={{ color: 'black' }} href={`/tickets/${ticket.id}`}>
            <div className={css.card_div}>
              <div className={css.card_pp}>
                <img src={`https://telebe360.elxanhuseynli.com/storage/images/logos/${ticket.company_logo}`} alt={ticket.company_name} />
              </div>
              <Image
                src={'/home/bookmark.svg'}
                width={0}
                height={0}
                className={css.bookmark}
              />
              <div className={css.card_bottom}>
                <div className={css.card_text_div}>
                  <h2>{ticket.company_name}</h2>
                  <p>{ticket.name}</p>
                </div>
                <div className={css.card_button_div}>
                  <div>
                    <button id={css.but1}> {ticket.startDate}</button>
                    <button id={css.but2}>{ticket.endDate}</button>
                  </div>
                  <div><button id={css.but3}>{ticket.count}%</button></div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </Carousel>
  );
};

export default Slider;
