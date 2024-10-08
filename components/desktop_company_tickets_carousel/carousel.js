import React, { useState, useEffect } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import css from './carousel.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { MAINURL } from '../../utils/constants';
import PropTypes from 'prop-types';

const calculateTimeLeft = (end_time) => {
  const now = new Date();
  const endTime = new Date(end_time);
  const difference = endTime - now; // Kalan süreyi milisaniye cinsinden hesapla

  if (difference <= 0) {
    return "Bitib"; // Eğer süre geçmişse
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / 1000 / 60) % 60);
  const seconds = Math.floor((difference / 1000) % 60);

  if (days > 0) {
    return `${days} gün`;
  } else if (hours > 0 || minutes > 0 || seconds > 0) {
    return `${hours} : ${minutes} : ${seconds} `;
  }

  return "Bitib"; 
};

const Slider = ({ ticket }) => {
  if (ticket.length === 0) {
    return <div>No tickets available.</div>;
  }

  return (
    <Carousel
      renderArrowPrev={(onClickHandler, hasPrev, label) =>
        hasPrev && (
          <button
            type="button"
            onClick={onClickHandler}
            title={label}
            style={{
              position: 'absolute',
              top: '8vw',
              left: '2vw',
              zIndex: '1',
              background: '#DADADA',
              border: 'none',
              borderRadius: '50vw',
              width: '2.5vw',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '2.5vw',
              color: 'white',
              fontSize: '1.5vw',
            }}>
            <FaChevronLeft />
          </button>
        )
      }
      renderArrowNext={(onClickHandler, hasNext, label) =>
        hasNext && (
          <button
            type="button"
            onClick={onClickHandler}
            title={label}
            style={{
              position: 'absolute',
              top: '8vw',
              right: '3vw',
              zIndex: '1',
              background: '#DADADA',
              border: 'none',
              borderRadius: '50vw',
              width: '2.5vw',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '2.5vw',
              color: 'white',
              fontSize: '1.5vw',
            }}>
            <FaChevronRight />
          </button>
        )
      }
      useKeyboardArrows={true}
      swipeable={true}
      showStatus={false}
      showThumbs={false}
      autoPlay={false}
      infiniteLoop={false}
      showArrows={true}
      emulateTouch={true}
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
      {ticket.map(ticket => (
        <div key={ticket.id} className={css.mobcardiv}>
          <Link style={{color:'black'}} key={ticket.name} href={`/tickets/${ticket.name}`}>
            <div className={css.card_div}>
              <div className={css.card_pp}>
                <img
                  src={`${MAINURL}uploads/${ticket.company.logo_path}`}
                  alt={ticket.company.name}
                />
              </div>
              <Image
                src={'/home/bookmark.svg'}
                width={20} // Örnek boyut, gerekli boyutu ayarlayın
                height={20}
                className={css.bookmark}
              />
              <div className={css.card_bottom}>
                <div className={css.card_text_div}>
                  <h2>{ticket.company.name}</h2>
                  <p>{ticket.name}</p>
                </div>
                <div className={css.card_button_div}>
                  <div>
                    <button id={css.but1}>{ticket.count}</button>
                    <button id={css.but2}>
                      {calculateTimeLeft(ticket.end_time)} {/* Kalan süreyi hesapla */}
                    </button>
                  </div>
                  <div>
                    <button id={css.but3}>{ticket.discount}%</button>
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

// PropTypes ile props doğrulama
Slider.propTypes = {
  tickets: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      company: PropTypes.shape({
        logo_path: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      }).isRequired,
      name: PropTypes.string.isRequired,
      discount: PropTypes.string.isRequired,
      start_time: PropTypes.string.isRequired,
      end_time: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Slider;
