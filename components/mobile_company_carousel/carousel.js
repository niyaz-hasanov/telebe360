import React, { useState, useEffect } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import css from './carousel.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { MAINURL, APIURL } from '../../utils/constants';
import axios from 'axios';
import PropTypes from 'prop-types';

// Süre hesaplama fonksiyonu
const calculateTimeLeft = (end_time) => {
  const now = new Date();
  const endTime = new Date(end_time);
  const difference = endTime - now;

  if (difference <= 0) {
    return "Bitib";
  }

  const oneDayInMs = 1000 * 60 * 60 * 24; // 1 gün
  const oneMonthInMs = 30 * oneDayInMs; // 30 gün = 1 ay
  const oneYearInMs = 365 * oneDayInMs; // 365 gün = 1 yıl

  // Yıl hesaplama
  if (difference >= oneYearInMs) {
    const years = Math.floor(difference / oneYearInMs);
    return `${years} il`;
  }

  // Ay hesaplama
  if (difference >= oneMonthInMs) {
    const months = Math.floor(difference / oneMonthInMs);
    return `${months} ay`;
  }

  // Gün hesaplama
  const days = Math.floor(difference / oneDayInMs);
  if (days > 0) {
    return `${days} gün`;
  }

  // Saat, dakika ve saniye hesaplama
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / 1000 / 60) % 60);
  const seconds = Math.floor((difference / 1000) % 60);

  if (hours > 0 || minutes > 0 || seconds > 0) {
    return `${hours} : ${minutes} : ${seconds}`;
  }

  return "Bitib";
};

const Slider = ({ ticket }) => {
  const [companyTickets, setCompanyTickets] = useState([]);

  useEffect(() => {
    const fetchCompanyTickets = async () => {
      try {
        const response = await axios.get(`${APIURL}tickets/company/${ticket.company.id}`);
        setCompanyTickets(response.data);
      } catch (error) {
        console.error('Error fetching company tickets:', error);
      }
    };

    if (ticket?.company?.id) {
      fetchCompanyTickets();
    }
  }, [ticket]);

  if (companyTickets.length === 0) {
    return <div>No tickets available.</div>;
  }

  return (
    <Carousel
    renderArrowPrev={(onClickHandler, hasPrev, label) =>
        hasPrev && (
            <button type="button" onClick={onClickHandler} title={label} style={{position:'absolute',top:'18vw',left:'5vw',zIndex:'1',background:'#ffffff2a',border:'none',borderRadius:'50vw' ,width:'8vw',display:'flex',justifyContent:'center',alignItems:'center',height:'8vw',color:'white',fontSize:'5vw'}}>
                <FaChevronLeft/>
            </button>
        )
    }
    renderArrowNext={(onClickHandler, hasNext, label) =>
        hasNext && (
            <button type="button" onClick={onClickHandler} title={label} style={{position:'absolute',top:'18vw',right:'5vw',zIndex:'1',background:'#ffffff2a',border:'none',borderRadius:'50vw' ,width:'8vw',display:'flex',justifyContent:'center',alignItems:'center',height:'8vw',color:'white',fontSize:'5vw'}}>
            <FaChevronRight/>
            </button>
        )
    }
    useKeyboardArrows={true}
    swipeable={true}
    showStatus={false}
    showThumbs={false}
    autoPlay={false}
    infiniteLoop={false}
    showArrows={false}
    emulateTouch={true}
    swipeScrollTolerance={100}
    thumbWidth={100}
    interval={5000}
    transitionTime={1500}
    showIndicators={false}
    centerMode={true}
    centerSlidePercentage={57}
    selectedItem={0}
    stopOnHover={false}
    dynamicHeight={false}
    className={css.carousel}
    >
      {companyTickets.map(ticket => (
        <div key={ticket.id} className={css.mobcardiv}>
          <Link style={{ color: 'black' }} key={ticket.id} href={`/tickets/${ticket.id}`}
            className={css.card_wrapper_mob}
          >
            <div className={css.card_div}>
              <div className={css.card_pp}>
                <img
                  src={`${MAINURL}uploads/${ticket.company.logo_path}`}
                  alt={ticket.company.name}
                />
                
              </div>
                <div className={css.card_text_div}>
                  <h2>{ticket.company.name}</h2>
                  <p>{ticket.name}</p>
                </div>
                <span className={css.discount_span}>{ticket.discount}%</span>
              {/* <Image
                src={'/home/bookmark.svg'}
                width={20} // Örnek boyut, gerekli boyutu ayarlayın
                height={20}
                className={css.bookmark}
              /> */}
              <div className={css.card_bottom}>
              
                <div className={css.card_button_div}>
                  <div>
                    <button id={css.but1}>
                       <h2 className={css.say}>Say</h2>
                      <div className={css.card_bottom_right}>
                        <p>{ticket.count}</p>
                        <img className={css.img} src='/ticket_ticketlogo.svg'/>
                        </div>
                    </button>
                    <button id={css.but2}>
                      <h2 className={css.gun}>Gün</h2>
                      <div className={css.card_bottom_right}>
                      <p>{calculateTimeLeft(ticket.end_time)}</p>
                      <img className={css.img}  src='/ticket_clocklogo.svg'/>
                      </div>
                    </button>
                  </div>
                  <button id={css.but3}>
                     <h2 className={css.giymet}>Qiymət</h2>
                      <div className={css.card_bottom_right}>
                        <p>{ticket.price}</p>
                        <img className={css.img}  src='/telebecoinlogo.svg'/>
                        </div>
                  </button>
                  <div>
                    
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </Carousel>
  );
};

Slider.propTypes = {
  ticket: PropTypes.shape({
    company: PropTypes.shape({
      id: PropTypes.string.isRequired,
      logo_path: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Slider;
