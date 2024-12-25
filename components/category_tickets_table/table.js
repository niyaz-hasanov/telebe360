import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import css from './carousel.module.css';
import { MAINURL } from '../../utils/constants';

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

  if (difference >= oneYearInMs) {
    const years = Math.floor(difference / oneYearInMs);
    return `${years} il`;
  }

  if (difference >= oneMonthInMs) {
    const months = Math.floor(difference / oneMonthInMs);
    return `${months} ay`;
  }

  const days = Math.floor(difference / oneDayInMs);
  if (days > 0) {
    return `${days} gün`;
  }

  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / 1000 / 60) % 60);
  const seconds = Math.floor((difference / 1000) % 60);

  return `${hours}:${minutes}:${seconds}`;
};

const Slider = ({ tickets }) => {
  if (!tickets || tickets.length === 0) {
    return <div className={css.noticket}>Bu kateqoriyaya aid kupon yoxdur.</div>;
  }

  return (
    <div className={css.ticket_table}>
      {tickets.map((ticket) => (
        <Link key={ticket.id} style ={{color:'black'}} href={`/tickets/${ticket.id}`} passHref>
          <div className={css.card_div}>
            <div className={css.card_pp}>
              <img
                src={`${MAINURL}uploads/${ticket.company.logo_path}`}
                alt={ticket.company.name}
              />
            </div>
            <div className={css.card_bottom}>
              <div className={css.card_text_div}>
                <h2>{ticket.company.name}</h2>
                <p>{ticket.name}</p>
              </div>
              <div className={css.card_button_div}>
                <div>
                  <button id={css.but1}>{ticket.count}</button>
                  <button id={css.but2}>
                    {calculateTimeLeft(ticket.end_time)}
                  </button>
                </div>
                <div>
                  <button id={css.but3}>{ticket.discount}%</button>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

Slider.propTypes = {
  tickets: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      company: PropTypes.shape({
        logo_path: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      }).isRequired,
      name: PropTypes.string.isRequired,
      discount: PropTypes.number.isRequired,
      end_time: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default Slider;
