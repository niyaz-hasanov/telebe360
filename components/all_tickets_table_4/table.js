import React, { useState, useEffect } from 'react';
import css from './carousel.module.css';
import Link from 'next/link';
import { MAINURL } from '../../utils/constants';
import { useColumns } from '../../hooks/useColums';
import MobAddCarousel2 from '../mobile_carousel_2/carousel';
import DeskAddCarousel2 from '../desk_carousel_2/carousel';
import Image from 'next/image';

const calculateTimeLeft = (end_time) => {
  const now = new Date();
  const endTime = new Date(end_time);
  const difference = endTime - now;

  if (difference <= 0) return 'Bitib';

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));

  if (days >= 1) return `${days}`;

  return 'Bitir';
};


export default function TicketsSection() {
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState(null);
  const cols = useColumns();        

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
        setTickets(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchTickets();
  }, []);

  if (error) return <div>Error: {error}</div>;
  if (tickets.length === 0) return <div>Bilet yoxdur. Daha sonra təkrar cəhd edin</div>;

  const cardsBeforeBanner = cols; 

  const firstPart = tickets.slice(0, cardsBeforeBanner);
  const restPart = tickets.slice(cardsBeforeBanner);

  return (
    <>
     
      <div className={css.ticket_table}>
        {firstPart.map(ticket => (

           <Link    key={ticket.id}
           style={{ color: 'black' }} className={css.card_wrapper} href={`/tickets/${ticket.id}`}>
          <div key={ticket.id} className={css.card_div}>
          
           
              <div className={css.card_top}>
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
                </div>
                <div className={css.card_middle}>{ticket.discount}%</div>
              <div className={css.card_bottom}>
              
                <div className={css.card_button_div}>
                  <div>
                    <button id={css.but1}>
                      <h2 className={css.say}>Say</h2>
                      <div className={css.card_bottom_right}>
                        <p>{ticket.count}</p>
                        <img src='/ticket_ticketlogo.svg'/>
                        </div>
                      </button>
                  </div>
                  <div >
                    <button id={css.but2}>
                      <h2 className={css.gun}>Gün</h2>
                      <div className={css.card_bottom_right}>
                      <p>{calculateTimeLeft(ticket.end_time)}</p>
                      <img src='/ticket_clocklogo.svg'/>
                      </div>
                      </button>
                      </div>
                  <div>
                    <button id={css.but3}>
                      <h2 className={css.giymet}>Qiymət</h2>
                      <div className={css.card_bottom_right}>
                        <p>{ticket.price}</p>
                        <img src='/telebecoinlogo.svg'/>
                        </div>
                        </button>
                  </div>
                </div>
              </div>
          </div>
            </Link>

        ))}
      </div>

     <div>      <div className={css.add2desk}>
        <DeskAddCarousel2 />
      </div>
      <div className={css.add2mob}>
       <MobAddCarousel2/>
      </div>
      </div>



      {restPart.length > 0 && (
        <div className={css.ticket_table}>
          {restPart.map(ticket => (
              <Link style={{ color: 'black' }} href={`/tickets/${ticket.id}`}  className={css.card_wrapper}>
            <div key={ticket.id} className={css.card_div}>
          
           
              <div className={css.card_top}>
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
                </div>
                <div className={css.card_middle}>{ticket.discount}%</div>
              <div className={css.card_bottom}>
              
                <div className={css.card_button_div}>
                  <div>
                    <button id={css.but1}>
                      <h2 className={css.say}>Say</h2>
                      <div className={css.card_bottom_right}>
                        <p>{ticket.count}</p>
                        <img className={css.ticket_img} src='/ticket_ticketlogo.svg'/>
                        </div>
                      </button>
                  </div>
                  <div >
                    <button id={css.but2}>
                      <h2 className={css.gun}>Gün</h2>
                      <div className={css.card_bottom_right}>
                      <p>{calculateTimeLeft(ticket.end_time)}</p>
                      <img className={css.ticket_img} src='/ticket_clocklogo.svg'/>
                      </div>
                      </button>
                      </div>
                  <div>
                    <button id={css.but3}>
                      <h2 className={css.giymet}>Qiymət</h2>
                      <div className={css.card_bottom_right}>
                        <p>{ticket.price}</p>
                        <img className={css.ticket_img} src='/telebecoinlogo.svg'/>
                        </div>
                        </button>
                  </div>
                </div>
              </div>
          </div>
            </Link>

          ))}
        </div>
      )}
    </>
  );
}
