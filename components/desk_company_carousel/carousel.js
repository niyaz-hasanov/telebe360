import React, { useState, useEffect } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import css from './carousel.module.css';
import Link from 'next/link';
import { MAINURL, APIURL } from '../../utils/constants';
import axios from 'axios';
import PropTypes from 'prop-types';
import Image from 'next/image';
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

  // Öğelerin sayısını kontrol ediyoruz
  const isSmall = companyTickets.length < 4;

  return (
    <Carousel
      renderArrowPrev={(onClickHandler, hasPrev, label) =>
        hasPrev && !isSmall && ( // 4'ten azsa okları gösterme
          <button
            type="button"
            onClick={onClickHandler}
            title={label}
            style={{
              position: 'absolute',
              top: '8vw',
              left: '1vw',
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
        hasNext && !isSmall && ( // 4'ten azsa okları gösterme
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
      swipeable={false} // Eğer öğe sayısı 4'ten azsa kaydırma özelliğini devre dışı bırak
      showStatus={false} // Durum göstergesini kapat
      showThumbs={false} // Thumbnail'ları kapat
      autoPlay={false}  // Eğer öğe sayısı 4'ten azsa autoplay'i devre dışı bırak
      infiniteLoop={false}  // Eğer öğe sayısı 4'ten azsa infinite loop'u devre dışı bırak
      showArrows={!isSmall}  // 4'ten azsa okları devre dışı bırak
      emulateTouch={!isSmall}  // 4'ten azsa touch özelliğini devre dışı bırak
      swipeScrollTolerance={100}
      thumbWidth={0}
      interval={5000}
      transitionTime={1500}
      showIndicators={false}
      centerMode={true}
      centerSlidePercentage={30}
      selectedItem={isSmall ? 0 : 1}
      stopOnHover={false}
      dynamicHeight={false}
      className={css.carousel}
    >
    {companyTickets.map((ticket) => (
  <div key={ticket.id} className={css.mobcardiv}>
    <Link href={`/tickets/${ticket.id}`} className={css.card_wrapper} style={{ color: "black" }}>
      <div className={css.card_div}>
        <div className={css.card_top}>
          <div className={css.card_pp}>
            <Image width={9999} height={1}
              src={`${MAINURL}uploads/${ticket.company.logo_path}`}
              alt={ticket.company.name}
            />
          </div>

          <div className={css.card_text_div}>
            <h2>{ticket.company.name}</h2>
            <p>{ticket.name}</p>
          </div>
        </div>

        <div className={css.card_middle}>{ticket.discount}%</div>

        <div className={css.card_bottom}>
          <div className={css.card_button_div}>
            <button id={css.but1}>
              <h2 className={css.say}>Say</h2>
              <div className={css.card_bottom_right}>
                <p>{ticket.count}</p>
                <Image width={9999} height={1} src="/ticket_ticketlogo.svg" />
              </div>
            </button>

            <button id={css.but2}>
              <h2 className={css.gun}>Gün</h2>
              <div className={css.card_bottom_right}>
                <p>{calculateTimeLeft(ticket.end_time)}</p>
                <Image width={9999} height={1} src="/ticket_clocklogo.svg" />
              </div>
            </button>

            <button id={css.but3}>
              <h2 className={css.giymet}>Qiymət</h2>
              <div className={css.card_bottom_right}>
                <p>{ticket.price}</p>
                <Image width={9999} height={1} src="/telebecoinlogo.svg" />
              </div>
            </button>
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
