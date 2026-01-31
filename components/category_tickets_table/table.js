import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import css from './carousel.module.css';
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

const Slider = ({ tickets }) => {
  const cols = useColumns();

  if (!tickets || tickets.length === 0) {
    return <div className={css.noticket}>Bu kateqoriyaya aid bilet yoxdur.</div>;
  }

  const cardsBeforeBanner = cols;

  const firstPart = tickets.slice(0, cardsBeforeBanner);
  const restPart = tickets.slice(cardsBeforeBanner);

  return (
    <>
      {/* İlk kısım (banner öncesi kartlar) */}
      <div className={css.ticket_table}>
        {firstPart.map((ticket) => (
          <Link
            key={ticket.id}
            style={{ color: 'black' }}
            href={`/tickets/${ticket.id}`}
            className={css.card_wrapper}
          >
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
                  <div>
                    <button id={css.but1}>
                      <h2 className={css.say}>Say</h2>
                      <div className={css.card_bottom_right}>
                        <p>{ticket.count}</p>
                        <img src="/ticket_ticketlogo.svg" alt="ticket" />
                      </div>
                    </button>
                  </div>

                  <div>
                    <button id={css.but2}>
                      <h2 className={css.gun}>Gün</h2>
                      <div className={css.card_bottom_right}>
                        <p>{calculateTimeLeft(ticket.end_time)}</p>
                        <img src="/ticket_clocklogo.svg" alt="clock" />
                      </div>
                    </button>
                  </div>

                  <div>
                    <button id={css.but3}>
                      <h2 className={css.giymet}>Qiymət</h2>
                      <div className={css.card_bottom_right}>
                        <p>{ticket.price}</p>
                        <img src="/telebecoinlogo.svg" alt="coin" />
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Banner alanı (kategori sayfasında da istersen kullan) */}
      <div>
        <div className={css.add2desk}>
          <DeskAddCarousel2 />
        </div>
        <div className={css.add2mob}>
          <MobAddCarousel2 />
        </div>
      </div>

      {/* Banner sonrası kalan kartlar */}
      {restPart.length > 0 && (
        <div className={css.ticket_table}>
          {restPart.map((ticket) => (
            <Link
              key={ticket.id}
              style={{ color: 'black' }}
              href={`/tickets/${ticket.id}`}
              className={css.card_wrapper}
            >
              <div className={css.card_div}>
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
                          <img src="/ticket_ticketlogo.svg" alt="ticket" />
                        </div>
                      </button>
                    </div>

                    <div>
                      <button id={css.but2}>
                        <h2 className={css.gun}>Gün</h2>
                        <div className={css.card_bottom_right}>
                          <p>{calculateTimeLeft(ticket.end_time)}</p>
                          <img src="/ticket_clocklogo.svg" alt="clock" />
                        </div>
                      </button>
                    </div>

                    <div>
                      <button id={css.but3}>
                        <h2 className={css.giymet}>Qiymət</h2>
                        <div className={css.card_bottom_right}>
                          <p>{ticket.price}</p>
                          <img src="/telebecoinlogo.svg" alt="coin" />
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
};

Slider.propTypes = {
  tickets: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      company: PropTypes.shape({
        logo_path: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      }).isRequired,
      name: PropTypes.string.isRequired,
      discount: PropTypes.number.isRequired,
      end_time: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired,
      price: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
    })
  ).isRequired,
};

export default Slider;
