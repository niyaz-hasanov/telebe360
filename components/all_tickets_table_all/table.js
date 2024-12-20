import React, { useState, useEffect } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";

import css from './carousel.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { MAINURL } from '../../utils/constants';
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


const Slider = () => {
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch(`${MAINURL}api/v1/tickets/`, {
          headers: {
            Authorization: `Bearer ${document.cookie.replace(
              /(?:(?:^|.*;\s*)access_token\s*\=\s*([^;]*).*$)|^.*$/,
              '$1'
            )}`,
          },
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setTickets(data); // Adjust this if your API returns an object like { tickets: [] }
      } catch (error) {
        setError(error.message);
        console.error('Error fetching tickets:', error);
      }
    };

    fetchTickets();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (tickets.length === 0) {
    return <div>No tickets available.</div>;
  }

  // Tickets array'inden 4. index'ten sonrasını alıyoruz
  const ticketsToDisplay = tickets.slice(4);  // 4. indeksten sonrasını göster

  return (
    <div className={css.ticket_table}>
      {ticketsToDisplay.map((ticket) => (
            <Link style={{ color: 'black' }} key={ticket.id} href={`/tickets/${ticket.id}`}>
        <div key={ticket.id} className={css.card_div}>
      
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
      ))}
    </div>
  );
};

export default Slider;
